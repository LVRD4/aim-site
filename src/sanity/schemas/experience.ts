import { defineType, defineField } from "sanity";
export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "role", title: "Role/Title", type: "string" }),
    defineField({ name: "organization", title: "Organization", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "startDate", title: "Start Date", type: "string" }),
    defineField({ name: "endDate", title: "End Date", type: "string" }),
    defineField({ name: "isCurrent", title: "Current Role?", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
