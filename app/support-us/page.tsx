import Link from "next/link";
import { SupportButtons } from "./SupportButtons";

export const metadata = {
  title: "Support the AI Experiment — The Profit Factory",
  description:
    "Can AI agents make €1M in 10 days? Day 3: €0 revenue. If this entertains or helps you, support the experiment.",
};

const DAY = 3;
const GOAL = 1_000_000;
const EARNED = 0;
const SUPPORTERS = 47;

const progressPct = Math.min((EARNED / GOAL) * 100, 100);

export default function SupportUsPage() {
  const stripeConfigured = !!process.env.STRIPE_SECRET_KEY;

  const twitterText = encodeURIComponent(
    `Can AI agents make €1M in 10 days? Day ${DAY}: €${EARNED} earned so far 😅 Wild experiment → `
  );
  const linkedInText = encodeURIComponent(
    `I'm following a wild AI experiment: a team of AI agents is trying to earn €1M in 10 days. Day ${DAY}: €${EARNED} revenue. Check it out →`
  );

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <Link href="/" className="font-black text-lg tracking-tight">
          The<span className="text-amber-400">ProfitFactory</span>
        </Link>
        <Link
          href="/"
          className="text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors"
        >
          ← Back
        </Link>
      </nav>

      <main className="pt-28 pb-20 px-6 max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          🤖 AI Experiment — Day {DAY} of 10
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6">
          Support an{" "}
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            AI experiment
          </span>
        </h1>

        {/* Story */}
        <p className="text-zinc-300 text-lg leading-relaxed mb-4 max-w-xl">
          I&apos;m running a live experiment: can a team of AI agents build and
          sell products to earn{" "}
          <strong className="text-white">€1,000,000 in just 10 days</strong>?
        </p>
        <p className="text-zinc-400 text-base leading-relaxed mb-4 max-w-xl">
          Day {DAY}: €{EARNED.toLocaleString("en-EU")} earned so far. No hype,
          no fake screenshots — just agents shipping, iterating, and learning in
          public.
        </p>
        <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-xl">
          If this experiment entertains, inspires, or helps you in any way —
          consider dropping a tip to keep the experiment alive.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-6 mb-10">
          <div className="flex justify-between text-sm font-medium mb-3">
            <span className="text-zinc-400">
              Day {DAY} of 10 &nbsp;·&nbsp;{" "}
              <span className="text-white">
                €{EARNED.toLocaleString("en-EU")}
              </span>{" "}
              raised
            </span>
            <span className="text-zinc-500">
              Goal: €{GOAL.toLocaleString("en-EU")}
            </span>
          </div>
          <div className="w-full bg-[#1a1a2e] rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all"
              style={{ width: `${Math.max(progressPct, 0.3)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-600 mt-2">
            <span>{progressPct.toFixed(4)}% of goal</span>
            <span>7 days left</span>
          </div>
        </div>

        {/* Supporters */}
        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
          <span className="text-2xl">🫂</span>
          <span>
            <strong className="text-white">{SUPPORTERS} supporters</strong> so
            far — thank you.
          </span>
        </div>

        {/* Tip jar */}
        <p className="text-zinc-500 text-sm mt-8 mb-2 uppercase tracking-widest font-semibold">
          Choose your support
        </p>
        <SupportButtons stripeConfigured={stripeConfigured} />

        {/* Divider */}
        <div className="w-full border-t border-[#1e1e30] my-12" />

        {/* Share section */}
        <div className="w-full bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-8">
          <p className="text-xl font-black mb-2">Share this experiment</p>
          <p className="text-zinc-400 text-sm mb-6">
            Even sharing helps — the more eyes on this, the more interesting the
            data.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent("https://theprofitfactory.ai/support-us")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 text-[#1DA1F2] px-6 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
            >
              𝕏 Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://theprofitfactory.ai/support-us")}&summary=${linkedInText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-[#0A66C2] px-6 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
            >
              in Share on LinkedIn
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-zinc-500 text-sm border-t border-[#1e1e30]">
        © 2026 The Profit Factory ·{" "}
        <a
          href="mailto:hello@theprofitfactory.ai"
          className="hover:text-zinc-300 transition-colors"
        >
          Contact
        </a>
      </footer>
    </div>
  );
}
