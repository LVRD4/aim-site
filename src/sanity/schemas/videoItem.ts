import { defineType, defineField } from "sanity";
export default defineType({
  name: "videoItem",
  title: "Video Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "youtubeId", title: "YouTube Video ID", type: "string" }),
    defineField({ name: "customThumbnail", title: "Custom Thumbnail (optional)", type: "image", options: { hotspot: true } }),
    defineField({ name: "displayFrom", title: "Display From", type: "datetime" }),
    defineField({ name: "displayUntil", title: "Display Until", type: "datetime" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});
