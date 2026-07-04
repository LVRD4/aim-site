import Link from "next/link";
import { SiteSettings } from "@/types/sanity";

export default function Footer({ settings }: { settings?: SiteSettings }) {
  return (
    <footer style={{ background: "var(--color-deepest)", color: "var(--color-light)" }} className="py-12">
      <div className="mx-auto max-w-site px-7">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", letterSpacing: "0.12em", color: "#fff", fontWeight: 500 }}>AIM</span>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-gold)" }}>Angela Ingram Media</span>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm justify-center">
            {([["#about","About"],["#services","Services"],["#contact","Contact"]] as [string,string][]).map(([href,label]) => (
              <Link key={href} href={href} className="text-[#dfe7ee] hover:text-white transition-colors">{label}</Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-xs" style={{ borderColor: "rgba(217,217,217,0.15)", color: "rgba(220,230,236,0.6)" }}>
          © {new Date().getFullYear()} Angela Ingram Media. All rights reserved.
          {settings?.email && (
            <span className="block mt-1">
              <a href={`mailto:${settings.email}`} className="hover:text-(--color-gold) transition-colors">{settings.email}</a>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
