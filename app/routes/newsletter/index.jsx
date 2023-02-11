import { useLoaderData } from '@remix-run/react';
import { Heading, Stack } from '@chakra-ui/react';

import NewsletterListItem from '~/components/NewsletterListItem';
import NewsletterCTA from '~/components/NewsletterCTA';

import { getAllNewsletters } from '~/lib/util/convertKit.server';
import { json } from 'react-router-dom';

export const loader = async ({ params, request }) => {
  return json(
    {
      newsletters: await getAllNewsletters(),
    },
    {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  );
};

const NewsletterListPage = () => {
  const { newsletters } = useLoaderData();

  return (
    <>
      <Heading as="h1" fontSize={'lg'}>
        Read past newsletters
      </Heading>
      <Stack spacing={[4, 4, 8, 16]}>
        {newsletters.map((newsletter) => (
          <NewsletterListItem newsletter={newsletter} key={newsletter.id} />
        ))}
        <NewsletterCTA />
      </Stack>
    </>
  );
};

export default NewsletterListPage;
