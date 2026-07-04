import { Service, VideoItem } from '@/types/sanity';
import VideographyGrid from './VideographyGrid';
import { FadeUp } from './motion/FadeUp';
import { StaggerContainer, StaggerItem } from './motion/Stagger';
import { DrawLine } from './motion/DrawLine';

const FALLBACK_BULLETS = [
  'Corporate and organizational storytelling',
  'Documentary-style profiles and features',
  'Event coverage and highlight reels',
  'Social media content production',
  'News-style video packages',
];

export default function VideographySection({
  service,
  videos,
}: {
  service?: Service;
  videos: VideoItem[];
}) {
  const title = service?.title || 'Videography & Storytelling';
  const intro =
    service?.detailIntro ||
    "Angela brings a journalist's instinct for story to every frame. Her videography work combines technical expertise with a deep understanding of narrative — producing content that informs, moves, and endures.";
  const bullets = service?.bulletPoints?.length
    ? service.bulletPoints
    : FALLBACK_BULLETS;

  return (
    <section
      id="videography"
      className="py-24"
      style={{ background: 'var(--color-deep)' }}
    >
      <div className="mx-auto max-w-site px-7">
        <FadeUp className="text-center mb-14">
          <DrawLine style={{ margin: '0 auto 10px' }} />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}
          >
            Videography
          </span>
          <h2
            className="mt-3"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: '#fff',
            }}
          >
            {title}
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{ color: 'rgba(220,230,236,0.85)', lineHeight: 1.75 }}
          >
            {intro}
          </p>
        </FadeUp>

        {/* Bullet chips stagger in */}
        <StaggerContainer className="flex flex-wrap justify-center gap-x-3 gap-y-6 mb-12">
          {bullets.map((b, i) => (
            <StaggerItem key={i}>
              <span
                className="px-6 py-2.5 text-sm rounded-sm"
                style={{
                  background: 'rgba(194,168,120,0.12)',
                  border: '1px solid rgba(194,168,120,0.25)',
                  color: 'rgba(220,230,236,0.85)',
                }}
              >
                {b}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <VideographyGrid videos={videos} />
        </FadeUp>

        <FadeUp
          delay={0.2}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#contact"
            className="inline-flex px-6 py-3 rounded-sm font-semibold text-sm transition-colors"
            style={{
              background: 'var(--color-gold)',
              color: 'var(--color-deepest)',
            }}
          >
            Discuss a Video Project
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
