import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string" || typeof body.message !== "string") {
    return NextResponse.json({ ok: false, error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const email = body.email.trim();
  const message = body.message.trim();

  if (!email || !message || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Uzupełnij poprawnie formularz." }, { status: 400 });
  }

  // Uwaga dla administratora: podłącz tu docelową usługę wysyłki e-mail
  // (np. Resend/SMTP) przed uruchomieniem kampanii reklamowej.
  console.log("Nowa wiadomość kontaktowa:", { email, message });

  return NextResponse.json({ ok: true });
}
