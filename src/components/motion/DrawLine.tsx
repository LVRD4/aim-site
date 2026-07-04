"use client";
import { motion } from "framer-motion";

// Renders a short gold horizontal line that draws itself left-to-right
// when it enters the viewport. Place above section eyebrow text.
export function DrawLine({ delay = 0, style }: { delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      style={{
        display: "block",
        width: "36px",
        height: "2px",
        background: "var(--color-gold)",
        transformOrigin: "left",
        marginBottom: "10px",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
