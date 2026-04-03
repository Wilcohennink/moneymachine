"use client";

import { useEffect, useState } from "react";

const TOOLS = [
  {
    emoji: "✍️",
    name: "AI Copy Generator",
    desc: "Sales pages, emails, ads, and more. Write conversion copy in seconds.",
  },
  {
    emoji: "📄",
    name: "AI Resume Builder",
    desc: "Land interviews faster. ATS-optimised resumes tailored to any job description.",
  },
  {
    emoji: "🎤",
    name: "AI Interview Prep",
    desc: "Practice with real questions, get instant feedback, walk in confident.",
  },
  {
    emoji: "💡",
    name: "AI Business Name Generator",
    desc: "Hundreds of brandable name ideas in under 10 seconds. Domain-ready.",
  },
  {
    emoji: "🎯",
    name: "Prompt Scorer",
    desc: "Grade and improve any AI prompt. Get better outputs every time.",
  },
];

const FAQS = [
  {
    q: "What is lifetime access?",
    a: "Pay once, use forever. No subscriptions, no monthly fees. All 5 tools are yours for life, including future updates.",
  },
  {
    q: "What tools are included?",
    a: "AI Copy Generator, AI Resume Builder, AI Interview Prep, AI Business Name Generator, and Prompt Scorer — all 5 for a single payment of €47.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. If you're not happy within 7 days of purchase, email us at hello@theprofitfactory.ai and we'll issue a full refund. No questions asked.",
  },
];

const DEADLINE_KEY = "launch_sale_deadline";
const DURATION_MS = 24 * 60 * 60 * 1000;

function getDeadline(): number {
  if (typeof window === "undefined") return Date.now() + DURATION_MS;
  const stored = localStorage.getItem(DEADLINE_KEY);
  if (stored) {
    const ts = parseInt(stored, 10);
    if (!isNaN(ts) && ts > Date.now()) return ts;
  }
  const deadline = Date.now() + DURATION_MS;
  localStorage.setItem(DEADLINE_KEY, String(deadline));
  return deadline;
}

function formatPad(n: number) {
  return String(n).padStart(2, "0");
}

