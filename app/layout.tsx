import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// Wymuszamy renderowanie po stronie serwera przy każdym żądaniu (SSR),
// zamiast statycznego prerenderowania w czasie budowania.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Codzienna łamigłówka logiczna online",
    template: "%s | Łamigłówka logiczna",
  },
  description:
    "Bezpłatna, codziennie odnawiana łamigłówka logiczna online. Odgadnij ukryty układ symboli w ograniczonej liczbie prób. Graj bez rejestracji, prosto w przeglądarce.",
  applicationName: "Łamigłówka logiczna",
  keywords: [
    "gra logiczna online",
    "łamigłówka dnia",
    "gra przeglądarkowa",
    "gra puzzle online",
    "darmowa gra logiczna",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "Codzienna łamigłówka logiczna online",
    description:
      "Odgadnij ukryty układ symboli w ograniczonej liczbie prób. Nowa łamigłówka każdego dnia, bez rejestracji.",
    url: siteUrl,
    siteName: "Łamigłówka logiczna",
  },
};

export const viewport = {
  themeColor: "#0f0d26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
