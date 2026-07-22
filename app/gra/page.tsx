import type { Metadata } from "next";
import GameBoard from "@/components/GameBoard";

export const metadata: Metadata = {
  title: "Zagraj — codzienna łamigłówka logiczna",
  description:
    "Zagraj w dzisiejszą łamigłówkę logiczną online. Odgadnij ukryty układ pięciu symboli w sześciu próbach.",
};

export default function GraPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Dzisiejsza łamigłówka
      </h1>
      <GameBoard />
    </div>
  );
}
