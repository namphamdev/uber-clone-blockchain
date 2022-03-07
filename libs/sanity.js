import SanityClient from "@sanity/client";

export const client = SanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_TOKEN,
  apiVersion: 'v1',
  dataset: 'production',
  useCdn: false,
});