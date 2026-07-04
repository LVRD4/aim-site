"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { TrainingPhoto } from "@/types/sanity";
import { urlFor } from "@/sanity/image";
import { useCallback } from "react";

function SinglePhoto({ photo }: { photo: TrainingPhoto }) {
  const src = photo.image ? urlFor(photo.image).width(800).height(540).url() : null;
  if (!src) return <div className="w-full aspect-8/5 rounded-sm bg-(--color-light)" />;
  return (
    <div className="overflow-hidden rounded-sm">
      <Image
        src={src}
        alt={photo.caption || "Training session"}
        width={800}
        height={540}
        className="w-full object-cover"
        style={{ aspectRatio: "8/5" }}
      />
    </div>
  );
}

function MultiCarousel({ photos }: { photos: TrainingPhoto[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden rounded-sm">
        <div className="flex">
          {photos.map(photo => {
            const src = photo.image ? urlFor(photo.image).width(800).height(540).url() : null;
            return (
              <div key={photo._id} className="flex-none w-full">
                {src ? (
                  <Image
                    src={src}
                    alt={photo.caption || "Training session"}
                    width={800}
                    height={540}
                    className="w-full object-cover"
                    style={{ aspectRatio: "8/5" }}
                  />
                ) : (
                  <div className="w-full aspect-8/5 bg-(--color-light)" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{ background: "rgba(23,49,64,0.8)", color: "#fff" }}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{ background: "rgba(23,49,64,0.8)", color: "#fff" }}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
}

export default function TrainingCarousel({ photos }: { photos: TrainingPhoto[] }) {
  if (!photos.length) {
    return (
      <div
        className="w-full aspect-8/5 flex items-center justify-center rounded-sm"
        style={{ background: "rgba(32,68,92,0.15)", border: "1px dashed var(--color-line)" }}
      >
        <span style={{ color: "var(--color-gray)", fontSize: "0.9rem" }}>
          Training photos will appear here — add them in Sanity Studio
        </span>
      </div>
    );
  }

  if (photos.length === 1) {
    return <SinglePhoto photo={photos[0]} />;
  }

  return <MultiCarousel photos={photos} />;
}
