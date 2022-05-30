import { useEffect, useRef } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import { ChakraProvider } from '@chakra-ui/react';

import theme from '~/lib/chakra/theme';
import Layout from './components/Layout';

import config from '~/config';

// populate OG metadata like title, description, etc
export function meta() {
  const { meta } = config;
  return {
    title: meta.title,
    description: meta.description,
    'og:title': meta.title,
    'og:description': meta.description,
    'og:image': meta.ogImage,
    creator: meta.creator,
    'og:creator': meta.creator,
    keywords: meta.keywords,
  };
}

export function loader() {
  return {
    ENV: {
      SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
      SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
    },
  };
}

export default function App() {
  const { ENV } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <script
          src="https://meaningful-reliable.primaryfocus.tv/script.js"
          data-site="XRNNFGQG"
          defer
        />
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <Layout>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            {process.env.NODE_ENV === 'development' && <LiveReload />}
          </Layout>
        </ChakraProvider>
      </body>
    </html>
  );
}
