"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiteSettings } from "@/types/sanity";

// Social icon SVGs
function InstagramIcon() { return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>; }
function LinkedInIcon() { return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>; }
function FacebookIcon() { return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>; }
function TwitterIcon() { return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>; }
function YoutubeIcon() { return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>; }

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Each text element in the hero reveals in sequence on mount
const textVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay },
  }),
};

// Portrait slides in from right
const portraitVariants = {
  hidden: { opacity: 0, x: 30, scale: 1.03 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, ease: EASE, delay: 0.25 },
  },
};

interface HeroContentProps {
  headline: string;
  emphasizedWord: string;
  eyebrow: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  taglineBanner: string;
  portraitUrl: string | null;
  settings?: SiteSettings;
}

export default function HeroContent({
  headline,
  emphasizedWord,
  eyebrow,
  lead,
  ctaPrimary,
  ctaSecondary,
  taglineBanner,
  portraitUrl,
  settings,
}: HeroContentProps) {
  const parts = headline.split(new RegExp(`(${emphasizedWord})`, "i"));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left: Text — each element reveals in sequence */}
      <div className="flex flex-col gap-6">
        <motion.span
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)" }}
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          custom={0.25}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.01em" }}
        >
          {parts.map((part, i) =>
            part.toLowerCase() === emphasizedWord.toLowerCase()
              ? <span key={i} style={{ color: "var(--color-gold)", fontStyle: "italic" }}>{part}</span>
              : <span key={i}>{part}</span>
          )}
        </motion.h1>

        <motion.p
          custom={0.42}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          style={{ color: "rgba(220,230,236,0.9)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "520px" }}
        >
          {lead}
        </motion.p>

        <motion.div
          custom={0.56}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-wrap gap-3 mt-2"
        >
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-semibold text-sm transition-colors" style={{ background: "var(--color-gold)", color: "var(--color-deepest)" }}>
            {ctaPrimary}
          </a>
          <a href="#services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-semibold text-sm border transition-colors" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>
            {ctaSecondary}
          </a>
        </motion.div>

        <motion.div
          custom={0.68}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex gap-4 mt-2"
        >
          {settings?.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-(--color-gold) transition-colors" aria-label="Instagram"><InstagramIcon /></a>}
          {settings?.linkedin && <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-(--color-gold) transition-colors" aria-label="LinkedIn"><LinkedInIcon /></a>}
          {settings?.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-(--color-gold) transition-colors" aria-label="Facebook"><FacebookIcon /></a>}
          {settings?.twitter && <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-(--color-gold) transition-colors" aria-label="X / Twitter"><TwitterIcon /></a>}
          {settings?.youtube && <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-(--color-gold) transition-colors" aria-label="YouTube"><YoutubeIcon /></a>}
        </motion.div>
      </div>

      {/* Right: Portrait — slides in from right */}
      {portraitUrl ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={portraitVariants}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative w-full max-w-[360px]" style={{ border: "2px solid rgba(194,168,120,0.6)", padding: "8px", background: "rgba(23,49,64,0.3)" }}>
            <Image src={portraitUrl} alt="Angela Ingram" width={360} height={460} className="w-full object-cover" style={{ display: "block" }} />
          </div>
          <div className="text-center px-6 py-3 max-w-[360px] w-full" style={{ background: "rgba(194,168,120,0.15)", border: "1px solid rgba(194,168,120,0.3)" }}>
            <span style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold)", fontSize: "0.95rem", letterSpacing: "0.05em" }}>{taglineBanner}</span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={portraitVariants}
          className="hidden lg:flex flex-col items-center gap-4"
        >
          <div className="w-full max-w-[360px] aspect-3/4 flex items-center justify-center" style={{ border: "2px solid rgba(194,168,120,0.4)", background: "rgba(32,68,92,0.4)" }}>
            <span className="text-white/40 text-sm text-center px-4">Portrait photo<br />— upload in Sanity Studio</span>
          </div>
          <div className="text-center px-6 py-3 max-w-[360px] w-full" style={{ background: "rgba(194,168,120,0.15)", border: "1px solid rgba(194,168,120,0.3)" }}>
            <span style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold)", fontSize: "0.95rem" }}>{taglineBanner}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
