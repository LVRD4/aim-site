import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Angela Ingram Media — Strategic Communications & Media Relations",
  description: "Angela Ingram brings 20+ years of media expertise to help you communicate with clarity, confidence, and impact. Media training, communications consultation, videography, and public speaking.",
  openGraph: {
    title: "Angela Ingram Media",
    description: "Strategic Communications & Media Relations — Cincinnati, OH",
    siteName: "Angela Ingram Media",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><MotionProvider>{children}</MotionProvider></body>
    </html>
  );
}
