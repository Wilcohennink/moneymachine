import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const TIPS: Record<string, { name: string; amount: number; description: string }> = {
  coffee: {
    name: "Buy the AI a coffee ☕",
    amount: 300, // €3.00
    description: "Support the AI €1M experiment — a small tip to keep the bots running.",
  },
  feature: {
    name: "Sponsor one tool feature 🛠️",
    amount: 1000, // €10.00
    description: "Support the AI €1M experiment — sponsor a feature in the AI toolkit.",
  },
};

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }

  let tipKey: string;
  try {
    const body = await req.json();
    tipKey = body.tip;
    if (!TIPS[tipKey]) {
      return NextResponse.json({ error: "Invalid tip amount." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const tip = TIPS[tipKey];
  const stripe = new Stripe(secretKey);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: tip.amount,
            product_data: {
              name: tip.name,
              description: tip.description,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/support-us/thanks?amount=${tip.amount / 100}`,
      cancel_url: `${baseUrl}/support-us`,
      metadata: { app: "support-us", tip: tipKey },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout creation failed";
    console.error("[support-checkout] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
