import { client } from "./client";

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}
export async function getHero() {
  return client.fetch(`*[_type == "hero"][0]`);
}
export async function getAbout() {
  return client.fetch(`*[_type == "about"][0]{..., bio[]}`);
}
export async function getExperiences() {
  return client.fetch(`*[_type == "experience"] | order(order asc)`);
}
export async function getServices() {
  return client.fetch(`*[_type == "service"] | order(order asc)`);
}
export async function getTrainingPhotos() {
  const now = new Date().toISOString();
  return client.fetch(
    `*[_type == "trainingPhoto" && (displayFrom == null || displayFrom <= $now) && (displayUntil == null || displayUntil > $now)] | order(order asc)`,
    { now }
  );
}
export async function getVideoItems() {
  const now = new Date().toISOString();
  return client.fetch(
    `*[_type == "videoItem" && (displayFrom == null || displayFrom <= $now) && (displayUntil == null || displayUntil > $now)] | order(order asc)`,
    { now }
  );
}
