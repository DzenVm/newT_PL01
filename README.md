# Codzienna łamigłówka logiczna (SSR, Next.js)

Serwis z codzienną, przeglądarkową łamigłówką logiczną skierowany do
polskojęzycznych użytkowników. Zbudowany na Next.js (App Router) z
renderowaniem po stronie serwera (SSR) na potrzeby kampanii Google Ads.

## Rozgrywka

Gracz odgaduje ukryty, pięcioelementowy ciąg symboli (spośród sześciu
dostępnych kształtów) w maksymalnie sześciu próbach. Po każdej próbie
otrzymuje podpowiedź o trafieniach na właściwej/niewłaściwej pozycji.
Kod dnia generowany jest deterministycznie na podstawie bieżącej daty
(ten sam dla wszystkich graczy), a postęp i seria zwycięstw zapisywane są
lokalnie w przeglądarce (`localStorage`) — bez rejestracji i bez zbierania
danych osobowych.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Build produkcyjny

```bash
npm run build
npm run start
```

## Struktura

- `app/` — strony (App Router): strona główna, `/gra`, `/jak-grac`, `/o-nas`,
  `/kontakt`, `/regulamin`, `/polityka-prywatnosci`, `sitemap.ts`, `robots.ts`.
- `components/` — komponenty UI, w tym `GameBoard.tsx` (logika rozgrywki,
  komponent kliencki) i `SymbolIcon.tsx`.
- `lib/game.ts` — czysta logika gry (generowanie kodu dnia, ocena próby).
- `public/images/` — proceduralnie wygenerowane grafiki tła/hero (bez
  logotypów i nazw własnych).

## Przed uruchomieniem kampanii reklamowej

- Ustaw zmienną środowiskową `NEXT_PUBLIC_SITE_URL` na docelową domenę
  (używana w metadanych, `sitemap.xml` i `robots.txt`).
- Podłącz realną usługę wysyłki wiadomości w `app/api/contact/route.ts`
  (obecnie formularz kontaktowy tylko loguje zgłoszenie).
- Uzupełnij dane administratora w treści polityki prywatności i regulaminu,
  jeśli wymaga tego jurysdykcja/reklamodawca.
