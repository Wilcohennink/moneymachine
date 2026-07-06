import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type Plan = "monthly" | "yearly";

const PRODUCTS: Record<Plan, { priceAmount: number; interval: "month" | "year"; trialDays: number }> = {
  monthly: {
    priceAmount: 1900, // €19.00/month
    interval: "month",
    trialDays: 14,
  },
  yearly: {
    priceAmount: 19000, // €190.00/year
    interval: "year",
    trialDays: 14,
  },
};

// Cache price IDs in-memory (reset on cold start)
const priceCache: Record<Plan, string> = {} as Record<Plan, string>;

async function getOrCreatePrice(stripe: Stripe, plan: Plan): Promise<string> {
  if (priceCache[plan]) return priceCache[plan];

  const config = PRODUCTS[plan];

  // Check for existing product
  const products = await stripe.products.list({ limit: 20, active: true });
  let stripeProduct = products.data.find((p) => p.metadata?.app === "zzp-admin-suite");

  if (!stripeProduct) {
    stripeProduct = await stripe.products.create({
      name: "ZZP Admin Suite",
      description:
        "Automatiseer je ZZP-administratie: facturen, BTW-tracking, contracten en meer. KvK-compliant en altijd actueel.",
      metadata: { app: "zzp-admin-suite" },
    });
  }

  // Check for existing price
  const prices = await stripe.prices.list({
    product: stripeProduct.id,
    active: true,
    limit: 20,
  });

  let price = prices.data.find(
    (p) =>
      p.unit_amount === config.priceAmount &&
      p.currency === "eur" &&
      p.recurring?.interval === config.interval
  );

  if (!price) {
    price = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: config.priceAmount,
      currency: "eur",
      recurring: { interval: config.interval },
    });
  }

  priceCache[plan] = price.id;
  return price.id;
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }

  const { plan, attribution } = await req.json();
  if (!PRODUCTS[plan as Plan]) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;
  const config = PRODUCTS[plan as Plan];

  try {
    const priceId = await getOrCreatePrice(stripe, plan);

    // Merge attribution data into metadata
    const metadata: Record<string, string> = {
      plan,
      product: "zzp-admin-suite",
      app: "zzp-admin-suite",
      ...(attribution || {}),
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${baseUrl}/saas/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${baseUrl}/saas`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      subscription_data: {
        trial_period_days: config.trialDays,
        metadata: {
          product: "zzp-admin-suite",
        },
      },
      metadata,
      customer_email: undefined, // Let Stripe collect the email
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("SaaS checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
