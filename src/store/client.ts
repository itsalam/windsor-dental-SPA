import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { readable } from "svelte/store";

export type HeroInfo = {
  greeting: string;
  subtext: string;
  assets: {
    name: string;
    thumbnail: SanityImageSource;
  }[];
};

export type ContactInfo = {
  name: string;
  thumbnail: SanityImageSource;
  value: string;
  link?: string;
};

const client = createClient({
  projectId: "0aa51zx5",
  dataset: "production",
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: "2023-03-20", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

const builder = imageUrlBuilder(client);

async function getSchema(schemaName: string) {
  const schema = await client.fetch(
    `*[_type == "${schemaName}"] | order(_createdAt asc)`
  );
  return schema;
}

async function sanityClient() {
  const heroInfo: HeroInfo[] = await getSchema("hero");
  const contactInfo: ContactInfo[] = await getSchema("contact");
  const getSrc = (src: SanityImageSource) => builder.image(src).url();

  const { subscribe } = readable({
    heroInfo,

    contactInfo,
    getSrc,
  });

  return {
    subscribe,
  };
}

export const sanity = sanityClient();
