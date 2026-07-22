"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CODE_LENGTH,
  MAX_ATTEMPTS,
  SYMBOLS,
  evaluateGuess,
  getDailyCode,
  getDailyKey,
  isWin,
  type GuessResult,
  type SymbolId,
} from "@/lib/game";
import SymbolIcon from "@/components/SymbolIcon";

interface SavedState {
  key: string;
  history: GuessResult[];
  status: "gra" | "wygrana" | "przegrana";
}

interface StreakState {
  current: number;
  best: number;
  lastWinKey: string | null;
}

const STORAGE_PREFIX = "lamiglowka-stan-";
const STREAK_KEY = "lamiglowka-seria";

function loadState(key: string): SavedState {
  if (typeof window === "undefined") {
    return { key, history: [], status: "gra" };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) return JSON.parse(raw) as SavedState;
  } catch {
    // ignoruj uszkodzone dane
  }
  return { key, history: [], status: "gra" };
}

function loadStreak(): StreakState {
  if (typeof window === "undefined") {
    return { current: 0, best: 0, lastWinKey: null };
  }
  try {
    const raw = window.localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw) as StreakState;
  } catch {
    // ignoruj uszkodzone dane
  }
  return { current: 0, best: 0, lastWinKey: null };
}

function nextResetLabel(): string {
  const now = new Date();
  const tomorrow = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );
  const diffMs = tomorrow.getTime() - now.getTime();
  const h = Math.floor(diffMs / 3600000);
  const m = Math.floor((diffMs % 3600000) / 60000);
  return `${h} godz. ${m} min`;
}

interface LoadedState {
  history: GuessResult[];
  status: "gra" | "wygrana" | "przegrana";
  streak: StreakState;
}

