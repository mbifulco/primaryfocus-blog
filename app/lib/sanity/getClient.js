/* eslint-disable no-undef */
// ./web/app/lib/sanity/getClient.js

import PicoSanity from 'picosanity';

import config from '~/lib/sanity/config';

// Standard client for fetching data
export const sanityClient = new PicoSanity(config);

// Authenticated client for fetching draft documents
export const previewClient = new PicoSanity({
  ...config,
  useCdn: false,
  token:
    typeof window !== 'undefined'
      ? window.ENV.SANITY_API_TOKEN
      : process.env.SANITY_API_TOKEN ?? '',
});

// Helper function to choose the correct client
export const getClient = (usePreview = false) => {
  return usePreview ? previewClient : sanityClient;
};
