import { Hero, SiteSettings } from "@/types/sanity";
import { urlFor } from "@/sanity/image";
import HeroContent from "./HeroContent";

export default function HeroSection({ hero, settings }: { hero?: Hero; settings?: SiteSettings }) {
  const headline = hero?.headline || "Strategic Communications\nThat Moves People";
  const emphasizedWord = hero?.emphasizedWord || "Moves";
  const eyebrow = hero?.eyebrow || "Angela Ingram Media";
  const lead = hero?.lead || "Award-winning strategist. Licensed attorney. Former TV journalist. Angela Ingram brings 20+ years of expertise in crisis communications, media training, and reputation management to help you communicate with clarity, credibility, and confidence.";
  const ctaPrimary = hero?.ctaPrimary || "Work With Angela";
  const ctaSecondary = hero?.ctaSecondary || "Explore Services";
  const taglineBanner = hero?.taglineBanner || "Aim Higher. Deliver With Impact.";

  const bgImageUrl = hero?.heroBackgroundImage
    ? urlFor(hero.heroBackgroundImage).width(1920).url()
    : null;

  const portraitUrl = hero?.portraitImage
    ? urlFor(hero.portraitImage).width(600).url()
    : null;

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center"
      style={{
        backgroundImage: bgImageUrl
          ? `linear-gradient(100deg, rgba(21,48,63,0.94) 0%, rgba(28,62,84,0.80) 42%, rgba(21,48,63,0.50) 100%), url(${bgImageUrl})`
          : "linear-gradient(135deg, #173140 0%, #20445c 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* TODO: licensed asset — hero background must be replaced with Angela's owned/licensed photo before launch */}
      <div className="mx-auto max-w-site px-7 py-24 w-full">
        <HeroContent
          headline={headline}
          emphasizedWord={emphasizedWord}
          eyebrow={eyebrow}
          lead={lead}
          ctaPrimary={ctaPrimary}
          ctaSecondary={ctaSecondary}
          taglineBanner={taglineBanner}
          portraitUrl={portraitUrl}
          settings={settings}
        />
      </div>
    </section>
  );
}
