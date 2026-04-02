import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRODUCTS: Record<string, { name: string; amount: number; description: string }> = {
  starter: {
    name: "AI Automation Toolkit — Starter",
    amount: 4700, // €47.00
    description: "15 copy-paste AI templates to automate your business in under an hour.",
  },
  pro: {
    name: "AI Business Accelerator — Pro",
    amount: 9700, // €97.00
    description: "47 AI templates — the complete toolkit for lead gen, proposals, and customer support automation.",
  },
  complete: {
    name: "AI Business Accelerator — Complete",
    amount: 19700, // €197.00
    description: "Everything in Pro + AI chatbot setup, email sequences, agency playbook, and 60-day priority support.",
  },
};

// Cache price IDs in-memory (reset on cold start — acceptable for serverless)
const priceCache: Record<string, string> = {};

async function getOrCreatePrice(stripe: Stripe, productKey: string): Promise<string> {
  if (priceCache[productKey]) return priceCache[productKey];

  const product = PRODUCTS[productKey];

  // Check for existing product
  const products = await stripe.products.list({ limit: 20, active: true });
  let stripeProduct = products.data.find(
    (p) => p.metadata?.app === `ai-accelerator-${productKey}`
  );

  if (!stripeProduct) {
    stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      metadata: { app: `ai-accelerator-${productKey}` },
    });
  }

  // Check for existing price
  const prices = await stripe.prices.list({
    product: stripeProduct.id,
    active: true,
    limit: 20,
  });
  let price = prices.data.find(
    (p) => p.unit_amount === product.amount && p.currency === "eur"
  );

  if (!price) {
    price = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.amount,
      currency: "eur",
    });
  }

  priceCache[productKey] = price.id;
  return price.id;
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe not configured." },
      { status: 503 }
    );
  }

  const { product } = await req.json();
  if (!PRODUCTS[product]) {
    return NextResponse.json({ error: "Invalid product." }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;

  try {
    const priceId = await getOrCreatePrice(stripe, product);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&product=${product}`,
      cancel_url: `${baseUrl}/cancel`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: { product, app: "ai-business-accelerator" },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
