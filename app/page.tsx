import Link from "next/link";

export const metadata = {
  title: "The Profit Factory — Revenue Streams That Work",
  description:
    "Hosting deals, viral content, AI prompts, and more. Real revenue streams, not hype.",
};

export default function Home() {
  const streams = [
    {
      emoji: "🖥️",
      label: "Hosting Deals",
      desc: "Compare the best web hosting plans. Unbiased reviews, real prices.",
      href: "/hosting",
      cta: "Find a host →",
      badge: "Live",
      badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    {
      emoji: "🤖",
      label: "AI Prompt Packs",
      desc: "Proven ChatGPT & Claude prompts for business, content, and automation.",
      href: "https://theprofitfactory.ai",
      cta: "Browse prompts →",
      badge: "Live",
      badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
      external: true,
    },
    {
      emoji: "📄",
      label: "InvoiceQuick",
      desc: "Fast, no-nonsense invoicing for freelancers. Send your first invoice in 60 seconds.",
      href: "#",
      cta: "Coming soon",
      badge: "Soon",
      badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      disabled: true,
    },
    {
      emoji: "🏆",
      label: "Sponsor Wall",
      desc: "Permanent sponsor spots. Get lasting visibility for your brand or product.",
      href: "#",
      cta: "Coming soon",
      badge: "Soon",
      badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <div className="font-black text-lg tracking-tight">
          The<span className="text-indigo-400">ProfitFactory</span>
        </div>
        <Link
          href="/hosting"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors"
        >
          Best Hosting Deals →
        </Link>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          💰 Real products. Real revenue.
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mb-6">
          Build revenue streams
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
            that actually pay
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          We build and monetize products across hosting affiliate, digital
          downloads, SaaS, and viral content. Pick a stream and start earning.
        </p>
        <Link
          href="/hosting"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
        >
          See Hosting Deals →
        </Link>
      </section>

      {/* REVENUE STREAMS */}
      <section className="py-24 px-6 bg-[#0f0f1a] border-t border-b border-[#1e1e30]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3">
              Revenue Streams
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              What we&apos;re building
            </h2>
            <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
              Multiple products, multiple income streams. Each one built to
              generate real money.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {streams.map((s) => (
              <div
                key={s.label}
                className="bg-[#080810] border border-[#1e1e30] rounded-2xl p-7 hover:border-indigo-500/40 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{s.emoji}</div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${s.badgeColor}`}
                  >
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-black text-xl mb-2">{s.label}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                  {s.desc}
                </p>
                {s.disabled ? (
                  <span className="text-zinc-600 text-sm font-medium">
                    {s.cta}
                  </span>
                ) : s.external ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-bold text-sm transition-colors"
                  >
                    {s.cta}
                  </a>
                ) : (
                  <Link
                    href={s.href}
                    className="text-indigo-400 hover:text-indigo-300 font-bold text-sm transition-colors"
                  >
                    {s.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
