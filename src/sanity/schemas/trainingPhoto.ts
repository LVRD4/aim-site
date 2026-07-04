import { defineType, defineField } from "sanity";
export default defineType({
  name: "trainingPhoto",
  title: "Training Photo",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "caption", title: "Caption (alt text)", type: "string" }),
    defineField({ name: "displayFrom", title: "Display From", type: "datetime" }),
    defineField({ name: "displayUntil", title: "Display Until", type: "datetime" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
});