export default function GameBoard() {
  const todayKey = useMemo(() => getDailyKey(), []);
  const code = useMemo(() => getDailyCode(new Date()), []);

  const [loaded, setLoaded] = useState<LoadedState | null>(null);
  const [currentGuess, setCurrentGuess] = useState<(SymbolId | null)[]>(
    new Array(CODE_LENGTH).fill(null),
  );
  const [resetLabel, setResetLabel] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Jednorazowy odczyt stanu z localStorage po hydracji — na serwerze
    // localStorage nie istnieje, więc nie da się tego wyliczyć podczas renderu.
    const saved = loadState(todayKey);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded({ history: saved.history, status: saved.status, streak: loadStreak() });
    setResetLabel(nextResetLabel());
  }, [todayKey]);

  useEffect(() => {
    const interval = setInterval(() => setResetLabel(nextResetLabel()), 60000);
    return () => clearInterval(interval);
  }, []);

  const mounted = loaded !== null;
  const history = loaded?.history ?? [];
  const status = loaded?.status ?? "gra";
  const streak = loaded?.streak ?? { current: 0, best: 0, lastWinKey: null };

  function setHistory(next: GuessResult[]) {
    setLoaded((prev) => (prev ? { ...prev, history: next } : prev));
  }

  function setStatus(next: "gra" | "wygrana" | "przegrana") {
    setLoaded((prev) => (prev ? { ...prev, status: next } : prev));
  }

  function setStreak(next: StreakState | ((prev: StreakState) => StreakState)) {
    setLoaded((prev) => {
      if (!prev) return prev;
      const resolved = typeof next === "function" ? next(prev.streak) : next;
      return { ...prev, streak: resolved };
    });
  }

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(
      STORAGE_PREFIX + todayKey,
      JSON.stringify({ key: todayKey, history: loaded.history, status: loaded.status }),
    );
  }, [loaded, todayKey]);

  function pickSymbol(sym: SymbolId) {
    if (status !== "gra") return;
    setCurrentGuess((prev) => {
      const firstEmpty = prev.findIndex((s) => s === null);
      if (firstEmpty === -1) return prev;
      const next = [...prev];
      next[firstEmpty] = sym;
      return next;
    });
  }

  function clearLast() {
    if (status !== "gra") return;
    setCurrentGuess((prev) => {
      const lastFilled = [...prev].reverse().findIndex((s) => s !== null);
      if (lastFilled === -1) return prev;
      const idx = prev.length - 1 - lastFilled;
      const next = [...prev];
      next[idx] = null;
      return next;
    });
  }

  function submitGuess() {
    if (status !== "gra") return;
    if (currentGuess.some((s) => s === null)) {
      setMessage("Uzupełnij wszystkie pozycje przed zatwierdzeniem.");
      return;
    }
    setMessage(null);
    const guess = currentGuess as SymbolId[];
    const pegs = evaluateGuess(guess, code);
    const newHistory = [...history, { guess, pegs }];
    setHistory(newHistory);
    setCurrentGuess(new Array(CODE_LENGTH).fill(null));

    if (isWin(pegs)) {
      setStatus("wygrana");
      setStreak((prev) => {
        const won = prev.lastWinKey !== todayKey ? prev.current + 1 : prev.current;
        const next = { current: won, best: Math.max(prev.best, won), lastWinKey: todayKey };
        window.localStorage.setItem(STREAK_KEY, JSON.stringify(next));
        return next;
      });
    } else if (newHistory.length >= MAX_ATTEMPTS) {
      setStatus("przegrana");
      setStreak((prev) => {
        const next = { current: 0, best: prev.best, lastWinKey: prev.lastWinKey };
        window.localStorage.setItem(STREAK_KEY, JSON.stringify(next));
        return next;
      });
    }
  }

  if (!mounted) {
    return (
      <div className="card p-8 text-center text-white/60">Wczytywanie łamigłówki dnia…</div>
    );
  }

  const attemptsLeft = MAX_ATTEMPTS - history.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex gap-4">
          <div className="card px-4 py-2">
            <span className="text-white/50">Seria: </span>
            <span className="font-semibold text-accent-cyan">{streak.current}</span>
          </div>
          <div className="card px-4 py-2">
            <span className="text-white/50">Rekord: </span>
            <span className="font-semibold text-accent-amber">{streak.best}</span>
          </div>
        </div>
        <div className="card px-4 py-2 text-white/50">
          Pozostałe próby: <span className="font-semibold text-white">{Math.max(attemptsLeft, 0)}</span>
        </div>
      </div>

      <div className="card flex flex-col gap-3 p-4 sm:p-6">
        {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIdx) => {
          const entry = history[rowIdx];
          return (
            <div key={rowIdx} className="flex justify-center gap-2 sm:gap-3">
              {Array.from({ length: CODE_LENGTH }).map((_, colIdx) => {
                const isCurrentRow = rowIdx === history.length && status === "gra";
                const sym = entry
                  ? entry.guess[colIdx]
                  : isCurrentRow
                    ? currentGuess[colIdx]
                    : null;
                const peg = entry?.pegs[colIdx];
                return (
                  <div
                    key={colIdx}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border sm:h-14 sm:w-14"
                    style={{
                      borderColor:
                        peg === "trafienie"
                          ? "var(--accent-cyan)"
                          : peg === "obecny"
                            ? "var(--accent-amber)"
                            : "var(--border-soft)",
                      background:
                        peg === "trafienie"
                          ? "rgba(86,226,214,0.12)"
                          : peg === "obecny"
                            ? "rgba(240,173,78,0.10)"
                            : "transparent",
                    }}
                  >
                    <SymbolIcon id={sym ?? null} dimmed={peg === "brak"} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {message && <p className="text-center text-sm text-accent-pink">{message}</p>}

      {status === "gra" && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            {SYMBOLS.map((sym) => (
              <button
                key={sym}
                onClick={() => pickSymbol(sym)}
                className="card flex h-14 w-14 items-center justify-center transition hover:brightness-125 active:scale-95"
                aria-label={`Wybierz symbol ${sym}`}
              >
                <SymbolIcon id={sym} />
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearLast}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5"
            >
              Cofnij
            </button>
            <button
              onClick={submitGuess}
              className="rounded-lg bg-accent-violet px-6 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Zatwierdź
            </button>
          </div>
        </div>
      )}

      {status !== "gra" && (
        <div className="card flex flex-col items-center gap-3 p-6 text-center">
          {status === "wygrana" ? (
            <p className="text-lg font-semibold text-accent-cyan">
              Świetnie! Rozwiązano dzisiejszą łamigłówkę w {history.length}{" "}
              {history.length === 1 ? "próbie" : "próbach"}.
            </p>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-semibold text-accent-pink">
                Tym razem się nie udało. Poprawny układ symboli:
              </p>
              <div className="flex gap-2">
                {code.map((s, i) => (
                  <SymbolIcon key={i} id={s} />
                ))}
              </div>
            </div>
          )}
          <p className="text-sm text-white/50">Nowa łamigłówka za: {resetLabel}</p>
        </div>
      )}

      <p className="text-center text-xs text-white/40">
        Legenda: obramowanie w kolorze cyjan oznacza trafienie na właściwej pozycji, bursztynowe —
        właściwy symbol na złej pozycji, szare — symbol nieobecny w kodzie.
      </p>
    </div>
  );
}
