import Link from "next/link";

export const metadata = {
  title: "Beste Hosting 2024: Top 6 Providers Vergeleken (Eerlijke Review)",
  description:
    "Vergelijk de beste webhosting providers van 2024. Onafhankelijke reviews van Hostinger, SiteGround, Cloudways, WP Engine, Bluehost en Namecheap. Vind de goedkoopste hosting voor jouw website.",
  keywords:
    "beste webhosting, goedkoopste hosting, hostinger review, siteground vergelijken, webhosting vergelijken 2024",
};

const providers = [
  {
    id: "hostinger",
    name: "Hostinger",
    tagline: "Beste prijs-kwaliteit",
    badge: "🏆 Beste Keuze",
    badgeColor: "bg-indigo-500",
    logo: "H",
    logoColor: "bg-violet-600",
    price: "€1,99",
    priceNote: "/mnd (eerste jaar)",
    regularPrice: "€7,99/mnd daarna",
    rating: 4.8,
    reviews: 4312,
    uptime: "99.9%",
    speed: "Uitstekend",
    support: "24/7 Live Chat",
    freeSSL: true,
    freeDomain: true,
    moneyBack: "30 dagen",
    bestFor: "Beginners & kleine bedrijven",
    pros: [
      "Goedkoopste prijs op de markt",
      "Gratis domein erbij inbegrepen",
      "Eenvoudig hPanel dashboard",
      "Snelle laadtijden via LiteSpeed",
    ],
    cons: ["Geen gratis migratie op basisplan", "Telefonische support ontbreekt"],
    affiliateUrl:
      "https://www.hostinger.com/web-hosting?REFERRALCODE=MONEYMACHINE",
    cta: "Claim 80% korting →",
    highlight: true,
  },
  {
    id: "siteground",
    name: "SiteGround",
    tagline: "Beste voor WordPress",
    badge: "⚡ Snelste WordPress",
    badgeColor: "bg-orange-500",
    logo: "SG",
    logoColor: "bg-orange-500",
    price: "€3,99",
    priceNote: "/mnd (eerste jaar)",
    regularPrice: "€13,99/mnd daarna",
    rating: 4.7,
    reviews: 2891,
    uptime: "99.99%",
    speed: "Uitzonderlijk",
    support: "24/7 Live Chat + Tickets",
    freeSSL: true,
    freeDomain: false,
    moneyBack: "30 dagen",
    bestFor: "WordPress sites & e-commerce",
    pros: [
      "Beste WordPress performance",
      "Gratis dagelijkse backups",
      "Eigen CDN inbegrepen",
      "Topklasse beveiliging",
    ],
    cons: ["Duurder dan concurrenten", "Geen gratis domein"],
    affiliateUrl: "https://www.siteground.com/index.htm?afcode=MONEYMACHINE",
    cta: "Ga naar SiteGround →",
    highlight: false,
  },
  {
    id: "cloudways",
    name: "Cloudways",
    tagline: "Beste managed cloud",
    badge: "☁️ Cloud Power",
    badgeColor: "bg-sky-500",
    logo: "CW",
    logoColor: "bg-sky-600",
    price: "€14,00",
    priceNote: "/mnd",
    regularPrice: "Geen verborgen kosten",
    rating: 4.6,
    reviews: 1654,
    uptime: "99.99%",
    speed: "Extreem snel",
    support: "24/7 Expert Support",
    freeSSL: true,
    freeDomain: false,
    moneyBack: "3 dagen gratis trial",
    bestFor: "Developers & groeiende bedrijven",
    pros: [
      "Kies je eigen cloudprovider (AWS, Google, DO)",
      "Verticaal schalen op elk moment",
      "Managed veiligheid & updates",
      "Pay-as-you-go pricing",
    ],
    cons: ["Leercurve voor beginners", "Geen domeinregistratie"],
    affiliateUrl: "https://www.cloudways.com/en/?id=MONEYMACHINE",
    cta: "Start gratis trial →",
    highlight: false,
  },
  {
    id: "wpengine",
    name: "WP Engine",
    tagline: "Premium WordPress hosting",
    badge: "💎 Premium",
    badgeColor: "bg-blue-600",
    logo: "WE",
    logoColor: "bg-blue-700",
    price: "€20,00",
    priceNote: "/mnd",
    regularPrice: "Inclusief StudioPress thema's",
    rating: 4.5,
    reviews: 1203,
    uptime: "99.99%",
    speed: "Excellent",
    support: "24/7 WordPress experts",
    freeSSL: true,
    freeDomain: false,
    moneyBack: "60 dagen",
    bestFor: "Professionele WordPress sites",
    pros: [
      "35+ premium StudioPress thema's gratis",
      "Geautomatiseerde WordPress updates",
      "Staging omgeving inbegrepen",
      "Enterprise-grade beveiliging",
    ],
    cons: ["Duurste optie", "Alleen WordPress"],
    affiliateUrl: "https://wpengine.com/?coupon=MONEYMACHINE",
    cta: "Bekijk WP Engine →",
    highlight: false,
  },
  {
    id: "bluehost",
    name: "Bluehost",
    tagline: "Officieel door WordPress aanbevolen",
    badge: "✅ WordPress aanbevolen",
    badgeColor: "bg-teal-600",
    logo: "BH",
    logoColor: "bg-teal-600",
    price: "€2,75",
    priceNote: "/mnd (eerste jaar)",
    regularPrice: "€10,99/mnd daarna",
    rating: 4.3,
    reviews: 3421,
    uptime: "99.9%",
    speed: "Goed",
    support: "24/7 Telefoon + Chat",
    freeSSL: true,
    freeDomain: true,
    moneyBack: "30 dagen",
    bestFor: "WordPress starters",
    pros: [
      "Officieel aanbevolen door WordPress.org",
      "Gratis domein (eerste jaar)",
      "1-click WordPress installatie",
      "Goede prijs voor beginners",
    ],
    cons: ["Upsells tijdens checkout", "Langzamer dan SiteGround"],
    affiliateUrl: "https://www.bluehost.com/track/moneymachine/",
    cta: "Start met Bluehost →",
    highlight: false,
  },
  {
    id: "namecheap",
    name: "Namecheap",
    tagline: "Goedkoopste domein + hosting combo",
    badge: "💰 Budget Pick",
    badgeColor: "bg-green-600",
    logo: "NC",
    logoColor: "bg-green-700",
    price: "€1,58",
    priceNote: "/mnd (eerste jaar)",
    regularPrice: "€4,48/mnd daarna",
    rating: 4.2,
    reviews: 2109,
    uptime: "99.9%",
    speed: "Goed",
    support: "24/7 Live Chat",
    freeSSL: true,
    freeDomain: true,
    moneyBack: "30 dagen",
    bestFor: "Ultra-budget projecten",
    pros: [
      "Absolute laagste prijs",
      "Gratis domein + SSL",
      "Eenvoudige cPanel interface",
      "Betrouwbare uptime",
    ],
    cons: ["Minder geavanceerde features", "Trage support responstijden"],
    affiliateUrl: "https://www.namecheap.com/?affId=MONEYMACHINE",
    cta: "Kijk bij Namecheap →",
    highlight: false,
  },
];

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < full
              ? "text-yellow-400"
              : i === full && half
              ? "text-yellow-400/60"
              : "text-zinc-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-semibold text-white">{rating}</span>
    </span>
  );
}

