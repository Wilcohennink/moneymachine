import Link from "next/link";

export const metadata = {
  title: "Spot Claimed! — Wall of 1000 Sponsors",
};

export default function SponsorSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ spot?: string; session_id?: string }>;
}) {
  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="text-7xl mb-6">🎉</div>

      <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
        ✓ Payment confirmed
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-4">
        Your spot is{" "}
        <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
          claimed!
        </span>
      </h1>

      <p className="text-zinc-400 text-lg max-w-lg mb-4 leading-relaxed">
        Welcome to the Wall of 1,000 Sponsors. Your permanent spot is live — your backlink is indexed and yours forever.
      </p>

      <p className="text-zinc-500 text-sm mb-10">
        Your company name will appear on the wall shortly. Share the wall to help it grow — every buyer you bring makes your spot more valuable.
      </p>

      {/* Share prompt */}
      <div className="bg-[#0f0f1a] border border-[#2a2a40] rounded-2xl p-6 max-w-lg w-full mb-8">
        <h2 className="font-bold text-lg mb-3">Spread the word 📢</h2>
        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
          Share the wall so more spots sell. More sales = more traffic to this page = more SEO value for <em>your</em> backlink. It&apos;s in your interest to share.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://twitter.com/intent/tweet?text=I%20just%20claimed%20a%20permanent%20sponsor%20spot%20on%20the%20Wall%20of%201%2C000%20Sponsors.%20A%20permanent%20backlink%20from%20%E2%82%AC500.%20Only%201%2C000%20spots%20ever.&url=https%3A%2F%2Ftheprofitfactory.ai%2Fsponsor-wall"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1e1e30] hover:bg-[#2a2a40] text-zinc-200 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            Share on X/Twitter →
          </a>
          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ftheprofitfactory.ai%2Fsponsor-wall"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1e1e30] hover:bg-[#2a2a40] text-zinc-200 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            Share on LinkedIn →
          </a>
        </div>
      </div>

      <Link
        href="/sponsor-wall"
        className="text-zinc-400 hover:text-white transition-colors text-sm"
      >
        ← Back to the Wall
      </Link>
    </div>
  );
}
