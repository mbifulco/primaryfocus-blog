import { useLoaderData } from '@remix-run/react';
import { Box, Stack, Heading, Tag, Text } from '@chakra-ui/react';
import {
  broadcastTemplateParse,
  newsletterHasValidThumbnail,
} from '../../lib/util/convertKit';

import NewsletterCTA from '../../components/NewsletterCTA';

import config from '~/config';

import newsletterStylesheetUrl from './newsletter.css';

export const links = () => {
  return [{ rel: 'stylesheet', href: newsletterStylesheetUrl }];
};

export const meta = ({ data }) => {
  const { newsletter, canonical } = data;
  const publishedAt = new Date(newsletter.published_at);

  const description = `Primary focus newsletter: ${
    newsletter.subject
  }, published on ${publishedAt.toLocaleDateString()}`;

  return {
    description,
    title: newsletter.subject
      ? `${newsletter.subject} - ${config.meta.title}`
      : config.meta.title,
    'og:image': newsletterHasValidThumbnail(newsletter)
      ? newsletter.thumbnail_url
      : null,
    'og:type': 'article',
    'og:title': newsletter.subject,
    'og:description': description,
    'og:url': canonical,
    'twitter:card': 'summary_large_image',
  };
};

export const loader = async ({ params, request }) => {
  const CONVERTKIT_API_SECRET = process.env.CONVERTKIT_API_SECRET;

  const { id } = params;

  const response = await fetch(
    `https://api.convertkit.com/v3/broadcasts/${id}?api_secret=${CONVERTKIT_API_SECRET}`,
  );
  const data = await response.json();

  const newsletter = data.broadcast;
  const canonical = `https://${config.siteUrl}/newsletter/${newsletter.id}`;

  return {
    canonical,
    newsletter,
  };
};

const NewsletterPage = () => {
  const { canonical, newsletter } = useLoaderData();

  const publishedAt = new Date(newsletter.published_at);
  return (
    <Box margin="0 auto">
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <Stack maxW="75ch" spacing={8} margin="0 auto">
        <Heading as="h1">{newsletter.subject}</Heading>
        <Box>
          <Tag size={'md'} variant="solid" colorScheme="pink">
            {publishedAt.toLocaleDateString()}
          </Tag>
        </Box>
        <Text
          id="convertkit-content"
          fontSize={'xl'}
          as="div"
          dangerouslySetInnerHTML={{
            __html: broadcastTemplateParse({ template: newsletter.content }),
          }}
        />
        <NewsletterCTA />
      </Stack>
    </Box>
  );
};

export default NewsletterPage;
