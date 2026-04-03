"use client";

import { useState } from "react";
import Link from "next/link";

export default function UurtariefClient() {
  const [nettoInkomen, setNettoInkomen] = useState<string>("60000");
  const [uren, setUren] = useState<string>("40");
  const [kosten, setKosten] = useState<string>("5000");
  const [vakantie, setVakantie] = useState<string>("4");
  const [btwTarief, setBtwTarief] = useState<number>(21);

  const netto = parseFloat(nettoInkomen) || 0;
  const urenPerWeek = parseFloat(uren) || 40;
  const jaarKosten = parseFloat(kosten) || 0;
  const vakantieWeken = parseFloat(vakantie) || 4;

  // Formula
  const werkweken = 52 - vakantieWeken;
  const totaalUren = werkweken * urenPerWeek;
  const factureerbaar = Math.round(totaalUren * 0.65); // ~65% billable
  const brutoBenodigd = netto / 0.63 + jaarKosten;
  const tariefExcl = factureerbaar > 0 ? brutoBenodigd / factureerbaar : 0;
  const tariefIncl = tariefExcl * (1 + btwTarief / 100);
  const maandomzet = brutoBenodigd / 12;

  const fmt = (n: number) =>
    "€ " + Math.round(n).toLocaleString("nl-NL");
  const fmtHour = (n: number) =>
    "€ " + n.toFixed(0);

  const hasResult = netto > 0 && factureerbaar > 0;

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <Link href="/" className="font-black text-lg tracking-tight">
          The<span className="text-amber-400">ProfitFactory</span>
        </Link>
        <Link
          href="/btw-calculator"
          className="bg-[#1a1a2a] hover:bg-[#2a2a3a] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-[#2a2a3a]"
        >
          BTW Calculator →
        </Link>
      </nav>

      <main className="pt-24 pb-16 px-4 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
            Gratis Tool voor ZZP&apos;ers
          </div>
          <h1 className="text-3xl font-black mb-2">
            Uurtarief <span className="text-amber-400">Calculator</span>
          </h1>
          <p className="text-[#8080a0] text-sm">
            Bereken je minimumtarief op basis van jouw situatie.
          </p>
        </div>

        <div className="bg-[#0e0e1a] border border-[#1e1e30] rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#8080a0] uppercase tracking-widest mb-2">
              Gewenst netto-inkomen per jaar (€)
            </label>
            <input
              type="number"
              value={nettoInkomen}
              onChange={(e) => setNettoInkomen(e.target.value)}
              className="w-full bg-[#080810] border border-[#2a2a3a] focus:border-amber-400 rounded-xl px-4 py-3 text-lg font-bold text-white outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#8080a0] uppercase tracking-widest mb-2">
                Uren/week
              </label>
              <input
                type="number"
                value={uren}
                onChange={(e) => setUren(e.target.value)}
                className="w-full bg-[#080810] border border-[#2a2a3a] focus:border-amber-400 rounded-xl px-4 py-3 font-bold text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#8080a0] uppercase tracking-widest mb-2">
                Vakantieweken
              </label>
              <input
                type="number"
                value={vakantie}
                onChange={(e) => setVakantie(e.target.value)}
                className="w-full bg-[#080810] border border-[#2a2a3a] focus:border-amber-400 rounded-xl px-4 py-3 font-bold text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8080a0] uppercase tracking-widest mb-2">
              Jaarlijkse zakelijke kosten (€)
            </label>
            <input
              type="number"
              value={kosten}
              onChange={(e) => setKosten(e.target.value)}
              className="w-full bg-[#080810] border border-[#2a2a3a] focus:border-amber-400 rounded-xl px-4 py-3 font-bold text-white outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#8080a0] uppercase tracking-widest mb-2">
              BTW Tarief
            </label>
            <div className="flex gap-2">
              {[9, 21].map((r) => (
                <button
                  key={r}
                  onClick={() => setBtwTarief(r)}
                  className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-colors ${
                    btwTarief === r
                      ? "bg-blue-600 text-white"
                      : "bg-[#1a1a2a] text-[#8080a0] hover:text-white border border-[#2a2a3a]"
                  }`}
                >
                  {r}% BTW
                </button>
              ))}
            </div>
          </div>

          {hasResult && (
            <div className="bg-[#080810] rounded-xl p-4 space-y-3 border border-[#2a2a3a]">
              <div className="text-center pb-3 border-b border-[#1e1e30]">
                <p className="text-[#8080a0] text-xs uppercase tracking-widest mb-1">Minimumtarief</p>
                <p className="text-amber-400 text-4xl font-black">{fmtHour(tariefExcl)}<span className="text-lg text-[#8080a0] font-normal">/uur excl. BTW</span></p>
                <p className="text-[#6060a0] text-sm mt-1">{fmtHour(tariefIncl)}/uur incl. {btwTarief}% BTW</p>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#8080a0] text-sm">Benodigde maandomzet</span>
                <span className="font-bold">{fmt(maandomzet)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#8080a0] text-sm">Factureerbare uren/jaar</span>
                <span className="font-bold">{factureerbaar} uur</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#8080a0] text-sm">Bruto inkomen benodigd</span>
                <span className="font-bold">{fmt(brutoBenodigd)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[#8080a0] text-sm mb-3">
            BTW op factuur berekenen?
          </p>
          <Link
            href="/btw-calculator"
            className="inline-block bg-[#1a1a2a] hover:bg-[#2a2a3a] text-white font-bold px-6 py-3 rounded-xl transition-colors border border-[#2a2a3a]"
          >
            BTW Calculator →
          </Link>
        </div>
      </main>
    </div>
  );
}
