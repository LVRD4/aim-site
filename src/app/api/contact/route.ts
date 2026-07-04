import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { client } from "@/sanity/client";

async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, captchaToken } = await req.json();

    // Verify reCAPTCHA only when secret key is configured (feature enabled)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!captchaToken || !(await verifyCaptcha(captchaToken))) {
        return NextResponse.json({ error: "reCAPTCHA verification failed. Please try again." }, { status: 400 });
      }
    }

    // Basic validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Get recipient from env or Sanity siteSettings
    let recipient = process.env.CONTACT_RECIPIENT_EMAIL;
    if (!recipient) {
      try {
        const settings = await client.fetch(`*[_type == "siteSettings"][0]{ contactRecipient }`);
        recipient = settings?.contactRecipient;
      } catch {
        // fall through
      }
    }
    if (!recipient) {
      return NextResponse.json({ error: "Contact recipient not configured." }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "AIM Website <noreply@angelaingrammedia.com>",
      to: recipient,
      replyTo: email,
      subject: `[AIM Website] ${subject}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Subject:</strong> ${subject}</p><hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
