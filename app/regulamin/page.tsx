import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin korzystania z serwisu — zasady, odpowiedzialność i postanowienia końcowe.",
};

export default function RegulaminPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="mb-8 text-3xl font-bold">Regulamin</h1>
      <div className="flex flex-col gap-6 text-white/75">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">1. Postanowienia ogólne</h2>
          <p>
            Niniejszy regulamin określa zasady korzystania z serwisu
            udostępniającego codzienną łamigłówkę logiczną (dalej: „Serwis”).
            Korzystanie z Serwisu oznacza akceptację poniższych zasad.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">2. Charakter usługi</h2>
          <p>
            Serwis udostępnia bezpłatną łamigłówkę logiczną o charakterze
            rozrywkowym. Korzystanie z gry nie wymaga zakładania konta ani
            podawania danych osobowych. Serwis nie oferuje żadnych funkcji
            hazardowych, nie umożliwia obstawiania zakładów ani wygrywania
            realnych pieniędzy lub nagród o wartości majątkowej.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">3. Wymagania techniczne</h2>
          <p>
            Do korzystania z Serwisu wymagane jest urządzenie z dostępem do
            internetu oraz aktualna przeglądarka internetowa obsługująca
            JavaScript i mechanizm lokalnego zapisu danych (localStorage).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">4. Zasady korzystania</h2>
          <p>
            Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie z
            obowiązującym prawem oraz w sposób niezakłócający jego
            funkcjonowania, w tym do niepodejmowania prób nieautoryzowanego
            dostępu do systemów Serwisu.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">5. Odpowiedzialność</h2>
          <p>
            Serwis dokłada starań, aby zapewnić prawidłowe i nieprzerwane
            działanie gry, jednak nie gwarantuje pełnej dostępności i nie
            ponosi odpowiedzialności za przerwy techniczne wynikające z przyczyn
            niezależnych od administratora.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">6. Reklamy</h2>
          <p>
            Serwis może wyświetlać treści reklamowe dostarczane przez
            zewnętrznych partnerów. Zasady przetwarzania danych w związku z
            wyświetlaniem reklam opisane są w{" "}
            <a href="/polityka-prywatnosci" className="text-accent-cyan hover:underline">
              polityce prywatności
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">7. Reklamacje</h2>
          <p>
            Reklamacje dotyczące działania Serwisu można zgłaszać za
            pośrednictwem strony{" "}
            <a href="/kontakt" className="text-accent-cyan hover:underline">
              Kontakt
            </a>
            . Reklamacje rozpatrywane są w terminie 14 dni od dnia zgłoszenia.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">8. Postanowienia końcowe</h2>
          <p>
            Administrator zastrzega sobie prawo do zmiany regulaminu.
            Aktualna wersja regulaminu jest zawsze publikowana pod tym
            adresem. W sprawach nieuregulowanych niniejszym regulaminem
            zastosowanie mają przepisy prawa polskiego.
          </p>
        </section>

        <p className="text-sm text-white/40">Ostatnia aktualizacja: 2026.</p>
      </div>
    </div>
  );
}
