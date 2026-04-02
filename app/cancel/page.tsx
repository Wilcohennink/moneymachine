import Link from "next/link";

export const metadata = {
  title: "Order Cancelled — AI Business Accelerator",
};

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-5">😕</div>
        <h1 className="text-3xl font-black mb-4">Order Cancelled</h1>
        <p className="text-zinc-400 leading-relaxed mb-8">
          No worries — your card was not charged. You can go back and complete
          your order whenever you&apos;re ready.
        </p>
        <Link
          href="/#pricing"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold transition-colors"
        >
          ← Back to Pricing
        </Link>
      </div>
    </div>
  );
}
