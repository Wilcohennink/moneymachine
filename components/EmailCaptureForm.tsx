"use client";

import { useState } from "react";

export default function EmailCaptureForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage-quickstart" }),
      });
      setSubmitted(true);
    } catch {
      // Still show success — don't block UX on email capture failure
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p className="text-green-400 font-semibold text-lg">
        ✓ Check your inbox — guide is on its way!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-3 justify-center"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
        className="flex-1 min-w-[220px] px-5 py-3.5 rounded-xl border border-[#333] bg-[#0a0a14] text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 text-base"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white px-7 py-3.5 rounded-xl font-bold whitespace-nowrap transition-colors"
      >
        {loading ? "Sending…" : "Send Me the Guide →"}
      </button>
      <p className="w-full text-zinc-600 text-xs mt-1">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
