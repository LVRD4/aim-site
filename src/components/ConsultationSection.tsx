import Image from "next/image";
import { Service } from "@/types/sanity";
import { urlFor } from "@/sanity/image";
import { FadeUp } from "./motion/FadeUp";
import { ScaleReveal } from "./motion/ScaleReveal";
import { DrawLine } from "./motion/DrawLine";

const FALLBACK_BULLETS = [
  "Communications strategy development",
  "Crisis communications planning and response",
  "Message development and narrative framing",
  "Stakeholder communications",
  "Media relations strategy",
  "Internal communications audits",
];

export default function ConsultationSection({ service }: { service?: Service }) {
  const title = service?.title || "Communications Consultation";
  const intro = service?.detailIntro || "Angela partners with organizations to build communications strategies that align with their goals, values, and audiences. With experience across government, corporate, and nonprofit sectors, she brings a perspective that is both strategic and practical.";
  const bullets = service?.bulletPoints?.length ? service.bulletPoints : FALLBACK_BULLETS;
  const imageUrl = service?.image ? urlFor(service.image).width(700).height(480).url() : null;

  return (
    <section id="consultation" className="py-24" style={{ background: "var(--color-light)" }}>
      <div className="mx-auto max-w-site px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image left — scale reveal */}
          <ScaleReveal className="rounded-sm">
            {imageUrl ? (
              <Image src={imageUrl} alt="Consultation" width={700} height={480} className="w-full object-cover rounded-sm" />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center rounded-sm" style={{ background: "var(--color-white)", border: "1px dashed var(--color-line)" }}>
                <span style={{ color: "var(--color-gray)", fontSize: "0.9rem" }}>Image — add in Sanity Studio</span>
                {/* TODO: licensed asset */}
              </div>
            )}
          </ScaleReveal>

          {/* Text right */}
          <FadeUp delay={0.1}>
            <DrawLine />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)" }}>Consultation</span>
            <h2 className="mt-3 mb-6" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--color-ink)" }}>{title}</h2>
            <p className="mb-6" style={{ color: "var(--color-gray)", lineHeight: 1.75 }}>{intro}</p>
            <ul className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: "var(--color-gold)", marginTop: "2px", flexShrink: 0 }}>◆</span>
                  <span style={{ color: "var(--color-gray)", fontSize: "0.95rem" }}>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 inline-flex px-6 py-3 rounded-sm font-semibold text-sm transition-colors" style={{ background: "var(--color-deep)", color: "#fff" }}>
              Schedule a Consultation
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
