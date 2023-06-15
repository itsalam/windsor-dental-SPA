import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { derived, readable, type Readable } from "svelte/store";

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
  breakText?: boolean;
};

export type ServiceInfo = {
  name: string;
  thumbnail: SanityImageSource;
  description: string;
};

export type TeamInfo = {
  slogan?: string;
  thumbnails: SanityImageSource[];
  description: string;
};

export type FAQInfo = {
  question: string;
  answer: string;
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
  const query = `*[_type == "${schemaName}"]${
    additionalQuery ?? " | order(_createdAt asc)"
  }`;
  const schema = await client.fetch(query);
  return schema;
}

const makeSanityStore = (schemaName: string, additionalQuery?: string) => {
  return readable(null, (set) => {
    getSchema(schemaName, additionalQuery).then(set);
  });
};

const heroInfo: Readable<HeroInfo> = makeSanityStore(
  "hero",
  `[0]{..., assets[]->}`
);
const contactInfo: Readable<ContactInfo[]> = makeSanityStore("contact");
const servicesInfo: Readable<ServiceInfo[]> = makeSanityStore("services");
const teamInfo: Readable<TeamInfo> = makeSanityStore(
  "team",
  `[0]{..., assets[]->}`
);
const faqsInfo: Readable<FAQInfo[]> = makeSanityStore("faqs");
const assets: Readable<SanityAsset[]> = makeSanityStore("asset");

export const sanity = derived(
  [heroInfo, contactInfo, servicesInfo, teamInfo, faqsInfo, assets],
  (promises, set) => {
    const getSrc = (src: SanityImageSource) => builder.image(src).url();

    function getAssetSrc(name: string) {
      const src = promises[5].find((asset) =>
        asset.name.includes(name)
      ).thumbnail;
      return getSrc(src);
    }
    const progress =
      promises.filter((p) => p !== null).length / promises.length;

    set({
      heroInfo: promises[0],
      contactInfo: promises[1],
      servicesInfo: promises[2],
      teamInfo: promises[3],
      faqsInfo: promises[4],
      assets: promises[5],
      getAssetSrc,
      getSrc,
      progress,
    });
  },
  {
    heroInfo: null,
    contactInfo: null,
    servicesInfo: null,
    teamInfo: null,
    faqsInfo: null,
    assets: null,
    getAssetSrc: null,
    getSrc: null,
    progress: 0,
  }
);
