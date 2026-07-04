import { defineType, defineField } from "sanity";
export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "key", title: "Key", type: "string", options: { list: ["training","consultation","videography","speaking"] } }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "summary", title: "Card Summary", type: "text" }),
    defineField({ name: "detailIntro", title: "Detail Intro", type: "text" }),
    defineField({ name: "bulletPoints", title: "Bullet Points", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});
