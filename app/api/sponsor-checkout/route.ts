import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  readSponsors,
  writeSponsors,
  markSpotPending,
  getTier,
  getTierPrice,
  getTierLabel,
  isSpotAvailable,
} from "@/lib/sponsors";

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 503 });
  }

  let spotId: number;
  try {
    const body = await req.json();
    spotId = Number(body.spotId);
    if (!spotId || spotId < 1 || spotId > 1000) {
      return NextResponse.json({ error: "Invalid spot ID." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = readSponsors();
  if (!isSpotAvailable(data, spotId)) {
    return NextResponse.json({ error: "Spot already taken." }, { status: 409 });
  }

  const tier = getTier(spotId);
  const price = getTierPrice(tier);
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
            unit_amount: price,
            product_data: {
              name: `Sponsor Wall — ${getTierLabel(tier)} Spot #${spotId}`,
              description: `Permanent ${getTierLabel(tier)} sponsor spot #${spotId} on the Wall of 1000 Sponsors. Yours forever.`,
              metadata: { app: "sponsor-wall", tier, spotId: String(spotId) },
            },
          },
          quantity: 1,
        },
      ],
      custom_fields: [
        {
          key: "company_name",
          label: { type: "custom", custom: "Company / Your Name" },
          type: "text",
        },
        {
          key: "website_url",
          label: { type: "custom", custom: "Website URL (with https://)" },
          type: "text",
          optional: true,
        },
      ],
      success_url: `${baseUrl}/sponsor-wall/success?session_id={CHECKOUT_SESSION_ID}&spot=${spotId}`,
      cancel_url: `${baseUrl}/sponsor-wall`,
      metadata: {
        app: "sponsor-wall",
        tier,
        spotId: String(spotId),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 min
    });

    // Mark spot as pending to prevent double-booking
    const updated = markSpotPending(data, spotId, session.id);
    writeSponsors(updated);

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout creation failed";
    console.error("[sponsor-checkout] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
