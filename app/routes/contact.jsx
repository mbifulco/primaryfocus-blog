import { useLoaderData } from '@remix-run/react';
import { getClient } from '~/lib/sanity/getClient';

import groq from 'groq';
import {
  Heading,
  Image,
  UnorderedList,
  ListItem,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';

import BlockContentWrapper from '~/components/BlockContentWrapper';
import NewsletterCTA from '~/components/NewsletterCTA';

export const loader = async ({ params, request }) => {
  const requestUrl = new URL(request?.url);
  //TODO: update this to load expected preview value from process.env.SANITY_PREVIEW_SECRET
  const preview = requestUrl?.searchParams?.get('preview') == 'preview';

  const query = groq`
    *[_type == "author" && slug.current == 'miss-natalie'] {
      bio
    }`;

  const sanityClient = getClient(preview);
  const [data] = await sanityClient.fetch(query);

  console.log('bio', data.bio);
  return { bio: data.bio };
};

const ContactPage = () => {
  const theme = useTheme();
  const pictureSize = 250;

  const { bio } = useLoaderData();
  return (
    <Stack direction={['column', 'column', 'row']} spacing={12}>
      <Image
        height={pictureSize}
        width={pictureSize}
        src="/images/miss-natalie-square.png"
        alt="Miss Natalie headshot"
      />
      <Stack spacing={4}>
        <BlockContentWrapper>{bio}</BlockContentWrapper>
      </Stack>
      <NewsletterCTA />
    </Stack>
  );
};

export default ContactPage;
