import Link from "next/link";

export const metadata = {
  title: "AI Business Accelerator — Add AI to Your Business in 24 Hours",
  description:
    "Save 15–20 hours per week with AI automation. 47 plug-and-play templates that automate lead gen, customer support, and operations. One-time payment.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <div className="font-black text-lg tracking-tight">
          AI<span className="text-indigo-400">Accelerator</span>
        </div>
        <Link
          href="#pricing"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors"
        >
          Get Started →
        </Link>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          ⚡ Founding Prices — Starting at €47 · Ends April 7
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] max-w-4xl mb-6">
          Add{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
            AI to Your Business
          </span>{" "}
          in 24 Hours
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          You started your business to have freedom — not to spend 10 hours a
          day answering emails, chasing leads, and doing work any AI can do in
          30 seconds. The AI Business Accelerator gives you 47 proven templates
          that automate the parts of your business eating your time.{" "}
          <strong className="text-zinc-200">
            Plug them in today. See results by tomorrow.
          </strong>
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="#pricing"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
          >
            See Pricing — From €47 →
          </Link>
          <Link
            href="#features"
            className="text-zinc-400 hover:text-white px-6 py-4 rounded-xl font-medium transition-colors"
          >
            See what&apos;s included ↓
          </Link>
        </div>
        <div className="flex flex-wrap gap-10 justify-center mt-16 pt-10 border-t border-[#1e1e30] w-full max-w-2xl">
          {[
            ["15–20h", "Saved per week"],
            ["24h", "Time to first results"],
            ["47", "Ready-to-use templates"],
            ["30-day", "Money-back guarantee"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-black text-indigo-400">{num}</div>
              <div className="text-sm text-zinc-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section
        id="features"
        className="py-24 px-6 bg-[#0f0f1a] border-t border-b border-[#1e1e30]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3">
              Why it works
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              AI automation that actually delivers
            </h2>
            <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
              Not theory. Ready-to-deploy templates that save time and generate
              revenue from day one.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: "⚡",
                title: "Automate Lead Follow-Up in 60 Minutes",
                body: "Never lose a prospect to slow response time again. AI handles your entire follow-up sequence automatically.",
              },
              {
                icon: "✍️",
                title: "Proposals, Emails & Reports in Seconds",
                body: "Generate client-ready proposals, outreach emails, and business reports without staring at a blank page.",
              },
              {
                icon: "💬",
                title: "Customer Support on Autopilot",
                body: "Run your customer support, onboarding, and FAQs 24/7 — while you focus on high-value work only you can do.",
              },
              {
                icon: "📋",
                title: "47 Copy-Paste AI Templates",
                body: "Ready immediately, even if you've never used AI tools before. Each template comes with step-by-step instructions.",
              },
              {
                icon: "⏰",
                title: "Save 15–20 Hours Per Week",
                body: "Reinvest that time in growth, clients, or finally taking a day off. Most customers see results within 24 hours.",
              },
              {
                icon: "🔗",
                title: "Works With Your Existing Tools",
                body: "ChatGPT, Claude, or Gemini — free plans work fine. Costs less than €20/month in AI tool fees.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-[#080810] border border-[#1e1e30] rounded-2xl p-7 hover:border-indigo-500/50 transition-colors"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3">
              Results
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              What customers are saying
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "I run a 3-person marketing agency. This thing replaced two weeks of onboarding emails, proposal writing, and follow-up sequences in one afternoon. ROI in the first week.",
                name: "Marcus T.",
                role: "Agency Owner, Amsterdam",
                initial: "M",
              },
              {
                quote:
                  "I was skeptical. I've bought courses before and got nothing. This is different — it's not theory, it's plug-and-play. My lead response time went from 2 days to 4 minutes.",
                name: "Priya S.",
                role: "E-commerce Solopreneur, London",
                initial: "P",
              },
              {
                quote:
                  "I was paying a VA €1,800/month to do tasks I now automate for free. The AI Business Accelerator paid for itself in the first 3 hours.",
                name: "James O.",
                role: "Business Coach, Dublin",
                initial: "J",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-7"
              >
                <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
                <p className="text-zinc-300 italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-zinc-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="py-24 px-6 bg-[#0f0f1a] border-t border-b border-[#1e1e30]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3">
              Pricing
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Pick your level. Pay once. Own it forever.
            </h2>
            <p className="text-zinc-400 mt-3">
              One-time payment. No subscriptions. Instant access.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* STARTER */}
            <CheckoutCard
              product="starter"
              tier="Starter"
              price="47"
              desc="The essentials to start automating today — in under an hour."
              features={[
                "15 copy-paste AI prompt templates",
                "Lead follow-up automation",
                "Email drafting prompts",
                "Quick-start implementation guide",
                "30-day money-back guarantee",
              ]}
              ctaLabel="Get Started — €47 →"
            />
            {/* PRO */}
            <CheckoutCard
              product="pro"
              tier="Pro"
              price="97"
              desc="The complete toolkit. Highest ROI in the first week."
              features={[
                "47 copy-paste AI templates",
                "Full lead gen + follow-up system",
                "Proposal + client email automation",
                "Customer support on autopilot",
                "AI Marketing Playbook",
                "30-Day implementation plan",
                "30-day money-back guarantee",
              ]}
              ctaLabel="Get Pro — €97 →"
              featured
              urgency="⚡ Founding price ends April 7"
            />
            {/* COMPLETE */}
            <CheckoutCard
              product="complete"
              tier="Complete"
              price="197"
              desc="Everything in Pro + advanced systems for agencies."
              features={[
                "Everything in Pro",
                "AI chatbot setup guide",
                "10 email automation sequences",
                "Agency operations playbook",
                "3 custom workflow blueprints",
                "Priority support (60 days)",
                "30-day money-back guarantee",
              ]}
              ctaLabel="Get Complete — €197 →"
            />
          </div>

          {/* DFY upsell */}
          <div className="text-center mt-12 pt-10 border-t border-[#1e1e30]">
            <p className="text-zinc-400 text-sm mb-3">
              Need it done <em>for</em> you?
            </p>
            <a
              href="mailto:hello@aibusinessaccelerator.com?subject=Done-For-You%20Inquiry"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Done-For-You Setup — €2,997 · Book a call →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-3">
              FAQ
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-0">
            {[
              {
                q: "Do I need to be tech-savvy to use this?",
                a: "No. Every template comes with step-by-step instructions. If you can copy and paste, you can use this. We built it for business owners, not engineers.",
              },
              {
                q: "What AI tools do I need?",
                a: "The templates work with ChatGPT (free or paid), Claude, or Gemini. Most workflows cost less than €20/month in AI tool fees — often much less.",
              },
              {
                q: "How fast will I see results?",
                a: "Most customers implement their first automation within 2 hours of purchase and report visible time savings on day one. Full implementation typically takes 24 hours.",
              },
              {
                q: "Is this just a course with videos I'll never watch?",
                a: "No. This is a working toolkit — templates, prompts, and workflows you use immediately. Short implementation guides, not long lectures. Get in, plug it in, get results.",
              },
              {
                q: "What if it doesn't work for my business?",
                a: "We offer a 30-day money-back guarantee. If you implement the templates and don't see results, email us and we refund you in full. No hoops, no questions.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="border-b border-[#1e1e30] py-5 group"
              >
                <summary className="font-bold cursor-pointer flex justify-between items-center gap-4 list-none">
                  {item.q}
                  <span className="text-indigo-400 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-zinc-400 mt-3 leading-relaxed text-sm">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="py-20 px-6 bg-[#0f0f1a] border-t border-b border-[#1e1e30]">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            FREE RESOURCE
          </div>
          <h2 className="text-3xl font-black mb-3">
            Get the Free AI Quickstart Guide
          </h2>
          <p className="text-zinc-400 mb-8">
            10 AI automations you can set up in under 1 hour — delivered
            instantly.
          </p>
          <EmailCaptureForm />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Ready to save 10+ hours every week?
          </h2>
          <p className="text-zinc-400 mb-8">
            One-time investment. Lifetime access. Starting at €47.
          </p>
          <Link
            href="#pricing"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-10 py-5 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
          >
            Get Instant Access →
          </Link>
          <p className="text-zinc-500 text-sm mt-5">
            🔒 30-day money-back guarantee · Secure payment · Instant download
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-zinc-500 text-sm border-t border-[#1e1e30]">
        © 2026 AI Business Accelerator ·{" "}
        <a
          href="mailto:hello@aibusinessaccelerator.com"
          className="hover:text-zinc-300 transition-colors"
        >
          Contact
        </a>
      </footer>
    </div>
  );
}

// ─── Server Component: CheckoutCard ─────────────────────────────────────────

function CheckoutCard({
  product,
  tier,
  price,
  desc,
  features,
  ctaLabel,
  featured,
  urgency,
}: {
  product: string;
  tier: string;
  price: string;
  desc: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  urgency?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl p-7 flex flex-col ${
        featured
          ? "bg-[#080810] border-2 border-indigo-500"
          : "bg-[#080810] border border-[#1e1e30]"
      }`}
    >
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}
      <div className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
        {tier}
      </div>
      <div className="text-5xl font-black mb-1">
        <sup className="text-2xl align-super">€</sup>
        {price}
      </div>
      <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{desc}</p>
      <ul className="space-y-2 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <span className="text-green-400 font-bold flex-shrink-0">✓</span>
            <span className="text-zinc-300">{f}</span>
          </li>
        ))}
      </ul>
      <CheckoutButton product={product} label={ctaLabel} />
      <p className="text-zinc-500 text-xs text-center mt-3">
        🔒 Secure checkout · Instant download
      </p>
      {urgency && (
        <p className="text-yellow-400 text-xs text-center mt-1">{urgency}</p>
      )}
    </div>
  );
}

// ─── Client Components ───────────────────────────────────────────────────────
// These are in separate files to keep this page as a Server Component

import CheckoutButton from "@/components/CheckoutButton";
import EmailCaptureForm from "@/components/EmailCaptureForm";
