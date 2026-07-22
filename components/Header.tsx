import Link from "next/link";

const links = [
  { href: "/", label: "Strona główna" },
  { href: "/jak-grac", label: "Jak grać" },
  { href: "/o-nas", label: "O projekcie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="logo-placeholder" aria-hidden="true" />
          <span className="text-sm font-medium text-white/70">
            Codzienna łamigłówka logiczna
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
