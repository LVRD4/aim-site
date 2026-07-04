import { defineType, defineField } from "sanity";
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "logo", title: "Logo / Wordmark", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "contactRecipient", title: "Contact Form Recipient Email", type: "string" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
    defineField({ name: "twitter", title: "X / Twitter URL", type: "url" }),
    defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
  ],
});
