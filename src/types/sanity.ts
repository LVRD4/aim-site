export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: string };
  hotspot?: { x: number; y: number };
  crop?: object;
}

export interface SiteSettings {
  logo?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  contactRecipient?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
}

export interface Hero {
  eyebrow?: string;
  headline?: string;
  emphasizedWord?: string;
  lead?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  taglineBanner?: string;
  heroBackgroundImage?: SanityImage;
  portraitImage?: SanityImage;
}

export interface About {
  bio?: any[];
  signatureName?: string;
}

export interface Experience {
  _id: string;
  role: string;
  organization: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  order?: number;
}

export interface Service {
  _id: string;
  key: "training" | "consultation" | "videography" | "speaking";
  title: string;
  summary?: string;
  detailIntro?: string;
  bulletPoints?: string[];
  image?: SanityImage;
  order?: number;
}

export interface TrainingPhoto {
  _id: string;
  image?: SanityImage;
  caption?: string;
  order?: number;
}

export interface VideoItem {
  _id: string;
  title?: string;
  youtubeId?: string;
  customThumbnail?: SanityImage;
  order?: number;
}
