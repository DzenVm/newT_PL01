"use client";

import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "wysylanie" | "sukces" | "blad">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("wysylanie");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sukces");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("blad");
    }
  }

  if (status === "sukces") {
    return (
      <div className="card p-6 text-center text-accent-cyan">
        Dziękujemy za wiadomość. Odpowiemy najszybciej, jak to możliwe.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4 p-6">
      <label className="flex flex-col gap-2 text-sm">
        Twój adres e-mail
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-white outline-none focus:border-accent-violet"
          placeholder="ty@przyklad.pl"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Wiadomość
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-white outline-none focus:border-accent-violet"
          placeholder="Opisz swoje pytanie lub uwagę…"
        />
      </label>
      <button
        type="submit"
        disabled={status === "wysylanie"}
        className="rounded-lg bg-accent-violet px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "wysylanie" ? "Wysyłanie…" : "Wyślij wiadomość"}
      </button>
      {status === "blad" && (
        <p className="text-sm text-accent-pink">
          Coś poszło nie tak. Spróbuj ponownie za chwilę.
        </p>
      )}
    </form>
  );
}
