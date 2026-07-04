import { Service, TrainingPhoto } from "@/types/sanity";
import TrainingCarousel from "./TrainingCarousel";
import { FadeUp } from "./motion/FadeUp";
import { ScaleReveal } from "./motion/ScaleReveal";
import { DrawLine } from "./motion/DrawLine";

const FALLBACK_BULLETS = [
  "One-on-one and group media training sessions",
  "On-camera coaching for spokespeople and executives",
  "Crisis communications preparation",
  "Message development and bridging techniques",
  "Mock interviews with real-time feedback",
  "Print, digital, and broadcast media preparation",
];

export default function TrainingSection({ service, photos }: { service?: Service; photos: TrainingPhoto[] }) {
  const title = service?.title || "Media Training";
  const intro = service?.detailIntro || "Being media-ready isn't optional — it's essential. Angela's media training programs equip your team with the skills, confidence, and strategies to communicate effectively in any media environment.";
  const bullets = service?.bulletPoints?.length ? service.bulletPoints : FALLBACK_BULLETS;

  return (
    <section id="training" className="py-24" style={{ background: "var(--color-white)" }}>
      <div className="mx-auto max-w-site px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <DrawLine />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)" }}>Training</span>
            <h2 className="mt-3 mb-6" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--color-ink)" }}>{title}</h2>
            <p className="mb-6" style={{ color: "var(--color-gray)", lineHeight: 1.75, fontSize: "1rem" }}>{intro}</p>
            <ul className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: "var(--color-gold)", marginTop: "2px", flexShrink: 0 }}>◆</span>
                  <span style={{ color: "var(--color-gray)", fontSize: "0.95rem" }}>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 inline-flex px-6 py-3 rounded-sm font-semibold text-sm transition-colors" style={{ background: "var(--color-deep)", color: "#fff" }}>
              Book a Training Session
            </a>
          </FadeUp>

          <ScaleReveal delay={0.1}>
            <TrainingCarousel photos={photos} />
          </ScaleReveal>
        </div>
      </div>
    </section>
  );
}
