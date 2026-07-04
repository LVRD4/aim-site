import { defineType, defineField } from "sanity";
export default defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "signatureName", title: "Signature Name", type: "string" }),
  ],
});
