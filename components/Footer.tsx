import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Wszelkie prawa zastrzeżone.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/regulamin" className="hover:text-white">
            Regulamin
          </Link>
          <Link href="/polityka-prywatnosci" className="hover:text-white">
            Polityka prywatności
          </Link>
          <Link href="/kontakt" className="hover:text-white">
            Kontakt
          </Link>
        </nav>
      </div>
    </footer>
  );
}
