export const SYMBOLS = ["kolo", "kwadrat", "trojkat", "krzyz", "szesciokat", "romb"] as const;
export type SymbolId = (typeof SYMBOLS)[number];

export const CODE_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

export type PegResult = "trafienie" | "obecny" | "brak";

export interface GuessResult {
  guess: SymbolId[];
  pegs: PegResult[];
}

/**
 * Deterministyczny generator liczb pseudolosowych (mulberry32),
 * dzięki czemu każdego dnia (wg strefy UTC) wszyscy gracze
 * dostają tę samą łamigłówkę bez potrzeby serwera/bazy danych.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateSeed(date: Date): number {
  const key = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return hash;
}

export function getDailyCode(date: Date = new Date()): SymbolId[] {
  const rand = mulberry32(dateSeed(date));
  const code: SymbolId[] = [];
  for (let i = 0; i < CODE_LENGTH; i++) {
    const idx = Math.floor(rand() * SYMBOLS.length);
    code.push(SYMBOLS[idx]);
  }
  return code;
}

export function getDailyKey(date: Date = new Date()): string {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(
    date.getUTCDate(),
  ).padStart(2, "0")}`;
}

export function evaluateGuess(guess: SymbolId[], code: SymbolId[]): PegResult[] {
  const result: PegResult[] = new Array(code.length).fill("brak");
  const codeRemaining = [...code];
  const guessRemaining: (SymbolId | null)[] = [...guess];

  for (let i = 0; i < code.length; i++) {
    if (guess[i] === code[i]) {
      result[i] = "trafienie";
      codeRemaining[i] = null as unknown as SymbolId;
      guessRemaining[i] = null;
    }
  }

  for (let i = 0; i < code.length; i++) {
    if (guessRemaining[i] === null) continue;
    const idx = codeRemaining.indexOf(guessRemaining[i] as SymbolId);
    if (idx !== -1) {
      result[i] = "obecny";
      codeRemaining[idx] = null as unknown as SymbolId;
    }
  }

  return result;
}

export function isWin(pegs: PegResult[]): boolean {
  return pegs.every((p) => p === "trafienie");
}
