import { GraduationCap, Lightbulb, Clapperboard, Mic2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Service } from "@/types/sanity";
import { FadeUp } from "./motion/FadeUp";
import { StaggerContainer, StaggerItem } from "./motion/Stagger";
import { DrawLine } from "./motion/DrawLine";

const SERVICE_ANCHORS: Record<string, string> = {
  training: "#training",
  consultation: "#consultation",
  videography: "#videography",
  speaking: "#speaking",
};

const SERVICE_ICONS: Record<string, LucideIcon> = {
  training: GraduationCap,
  consultation: Lightbulb,
  videography: Clapperboard,
  speaking: Mic2,
};

const FALLBACK_SERVICES: Service[] = [
  { _id: "1", key: "training", title: "Media Training", summary: "Prepare your team and spokespeople to handle any media interaction with confidence, clarity, and composure.", order: 1 },
  { _id: "2", key: "consultation", title: "Communications Consultation", summary: "Strategic communications counsel for organizations navigating change, crisis, or growth.", order: 2 },
  { _id: "3", key: "videography", title: "Videography & Storytelling", summary: "Compelling video content that tells your story — produced with a journalist's eye for truth and impact.", order: 3 },
  { _id: "4", key: "speaking", title: "Public Speaking & MC", summary: "Angela brings warmth, professionalism, and command to the stage — as a keynote speaker or master of ceremonies.", order: 4 },
];

export default function ServicesOverview({ services }: { services?: Service[] }) {
  const svcs = services?.length ? services : FALLBACK_SERVICES;

  return (
    <section id="services" className="py-24" style={{ background: "var(--color-light)" }}>
      <div className="mx-auto max-w-site px-7">
        <FadeUp className="text-center mb-14">
          <DrawLine style={{ margin: "0 auto 10px" }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)" }}>What I Offer</span>
          <h2 className="mt-3" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--color-ink)" }}>Services</h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {svcs.map(svc => {
            const Icon = SERVICE_ICONS[svc.key];
            return (
              <StaggerItem key={svc._id}>
                <a
                  href={SERVICE_ANCHORS[svc.key] || "#services"}
                  className="group flex flex-col gap-4 p-8 rounded-sm transition-all hover:-translate-y-1 h-full"
                  style={{ background: "var(--color-white)", border: "1px solid var(--color-line)" }}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-sm transition-colors"
                    style={{ background: "rgba(32,68,92,0.08)", color: "var(--color-deep)" }}
                  >
                    {Icon && <Icon size={22} strokeWidth={1.5} />}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "1.2rem", color: "var(--color-ink)" }}>{svc.title}</h3>
                  <p style={{ color: "var(--color-gray)", fontSize: "0.9rem", lineHeight: 1.65, flexGrow: 1 }}>{svc.summary}</p>
                  <span
                    style={{ color: "var(--color-deep)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.04em" }}
                    className="group-hover:text-(--color-gold) transition-colors"
                  >
                    Learn more →
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
