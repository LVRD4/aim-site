"use client";
import { MotionConfig } from "framer-motion";

// Wraps the app so prefers-reduced-motion is respected globally
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
