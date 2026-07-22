import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/images/hero-kod-umyslu.png";
import mechanicImage from "@/public/images/mechanika-siatka.png";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-white/10">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-90"
        />
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-20 sm:py-28">
          <p className="w-fit rounded-full border border-white/15 bg-black/20 px-4 py-1 text-xs uppercase tracking-wide text-accent-cyan">
            Nowa łamigłówka każdego dnia
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Codzienna łamigłówka logiczna — odgadnij ukryty układ symboli
          </h1>
          <p className="max-w-xl text-lg text-white/70">
            Prosta zasada, głęboka strategia. Masz ograniczoną liczbę prób, aby
            metodą dedukcji odgadnąć sekwencję pięciu symboli. Gra działa
            całkowicie w przeglądarce — bez pobierania, bez rejestracji, bez
            danych osobowych.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/gra"
              className="rounded-lg bg-accent-violet px-6 py-3 font-semibold text-white transition hover:brightness-110"
            >
              Zagraj teraz
            </Link>
            <Link
              href="/jak-grac"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white/80 transition hover:bg-white/5"
            >
              Zobacz zasady
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2 sm:items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Jak wygląda rozgrywka?</h2>
          <p className="text-white/70">
            Każdego dnia generowany jest jeden, taki sam dla wszystkich
            graczy, ukryty ciąg pięciu symboli spośród sześciu dostępnych
            kształtów. Po każdej próbie otrzymujesz podpowiedź: które symbole
            trafiły na właściwą pozycję, które są w kodzie, ale w złym
            miejscu, a które w ogóle nie występują.
          </p>
          <p className="text-white/70">
            Masz sześć prób, aby dojść do rozwiązania. Twoja seria zwycięstw
            zapisywana jest lokalnie w przeglądarce — bez konta i bez
            logowania.
          </p>
          <Link href="/jak-grac" className="text-accent-cyan hover:underline">
            Pełne zasady gry →
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={mechanicImage}
            alt="Poglądowa siatka mechaniki łamigłówki z kolorowymi symbolami"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-20 sm:grid-cols-3">
        {[
          {
            title: "Bez rejestracji",
            text: "Grasz od razu w przeglądarce. Postęp zapisywany jest lokalnie na Twoim urządzeniu.",
          },
          {
            title: "Jedna łamigłówka dziennie",
            text: "Wszyscy gracze mierzą się z tym samym wyzwaniem tego samego dnia.",
          },
          {
            title: "Czysta logika",
            text: "Żadnych elementów losowych w trakcie rozgrywki — liczy się wyłącznie dedukcja.",
          },
        ].map((item) => (
          <div key={item.title} className="card p-6">
            <h3 className="mb-2 font-semibold text-accent-amber">{item.title}</h3>
            <p className="text-sm text-white/60">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
