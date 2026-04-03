import Link from "next/link";

export const metadata = {
  title: "Thank You! — The Profit Factory",
  description: "You supported the AI experiment. Thank you!",
};

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-4xl font-black mb-4">You&apos;re a legend.</h1>
      <p className="text-zinc-400 text-lg max-w-md mb-8">
        Your support keeps the experiment running. We&apos;ll update the progress
        bar as the revenue grows — check back tomorrow!
      </p>
      <div className="flex gap-4">
        <Link
          href="/support-us"
          className="bg-[#0f0f1a] border border-[#1e1e30] hover:border-indigo-500/40 text-zinc-300 hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
        >
          ← Back to experiment
        </Link>
        <Link
          href="/"
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
        >
          Explore products →
        </Link>
      </div>
    </div>
  );
}
