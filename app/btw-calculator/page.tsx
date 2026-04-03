import type { Metadata } from "next";
import BTWCalculatorClient from "./BTWCalculatorClient";

export const metadata: Metadata = {
  title: "Gratis BTW Calculator — 6%, 9%, 21% | The Profit Factory",
  description:
    "Bereken BTW razendsnel. Excl naar incl BTW of incl naar excl. Direct resultaat voor 6%, 9% en 21% BTW-tarief. Gratis voor ZZP'ers.",
  keywords: "BTW calculator, BTW berekenen, BTW excl incl, btw 21%, btw 9%, btw 6%, ZZP BTW",
};

export default function BTWCalculatorPage() {
  return <BTWCalculatorClient />;
}
