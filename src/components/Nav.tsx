"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: "rgba(23,49,64,0.93)", backdropFilter: "blur(10px)", borderColor: "rgba(194,168,120,0.25)" }}>
      <div className="mx-auto max-w-site px-7 flex items-center justify-between h-[74px]">
        {/* Brand */}
        <Link href="/" className="flex flex-col gap-0.5">
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", letterSpacing: "0.12em", color: "#fff", fontWeight: 500 }}>AIM</span>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-gold)" }}>Angela Ingram Media</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-[#dfe7ee] text-sm font-medium relative group">
              {l.label}
              <span className="absolute left-0 -bottom-1.5 h-px w-0 bg-[var(--color-gold)] transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link href="#contact" className="ml-4 px-5 py-2.5 text-sm font-semibold rounded-sm bg-[var(--color-gold)] text-[var(--color-deepest)] hover:bg-[#d4bd96] transition-colors">
            Contact Angela
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-7 pb-4 flex flex-col gap-4" style={{ background: "rgba(23,49,64,0.98)" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-[#dfe7ee] text-sm font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="#contact" className="inline-flex px-5 py-2.5 text-sm font-semibold rounded-sm bg-[var(--color-gold)] text-[var(--color-deepest)] w-fit" onClick={() => setOpen(false)}>
            Contact Angela
          </Link>
        </div>
      )}
    </nav>
  );
}
