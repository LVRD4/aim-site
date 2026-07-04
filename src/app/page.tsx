import { getSiteSettings, getHero, getAbout, getExperiences, getServices, getTrainingPhotos, getVideoItems } from "@/sanity/queries";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesOverview from "@/components/ServicesOverview";
import TrainingSection from "@/components/TrainingSection";
import ConsultationSection from "@/components/ConsultationSection";
import VideographySection from "@/components/VideographySection";
import SpeakingSection from "@/components/SpeakingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { DEFAULT_SETTINGS } from "@/lib/defaults";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const [rawSettings, hero, about, experiences, services, trainingPhotos, videos] = await Promise.all([
    getSiteSettings().catch(() => null),
    getHero().catch(() => null),
    getAbout().catch(() => null),
    getExperiences().catch(() => []),
    getServices().catch(() => []),
    getTrainingPhotos().catch(() => []),
    getVideoItems().catch(() => []),
  ]);

  // Merge Sanity settings over defaults so social links always render
  const settings = { ...DEFAULT_SETTINGS, ...(rawSettings ?? {}) };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const training = services?.find((s: any) => s.key === "training");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const consultation = services?.find((s: any) => s.key === "consultation");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videography = services?.find((s: any) => s.key === "videography");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speaking = services?.find((s: any) => s.key === "speaking");

  return (
    <>
      <Nav />
      <main>
        <HeroSection hero={hero} settings={settings} />
        <AboutSection about={about} experiences={experiences} />
        <ServicesOverview services={services} />
        <TrainingSection service={training} photos={trainingPhotos} />
        <ConsultationSection service={consultation} />
        <VideographySection service={videography} videos={videos} />
        <SpeakingSection service={speaking} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
