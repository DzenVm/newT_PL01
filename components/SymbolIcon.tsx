import type { SymbolId } from "@/lib/game";

const COLORS: Record<SymbolId, string> = {
  kolo: "#56e2d6",
  kwadrat: "#f0ad4e",
  trojkat: "#966ef0",
  krzyz: "#e66496",
  szesciokat: "#6ec86e",
  romb: "#5a9ee6",
};

export function symbolColor(id: SymbolId): string {
  return COLORS[id];
}

export default function SymbolIcon({
  id,
  size = 28,
  dimmed = false,
}: {
  id: SymbolId | null;
  size?: number;
  dimmed?: boolean;
}) {
  if (!id) {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="8"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
    );
  }

  const color = dimmed ? "rgba(255,255,255,0.35)" : COLORS[id];
  const stroke = { stroke: color, strokeWidth: 3, fill: "none" } as const;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {id === "kolo" && <circle cx="20" cy="20" r="14" {...stroke} />}
      {id === "kwadrat" && <rect x="7" y="7" width="26" height="26" rx="4" {...stroke} />}
      {id === "trojkat" && <polygon points="20,6 34,32 6,32" {...stroke} strokeLinejoin="round" />}
      {id === "krzyz" && (
        <>
          <line x1="9" y1="9" x2="31" y2="31" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <line x1="31" y1="9" x2="9" y2="31" stroke={color} strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {id === "szesciokat" && (
        <polygon
          points="20,5 33,12.5 33,27.5 20,35 7,27.5 7,12.5"
          {...stroke}
          strokeLinejoin="round"
        />
      )}
      {id === "romb" && <polygon points="20,5 35,20 20,35 5,20" {...stroke} strokeLinejoin="round" />}
    </svg>
  );
}
