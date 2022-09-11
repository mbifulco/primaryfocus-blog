import { useLoaderData } from '@remix-run/react';
import { Heading, Stack } from '@chakra-ui/react';

import NewsletterListItem from '~/components/NewsletterListItem';
import NewsletterCTA from '~/components/NewsletterCTA';

export const loader = async ({ params, request }) => {
  const CONVERTKIT_API_SECRET = process.env.CONVERTKIT_API_SECRET;

  const response = await fetch(
    `https://api.convertkit.com/v3/broadcasts?api_secret=${CONVERTKIT_API_SECRET}`,
  );
  const data = await response.json();

  const { broadcasts } = data;

  const newsletters = await Promise.all(
    broadcasts.map(async (broadcast) => {
      const res = await fetch(
        `https://api.convertkit.com/v3/broadcasts/${broadcast.id}?api_secret=${CONVERTKIT_API_SECRET}`,
      );
      const { broadcast: newsletter } = await res.json();

      return newsletter;
    }),
  );

  return {
    newsletters,
  };
};

const NewsletterListPage = () => {
  const { newsletters } = useLoaderData();

  return (
    <>
      <Heading as="h1" fontSize={'lg'}>
        Read past newsletters
      </Heading>
      <Stack spacing={[2, 4, 8, 16]}>
        {newsletters
          .filter((newsletter) => !!newsletter.published_at)
          .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
          .map((newsletter) => (
            <NewsletterListItem newsletter={newsletter} key={newsletter.id} />
          ))}
        <NewsletterCTA />
      </Stack>
    </>
  );
};

export default NewsletterListPage;
