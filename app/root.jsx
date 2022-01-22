import { useEffect, useRef } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix';

import { ChakraProvider } from '@chakra-ui/react';

import * as Fathom from 'fathom-client';
import { useLocation } from 'react-router-dom';

import theme from '~/lib/chakra/theme';
import Layout from './components/Layout';

export function meta() {
  return { title: 'Primary Focus' };
}

export function loader() {
  return {
    ENV: {
      FATHOM_SITE_ID: process.env.FATHOM_SITE_ID,
      SITE_URL: process.env.SITE_URL || 'localhost:3000',
    },
  };
}

export default function App() {
  const { ENV } = useLoaderData();

  let fathomLoaded = useRef(false);
  let location = useLocation();

  useEffect(
    function setupFathom() {
      if (!fathomLoaded.current) {
        Fathom.load(ENV.FATHOM_SITE_ID, {
          includedDomains: [ENV.SITE_URL],
        });
        fathomLoaded.current = true;
      } else {
        Fathom.trackPageview();
      }
    },
    [location],
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
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
