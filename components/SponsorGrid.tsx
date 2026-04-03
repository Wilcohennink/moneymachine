"use client";

import { useState, useCallback } from "react";

export type SpotData = {
  spotId: number;
  tier: "bronze" | "silver" | "gold";
  status: "available" | "sold" | "pending";
  name?: string;
  url?: string;
};

type Props = {
  spots: SpotData[];
  soldCount: number;
};

const TIER_COLORS = {
  bronze: {
    available: "bg-amber-900/30 border-amber-800/40 hover:border-amber-600 hover:bg-amber-800/50 cursor-pointer",
    sold: "bg-amber-700/60 border-amber-600",
    pending: "bg-yellow-900/40 border-yellow-700/50",
    text: "text-amber-400",
    badge: "bg-amber-600",
    accent: "#d97706",
  },
  silver: {
    available: "bg-slate-800/40 border-slate-600/40 hover:border-slate-400 hover:bg-slate-700/50 cursor-pointer",
    sold: "bg-slate-600/60 border-slate-500",
    pending: "bg-yellow-900/40 border-yellow-700/50",
    text: "text-slate-300",
    badge: "bg-slate-500",
    accent: "#94a3b8",
  },
  gold: {
    available: "bg-yellow-900/30 border-yellow-700/40 hover:border-yellow-500 hover:bg-yellow-800/40 cursor-pointer",
    sold: "bg-yellow-600/60 border-yellow-500",
    pending: "bg-yellow-900/40 border-yellow-700/50",
    text: "text-yellow-400",
    badge: "bg-yellow-500",
    accent: "#eab308",
  },
};

const TIER_INFO = {
  bronze: {
    label: "Bronze",
    price: "€500",
    features: ["Permanent link from your spot", "Your company name displayed", "Never expires — yours forever"],
  },
  silver: {
    label: "Silver",
    price: "€750",
    features: ["Everything in Bronze", "Highlighted spot (stands out in grid)", "Bold company name"],
  },
  gold: {
    label: "Gold",
    price: "€1,000",
    features: ["Everything in Silver", "Large featured spot", "Top visibility on the wall"],
  },
};

function Modal({
  spot,
  onClose,
}: {
  spot: SpotData;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const colors = TIER_COLORS[spot.tier];
  const info = TIER_INFO[spot.tier];

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sponsor-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spotId: spot.spotId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#0f0f1a] border border-[#2a2a40] rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span
              className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white mb-2 ${colors.badge}`}
            >
              {info.label}
            </span>
            <h2 className="text-2xl font-black text-white">
              Spot #{spot.spotId}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="text-4xl font-black mb-1" style={{ color: colors.accent }}>
          {info.price}
        </div>
        <p className="text-zinc-500 text-sm mb-6">One-time payment · Yours forever</p>

        <ul className="space-y-2 mb-8">
          {info.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
              <span className="text-green-400 font-bold flex-shrink-0">✓</span>
              {f}
            </li>
          ))}
        </ul>

        {error && (
          <div className="bg-red-900/30 border border-red-700/50 text-red-300 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleBuy}
          disabled={loading}
          className="w-full py-4 rounded-xl font-black text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
          style={{ backgroundColor: colors.accent }}
        >
          {loading ? "Redirecting to checkout…" : `Claim Spot #${spot.spotId} — ${info.price} →`}
        </button>
        <p className="text-zinc-600 text-xs text-center mt-3">
          🔒 Secure checkout via Stripe
        </p>
      </div>
    </div>
  );
}

