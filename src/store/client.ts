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

export type ServiceInfo = {
  name: string;
  thumbnail: SanityImageSource;
  description: string;
};

export type SanityAsset = {
  name: string;
  thumbnail: SanityImageSource;
};

const client = createClient({
  projectId: "0aa51zx5",
  dataset: "production",
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: "2023-03-20", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

const builder = imageUrlBuilder(client);

async function getSchema(schemaName: string, additionalQuery?: string) {
  const schema = await client.fetch(
    `*[_type == "${schemaName}"]${additionalQuery ?? ""}| order(_createdAt asc)`
  );
  return schema;
}

async function sanityClient() {
  const heroInfo: HeroInfo[] = await getSchema("hero", `{..., assets[]->}`);
  const contactInfo: ContactInfo[] = await getSchema("contact");
  const servicesInfo: ServiceInfo[] = await getSchema("services");
  const getSrc = (src: SanityImageSource) => builder.image(src).url();
  const assets: SanityAsset[] = await getSchema("asset");
  function getAssetSrc(name: string) {
    const src = assets.find((asset) => asset.name.includes(name)).thumbnail;
    return getSrc(src);
  }

  const { subscribe } = readable({
    assets,
    heroInfo,
    servicesInfo,
    contactInfo,
    getSrc,
    getAssetSrc,
  });

  return {
    subscribe,
  };
}

export const sanity = sanityClient();
