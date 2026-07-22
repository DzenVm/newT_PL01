import type { Metadata } from "next";
import Link from "next/link";
import SymbolIcon from "@/components/SymbolIcon";
import { SYMBOLS } from "@/lib/game";

export const metadata: Metadata = {
  title: "Jak grać — zasady łamigłówki",
  description:
    "Poznaj zasady codziennej łamigłówki logicznej: cel gry, liczbę prób, znaczenie podpowiedzi i sposób liczenia serii.",
};

const steps = [
  {
    title: "Cel gry",
    text: "Odgadnij ukryty, pięcioelementowy ciąg symboli. Każdego dnia obowiązuje jeden, wspólny dla wszystkich układ.",
  },
  {
    title: "Wybór symboli",
    text: "Dostępnych jest sześć kształtów. Ten sam symbol może pojawić się w ukrytym układzie więcej niż raz.",
  },
  {
    title: "Liczba prób",
    text: "Masz sześć prób na odgadnięcie całego układu. Po każdej próbie widzisz szczegółową podpowiedź.",
  },
  {
    title: "Odczytywanie podpowiedzi",
    text: "Obramowanie w kolorze cyjan oznacza trafienie na właściwej pozycji. Bursztynowe obramowanie oznacza właściwy symbol na złej pozycji. Szare, przygaszone symbole nie występują w kodzie.",
  },
  {
    title: "Seria zwycięstw",
    text: "Jeśli rozwiążesz łamigłówkę, Twoja seria rośnie o jeden. Seria zapisywana jest lokalnie w Twojej przeglądarce.",
  },
];

export default function JakGracPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="mb-8 text-3xl font-bold">Jak grać</h1>

      <div className="mb-10 flex flex-wrap justify-center gap-4">
        {SYMBOLS.map((s) => (
          <div key={s} className="card flex h-16 w-16 items-center justify-center">
            <SymbolIcon id={s} size={32} />
          </div>
        ))}
      </div>

      <ol className="flex flex-col gap-6">
        {steps.map((step, i) => (
          <li key={step.title} className="card p-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-violet text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h2 className="font-semibold">{step.title}</h2>
            </div>
            <p className="text-white/70">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 text-center">
        <Link
          href="/gra"
          className="inline-block rounded-lg bg-accent-violet px-6 py-3 font-semibold text-white transition hover:brightness-110"
        >
          Przejdź do gry
        </Link>
      </div>
    </div>
  );
}
