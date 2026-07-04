import { About, Experience } from "@/types/sanity";
import { PortableText } from "next-sanity";
import { FadeUp } from "./motion/FadeUp";
import { StaggerContainer, StaggerItem } from "./motion/Stagger";
import { DrawLine } from "./motion/DrawLine";

// Fallback bio — real content; update via Sanity Studio to reflect any changes
const FALLBACK_BIO = [
  { _type: "block", _key: "1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "1a", marks: [], text: "Angela Ingram is an award-winning communications strategist, media relations coach, attorney, and former television journalist who helps leaders communicate with clarity, credibility, and confidence. With more than 20 years of experience in journalism, law, public safety, and executive communications, she specializes in crisis communications, media training, reputation management, and strategic messaging." }] },
  { _type: "block", _key: "2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "2a", marks: [], text: "Angela spent more than two decades in television news, working in multiple media markets as a reporter, fill-in anchor, and producer before transitioning into executive communications. She later led communications for the Louisville Metro Police Department during some of the city's most high-profile incidents and served as a Senior Communications Strategist with one of the nation's most respected crisis communications firms, advising government agencies, universities, nonprofits, and executive leaders." }] },
  { _type: "block", _key: "3", style: "normal", markDefs: [], children: [{ _type: "span", _key: "3a", marks: [], text: "As a licensed attorney, Angela brings a legal perspective to complex communications challenges, helping organizations manage risk, protect public trust, and communicate effectively when the stakes are highest." }] },
];

const FALLBACK_EXPERIENCES: Experience[] = [
  { _id: "1", role: "Founder & Principal Consultant", organization: "Angela Ingram Media", isCurrent: true, order: 1 },
  { _id: "2", role: "Senior Communications Strategist & Instructor", organization: "Julie Parker Communications", startDate: "Jan 2025", isCurrent: true, order: 2 },
  { _id: "3", role: "Director of Communications", organization: "Louisville Metro Police Department", location: "Louisville, KY", startDate: "Jan 2022", endDate: "Jan 2025", order: 3 },
  { _id: "4", role: "Communications Coordinator", organization: "Forest Hills School District", location: "Cincinnati, OH", startDate: "Oct 2020", endDate: "Dec 2021", order: 4 },
  { _id: "5", role: "General Assignment Reporter & Fill-in Anchor", organization: "WKRC, Local 12 News", location: "Cincinnati, OH", startDate: "Dec 2006", endDate: "Oct 2020", order: 5 },
  { _id: "6", role: "General Assignment Reporter & Fill-in Anchor", organization: "WSBT, News 22", location: "South Bend, IN", startDate: "May 2001", endDate: "Nov 2006", order: 6 },
];

export default function AboutSection({ about, experiences }: { about?: About; experiences?: Experience[] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bio: any[] = about?.bio?.length ? about.bio : FALLBACK_BIO;
  const exps = experiences?.length ? experiences : FALLBACK_EXPERIENCES;
  const signatureName = about?.signatureName || "Angela Ingram";

  return (
    <section id="about" className="py-24" style={{ background: "var(--color-white)" }}>
      <div className="mx-auto max-w-site px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <FadeUp>
            <DrawLine />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)" }}>About Angela</span>
            <h2 className="mt-3 mb-6" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--color-ink)" }}>
              From the Newsroom<br />to the Boardroom
            </h2>
            <div className="prose prose-lg max-w-none" style={{ color: "var(--color-gray)", lineHeight: 1.75 }}>
              <PortableText value={bio} />
            </div>
            <div className="mt-8">
              <span style={{ fontFamily: "var(--font-script)", fontSize: "2.5rem", color: "var(--color-deep)" }}>{signatureName}</span>
            </div>
          </FadeUp>

          {/* Right: Experience — items stagger in */}
          <div>
            <FadeUp>
              <DrawLine delay={0.1} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)" }}>Experience</span>
              <h3 className="mt-3 mb-8" style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-ink)" }}>Career Timeline</h3>
            </FadeUp>
            <StaggerContainer className="flex flex-col gap-0">
              {exps.map((exp, i) => (
                <StaggerItem
                  key={exp._id}
                  className="relative pl-8 pb-8 last:pb-0"
                  style={{ borderLeft: i < exps.length - 1 ? "1px solid var(--color-line)" : "1px solid transparent" }}
                >
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: exp.isCurrent ? "var(--color-gold)" : "var(--color-deep)" }} />
                  <div className="flex flex-col gap-0.5">
                    <span style={{ fontFamily: "var(--font-serif)", fontWeight: 500, color: "var(--color-ink)", fontSize: "1rem" }}>{exp.role}</span>
                    <span style={{ color: "var(--color-deep)", fontWeight: 600, fontSize: "0.9rem" }}>{exp.organization}</span>
                    {(exp.location || exp.startDate) && (
                      <span style={{ color: "var(--color-gray)", fontSize: "0.82rem" }}>
                        {[exp.location, exp.startDate && exp.isCurrent ? `${exp.startDate}–Present` : exp.startDate && exp.endDate ? `${exp.startDate}–${exp.endDate}` : exp.startDate].filter(Boolean).join(" · ")}
                      </span>
                    )}
                    {exp.isCurrent && <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold)", background: "rgba(194,168,120,0.1)", padding: "2px 8px", borderRadius: "2px", width: "fit-content" }}>Current</span>}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
