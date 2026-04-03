import Link from "next/link";

export const metadata = {
  title: "Free Invoice Templates (Word, PDF, Excel) — 10 Professional Templates",
  description:
    "Download 10 free invoice templates for freelancers, contractors, consultants, agencies, and more. Word, PDF, and Excel formats. Or create professional invoices instantly with InvoiceQuick.",
  keywords:
    "free invoice template, invoice template word, invoice template pdf, invoice template excel, freelancer invoice, contractor invoice, free invoice download",
};

const templates = [
  {
    emoji: "💻",
    type: "Freelancer Invoice",
    desc: "Clean, minimal invoice for freelance developers, designers, and writers. Includes hourly rate, project summary, and payment terms.",
    formats: ["Word", "PDF", "Excel"],
    color: "indigo",
  },
  {
    emoji: "🔨",
    type: "Contractor Invoice",
    desc: "Professional invoice for contractors and tradespeople. Covers labor, materials, and project milestones with tax breakdown.",
    formats: ["Word", "PDF"],
    color: "orange",
  },
  {
    emoji: "📊",
    type: "Consulting Invoice",
    desc: "Structured template for business consultants and advisors. Itemized by deliverable or hour, with retainer and expense tracking.",
    formats: ["Word", "PDF", "Excel"],
    color: "sky",
  },
  {
    emoji: "🏪",
    type: "Service Business Invoice",
    desc: "Versatile template for service-based businesses — cleaning, maintenance, beauty, fitness, and more. Easy line-item layout.",
    formats: ["Word", "PDF"],
    color: "green",
  },
  {
    emoji: "🎯",
    type: "Agency Invoice",
    desc: "Agency-ready invoice with project code, campaign details, retainer fees, and multi-client support. Professional and polished.",
    formats: ["Word", "PDF", "Excel"],
    color: "purple",
  },
  {
    emoji: "🎨",
    type: "Creative Invoice",
    desc: "Stylish invoice for creative professionals — illustrators, art directors, and brand designers. Includes usage rights section.",
    formats: ["Word", "PDF"],
    color: "pink",
  },
  {
    emoji: "📸",
    type: "Photography Invoice",
    desc: "Purpose-built for photographers. Covers shoot fees, editing, licensing, travel, and equipment with deposit tracking.",
    formats: ["Word", "PDF"],
    color: "amber",
  },
  {
    emoji: "🧠",
    type: "Coaching Invoice",
    desc: "Simple, trust-building invoice for coaches and mentors. Session-based billing, package deals, and discovery call tracking.",
    formats: ["Word", "PDF"],
    color: "teal",
  },
  {
    emoji: "⌨️",
    type: "Software Dev Invoice",
    desc: "Technical invoice for software engineers and agencies. Sprint-based or milestone billing, hourly logging, and stack notes.",
    formats: ["Word", "PDF", "Excel"],
    color: "cyan",
  },
  {
    emoji: "📄",
    type: "General Invoice",
    desc: "Universal template that works for any business or industry. Clean layout with all the fields you need and nothing you don't.",
    formats: ["Word", "PDF", "Excel"],
    color: "zinc",
  },
];

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-300",
  sky: "bg-sky-500/10 border-sky-500/30 text-sky-300",
  green: "bg-green-500/10 border-green-500/30 text-green-300",
  purple: "bg-purple-500/10 border-purple-500/30 text-purple-300",
  pink: "bg-pink-500/10 border-pink-500/30 text-pink-300",
  amber: "bg-amber-500/10 border-amber-500/30 text-amber-300",
  teal: "bg-teal-500/10 border-teal-500/30 text-teal-300",
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  zinc: "bg-zinc-500/10 border-zinc-500/30 text-zinc-300",
};