function SpotCell({ spot, onClick }: { spot: SpotData; onClick: (s: SpotData) => void }) {
  const colors = TIER_COLORS[spot.tier];
  const isAvailable = spot.status === "available";
  const isSold = spot.status === "sold";

  // Gold spots are bigger
  const isGold = spot.tier === "gold";
  const isSilver = spot.tier === "silver";

  const base = `border rounded transition-all text-center flex items-center justify-center overflow-hidden
    ${isGold ? "text-[10px] md:text-xs" : isSilver ? "text-[8px] md:text-[9px]" : "text-[7px] md:text-[8px]"}`;

  const stateClass = isAvailable
    ? colors.available
    : isSold
    ? colors.sold
    : colors.pending;

  return (
    <div
      className={`${base} ${stateClass}`}
      onClick={() => isAvailable && onClick(spot)}
      title={
        isAvailable
          ? `Spot #${spot.spotId} — ${TIER_INFO[spot.tier].label} ${TIER_INFO[spot.tier].price}`
          : isSold
          ? `Spot #${spot.spotId} — ${spot.name ?? "Sold"}`
          : `Spot #${spot.spotId} — Pending`
      }
    >
      {isSold && spot.name ? (
        <span className="font-bold text-white px-0.5 leading-tight truncate w-full text-center">
          {spot.name.length > (isGold ? 12 : isSilver ? 8 : 6)
            ? spot.name.slice(0, isGold ? 12 : isSilver ? 8 : 6) + "…"
            : spot.name}
        </span>
      ) : isAvailable ? (
        <span className="text-zinc-600 font-mono">{spot.spotId}</span>
      ) : (
        <span className="text-yellow-600">…</span>
      )}
    </div>
  );
}

export default function SponsorGrid({ spots, soldCount }: Props) {
  const [selected, setSelected] = useState<SpotData | null>(null);

  const handleClick = useCallback((spot: SpotData) => {
    setSelected(spot);
  }, []);

  const bronze = spots.filter((s) => s.tier === "bronze");
  const silver = spots.filter((s) => s.tier === "silver");
  const gold = spots.filter((s) => s.tier === "gold");

  const bronzeSold = bronze.filter((s) => s.status === "sold").length;
  const silverSold = silver.filter((s) => s.status === "sold").length;
  const goldSold = gold.filter((s) => s.status === "sold").length;

  return (
    <>
      {selected && (
        <Modal spot={selected} onClose={() => setSelected(null)} />
      )}

      {/* Stats */}
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        {[
          { label: "Total Claimed", value: soldCount, total: 1000, color: "text-indigo-400" },
          { label: "Bronze Taken", value: bronzeSold, total: 800, color: "text-amber-400" },
          { label: "Silver Taken", value: silverSold, total: 150, color: "text-slate-300" },
          { label: "Gold Taken", value: goldSold, total: 50, color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className={`text-2xl font-black ${s.color}`}>
              {s.value}/{s.total}
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Gold section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-yellow-900/40" />
          <div className="text-center">
            <span className="text-yellow-400 font-black text-sm uppercase tracking-widest">
              Gold — €1,000
            </span>
            <span className="text-zinc-600 text-xs ml-2">50 spots · Big logo + featured</span>
          </div>
          <div className="h-px flex-1 bg-yellow-900/40" />
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}>
          {gold.map((s) => (
            <div key={s.spotId} className="aspect-[2/1]">
              <SpotCell spot={s} onClick={handleClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Silver section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-slate-800/60" />
          <div className="text-center">
            <span className="text-slate-300 font-black text-sm uppercase tracking-widest">
              Silver — €750
            </span>
            <span className="text-zinc-600 text-xs ml-2">150 spots · Logo + highlight</span>
          </div>
          <div className="h-px flex-1 bg-slate-800/60" />
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}>
          {silver.map((s) => (
            <div key={s.spotId} className="aspect-square">
              <SpotCell spot={s} onClick={handleClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Bronze section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-amber-900/40" />
          <div className="text-center">
            <span className="text-amber-400 font-black text-sm uppercase tracking-widest">
              Bronze — €500
            </span>
            <span className="text-zinc-600 text-xs ml-2">800 spots · Name + permanent backlink</span>
          </div>
          <div className="h-px flex-1 bg-amber-900/40" />
        </div>
        <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(40, minmax(0, 1fr))" }}>
          {bronze.map((s) => (
            <div key={s.spotId} className="aspect-square">
              <SpotCell spot={s} onClick={handleClick} />
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-zinc-600 text-xs mt-4">
        Click any available spot to claim it · Sold spots shown in color
      </p>
    </>
  );
}