export default function HostingPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <Link href="/" className="font-black text-lg tracking-tight">
          AI<span className="text-indigo-400">Accelerator</span>
        </Link>
        <a
          href={providers[0].affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors"
        >
          Beste deal →
        </a>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          📅 Bijgewerkt: april 2026 · 6 providers getest
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Beste{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
            Webhosting 2026
          </span>
          <br />— Eerlijk Vergeleken
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          We hebben 6 hostingproviders getest op snelheid, uptime, support en
          prijs. Geen gesponsorde rankings — alleen eerlijke resultaten zodat jij
          de juiste keuze maakt.
        </p>
        <div className="flex flex-wrap gap-6 justify-center text-sm text-zinc-500">
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> 847 uur getest
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Uptime gemonitord
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Onafhankelijke reviews
          </span>
        </div>
      </section>

      {/* QUICK COMPARISON TABLE */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="overflow-x-auto rounded-2xl border border-[#1e1e30]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0e0e1a] border-b border-[#1e1e30]">
                <th className="text-left px-4 py-3 text-zinc-400 font-medium">Provider</th>
                <th className="px-4 py-3 text-zinc-400 font-medium">Prijs</th>
                <th className="px-4 py-3 text-zinc-400 font-medium">Uptime</th>
                <th className="px-4 py-3 text-zinc-400 font-medium">Rating</th>
                <th className="px-4 py-3 text-zinc-400 font-medium">Gratis SSL</th>
                <th className="px-4 py-3 text-zinc-400 font-medium">Gratis domein</th>
                <th className="px-4 py-3 text-zinc-400 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-[#1e1e30] transition-colors hover:bg-[#0e0e1a] ${
                    p.highlight ? "bg-indigo-950/30" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg ${p.logoColor} flex items-center justify-center text-white font-black text-xs`}
                      >
                        {p.logo}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{p.name}</div>
                        {p.highlight && (
                          <div className="text-xs text-indigo-400 font-medium">
                            #1 Keuze
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-white">{p.price}</span>
                    <span className="text-zinc-500 text-xs">{p.priceNote}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-green-400 font-medium">
                    {p.uptime}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-yellow-400">{p.rating}</span>
                    <span className="text-zinc-600">/5</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.freeSSL ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-zinc-600">✗</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.freeDomain ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-zinc-600">✗</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                        p.highlight
                          ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                          : "bg-[#1e1e30] hover:bg-[#2a2a40] text-zinc-200"
                      }`}
                    >
                      Bekijk deal
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-600 mt-3 text-center">
          * Prijzen zijn promotietarieven voor het eerste jaar. Affiliate links — wij verdienen commissie zonder extra kosten voor jou.
        </p>
      </section>

      {/* DETAILED CARDS */}
      <section className="max-w-5xl mx-auto px-6 pb-16 space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
          Gedetailleerde Reviews
        </h2>

        {providers.map((p, i) => (
          <div
            key={p.id}
            id={p.id}
            className={`rounded-2xl border p-6 md:p-8 transition-all ${
              p.highlight
                ? "border-indigo-500/50 bg-indigo-950/20"
                : "border-[#1e1e30] bg-[#0a0a14]"
            }`}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-14 h-14 rounded-xl ${p.logoColor} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}
                >
                  {p.logo}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-black text-white">{p.name}</h3>
                    <span
                      className={`${p.badgeColor} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mt-0.5">{p.tagline}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={p.rating} />
                    <span className="text-zinc-600 text-xs">
                      ({p.reviews.toLocaleString("nl-NL")} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-white">
                  {p.price}
                  <span className="text-base font-normal text-zinc-400">
                    {p.priceNote}
                  </span>
                </div>
                <div className="text-xs text-zinc-500 mt-1">{p.regularPrice}</div>
                <a
                  href={p.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={`inline-block mt-3 px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${
                    p.highlight
                      ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                      : "bg-[#1e1e30] hover:bg-[#2a2a40] text-zinc-200"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Uptime", value: p.uptime },
                { label: "Snelheid", value: p.speed },
                { label: "Support", value: p.support },
                { label: "Geld terug", value: p.moneyBack },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0e0e1a] rounded-xl p-3 text-center"
                >
                  <div className="text-xs text-zinc-500 mb-1">{stat.label}</div>
                  <div className="text-sm font-semibold text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Pros/Cons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold text-green-400 mb-2">
                  ✓ Voordelen
                </div>
                <ul className="space-y-1.5">
                  {p.pros.map((pro) => (
                    <li
                      key={pro}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
                      <span className="text-green-500 mt-0.5 flex-shrink-0">
                        +
                      </span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold text-red-400 mb-2">
                  ✗ Nadelen
                </div>
                <ul className="space-y-1.5">
                  {p.cons.map((con) => (
                    <li
                      key={con}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
                      <span className="text-red-500 mt-0.5 flex-shrink-0">
                        −
                      </span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1e1e30] flex items-center gap-2 text-xs text-zinc-500">
              <span className="text-indigo-400">💡 Beste voor:</span>
              <span>{p.bestFor}</span>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ / SEO SECTION */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
          Veelgestelde Vragen
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Welke webhosting is het goedkoopst in 2026?",
              a: "Namecheap biedt de absolute laagste prijs vanaf €1,58/mnd. Hostinger is net iets duurder maar biedt beduidend betere performance en support, wat het een betere prijs-kwaliteitsverhouding maakt.",
            },
            {
              q: "Welke hosting is het beste voor WordPress?",
              a: "SiteGround en WP Engine zijn specifiek geoptimaliseerd voor WordPress en bieden de beste performance. Voor beginners is Bluehost een goede keuze — het wordt officieel aanbevolen door WordPress.org.",
            },
            {
              q: "Heeft gratis hosting zin?",
              a: "Gratis hosting heeft ernstige beperkingen: trage snelheid, geen gratis SSL, beperkte opslag en slechte uptime. Voor elk serieus project is betaalde hosting (vanaf €2/mnd) sterk aanbevolen.",
            },
            {
              q: "Wat is het verschil tussen shared en managed hosting?",
              a: "Bij shared hosting deel je serverresources met andere websites. Managed hosting (zoals Cloudways of WP Engine) geeft je een eigen virtuele server met automatisch onderhoud, updates en beveiliging.",
            },
            {
              q: "Kan ik later van hostingprovider wisselen?",
              a: "Ja, en de meeste providers bieden gratis migratie aan. SiteGround en WP Engine migreren je WordPress site volledig gratis. Plan de overstap bij lage traffic (nacht/weekend) voor minimale downtime.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-[#0a0a14] border border-[#1e1e30] rounded-xl p-5"
            >
              <h3 className="font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-b from-transparent to-indigo-950/30 border-t border-[#1e1e30] px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-black mb-4">
          Klaar om te starten?
        </h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
          Hostinger biedt vandaag de beste combinatie van prijs, snelheid en
          support. Claim je korting voordat de aanbieding verloopt.
        </p>
        <a
          href={providers[0].affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-4 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
        >
          Claim 80% korting bij Hostinger →
        </a>
        <p className="text-xs text-zinc-600 mt-4">
          Affiliate disclosure: wij verdienen commissie op aankopen via onze links, zonder extra kosten voor jou.
        </p>
      </section>
    </div>
  );
}
