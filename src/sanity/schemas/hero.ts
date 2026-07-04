import { defineType, defineField } from "sanity";
export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Text", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "emphasizedWord", title: "Emphasized Word (gold)", type: "string" }),
    defineField({ name: "lead", title: "Lead Text", type: "text" }),
    defineField({ name: "ctaPrimary", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "ctaSecondary", title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "taglineBanner", title: "Tagline Banner Text", type: "string" }),
    defineField({ name: "heroBackgroundImage", title: "Background Image (skyline — must be licensed)", type: "image", options: { hotspot: true } }),
    defineField({ name: "portraitImage", title: "Portrait Image", type: "image", options: { hotspot: true } }),
  ],
});
