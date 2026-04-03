"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";

type QRType = "url" | "text" | "email" | "phone" | "wifi";

interface WifiConfig {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
}

function buildQRContent(type: QRType, value: string, wifi: WifiConfig): string {
  switch (type) {
    case "url":
      return value.startsWith("http") ? value : `https://${value}`;
    case "email":
      return `mailto:${value}`;
    case "phone":
      return `tel:${value}`;
    case "wifi":
      return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};;`;
    default:
      return value;
  }
}

export default function QRCodeGenerator() {
  const [type, setType] = useState<QRType>("url");
  const [value, setValue] = useState("https://");
  const [wifi, setWifi] = useState<WifiConfig>({ ssid: "", password: "", encryption: "WPA" });
  const [size, setSize] = useState(256);
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrSvg, setQrSvg] = useState<string>("");
  const [showUpsell, setShowUpsell] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const content = buildQRContent(type, value, wifi);

  const generateQR = useCallback(async () => {
    if (!content || content.length < 2) return;
    try {
      const dataUrl = await QRCode.toDataURL(content, {
        width: size,
        margin: 2,
        color: { dark: fg, light: bg },
      });
      setQrDataUrl(dataUrl);
      const svg = await QRCode.toString(content, {
        type: "svg",
        width: size,
        margin: 2,
        color: { dark: fg, light: bg },
      });
      setQrSvg(svg);
    } catch {
      // invalid input, skip
    }
  }, [content, size, fg, bg]);

  useEffect(() => {
    generateQR();
  }, [generateQR]);

  const downloadPNG = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qrcode.png";
    a.click();
    const next = downloadCount + 1;
    setDownloadCount(next);
    if (next === 1) setShowUpsell(true);
  };

  const downloadSVG = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.svg";
    a.click();
    URL.revokeObjectURL(url);
    const next = downloadCount + 1;
    setDownloadCount(next);
    if (next === 1) setShowUpsell(true);
  };

  const tabs: { id: QRType; label: string; placeholder: string }[] = [
    { id: "url", label: "URL", placeholder: "https://example.com" },
    { id: "text", label: "Text", placeholder: "Enter any text..." },
    { id: "email", label: "Email", placeholder: "hello@example.com" },
    { id: "phone", label: "Phone", placeholder: "+1 555 000 0000" },
    { id: "wifi", label: "WiFi", placeholder: "" },
  ];

  const inputCls =
    "bg-[#0d0d1a] border border-[#2e2e45] rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 w-full";

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <Link href="/" className="font-black text-lg tracking-tight">
          The<span className="text-amber-400">ProfitFactory</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/invoice-generator"
            className="hidden sm:block text-zinc-400 hover:text-white text-sm font-semibold transition-colors"
          >
            Invoice Generator
          </Link>
          <Link
            href="/hosting"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm transition-colors"
          >
            Hosting Deals →
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            ⚡ Free — No signup required
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Free QR Code Generator
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Create QR codes for URLs, text, email, phone, or WiFi. Customize colors and size. Download as PNG or SVG — free, instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT — Controls */}
          <div className="bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-6 space-y-6">
            {/* Type tabs */}
            <div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-3">QR Type</div>
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setType(t.id);
                      if (t.id !== "wifi") setValue(t.id === "url" ? "https://" : "");
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                      type === t.id
                        ? "bg-indigo-500 text-white"
                        : "bg-[#0d0d1a] border border-[#2e2e45] text-zinc-400 hover:text-white hover:border-indigo-500/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content input */}
            <div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-3">Content</div>
              {type === "wifi" ? (
                <div className="space-y-3">
                  <input
                    className={inputCls}
                    placeholder="Network name (SSID)"
                    value={wifi.ssid}
                    onChange={(e) => setWifi((w) => ({ ...w, ssid: e.target.value }))}
                  />
                  <input
                    className={inputCls}
                    placeholder="Password"
                    type="password"
                    value={wifi.password}
                    onChange={(e) => setWifi((w) => ({ ...w, password: e.target.value }))}
                  />
                  <select
                    className={inputCls}
                    value={wifi.encryption}
                    onChange={(e) => setWifi((w) => ({ ...w, encryption: e.target.value as WifiConfig["encryption"] }))}
                  >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">No Password</option>
                  </select>
                </div>
              ) : (
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder={tabs.find((t) => t.id === type)?.placeholder}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
            </div>

            {/* Customization */}
            <div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-3">Customize</div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-300 mb-2 block">
                    Size: <span className="text-white font-bold">{size}×{size}px</span>
                  </label>
                  <input
                    type="range"
                    min={128}
                    max={512}
                    step={32}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-zinc-500 mt-1">
                    <span>128px</span><span>512px</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-zinc-300 mb-2 block">Foreground</label>
                    <div className="flex items-center gap-2 bg-[#0d0d1a] border border-[#2e2e45] rounded-lg px-3 py-2">
                      <input
                        type="color"
                        value={fg}
                        onChange={(e) => setFg(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                      />
                      <span className="text-sm font-mono text-zinc-300">{fg}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-zinc-300 mb-2 block">Background</label>
                    <div className="flex items-center gap-2 bg-[#0d0d1a] border border-[#2e2e45] rounded-lg px-3 py-2">
                      <input
                        type="color"
                        value={bg}
                        onChange={(e) => setBg(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                      />
                      <span className="text-sm font-mono text-zinc-300">{bg}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Preview + Download */}
          <div className="space-y-4">
            <div className="bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-6 flex flex-col items-center">
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-4 self-start">Preview</div>
              <canvas ref={canvasRef} className="hidden" />
              {qrDataUrl ? (
                <div
                  className="rounded-xl overflow-hidden shadow-2xl shadow-black/50"
                  style={{ background: bg }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrDataUrl}
                    alt="QR Code Preview"
                    width={Math.min(size, 280)}
                    height={Math.min(size, 280)}
                    style={{ display: "block" }}
                  />
                </div>
              ) : (
                <div className="w-[200px] h-[200px] bg-[#0d0d1a] border border-[#2e2e45] rounded-xl flex items-center justify-center text-zinc-500 text-sm">
                  Enter content above
                </div>
              )}
            </div>

            {/* Download buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={downloadPNG}
                disabled={!qrDataUrl}
                className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-black text-sm transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                ↓ Download PNG
              </button>
              <button
                onClick={downloadSVG}
                disabled={!qrSvg}
                className="bg-[#0f0f1a] hover:bg-[#16162a] disabled:opacity-40 disabled:cursor-not-allowed border border-[#2e2e45] hover:border-indigo-500/40 text-white px-6 py-3.5 rounded-xl font-black text-sm transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                ↓ Download SVG
              </button>
            </div>

            {/* Premium teaser */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-5">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-2">Business Toolkit</div>
              <h3 className="font-black text-lg mb-2">Need branded QR codes?</h3>
              <ul className="text-zinc-300 text-sm space-y-1.5 mb-4">
                <li>✦ Logo in center of QR code</li>
                <li>✦ Rounded corners &amp; custom shapes</li>
                <li>✦ Bulk generation (CSV upload)</li>
                <li>✦ Scan analytics &amp; tracking</li>
              </ul>
              <button
                onClick={() => setShowUpsell(true)}
                className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-lg font-black text-sm transition-all hover:-translate-y-0.5 w-full"
              >
                Get Business Toolkit — €47 →
              </button>
            </div>
          </div>
        </div>

        {/* SEO content */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: "⚡", title: "Instant generation", desc: "QR code updates live as you type. No waiting, no server calls." },
            { icon: "🎨", title: "Fully customizable", desc: "Set your brand colors, pick any size from 128px to 512px." },
            { icon: "📥", title: "Free PNG & SVG", desc: "Download in both formats — print-ready SVG or web-ready PNG." },
          ].map((f) => (
            <div key={f.title} className="bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-black text-base mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* More free tools */}
        <div className="mt-12 pt-8 border-t border-[#1e1e30] text-center">
          <div className="text-zinc-400 text-sm mb-4">More free tools:</div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/invoice-generator" className="bg-[#0f0f1a] border border-[#2e2e45] hover:border-indigo-500/40 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
              📄 Free Invoice Generator →
            </Link>
            <Link href="/free-invoice-templates" className="bg-[#0f0f1a] border border-[#2e2e45] hover:border-indigo-500/40 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors">
              📋 Invoice Templates →
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-8 px-6 text-center text-zinc-500 text-sm border-t border-[#1e1e30]">
        © 2026 The Profit Factory ·{" "}
        <a href="mailto:hello@theprofitfactory.ai" className="hover:text-zinc-300 transition-colors">
          Contact
        </a>
      </footer>

      {/* UPSELL MODAL */}
      {showUpsell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0f0f1a] border border-[#2e2e45] rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowUpsell(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors text-xl font-bold"
            >
              ×
            </button>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🚀</div>
              <h2 className="text-2xl font-black mb-2">Need branded QR codes?</h2>
              <p className="text-zinc-400 text-sm">
                Get the Business Toolkit — logo overlays, custom shapes, bulk generation &amp; scan analytics.
              </p>
            </div>
            <div className="bg-[#080810] border border-[#2e2e45] rounded-xl p-4 mb-5 space-y-2">
              {[
                "Logo in center of QR code",
                "Rounded corners & custom shapes",
                "Bulk QR generation (CSV upload)",
                "Scan tracking & analytics",
                "White-label export",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="text-green-400 font-bold">✓</span> {f}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <a
                href="https://theprofitfactory.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-amber-500 hover:bg-amber-400 text-black px-6 py-3.5 rounded-xl font-black text-center transition-all hover:-translate-y-0.5"
              >
                Get Business Toolkit — €47
              </a>
              <a
                href="https://theprofitfactory.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#0d0d1a] border border-[#2e2e45] hover:border-indigo-500/40 text-white px-6 py-3 rounded-xl font-bold text-sm text-center transition-colors"
              >
                QR Code Pro only — €9 one-time
              </a>
              <button
                onClick={() => setShowUpsell(false)}
                className="block w-full text-zinc-500 hover:text-zinc-300 text-sm text-center transition-colors py-1"
              >
                No thanks, keep using free version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
