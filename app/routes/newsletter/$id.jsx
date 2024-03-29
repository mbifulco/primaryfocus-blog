import { useLoaderData } from '@remix-run/react';
import { Box, Stack, Heading, Tag, Text } from '@chakra-ui/react';
import {
  broadcastTemplateParse,
  newsletterHasValidThumbnail,
} from '../../lib/util/convertKit';

import NewsletterCTA from '../../components/NewsletterCTA';

import config from '~/config';

import newsletterStylesheetUrl from '~/styles/newsletter.css';
import { getNewsletter } from '../../lib/util/convertKit.server';
import { json } from 'react-router-dom';

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
  const { id } = params;

  const newsletter = await getNewsletter(id);

  const canonical = `${config.siteUrl}/newsletter/${newsletter.id}`;

  return json(
    {
      canonical,
      newsletter,
    },
    {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  );
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
