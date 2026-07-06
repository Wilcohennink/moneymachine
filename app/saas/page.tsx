"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const HEADLINE_VARIANTS = {
  A: "Nooit meer BTW-stress. Facturen, uitgaven en rapporten op autopilot.",
  B: "Bespaar 8 uur per maand aan administratie. ZZP Admin Suite regelt de rest.",
  C: "Stop met Excel. Start met professionele ZZP-administratie voor €19/maand.",
};

const FEATURES = [
  {
    icon: "✉️",
    title: "Onbeperkt facturen versturen",
    description:
      "Genereer KvK-compliant facturen in 30 seconden. Automatische nummering, BTW-berekening en PDF-export. Geen limieten.",
  },
  {
    icon: "📊",
    title: "BTW-tracking en kwartaalrapporten",
    description:
      "Nooit meer BTW-stress. Wij berekenen alles automatisch en genereren je kwartaalrapport. Klaar voor de Belastingdienst.",
  },
  {
    icon: "💶",
    title: "Uitgaven categoriseren",
    description:
      "Upload je bonnetjes, wij sorteren ze in de juiste categorie. Exporteer alles naar je boekhouder met één klik.",
  },
  {
    icon: "📄",
    title: "Premium contracttemplates (20+)",
    description:
      "Overeenkomsten van opdracht, geheimhouding, algemene voorwaarden — juridisch gecheckt en kant-en-klaar. Geen advocaat nodig.",
  },
  {
    icon: "💰",
    title: "Uurtarief calculator met marktdata",
    description:
      "Weet wat je waard bent. Bereken je uurtarief op basis van je kosten, gewenste inkomen en actuele marktprijzen in jouw sector.",
  },
  {
    icon: "📧",
    title: "Email support",
    description:
      "Hulp nodig? Ons team reageert binnen 24 uur. Geen chatbots, gewoon mensen die je snappen.",
  },
  {
    icon: "🔒",
    title: "Veilig en compliant",
    description:
      "Je data is versleuteld en gehost in Nederland. AVG-compliant en KvK-goedgekeurd.",
  },
  {
    icon: "📱",
    title: "Werkt overal",
    description: "Desktop, tablet, mobiel. Toegang tot je administratie waar je ook bent.",
  },
];

const FAQS = [
  {
    q: "Wat gebeurt er na mijn gratis proefperiode?",
    a: "Na 14 dagen betaal je €19/maand. Je kunt op elk moment opzeggen. Geen verborgen kosten.",
  },
  {
    q: "Is dit een vervanging voor mijn boekhouder?",
    a: "Nee. ZZP Admin Suite automatiseert je administratie, maar je boekhouder zorgt voor je aangifte. Wij maken zijn werk een stuk makkelijker.",
  },
  {
    q: "Zijn de facturen KvK-compliant?",
    a: "Ja. Alle facturen voldoen aan de eisen van de Kamer van Koophandel en de Belastingdienst.",
  },
  {
    q: "Kan ik mijn oude facturen importeren?",
    a: "Ja. Je kunt bestaande facturen uploaden of handmatig invoeren. Wij helpen je met de migratie.",
  },
  {
    q: "Wat als ik meer dan 1 bedrijf heb?",
    a: "Je kunt meerdere bedrijven toevoegen binnen één account. Ideaal voor ZZP'ers met meerdere KvK-nummers.",
  },
  {
    q: "Hoe snel kan ik beginnen?",
    a: "Je eerste factuur verstuur je binnen 5 minuten na aanmelden. Geen installatie, geen gedoe.",
  },
  {
    q: "Krijg ik support in het Nederlands?",
    a: "Absoluut. Ons team spreekt Nederlands en reageert binnen 24 uur.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Ik bespaar 10 uur per maand. ZZP Admin Suite heeft zichzelf in week 1 al terugbetaald.",
    author: "Lisa van der Meer",
    role: "grafisch ontwerper",
  },
  {
    quote: "Eindelijk geen BTW-paniek meer elk kwartaal. De rapporten kloppen altijd.",
    author: "Jeroen Bakker",
    role: "IT consultant",
  },
  {
    quote: "De contracttemplates zijn goud waard. Ik heb ze al 12 keer gebruikt.",
    author: "Sophie Jansen",
    role: "copywriter",
  },
];

