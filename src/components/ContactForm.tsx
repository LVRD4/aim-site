"use client";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type FormState = "idle" | "submitting" | "success" | "error";

const CAPTCHA_ENABLED = process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!captchaToken) return;

    setState("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      captchaToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("success");
      } else {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Something went wrong. Please try again or reach out directly.");
        setState("error");
        // Reset reCAPTCHA so user can try again
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } catch {
      setError("Unable to send. Please try reaching Angela directly via email.");
      setState("error");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(194,168,120,0.2)", border: "1px solid rgba(194,168,120,0.4)" }}>
          <span style={{ color: "var(--color-gold)", fontSize: "1.5rem" }}>✓</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#fff" }}>Message Received</h3>
        <p className="mt-3" style={{ color: "rgba(220,230,236,0.8)" }}>Thank you for reaching out. Angela will be in touch soon.</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-sm text-sm bg-transparent border outline-none focus:border-(--color-gold) transition-colors";
  const inputStyle = { borderColor: "rgba(217,217,217,0.25)", color: "var(--color-light)" };
  const busy = state === "submitting";
  const canSubmit = (!CAPTCHA_ENABLED || !!captchaToken) && !busy;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(220,230,236,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Name</label>
          <input name="name" required type="text" placeholder="Your full name" className={inputClass} style={inputStyle} disabled={busy} />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(220,230,236,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Email</label>
          <input name="email" required type="email" placeholder="your@email.com" className={inputClass} style={inputStyle} disabled={busy} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(220,230,236,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Subject</label>
        <input name="subject" required type="text" placeholder="How can Angela help?" className={inputClass} style={inputStyle} disabled={busy} />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(220,230,236,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Message</label>
        <textarea name="message" required rows={5} placeholder="Tell Angela about your project or need…" className={inputClass} style={inputStyle} disabled={busy} />
      </div>

      {/* reCAPTCHA — only rendered when NEXT_PUBLIC_RECAPTCHA_ENABLED=true */}
      {CAPTCHA_ENABLED && (
        <div className="mt-1">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
            theme="dark"
          />
        </div>
      )}

      {state === "error" && <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-1 px-6 py-3.5 rounded-sm font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "var(--color-gold)", color: "var(--color-deepest)" }}
      >
        {busy ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
