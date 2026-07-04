import { SiteSettings } from "@/types/sanity";
import ContactForm from "./ContactForm";
import { FadeUp } from "./motion/FadeUp";
import { DrawLine } from "./motion/DrawLine";

export default function ContactSection({ settings }: { settings?: SiteSettings }) {
  const email = settings?.email || "NewsLaw1tv@gmail.com";
  const phone = settings?.phone || "";

  return (
    <section id="contact" className="py-24" style={{ background: "var(--color-deepest)" }}>
      <div className="mx-auto max-w-site px-7">
        <FadeUp className="text-center mb-14">
          <DrawLine style={{ margin: "0 auto 10px" }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)" }}>Get In Touch</span>
          <h2 className="mt-3" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#fff" }}>Work With Angela</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "rgba(220,230,236,0.75)", lineHeight: 1.75 }}>
            Ready to elevate your communications? Angela would love to hear about your project, event, or training needs.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <FadeUp className="lg:col-span-3" delay={0.1}>
            <ContactForm />
          </FadeUp>

          <FadeUp className="lg:col-span-2 flex flex-col gap-8" delay={0.2}>
            <div>
              <p className="text-sm font-semibold mb-4" style={{ color: "rgba(220,230,236,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Direct Contact</p>
              <a
                href={`mailto:${email}?subject=Inquiry via AIM Website&body=Hi Angela,%0D%0A%0D%0AI'd like to discuss...`}
                className="flex items-center gap-3 mb-4 group"
              >
                <span className="w-10 h-10 rounded-sm flex items-center justify-center text-sm" style={{ background: "rgba(194,168,120,0.15)", color: "var(--color-gold)" }}>✉</span>
                <span style={{ color: "var(--color-light)", fontSize: "0.95rem" }} className="group-hover:text-(--color-gold) transition-colors">{email}</span>
              </a>
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded-sm flex items-center justify-center text-sm" style={{ background: "rgba(194,168,120,0.15)", color: "var(--color-gold)" }}>☎</span>
                  <span style={{ color: "var(--color-light)", fontSize: "0.95rem" }} className="group-hover:text-(--color-gold) transition-colors">{phone}</span>
                </a>
              )}
            </div>
            {(settings?.instagram || settings?.linkedin || settings?.facebook || settings?.twitter || settings?.youtube) && (
              <div>
                <p className="text-sm font-semibold mb-4" style={{ color: "rgba(220,230,236,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Follow Angela</p>
                <div className="flex gap-3 flex-wrap">
                  {settings?.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded-sm border transition-colors hover:border-(--color-gold) hover:text-(--color-gold)" style={{ borderColor: "rgba(194,168,120,0.3)", color: "var(--color-light)" }}>Instagram</a>}
                  {settings?.linkedin && <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded-sm border transition-colors hover:border-(--color-gold) hover:text-(--color-gold)" style={{ borderColor: "rgba(194,168,120,0.3)", color: "var(--color-light)" }}>LinkedIn</a>}
                  {settings?.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded-sm border transition-colors hover:border-(--color-gold) hover:text-(--color-gold)" style={{ borderColor: "rgba(194,168,120,0.3)", color: "var(--color-light)" }}>Facebook</a>}
                  {settings?.twitter && <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded-sm border transition-colors hover:border-(--color-gold) hover:text-(--color-gold)" style={{ borderColor: "rgba(194,168,120,0.3)", color: "var(--color-light)" }}>X / Twitter</a>}
                  {settings?.youtube && <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded-sm border transition-colors hover:border-(--color-gold) hover:text-(--color-gold)" style={{ borderColor: "rgba(194,168,120,0.3)", color: "var(--color-light)" }}>YouTube</a>}
                </div>
              </div>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
