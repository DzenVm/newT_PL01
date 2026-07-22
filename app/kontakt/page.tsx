import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z zespołem serwisu w sprawie pytań, uwag lub zgłoszeń.",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-14">
      <h1 className="mb-4 text-3xl font-bold">Kontakt</h1>
      <p className="mb-8 text-white/70">
        Masz pytanie dotyczące działania łamigłówki, znalazłeś błąd albo chcesz
        zgłosić uwagę? Napisz do nas poniżej — odpowiadamy na wszystkie
        wiadomości.
      </p>
      <ContactForm />
    </div>
  );
}
