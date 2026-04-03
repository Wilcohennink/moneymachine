"use client";

import Link from "next/link";
import { useState } from "react";

interface LineItem {
  description: string;
  qty: string;
  rate: string;
}

function formatCurrency(val: number) {
  return val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvoiceGenerator() {
  const [from, setFrom] = useState({ name: "", email: "", address: "" });
  const [to, setTo] = useState({ name: "", email: "", address: "" });
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { description: "", qty: "1", rate: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [taxRate, setTaxRate] = useState("0");
  const [currency, setCurrency] = useState("€");
  const [preview, setPreview] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const q = parseFloat(item.qty) || 0;
    const r = parseFloat(item.rate) || 0;
    return sum + q * r;
  }, 0);
  const taxAmount = subtotal * (parseFloat(taxRate) / 100 || 0);
  const total = subtotal + taxAmount;

  const addItem = () =>
    setItems((prev) => [...prev, { description: "", qty: "1", rate: "" }]);
  const removeItem = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof LineItem, value: string) =>
    setItems((prev) =>
      prev.map((item, idx) => (idx === i ? { ...item, [field]: value } : item))
    );

  const inputCls =
    "bg-[#0d0d1a] border border-[#2e2e45] rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 w-full";
  const labelCls = "block text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-wide";

  if (preview) {
    return (
      <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
          <Link href="/" className="font-black text-lg tracking-tight">
            The<span className="text-amber-400">ProfitFactory</span>
          </Link>
          <button
            onClick={() => setPreview(false)}
            className="bg-[#1e1e30] hover:bg-[#28283c] border border-[#2e2e45] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            ← Edit Invoice
          </button>
        </nav>
        <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
          <div className="bg-white text-black rounded-2xl p-10 shadow-2xl print:shadow-none">
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="text-2xl font-black text-gray-900">INVOICE</div>
                <div className="text-gray-500 text-sm mt-1">#{invoiceNumber}</div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>Date: {date}</div>
                {dueDate && <div>Due: {dueDate}</div>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="text-xs uppercase font-bold text-gray-400 mb-1">From</div>
                <div className="font-bold text-gray-900">{from.name || "Your Name"}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{from.email}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{from.address}</div>
              </div>
              <div>
                <div className="text-xs uppercase font-bold text-gray-400 mb-1">Bill To</div>
                <div className="font-bold text-gray-900">{to.name || "Client Name"}</div>
                <div className="text-sm text-gray-600">{to.email}</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{to.address}</div>
              </div>
            </div>
            <table className="w-full text-sm mb-8">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 font-bold text-gray-700">Description</th>
                  <th className="text-right py-2 font-bold text-gray-700 w-16">Qty</th>
                  <th className="text-right py-2 font-bold text-gray-700 w-24">Rate</th>
                  <th className="text-right py-2 font-bold text-gray-700 w-24">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 text-gray-800">{item.description || "—"}</td>
                    <td className="py-2 text-right text-gray-700">{item.qty}</td>
                    <td className="py-2 text-right text-gray-700">
                      {currency}{formatCurrency(parseFloat(item.rate) || 0)}
                    </td>
                    <td className="py-2 text-right text-gray-800 font-medium">
                      {currency}{formatCurrency((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mb-8">
              <div className="w-60">
                <div className="flex justify-between py-1 text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{currency}{formatCurrency(subtotal)}</span>
                </div>
                {parseFloat(taxRate) > 0 && (
                  <div className="flex justify-between py-1 text-sm text-gray-600">
                    <span>Tax ({taxRate}%)</span>
                    <span>{currency}{formatCurrency(taxAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-t-2 border-gray-900 font-black text-gray-900 mt-1">
                  <span>Total Due</span>
                  <span>{currency}{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
            {notes && (
              <div className="border-t border-gray-200 pt-4">
                <div className="text-xs uppercase font-bold text-gray-400 mb-1">Notes</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{notes}</div>
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={() => window.print()}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-colors"
            >
              Print / Save as PDF
            </button>
            <button
              onClick={() => setPreview(false)}
              className="bg-[#1e1e30] hover:bg-[#28283c] border border-[#2e2e45] text-white px-8 py-3 rounded-xl font-bold transition-colors"
            >
              Edit Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080810] text-[#f0f0ff] font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#080810]/90 backdrop-blur border-b border-[#1e1e30]">
        <Link href="/" className="font-black text-lg tracking-tight">
          The<span className="text-amber-400">ProfitFactory</span>
        </Link>
        <Link
          href="/free-invoice-templates"
          className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
        >
          Free Templates →
        </Link>
      </nav>

      {/* HEADER */}
      <section className="pt-32 pb-10 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
          📄 Free Invoice Generator — No signup required
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Create a Free Invoice
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Fill in your details below, preview your invoice, then print or save
          as PDF. Free forever.
        </p>
      </section>

      {/* FORM */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="bg-[#0d0d1a] border border-[#1e1e30] rounded-2xl p-6 md:p-8 space-y-8">

          {/* Invoice Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className={labelCls}>Invoice #</label>
              <input className={inputCls} value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Currency</label>
              <select
                className={inputCls}
                value={currency}
                onChange={e => setCurrency(e.target.value)}
              >
                {["€", "$", "£", "¥", "CHF", "A$"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Invoice Date</label>
              <input type="date" className={inputCls} value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Due Date</label>
              <input type="date" className={inputCls} value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
          </div>

          {/* From / To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-sm font-bold text-indigo-400 uppercase tracking-wide">From (You)</div>
              <div>
                <label className={labelCls}>Name / Business</label>
                <input className={inputCls} placeholder="Your Name" value={from.name} onChange={e => setFrom(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input className={inputCls} placeholder="you@email.com" value={from.email} onChange={e => setFrom(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls}>Address</label>
                <textarea className={`${inputCls} resize-none`} rows={2} placeholder="123 Street, City" value={from.address} onChange={e => setFrom(f => ({ ...f, address: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-bold text-purple-400 uppercase tracking-wide">Bill To (Client)</div>
              <div>
                <label className={labelCls}>Client Name / Company</label>
                <input className={inputCls} placeholder="Client Name" value={to.name} onChange={e => setTo(t => ({ ...t, name: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls}>Client Email</label>
                <input className={inputCls} placeholder="client@email.com" value={to.email} onChange={e => setTo(t => ({ ...t, email: e.target.value }))} />
              </div>
              <div>
                <label className={labelCls}>Client Address</label>
                <textarea className={`${inputCls} resize-none`} rows={2} placeholder="123 Street, City" value={to.address} onChange={e => setTo(t => ({ ...t, address: e.target.value }))} />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="text-sm font-bold text-white mb-3">Line Items</div>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <input className={inputCls} placeholder="Description of service or product" value={item.description} onChange={e => updateItem(i, "description", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <input className={inputCls} placeholder="Qty" type="number" min="0" step="any" value={item.qty} onChange={e => updateItem(i, "qty", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <input className={inputCls} placeholder="Rate" type="number" min="0" step="any" value={item.rate} onChange={e => updateItem(i, "rate", e.target.value)} />
                  </div>
                  <div className="col-span-1 text-right text-sm text-zinc-400 tabular-nums">
                    {currency}{formatCurrency((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0))}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {items.length > 1 && (
                      <button onClick={() => removeItem(i)} className="text-zinc-500 hover:text-red-400 transition-colors text-lg leading-none">×</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addItem} className="mt-3 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors">
              + Add line item
            </button>
          </div>

          {/* Totals + Tax */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
            <div className="sm:w-1/2">
              <label className={labelCls}>Notes / Payment Terms</label>
              <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Bank details, payment terms, thank you note..." value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <div className="sm:w-56">
              <div className="space-y-2">
                <div>
                  <label className={labelCls}>Tax Rate (%)</label>
                  <input className={inputCls} type="number" min="0" max="100" step="any" placeholder="0" value={taxRate} onChange={e => setTaxRate(e.target.value)} />
                </div>
                <div className="bg-[#1e1e30] rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>{currency}{formatCurrency(subtotal)}</span>
                  </div>
                  {parseFloat(taxRate) > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Tax ({taxRate}%)</span>
                      <span>{currency}{formatCurrency(taxAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-white text-base border-t border-[#2e2e45] pt-2 mt-2">
                    <span>Total</span>
                    <span>{currency}{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Button */}
          <button
            onClick={() => setPreview(true)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl font-black text-lg transition-all hover:-translate-y-0.5"
          >
            Preview & Download Invoice →
          </button>
        </div>

        {/* Upsell */}
        <div className="mt-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
          <div className="text-amber-400 font-black text-lg mb-2">⚡ InvoiceQuick — €59 Lifetime Deal</div>
          <p className="text-zinc-400 text-sm mb-4">
            Save your client details, auto-number invoices, send by email, and track payment status. One payment, yours forever.
          </p>
          <Link
            href="/#invoicequick"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-lg font-black text-sm transition-colors"
          >
            Get InvoiceQuick →
          </Link>
        </div>
      </div>
    </div>
  );
}