const faqs = [
  {
    q: "How do I make an invoice?",
    a: "Include your business name and contact info, your client's details, a unique invoice number, the services or products provided with line-item pricing, the total amount due, and your payment terms (e.g. due in 30 days). Use InvoiceQuick to generate one instantly — no design skills needed.",
  },
  {
    q: "What should a professional invoice include?",
    a: "A professional invoice should include: your name/business name, address, and contact info; the client's name and address; invoice number and date; due date; itemised list of services/products; subtotal, taxes, and total; and your preferred payment method.",
  },
  {
    q: "Are these invoice templates free to download?",
    a: "Yes. All 10 templates on this page are free to use for personal or commercial purposes. No credit card required, no email opt-in needed.",
  },
  {
    q: "Can I edit the invoice templates?",
    a: "Yes. Word and Excel templates are fully editable. PDF templates can be edited with Adobe Acrobat or free tools like PDF24. You can also use InvoiceQuick to skip the manual editing and auto-generate a filled, professional invoice in seconds.",
  },
  {
    q: "What is the difference between an invoice and a receipt?",
    a: "An invoice is a payment request sent before or after work is done. A receipt is a confirmation that payment has been received. Invoices are used to request money; receipts prove it was paid.",
  },
  {
    q: "How do freelancers invoice clients?",
    a: "Freelancers send an invoice after completing work (or at agreed milestones). Include your name, the project scope, your rate, the total amount, and your payment details. Tools like InvoiceQuick make this process fast and professional.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FreeInvoiceTemplates() {
  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <Link href="/" className="font-black text-lg tracking-tight">
          The<span className="text-amber-400">ProfitFactory</span>
        </Link>
        <Link
          href="/invoice-generator"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors"
        >
          Create Invoice Free →
        </Link>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          📄 100% Free · No signup required
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          Free Invoice Templates
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
            Word, PDF, Excel
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          10 professional invoice templates for freelancers, contractors,
          agencies, and more. Download free — or create a filled invoice
          instantly with InvoiceQuick.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#templates"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
          >
            Browse Templates ↓
          </a>
          <Link
            href="/invoice-generator"
            className="bg-[#1e1e30] hover:bg-[#28283c] border border-[#2e2e45] text-white px-8 py-4 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
          >
            Create Invoice Now →
          </Link>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className="py-16 px-6 bg-[#0f0f1a] border-t border-[#1e1e30]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight mb-3">
              10 Free Invoice Templates
            </h2>
            <p className="text-zinc-400">
              Choose the template that fits your work. All templates are free to
              download and edit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <div
                key={t.type}
                className="bg-[#0d0d1a] border border-[#1e1e30] rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-500/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl flex-shrink-0 ${colorMap[t.color]}`}
                  >
                    {t.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-snug">{t.type}</h3>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {t.formats.map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-[#1e1e30] text-zinc-400 px-2 py-0.5 rounded-full border border-[#2e2e45]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                  {t.desc}
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/invoice-generator"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold py-2.5 rounded-lg text-center transition-colors"
                  >
                    Use This Template →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPGRADE CTA */}
      <section className="py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ⚡ InvoiceQuick — Lifetime Deal
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Stop editing templates.
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Create invoices automatically.
            </span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            InvoiceQuick generates professional, client-ready invoices in
            seconds. Fill in your details once, send forever. No subscriptions —
            pay once for lifetime access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/invoice-generator"
              className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-4 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
            >
              Create professional invoices automatically →
            </Link>
          </div>
          <p className="text-zinc-500 text-sm mt-4">
            InvoiceQuick €59 one-time · No subscription · Works forever
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-[#0f0f1a] border-t border-[#1e1e30]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black tracking-tight text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-[#0d0d1a] border border-[#1e1e30] rounded-xl p-6"
              >
                <h3 className="font-bold text-base mb-2">{faq.q}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-[#1e1e30] text-center text-zinc-500 text-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link href="/" className="font-bold text-zinc-400 hover:text-white transition-colors">
            ← Back to TheProfitFactory
          </Link>
          <div className="flex gap-6">
            <Link href="/invoice-generator" className="hover:text-white transition-colors">
              Invoice Generator
            </Link>
            <Link href="/hosting" className="hover:text-white transition-colors">
              Hosting Deals
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
