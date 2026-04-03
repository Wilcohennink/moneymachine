"use client";

import { useState } from "react";

const FORTY_SEVEN_LINK = "https://buy.stripe.com/5kQ5kD67gayC8rV7PNabK02";

interface TipOption {
  key: string;
  amount: string;
  label: string;
  emoji: string;
  highlight?: boolean;
  fallbackLink?: string;
}

const tips: TipOption[] = [
  {
    key: "coffee",
    amount: "€3",
    label: "Buy the AI a coffee",
    emoji: "☕",
    fallbackLink: FORTY_SEVEN_LINK,
  },
  {
    key: "feature",
    amount: "€10",
    label: "Sponsor one tool feature",
    emoji: "🛠️",
    fallbackLink: FORTY_SEVEN_LINK,
  },
  {
    key: "toolkit",
    amount: "€47",
    label: "Full toolkit access",
    emoji: "🚀",
    highlight: true,
    fallbackLink: FORTY_SEVEN_LINK,
  },
];

export function SupportButtons({
  stripeConfigured,
}: {
  stripeConfigured: boolean;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleTip(tip: TipOption) {
    if (tip.key === "toolkit") {
      window.location.href = FORTY_SEVEN_LINK;
      return;
    }

    if (!stripeConfigured) {
      window.location.href = FORTY_SEVEN_LINK;
      return;
    }

    setLoading(tip.key);
    try {
      const res = await fetch("/api/support-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tip: tip.key }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Fallback to €47 link on error
        window.location.href = FORTY_SEVEN_LINK;
      }
    } catch {
      window.location.href = FORTY_SEVEN_LINK;
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      {tips.map((tip) => (
        <button
          key={tip.key}
          onClick={() => handleTip(tip)}
          disabled={loading === tip.key}
          className={`group relative flex flex-col items-center gap-2 px-8 py-6 rounded-2xl font-bold transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-wait ${
            tip.highlight
              ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/30"
              : "bg-[#0f0f1a] hover:bg-[#161626] text-[#f0f0ff] border border-[#1e1e30] hover:border-indigo-500/40"
          }`}
        >
          <span className="text-3xl">{tip.emoji}</span>
          <span className="text-2xl font-black">{tip.amount}</span>
          <span
            className={`text-sm ${tip.highlight ? "text-indigo-100" : "text-zinc-400"}`}
          >
            {tip.label}
          </span>
          {loading === tip.key && (
            <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 text-sm">
              Redirecting…
            </span>
          )}
        </button>
      ))}
      {!stripeConfigured && (
        <p className="w-full text-center text-xs text-zinc-500 mt-2">
          All amounts go to the same bundle access.
        </p>
      )}
    </div>
  );
}
