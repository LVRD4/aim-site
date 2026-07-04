"use client";
import { useEffect, useRef } from "react";

// Import lite-youtube-embed styles
import "lite-youtube-embed/src/lite-yt-embed.css";

export default function VideoModal({ videoId, title, onClose }: { videoId: string; title?: string; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import the custom element registration
    import("lite-youtube-embed");
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={e => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-4xl" style={{ background: "#000" }}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl font-light z-10"
          aria-label="Close video"
        >
          ✕
        </button>
        {/* @ts-expect-error lite-youtube is a custom element registered at runtime */}
        <lite-youtube
          videoid={videoId}
          playlabel={title || "Play video"}
          style={{ display: "block", width: "100%", aspectRatio: "16/9" } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
