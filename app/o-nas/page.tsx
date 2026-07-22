import type { Metadata } from "next";
import Image from "next/image";
import bgImage from "@/public/images/tlo-sekcja.png";

export const metadata: Metadata = {
  title: "O projekcie",
  description:
    "Dowiedz się więcej o projekcie codziennej łamigłówki logicznej online — bez rejestracji, bez pobierania, bez zbierania danych osobowych.",
};

export default function ONasPage() {
  return (
    <div className="relative">
      <Image
        src={bgImage}
        alt=""
        fill
        className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-60"
      />
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="mb-6 text-3xl font-bold">O projekcie</h1>
        <div className="flex flex-col gap-5 text-white/75">
          <p>
            Ten serwis udostępnia jedną, prostą łamigłówkę logiczną, odnawianą
            raz dziennie. Projekt powstał z myślą o graczach, którzy cenią
            krótkie, ale wymagające chwile z czystą dedukcją — bez zbędnych
            elementów losowości, bez presji czasu i bez konieczności
            zakładania konta.
          </p>
          <p>
            Rozgrywka odbywa się w całości w przeglądarce. Wynik i seria
            zwycięstw zapisywane są lokalnie na urządzeniu gracza — nie
            wymagamy podawania adresu e-mail, hasła ani żadnych innych danych
            osobowych, aby zagrać.
          </p>
          <p>
            Serwis kierowany jest do graczy w Polsce i dostępny w całości w
            języku polskim. Zależy nam na tym, aby korzystanie z niego było
            przejrzyste, bezpieczne i zgodne z obowiązującymi przepisami oraz
            zasadami reklamodawców, z którymi współpracujemy.
          </p>
          <p>
            Szczegóły dotyczące przetwarzania danych znajdują się w{" "}
            <a href="/polityka-prywatnosci" className="text-accent-cyan hover:underline">
              polityce prywatności
            </a>
            , a zasady korzystania z serwisu opisuje{" "}
            <a href="/regulamin" className="text-accent-cyan hover:underline">
              regulamin
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
