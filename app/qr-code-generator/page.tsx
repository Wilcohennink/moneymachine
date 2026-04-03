import type { Metadata } from "next";
import QRCodeClient from "./QRCodeClient";

export const metadata: Metadata = {
  title: "Free QR Code Generator — Customize & Download PNG/SVG | The Profit Factory",
  description:
    "Generate free QR codes for URLs, text, email, phone numbers, and WiFi. Customize colors and size. Download as PNG or SVG instantly — no signup required.",
};

export default function QRCodeGeneratorPage() {
  return <QRCodeClient />;
}
