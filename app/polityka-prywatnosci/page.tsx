import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności serwisu — informacje o przetwarzaniu danych osobowych, plikach cookies oraz reklamach.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="mb-8 text-3xl font-bold">Polityka prywatności</h1>
      <div className="flex flex-col gap-6 text-white/75">
        <p>
          Niniejsza polityka prywatności opisuje zasady przetwarzania danych
          użytkowników korzystających z serwisu (dalej: „Serwis”) oraz
          stosowania plików cookies i technologii pokrewnych.
        </p>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych przetwarzanych w związku z
            korzystaniem z Serwisu jest podmiot prowadzący Serwis. Dane
            kontaktowe administratora dostępne są na stronie{" "}
            <a href="/kontakt" className="text-accent-cyan hover:underline">
              Kontakt
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">2. Jakie dane przetwarzamy</h2>
          <p>
            Sam przebieg rozgrywki (wybory symboli, historia prób, seria
            zwycięstw) zapisywany jest wyłącznie lokalnie w przeglądarce
            użytkownika, w pamięci <code>localStorage</code>, i nie jest
            przesyłany na nasze serwery. Jeżeli użytkownik skorzysta z
            formularza kontaktowego, przetwarzamy podany adres e-mail oraz
            treść wiadomości wyłącznie w celu udzielenia odpowiedzi.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">3. Pliki cookies i reklamy</h2>
          <p>
            Serwis może wyświetlać reklamy dostarczane przez zewnętrznych
            partnerów reklamowych, w tym Google. Partnerzy ci mogą stosować
            pliki cookies oraz podobne technologie w celu wyświetlania reklam
            dopasowanych do zainteresowań użytkownika, w oparciu o wcześniejsze
            odwiedziny tego lub innych serwisów. Więcej informacji o tym, jak
            Google wykorzystuje dane w kontekście reklam, znajduje się na
            stronie zasad reklamowych Google.
          </p>
          <p className="mt-2">
            Użytkownik może zarządzać preferencjami dotyczącymi reklam
            spersonalizowanych oraz plikami cookies za pomocą ustawień swojej
            przeglądarki lub odpowiednich narzędzi udostępnianych przez
            dostawców reklam.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">4. Podstawa i cel przetwarzania</h2>
          <p>
            Dane przekazane w formularzu kontaktowym przetwarzane są na
            podstawie prawnie uzasadnionego interesu administratora (udzielenie
            odpowiedzi na zapytanie) zgodnie z art. 6 ust. 1 lit. f RODO.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">5. Prawa użytkownika</h2>
          <p>
            Każdemu użytkownikowi przysługuje prawo dostępu do swoich danych,
            ich sprostowania, usunięcia, ograniczenia przetwarzania,
            przenoszenia oraz wniesienia sprzeciwu wobec przetwarzania, a także
            prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">6. Zmiany polityki prywatności</h2>
          <p>
            Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej
            polityce. Aktualna wersja zawsze dostępna jest pod tym adresem.
          </p>
        </section>

        <p className="text-sm text-white/40">Ostatnia aktualizacja: 2026.</p>
      </div>
    </div>
  );
}