export default function LaunchPage() {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });
  const [expired, setExpired] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const deadline = getDeadline();

    function tick() {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        setExpired(true);
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
      }
      const totalSec = Math.floor(diff / 1000);
      setTimeLeft({
        h: Math.floor(totalSec / 3600),
        m: Math.floor((totalSec % 3600) / 60),
        s: totalSec % 60,
      });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/95 backdrop-blur border-b border-[#1e1e30]">
        <div className="font-black text-lg tracking-tight">
          The<span className="text-indigo-400">ProfitFactory</span>
        </div>
        <a
          href="https://buy.stripe.com/5kQ5kD67gayC8rV7PNabK02"
          className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors"
        >
          Get All Tools — €47 →
        </a>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          ⚡ 24-Hour Flash Sale — Ends Today
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mb-4">
          All 5 AI Tools.
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            One Payment. Forever.
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mb-3 leading-relaxed">
          Lifetime access to every tool we build — for a single launch-week price.
        </p>
        <p className="text-zinc-500 text-base mb-10">
          Price goes to{" "}
          <span className="line-through text-zinc-600">€197</span> after launch week ends
        </p>

        {/* Countdown */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
            {expired ? "Sale has ended" : "Offer expires in"}
          </p>
          <div className="flex items-center gap-3 justify-center">
            {[
              { val: timeLeft.h, label: "Hours" },
              { val: timeLeft.m, label: "Mins" },
              { val: timeLeft.s, label: "Secs" },
            ].map(({ val, label }, i) => (
              <div key={label} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-3xl font-black text-zinc-600 -mt-4">:</span>
                )}
                <div className="flex flex-col items-center">
                  <div className="bg-[#0f0f1a] border border-[#2a2a40] rounded-xl w-20 h-20 flex items-center justify-center text-4xl font-black tabular-nums text-white">
                    {formatPad(val)}
                  </div>
                  <span className="text-xs text-zinc-500 font-semibold mt-2 uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <a
            href="https://buy.stripe.com/5kQ5kD67gayC8rV7PNabK02"
            className="group bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/30"
          >
            Get Lifetime Access — €47{" "}
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <span>✅ Instant access</span>
            <span>✅ All 5 tools</span>
            <span>✅ 7-day refund</span>
          </div>
          <p className="text-sm text-zinc-600">
            Join{" "}
            <span className="text-zinc-400 font-bold">47 early adopters</span>{" "}
            who already locked in the launch price
          </p>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-24 px-6 bg-[#0a0a12] border-t border-[#1e1e30]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3">
              Everything included
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-3">
              5 tools, one price
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Normally €197. For the next{" "}
              <span className="text-orange-400 font-bold">24 hours only</span>: get all 5 for €47.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="bg-[#080810] border border-[#1e1e30] rounded-2xl p-6 hover:border-orange-500/30 transition-colors"
              >
                <div className="text-3xl mb-3">{tool.emoji}</div>
                <h3 className="font-black text-lg mb-2">{tool.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{tool.desc}</p>
              </div>
            ))}
            {/* Bonus card */}
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center md:col-span-2 lg:col-span-2">
              <div className="text-3xl mb-3">🔮</div>
              <h3 className="font-black text-lg mb-2">All future tools too</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Every new AI tool we launch gets added to your account automatically. Pay once,
                benefit forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 border-t border-[#1e1e30]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3">
            Launch week pricing
          </div>
          <h2 className="text-4xl font-black tracking-tight mb-8">
            One price, no surprises
          </h2>
          <div className="bg-[#0f0f1a] border border-[#2a2a40] rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-black px-4 py-2 rounded-bl-2xl">
              76% OFF
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
            <div className="relative">
              <p className="text-zinc-500 text-lg mb-1">
                Regular price:{" "}
                <span className="line-through">€197</span>
              </p>
              <div className="text-7xl font-black text-white my-4">
                €47
              </div>
              <p className="text-orange-400 font-bold mb-8">Launch week only · Lifetime access</p>
              <a
                href="https://buy.stripe.com/5kQ5kD67gayC8rV7PNabK02"
                className="block w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white py-5 rounded-2xl font-black text-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-orange-500/30"
              >
                Get Lifetime Access — €47 →
              </a>
              <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-zinc-400">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xl">⚡</span>
                  <span>Instant access</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xl">🔒</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xl">↩️</span>
                  <span>7-day refund</span>
                </div>
              </div>
            </div>
          </div>
          {/* Countdown below pricing */}
          <div className="mt-8 p-5 bg-orange-500/5 border border-orange-500/20 rounded-2xl">
            <p className="text-orange-300 font-bold text-sm mb-3">
              ⏰ This price disappears when the timer hits zero
            </p>
            <div className="flex items-center gap-2 justify-center text-2xl font-black tabular-nums text-white">
              <span>{formatPad(timeLeft.h)}</span>
              <span className="text-orange-400">:</span>
              <span>{formatPad(timeLeft.m)}</span>
              <span className="text-orange-400">:</span>
              <span>{formatPad(timeLeft.s)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-[#0a0a12] border-t border-[#1e1e30]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3">
              FAQ
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-[#080810] border border-[#1e1e30] rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-base hover:text-indigo-300 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="text-zinc-500 ml-4 flex-shrink-0 text-xl">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed border-t border-[#1e1e30] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 border-t border-[#1e1e30] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Don&apos;t pay €197 later.
            <br />
            <span className="text-orange-400">Grab it for €47 now.</span>
          </h2>
          <p className="text-zinc-400 mb-8 text-lg">
            47 people already locked in their lifetime access. This deal ends when the timer hits zero.
          </p>
          <a
            href="https://buy.stripe.com/5kQ5kD67gayC8rV7PNabK02"
            className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/30"
          >
            Get Lifetime Access — €47 →
          </a>
          <p className="text-zinc-600 text-sm mt-4">
            Secure checkout · Instant delivery · 7-day refund guarantee
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-zinc-600 text-sm border-t border-[#1e1e30]">
        © 2026 The Profit Factory ·{" "}
        <a
          href="mailto:hello@theprofitfactory.ai"
          className="hover:text-zinc-400 transition-colors"
        >
          Contact
        </a>
        {" "}·{" "}
        <a href="/" className="hover:text-zinc-400 transition-colors">
          Home
        </a>
      </footer>
    </div>
  );
}
