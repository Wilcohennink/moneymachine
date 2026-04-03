import type { Metadata } from "next";
import UurtariefClient from "./UurtariefClient";

export const metadata: Metadata = {
  title: "Uurtarief Calculator ZZP — Bereken Je Minimumtarief 2026",
  description:
    "Bereken je minimale uurtarief als ZZP'er op basis van gewenst inkomen, kosten en factureerbare uren. Gratis en direct resultaat.",
  keywords: "uurtarief calculator ZZP, uurtarief berekenen freelancer, minimumtarief ZZP 2026, uurtarief berekenen",
};

export default function UurtariefPage() {
  return <UurtariefClient />;
}