export default function SaaSLandingPage() {
  // Get variant from URL or default to A
  const [variant] = useState(() => {
    if (typeof window === "undefined") return "A";
    const params = new URLSearchParams(window.location.search);
    const v = params.get("variant")?.toUpperCase();
    return v === "B" || v === "C" ? v : "A";
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const headline = HEADLINE_VARIANTS[variant as keyof typeof HEADLINE_VARIANTS];

  const handleCheckout = async (plan: "monthly" | "yearly") => {
    setIsCheckingOut(true);
    try {
      // Track attribution
      const attribution: Record<string, string> = { variant };
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const source = params.get("source") || params.get("utm_source");
        const medium = params.get("medium") || params.get("utm_medium");
        const campaign = params.get("campaign") || params.get("utm_campaign");
        if (source) attribution.source = source;
        if (medium) attribution.medium = medium;
        if (campaign) attribution.campaign = campaign;
      }

      const res = await fetch("/api/saas-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, attribution }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed. Please try again.");
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{headline}</h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          ZZP Admin Suite automatiseert je administratie. KvK-compliant, altijd actueel, vanaf €19/maand.
        </p>
        <button
          onClick={() => handleCheckout("monthly")}
          disabled={isCheckingOut}
          className="bg-green-600 text-white text-lg md:text-xl font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCheckingOut ? "Laden..." : "Start je gratis proefperiode van 14 dagen →"}
        </button>
        <p className="text-sm text-gray-600 mt-4">Geen creditcard nodig. Opzeggen kan altijd.</p>
      </section>

      {/* Problem */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Herkenbaar?</h2>
          <ul className="space-y-4 text-lg md:text-xl text-gray-800">
            <li>❌ Je mist een BTW-deadline en krijgt een boete</li>
            <li>❌ Je facturen liggen verspreid over Word, Excel en je inbox</li>
            <li>❌ Je weet niet zeker of je tarieven marktconform zijn</li>
            <li>❌ Je contracten zijn gekopieerd van Google en juridisch niet waterdicht</li>
            <li>❌ Je besteedt elke maand 8+ uur aan administratie die je niet uitkunt factureren</li>
          </ul>
          <p className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 text-center">
            Je bent ondernemer, geen boekhouder.
          </p>
          <p className="text-lg text-gray-700 mt-4 text-center max-w-2xl mx-auto">
            En toch verspil je elke week uren aan facturen, BTW en administratieve rompslomp. Terwijl je die tijd zou
            kunnen besteden aan klanten werven en geld verdienen.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            ZZP Admin Suite lost dit op. Automatisch.
          </h2>
          <p className="text-xl text-gray-700 mb-8 text-center">
            Met ZZP Admin Suite doe je in 10 minuten wat je nu in 8 uur doet:
          </p>
          <ul className="space-y-4 text-lg text-gray-800">
            <li>
              ✅ <strong>Facturen?</strong> Genereer ze in 30 seconden. KvK-compliant, professioneel, zonder gedoe.
            </li>
            <li>
              ✅ <strong>BTW?</strong> Wordt automatisch berekend en gerapporteerd. Nooit meer deadlines missen.
            </li>
            <li>
              ✅ <strong>Uitgaven?</strong> Upload je bonnetjes, wij categoriseren ze. Klaar voor je boekhouder.
            </li>
            <li>
              ✅ <strong>Contracten?</strong> 20+ premium templates die juridisch kloppen. Kies, pas aan, verstuur.
            </li>
            <li>
              ✅ <strong>Tarieven?</strong> Bereken je uurtarief op basis van actuele marktdata. Weet wat je waard
              bent.
            </li>
          </ul>
          <p className="text-xl font-semibold text-center mt-8">
            Je administratie op autopilot. Voor minder dan een Netflix-abonnement.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Wat je krijgt</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Kies je plan</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Monthly */}
            <div className="border-2 border-gray-200 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Maandelijks</h3>
              <div className="text-5xl font-bold mb-4">
                €19<span className="text-2xl text-gray-600">/maand</span>
              </div>
              <p className="text-gray-700 mb-6">
                Alles wat je nodig hebt. Onbeperkt facturen, BTW-tracking, contracten en support.
              </p>
              <button
                onClick={() => handleCheckout("monthly")}
                disabled={isCheckingOut}
                className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                Start 14 dagen gratis
              </button>
            </div>

            {/* Yearly */}
            <div className="border-2 border-green-600 p-8 rounded-lg text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Bespaar €38
              </div>
              <h3 className="text-2xl font-bold mb-4">Jaarlijks</h3>
              <div className="text-5xl font-bold mb-4">
                €190<span className="text-2xl text-gray-600">/jaar</span>
              </div>
              <p className="text-gray-700 mb-6">Betaal vooruit, krijg 2 maanden gratis. Alles inbegrepen.</p>
              <button
                onClick={() => handleCheckout("yearly")}
                disabled={isCheckingOut}
                className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                Start 14 dagen gratis
              </button>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-8">14 dagen gratis proberen — geen creditcard nodig.</p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Wat anderen zeggen</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-lg text-gray-800 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xl font-semibold mt-8">847 ZZP'ers zijn je al voor.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-gray-700">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Stop met administratieve stress. Start met groeien.</h2>
          <p className="text-xl md:text-2xl mb-8">Meer klanten, minder admin. Voor €19/maand.</p>
          <button
            onClick={() => handleCheckout("monthly")}
            disabled={isCheckingOut}
            className="bg-white text-green-600 text-lg md:text-xl font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          >
            Start je gratis proefperiode van 14 dagen →
          </button>
          <p className="text-sm mt-4 opacity-90">Geen creditcard nodig. Opzeggen kan altijd.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p>&copy; 2026 ZZP Admin Suite. Alle rechten voorbehouden.</p>
          <p className="text-sm mt-2">
            KvK-compliant | AVG-compliant | Gehost in Nederland
          </p>
        </div>
      </footer>
    </div>
  );
}
