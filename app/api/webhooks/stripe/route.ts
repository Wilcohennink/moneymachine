import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";
import { readSponsors, writeSponsors, markSpotSold } from "@/lib/sponsors";

// Append an event row to payments.csv for auditing
function logPayment(data: Record<string, string>) {
  const file = path.join(process.cwd(), "payments.csv");
  const headers = "timestamp,event,customerId,customerEmail,amount,currency,product,subscriptionId,status\n";
  const row = [
    new Date().toISOString(),
    data.event ?? "",
    data.customerId ?? "",
    data.customerEmail ?? "",
    data.amount ?? "",
    data.currency ?? "",
    data.product ?? "",
    data.subscriptionId ?? "",
    data.status ?? "",
  ]
    .map((v) => v.replace(/,/g, ""))
    .join(",") + "\n";

  try {
    if (!fs.existsSync(file)) fs.writeFileSync(file, headers);
    fs.appendFileSync(file, row);
  } catch {
    console.error("[webhook] Could not write payments.csv");
  }
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  if (webhookSecret && sig) {
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Signature verification failed";
      console.error("[webhook] Signature error:", msg);
      return NextResponse.json({ error: msg }, { status: 400 });
    }
  } else {
    // No webhook secret configured — parse but don't verify (dev/testing only)
    try {
      event = JSON.parse(body) as Stripe.Event;
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    if (process.env.NODE_ENV === "production") {
      console.error("[webhook] STRIPE_WEBHOOK_SECRET not set in production!");
    }
  }

  console.log(`[webhook] Received: ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const isSubscription = session.mode === "subscription";
      logPayment({
        event: event.type,
        customerId: session.customer as string ?? "",
        customerEmail: session.customer_details?.email ?? "",
        amount: session.amount_total ? String(session.amount_total / 100) : "",
        currency: session.currency ?? "",
        product: String(session.metadata?.product ?? session.metadata?.app ?? ""),
        subscriptionId: isSubscription ? String(session.subscription ?? "") : "",
        status: "paid",
      });
      console.log(
        `[webhook] Payment complete — ${session.customer_details?.email} — mode: ${session.mode} — product: ${session.metadata?.product ?? session.metadata?.app}`
      );

      // Handle sponsor wall spot purchase
      if (session.metadata?.app === "sponsor-wall" && session.metadata?.spotId) {
        const spotId = Number(session.metadata.spotId);
        const nameField = (session.custom_fields ?? []).find(
          (f: { key: string }) => f.key === "company_name"
        );
        const urlField = (session.custom_fields ?? []).find(
          (f: { key: string }) => f.key === "website_url"
        );
        const name =
          (nameField as { text?: { value?: string } } | undefined)?.text?.value ??
          session.customer_details?.name ??
          undefined;
        const url =
          (urlField as { text?: { value?: string } } | undefined)?.text?.value ?? undefined;

        if (spotId >= 1 && spotId <= 1000) {
          const data = readSponsors();
          const updated = markSpotSold(data, spotId, { name, url, sessionId: session.id });
          writeSponsors(updated);
          console.log(`[webhook] Sponsor spot #${spotId} marked as sold — ${name ?? "anonymous"}`);
        }
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string | null };
      const sub = (invoice as any).subscription ?? null;
      logPayment({
        event: event.type,
        customerId: (invoice as any).customer as string ?? "",
        customerEmail: invoice.customer_email ?? "",
        amount: invoice.amount_paid ? String(invoice.amount_paid / 100) : "",
        currency: invoice.currency ?? "",
        product: String((invoice.metadata as Record<string, string>)?.product ?? ""),
        subscriptionId: sub ?? "",
        status: "paid",
      });
      console.log(`[webhook] Invoice paid — ${invoice.customer_email} — sub: ${sub}`);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string | null };
      logPayment({
        event: event.type,
        customerId: (invoice as any).customer as string ?? "",
        customerEmail: invoice.customer_email ?? "",
        amount: invoice.amount_due ? String(invoice.amount_due / 100) : "",
        currency: invoice.currency ?? "",
        product: "",
        subscriptionId: String((invoice as any).subscription ?? ""),
        status: "failed",
      });
      console.error(`[webhook] Invoice payment FAILED — ${invoice.customer_email}`);
      break;
    }

    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription;
      logPayment({
        event: event.type,
        customerId: sub.customer as string ?? "",
        customerEmail: "",
        amount: sub.items.data[0]?.price?.unit_amount
          ? String(sub.items.data[0].price.unit_amount / 100)
          : "",
        currency: sub.currency ?? "",
        product: String((sub.metadata as Record<string, string>)?.product ?? ""),
        subscriptionId: sub.id,
        status: sub.status,
      });
      console.log(`[webhook] Subscription created — ${sub.id} — status: ${sub.status}`);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      logPayment({
        event: event.type,
        customerId: sub.customer as string ?? "",
        customerEmail: "",
        amount: "",
        currency: "",
        product: String((sub.metadata as Record<string, string>)?.product ?? ""),
        subscriptionId: sub.id,
        status: "cancelled",
      });
      console.log(`[webhook] Subscription cancelled — ${sub.id}`);
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      logPayment({
        event: event.type,
        customerId: pi.customer as string ?? "",
        customerEmail: "",
        amount: pi.amount ? String(pi.amount / 100) : "",
        currency: pi.currency ?? "",
        product: String((pi.metadata as Record<string, string>)?.product ?? ""),
        subscriptionId: "",
        status: "failed",
      });
      console.error(`[webhook] PaymentIntent failed — ${pi.id} — ${pi.last_payment_error?.message}`);
      break;
    }

    default:
      // Unhandled event type — acknowledge receipt
      console.log(`[webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
