"use client";

import { useState } from "react";
import Link from "next/link";

export default function BTWCalculatorClient() {
  const [amount, setAmount] = useState<string>("");
  const [rate, setRate] = useState<number>(21);
  const [direction, setDirection] = useState<"excl" | "incl">("excl");

  const numAmount = parseFloat(amount) || 0;

  let exclBTW = 0;
  let btwAmount = 0;
  let inclBTW = 0;

  if (numAmount > 0) {
    if (direction === "excl") {
      exclBTW = numAmount;
      btwAmount = numAmount * (rate / 100);
      inclBTW = numAmount + btwAmount;
    } else {
      inclBTW = numAmount;
      exclBTW = numAmount / (1 + rate / 100);
      btwAmount = inclBTW - exclBTW;
    }
  }

  const fmt = (n: number) =>
    "€ " +
    n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const hasResult = numAmount > 0;

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <Link href="/" className="font-black text-lg tracking-tight">
          The<span className="text-amber-400">ProfitFactory</span>
        </Link>
        <Link
          href="/invoice-generator"
          className="bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors"
        >
          Gratis Factuurmaker →
        </Link>
      </nav>

      <main className="pt-24 pb-16 px-4 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Gratis Tool voor ZZP&apos;ers
          </div>
          <h1 className="text-3xl font-black mb-2">
            BTW <span className="text-amber-400">Calculator</span>
          </h1>
          <p className="text-[#8080a0] text-sm">
            Bereken BTW razendsnel. 6%, 9%, 21%. Excl ↔ Incl.
          </p>
        </div>

        <div className="bg-[#0e0e1a] border border-[#1e1e30] rounded-2xl p-6 space-y-5">
          {/* BTW Rate */}
          <div>
            <label className="block text-xs font-bold text-[#8080a0] uppercase tracking-widest mb-2">
              BTW Tarief
            </label>
            <div className="flex gap-2">
              {[6, 9, 21].map((r) => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-colors ${
                    rate === r
                      ? "bg-blue-600 text-white"
                      : "bg-[#1a1a2a] text-[#8080a0] hover:text-white border border-[#2a2a3a]"
                  }`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          {/* Direction */}
          <div>
            <label className="block text-xs font-bold text-[#8080a0] uppercase tracking-widest mb-2">
              Richting
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setDirection("excl")}
                className={`flex-1 py-2.5 rounded-lg font-bold text-xs transition-colors ${
                  direction === "excl"
                    ? "bg-amber-400 text-black"
                    : "bg-[#1a1a2a] text-[#8080a0] hover:text-white border border-[#2a2a3a]"
                }`}
              >
                Excl → Incl BTW
              </button>
              <button
                onClick={() => setDirection("incl")}
                className={`flex-1 py-2.5 rounded-lg font-bold text-xs transition-colors ${
                  direction === "incl"
                    ? "bg-amber-400 text-black"
                    : "bg-[#1a1a2a] text-[#8080a0] hover:text-white border border-[#2a2a3a]"
                }`}
              >
                Incl → Excl BTW
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-[#8080a0] uppercase tracking-widest mb-2">
              {direction === "excl" ? "Bedrag excl. BTW (€)" : "Bedrag incl. BTW (€)"}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              min="0"
              step="0.01"
              className="w-full bg-[#080810] border border-[#2a2a3a] focus:border-amber-400 rounded-xl px-4 py-3 text-xl font-bold text-white placeholder-[#3a3a5a] outline-none transition-colors"
            />
          </div>

          {/* Results */}
          {hasResult && (
            <div className="bg-[#080810] rounded-xl p-4 space-y-3 border border-[#2a2a3a]">
              <div className="flex justify-between items-center py-2 border-b border-[#1e1e30]">
                <span className="text-[#8080a0] text-sm">Nettobedrag (excl. BTW)</span>
                <span className="font-bold">{fmt(exclBTW)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#1e1e30]">
                <span className="text-[#8080a0] text-sm">BTW bedrag ({rate}%)</span>
                <span className="font-bold">{fmt(btwAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[#8080a0] text-sm font-bold">Totaal incl. BTW</span>
                <span className="text-amber-400 text-xl font-black">{fmt(inclBTW)}</span>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <p className="text-[#8080a0] text-sm mb-3">
            Factuur nodig? Maak gratis een PDF-factuur in 60 seconden.
          </p>
          <Link
            href="/invoice-generator"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Gratis Factuurmaker →
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-10 space-y-4 text-sm text-[#6060a0]">
          <h2 className="text-[#c0c0d0] font-bold text-base">Over de BTW Calculator</h2>
          <p>
            Deze gratis BTW calculator berekent het BTW-bedrag en het totaalbedrag voor de drie
            gangbare BTW-tarieven in Nederland: 6%, 9% en 21%. Je kunt kiezen of je wilt
            berekenen van excl. BTW naar incl. BTW, of andersom.
          </p>
          <p>
            Het 21%-tarief is het standaard BTW-tarief dat van toepassing is op de meeste
            producten en diensten. Het 9%-tarief geldt voor o.a. voedsel, geneesmiddelen en
            boeken. Het 6%-tarief wordt gehanteerd voor bepaalde arbeidsintensieve diensten.
          </p>
        </div>
      </main>
    </div>
  );
}
