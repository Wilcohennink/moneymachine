import { readSponsors, getSoldCount, getTier } from "@/lib/sponsors";
import SponsorGrid, { type SpotData } from "@/components/SponsorGrid";

export const revalidate = 30; // refresh every 30 seconds

export const metadata = {
  title: "Wall of 1000 Sponsors — Claim Your Permanent Spot",
  description:
    "1,000 permanent sponsor spots. A permanent backlink from a real website. Buy it once — yours forever. Bronze €500 · Silver €750 · Gold €1,000.",
};

function buildSpots(data: ReturnType<typeof readSponsors>): SpotData[] {
  const spots: SpotData[] = [];
  for (let i = 1; i <= 1000; i++) {
    const stored = data.spots[String(i)];
    spots.push({
      spotId: i,
      tier: getTier(i),
      status: stored?.status ?? "available",
      name: stored?.name,
      url: stored?.url,
    });
  }
  return spots;
}

export default function SponsorWallPage() {
  const data = readSponsors();
  const soldCount = getSoldCount(data);
  const spots = buildSpots(data);
  const remaining = 1000 - soldCount;
  const pctFull = Math.round((soldCount / 1000) * 100);

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <a href="/" className="font-black text-lg tracking-tight">
          The<span className="text-amber-400">ProfitFactory</span>
        </a>
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 text-sm hidden sm:block">
            <span className="text-white font-bold">{soldCount}</span>/1,000 spots claimed
          </span>
          <a
            href="#grid"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors"
          >
            Claim Spot →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
          🔥 {remaining} spots remaining — {pctFull}% claimed
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mx-auto mb-6">
          Wall of{" "}
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
            1,000 Sponsors
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          A permanent backlink from a real, indexed website.{" "}
          <strong className="text-zinc-200">Buy it once. Yours forever.</strong>
          {" "}When the wall is full, it&apos;s full — no more spots, ever.
        </p>

        <p className="text-zinc-500 text-sm mb-10">
          Permanent placement · Indexed by Google · SEO value grows as the site ages
        </p>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="h-3 bg-[#1e1e30] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full transition-all"
              style={{ width: `${Math.max(pctFull, 2)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-500 mt-1.5">
            <span>{soldCount} claimed</span>
            <span>{remaining} left</span>
          </div>
        </div>

        {/* Price tiers summary */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {[
            { tier: "Bronze", price: "€500", spots: "800", color: "text-amber-400", border: "border-amber-900/50" },
            { tier: "Silver", price: "€750", spots: "150", color: "text-slate-300", border: "border-slate-700/50" },
            { tier: "Gold", price: "€1,000", spots: "50", color: "text-yellow-400", border: "border-yellow-800/50" },
          ].map((t) => (
            <div
              key={t.tier}
              className={`bg-[#0f0f1a] border ${t.border} rounded-xl px-6 py-3 text-center`}
            >
              <div className={`font-black text-lg ${t.color}`}>{t.price}</div>
              <div className="text-xs text-zinc-500">
                {t.tier} · {t.spots} spots
              </div>
            </div>
          ))}
        </div>

        <a
          href="#grid"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-10 py-5 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
        >
          Claim Your Spot →
        </a>
      </section>

      {/* WHY section */}
      <section className="py-16 px-6 bg-[#0a0a14] border-t border-b border-[#1e1e30]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10">Why claim a spot?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔗",
                title: "Permanent backlink",
                body: "A do-follow backlink from a real, aged domain. Google indexes it. SEO agencies pay €100-500/month for links like this.",
              },
              {
                icon: "♾️",
                title: "Yours forever",
                body: "One-time payment. The spot never expires, never gets removed. As the site grows, your link gains authority.",
              },
              {
                icon: "📣",
                title: "Viral exposure",
                body: "Every buyer shares the wall. 1,000 businesses promoting one page = massive reach. Your brand rides that wave.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-[#080810] border border-[#1e1e30] rounded-2xl p-6"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section id="grid" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              The Wall
            </h2>
            <p className="text-zinc-500 text-sm">
              Click any available spot to claim it. Green = available. Colored = sold.
            </p>
          </div>

          <SponsorGrid spots={spots} soldCount={soldCount} />
        </div>
      </section>

      {/* TIER DETAILS */}
      <section className="py-16 px-6 bg-[#0a0a14] border-t border-b border-[#1e1e30]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10">Tier Details</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: "Bronze",
                price: "€500",
                spots: "800 spots (#1–800)",
                color: "text-amber-400",
                border: "border-amber-900/40",
                features: [
                  "Your company name on the wall",
                  "Permanent do-follow backlink",
                  "Standard-size spot in the grid",
                  "Indexed by search engines",
                ],
              },
              {
                tier: "Silver",
                price: "€750",
                spots: "150 spots (#801–950)",
                color: "text-slate-200",
                border: "border-slate-600/40",
                features: [
                  "Everything in Bronze",
                  "Highlighted spot (stands out)",
                  "Bold display in the grid",
                  "Medium spot size",
                ],
                featured: true,
              },
              {
                tier: "Gold",
                price: "€1,000",
                spots: "50 spots (#951–1000)",
                color: "text-yellow-400",
                border: "border-yellow-800/40",
                features: [
                  "Everything in Silver",
                  "Large featured spot",
                  "Top section of the wall",
                  "Maximum visibility",
                ],
              },
            ].map((t) => (
              <div
                key={t.tier}
                className={`relative bg-[#080810] border ${t.border} rounded-2xl p-7 ${
                  t.featured ? "border-2" : ""
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${t.color}`}>
                  {t.tier}
                </div>
                <div className="text-4xl font-black mb-1">{t.price}</div>
                <div className="text-zinc-500 text-xs mb-6">{t.spots}</div>
                <ul className="space-y-2 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-green-400 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#grid"
                  className="block w-full text-center py-3 rounded-xl font-bold text-sm bg-[#1e1e30] hover:bg-[#2a2a40] text-zinc-200 transition-colors"
                >
                  Pick a {t.tier} spot →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10">FAQ</h2>
          <div className="space-y-0">
            {[
              {
                q: "Is this really permanent?",
                a: "Yes. Once you pay, your spot is locked. We will never remove it, overwrite it, or sell it again. The wall exists as a historical artifact of 1,000 early supporters.",
              },
              {
                q: "How does the backlink work for SEO?",
                a: "Your spot links to your website with a do-follow link. Google crawls and indexes this page, passing link equity to your site. As the page ages and gets more inbound links, the value increases.",
              },
              {
                q: "What happens after I pay?",
                a: "Your spot is marked as claimed instantly. The company name you provide appears on the wall within minutes. If you want to update your details later, email us.",
              },
              {
                q: "Can I choose any spot number?",
                a: "Yes — within the tier you pay for. Bronze spots are #1–800, Silver #801–950, Gold #951–1000. First come, first served.",
              },
              {
                q: "What if the site goes down?",
                a: "We commit to keeping this page live indefinitely. If the domain ever changes, we will redirect it. The wall is our flagship product — we have every incentive to keep it running.",
              },
            ].map((item, i) => (
              <details key={i} className="border-b border-[#1e1e30] py-5 group">
                <summary className="font-bold cursor-pointer flex justify-between items-center gap-4 list-none">
                  {item.q}
                  <span className="text-amber-400 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-zinc-400 mt-3 leading-relaxed text-sm">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 px-6 text-center bg-[#0a0a14] border-t border-[#1e1e30]">
        <div className="max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🔥 Only {remaining} of 1,000 spots left
          </div>
          <h2 className="text-4xl font-black mb-4">
            Your permanent spot on the internet
          </h2>
          <p className="text-zinc-400 mb-8">
            One-time payment. Permanent backlink. Yours forever.
          </p>
          <a
            href="#grid"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-10 py-5 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
          >
            Claim Your Spot — From €500 →
          </a>
          <p className="text-zinc-600 text-sm mt-4">
            🔒 Secure payment via Stripe · Instant confirmation
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-zinc-500 text-sm border-t border-[#1e1e30]">
        <a href="/" className="hover:text-zinc-300 transition-colors">
          The Profit Factory
        </a>
        {" · "}
        <a href="mailto:hello@theprofitfactory.ai" className="hover:text-zinc-300 transition-colors">
          Contact
        </a>
      </footer>
    </div>
  );
}
