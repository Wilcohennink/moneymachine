"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BASE_URL = "http://204.168.221.20:3002";

const PRODUCTS = {
  starter: {
    name: "Starter Pack",
    price: "€47",
    emoji: "📦",
    colorClass: "bg-indigo-500 hover:bg-indigo-600",
    badgeClass: "bg-indigo-500 text-white",
    borderClass: "border-indigo-500/30",
    downloadFile: `${BASE_URL}/downloads/starter-pack.html`,
    downloadLabel: "Open Starter Pack (15 Templates)",
    includes: [
      "15 essential business prompt templates",
      "Cold email, sales page, social media & more",
      "Works with ChatGPT, Claude, Gemini — any AI",
    ],
    upsell: {
      label: "Want 32 more templates?",
      text: "Upgrade to the Pro Pack — VSL scripts, webinar outlines, ad copy, case studies, operations playbooks and more.",
      cta: "Upgrade to Pro Pack (€97) →",
      href: "/checkout?product=pro",
      ctaClass: "text-purple-400 hover:text-purple-300",
    },
  },
  pro: {
    name: "Pro Pack",
    price: "€97",
    emoji: "⚡",
    colorClass: "bg-purple-500 hover:bg-purple-600",
    badgeClass: "bg-purple-500 text-white",
    borderClass: "border-purple-500/30",
    downloadFile: `${BASE_URL}/downloads/pro-pack.html`,
    downloadLabel: "Open Pro Pack (47 Templates)",
    includes: [
      "All 47 business prompt templates",
      "Ad copy, VSL scripts, webinar outlines & more",
      "SEO, case studies, hiring, OKRs & operations",
    ],
    upsell: {
      label: "Want automation too?",
      text: "Upgrade to the Complete Pack — adds 12 chatbot scripts and 8 step-by-step automation blueprints.",
      cta: "Upgrade to Complete Pack (€197) →",
      href: "/checkout?product=complete",
      ctaClass: "text-yellow-400 hover:text-yellow-300",
    },
  },
  complete: {
    name: "Complete Pack",
    price: "€197",
    emoji: "🚀",
    colorClass: "bg-yellow-500 hover:bg-yellow-600 text-black",
    badgeClass: "bg-yellow-500 text-black",
    borderClass: "border-yellow-500/30",
    downloadFile: `${BASE_URL}/downloads/complete-pack.html`,
    downloadLabel: "Open Complete Pack (Full System)",
    includes: [
      "All 47 prompt templates (full Pro Pack included)",
      "12 AI chatbot scripts (sales, support, onboarding)",
      "8 business automation blueprints",
    ],
    upsell: null,
  },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const productKey = (searchParams.get("product") ?? "starter") as keyof typeof PRODUCTS;
  const product = PRODUCTS[productKey] ?? PRODUCTS.starter;

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">{product.emoji}</div>
        <h1 className="text-4xl font-black text-green-400 mb-3">
          Payment Confirmed!
        </h1>
        <p className="text-zinc-400 text-base mb-8">
          Your <span className="text-white font-semibold">{product.name}</span> is ready. Click below for instant access.
        </p>

        {/* Download Box */}
        <div className="bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-6 mb-6 text-left">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.badgeClass}`}>
              {product.name}
            </span>
            <span className="text-zinc-400 text-sm">{product.price}</span>
          </div>
          <ul className="space-y-2 mb-5">
            {product.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href={product.downloadFile}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 ${product.colorClass} text-white py-3 rounded-xl font-bold transition-colors w-full`}
          >
            ⬇️ {product.downloadLabel}
          </a>
          <p className="text-zinc-500 text-xs text-center mt-3">
            Opens in your browser · Save as PDF with Ctrl+P (Cmd+P on Mac)
          </p>
        </div>

        {/* Tier Upsell */}
        {product.upsell && (
          <div className="bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-5 mb-6 text-left">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
              {product.upsell.label}
            </p>
            <p className="text-sm text-zinc-300 mb-3">{product.upsell.text}</p>
            <a
              href={product.upsell.href}
              className={`text-sm font-semibold transition-colors ${product.upsell.ctaClass}`}
            >
              {product.upsell.cta}
            </a>
          </div>
        )}

        {/* DFY Upsell */}
        <div className={`bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border ${product.borderClass} rounded-2xl p-7 mb-8`}>
          <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            PREMIUM UPGRADE
          </span>
          <h3 className="text-xl font-black mt-4 mb-2">
            Want us to do it FOR you?
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
            Our team will personally implement AI automation in your business within 5 days — custom chatbots, content pipelines, and lead systems. Guaranteed results or full refund.
          </p>
          <ul className="text-zinc-400 text-sm space-y-1 mb-4 text-left">
            <li>✓ All 47 templates customised for your brand</li>
            <li>✓ Customer service chatbot deployed and live</li>
            <li>✓ 5-day implementation, done for you</li>
            <li>✓ 30-day check-in call included</li>
          </ul>
          <p className="text-indigo-300 font-bold text-lg mb-4">
            €2,997 Done-For-You Setup
          </p>
          <a
            href="mailto:info@theprofitfactory.ai?subject=Done-For-You%20Setup%20After%20Purchase"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Book a Call →
          </a>
          <p className="text-zinc-500 text-xs mt-3">Only 3 spots/month. Zero pressure.</p>
        </div>

        <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#080810] text-[#f0f0ff] flex items-center justify-center">
        <div className="text-zinc-400">Loading your download...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
