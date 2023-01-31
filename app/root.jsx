/* eslint-disable no-undef */
import { useEffect } from 'react';
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

  const configurePolitePop = () => {
    PolitePop({
      styles: {
        popTextColor: `#fff`,
        popBackgroundColor: `rgb(62, 72, 181)`,
        popYesButtonTextColor: `#fff`,
        popYesButtonHoverTextColor: `#fff`,
        popYesButtonBackgroundColor: `#D53F8C`,
        popYesButtonHoverBackgroundColor: `#e55F8C`,
        modalBorder: `0px solid #BFD0FF`,
        modalRoundedCorners: `3px`,
      },
      politePopHtml: `<p>I publish a newsletter to stay up to date on education news and tips for working with your child.</p><p>Want to check it out?</p><p><br></p>`,
      politePopYesText: `Sure!`,
      exitIntentPopHtml: `<p>Interested in my newsletter for parents and teachers?</p>`,
      modalHtml: `<h1>Subscribe to my newsletter!</h1><p>Sign up for my newsletter to stay up to date on my new videos, worksheets, teaching tips, and more! </p><p>No spam, unsubscribe any time.</p>`,
      signupFormAction: `https://app.convertkit.com/forms/3332801/subscriptions`,
    });
  };

  useEffect(() => {
    const check = setInterval(() => {
      if (typeof PolitePop !== 'undefined') {
        clearInterval(check);
        configurePolitePop();
      }
    }, 250);
  }, []);

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
            <script src="https://cdn.politepop.com/polite-pop-v1.4.17/polite-pop.min.js" />
            <script
              async
              data-uid="2926326bd9"
              src="https://dogged-builder-4809.ck.page/2926326bd9/index.js"
            ></script>
            <Scripts />
            {process.env.NODE_ENV === 'development' && <LiveReload />}
          </Layout>
        </ChakraProvider>
      </body>
    </html>
  );
}
