"use client";
import { useState } from "react";
import Image from "next/image";
import { VideoItem } from "@/types/sanity";
import { urlFor } from "@/sanity/image";
import VideoModal from "./VideoModal";

function PlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: "rgba(194,168,120,0.9)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </div>
  );
}

function VideoTile({ video, onClick }: { video: VideoItem; onClick: () => void }) {
  const thumbUrl = video.customThumbnail
    ? urlFor(video.customThumbnail).width(480).height(270).url()
    : video.youtubeId
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : null;

  return (
    <div
      className="group relative cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      aria-label={`Play video: ${video.title || "Video"}`}
    >
      <div
        className="relative aspect-video overflow-hidden rounded-sm"
        style={{ background: "rgba(32,68,92,0.5)" }}
      >
        {thumbUrl && (
          <Image
            src={thumbUrl}
            alt={video.title || "Video"}
            width={480}
            height={270}
            className="w-full h-full object-cover"
            unoptimized={!video.customThumbnail}
          />
        )}
        <PlayIcon />
      </div>
      {video.title && (
        <p className="mt-2 text-sm font-medium" style={{ color: "rgba(220,230,236,0.85)" }}>
          {video.title}
        </p>
      )}
    </div>
  );
}

function gridClass(count: number): string {
  if (count === 1) return "max-w-2xl mx-auto";
  if (count === 2) return "grid grid-cols-1 sm:grid-cols-2 gap-6";
  return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
}

export default function VideographyGrid({ videos }: { videos: VideoItem[] }) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  if (!videos.length) {
    return (
      <div
        className="w-full py-16 flex items-center justify-center rounded-sm"
        style={{ border: "1px dashed rgba(217,217,217,0.3)" }}
      >
        <span style={{ color: "rgba(220,230,236,0.5)", fontSize: "0.9rem" }}>
          Videos will appear here — add them in Sanity Studio
        </span>
      </div>
    );
  }

  return (
    <>
      <div className={gridClass(videos.length)}>
        {videos.map(video => (
          <VideoTile key={video._id} video={video} onClick={() => setActiveVideo(video)} />
        ))}
      </div>
      {activeVideo?.youtubeId && (
        <VideoModal
          videoId={activeVideo.youtubeId}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
