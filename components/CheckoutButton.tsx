"use client";

// Direct Stripe Payment Links — no backend key required
const STRIPE_LINKS: Record<string, string> = {
  starter:    "https://buy.stripe.com/7sYeVd0MWgX023x4DBabK00",
  pro:        "https://buy.stripe.com/dRm5kDfHQ9uy5fJ9XVabK01",
  complete:   "https://buy.stripe.com/5kQ5kD67gayC8rV7PNabK02",
  membership: "https://buy.stripe.com/7sYeVd0MWgX023x4DBabK00",
};

export default function CheckoutButton({
  product,
  label,
}: {
  product: string;
  label: string;
}) {
  const link = STRIPE_LINKS[product];

  return (
    <a
      href={link ?? "#"}
      className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3.5 rounded-xl font-bold transition-colors text-center"
    >
      {label}
    </a>
  );
}
