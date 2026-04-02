import Link from "next/link";

export const metadata = {
  title: "Payment Confirmed — AI Business Accelerator",
};

const PRODUCT_NAMES: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  complete: "Complete",
};

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  // Note: searchParams is async in Next.js 15
  void searchParams; // accessed client-side via URL if needed

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-black text-green-400 mb-4">
          Payment Confirmed!
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
          Your AI Business Accelerator package is ready. Check your inbox for
          the download link.
        </p>

        <div className="bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-8 mb-8">
          <h2 className="font-bold text-lg mb-4">📦 Your Downloads</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Your access link has been sent to your email. You can also access
            your materials below:
          </p>
          <div className="space-y-3">
            <a
              href="/downloads/ai-business-accelerator.pdf"
              className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold transition-colors"
            >
              ⬇️ Download Starter Pack (PDF)
            </a>
            <a
              href="/downloads/automation-templates.zip"
              className="flex items-center justify-center gap-2 bg-[#1e1e30] hover:bg-[#2a2a40] text-zinc-300 py-3 rounded-xl font-bold transition-colors"
            >
              ⬇️ Automation Templates
            </a>
          </div>
        </div>

        {/* DFY Upsell */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/30 rounded-2xl p-7 mb-8">
          <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            UPGRADE
          </span>
          <h3 className="text-xl font-black mt-4 mb-2">
            Want us to do it FOR you?
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Our team will implement AI in your business within 5 days —
            guaranteed results or full refund.
          </p>
          <p className="text-indigo-300 font-bold mb-4">
            €2,997 Done-For-You Setup
          </p>
          <a
            href="mailto:hello@aibusinessaccelerator.com?subject=Done-For-You%20Setup%20After%20Purchase"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Book a Call →
          </a>
        </div>

        <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
