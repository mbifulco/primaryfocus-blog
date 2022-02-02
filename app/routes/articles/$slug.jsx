import { useState } from 'react';
import { useLoaderData } from 'remix';

import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';

import {
  Box,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { formatRelative } from 'date-fns';

import { getClient } from '~/lib/sanity/getClient';
import { filterDataToSingleItem } from '~/lib/sanity/filterDataToSingleItem';

import config from '~/config';

import Preview from '~/components/Preview';
import NewsletterCTA from '~/components/NewsletterCTA';
import { TagList } from '~/components/TagList';
import BlockContentWrapper from '../../components/BlockContentWrapper';

export const meta = ({ data: loaderData, sanityClient }) => {
  const post = filterDataToSingleItem(loaderData.data, loaderData.preview);

  const urlBuilder = imageUrlBuilder(sanityClient);
  const headerImageUrl = post?.mainImage
    ? urlBuilder.image(post?.mainImage)
    : null;

  return {
    description: post?.description,
    keywords: post?.keywords,
    title: post?.title
      ? `${post.title} - ${config.meta.title}`
      : config.meta.title,
    'og:image': headerImageUrl?.width(1200).height(600).url(),
    'og:type': 'article',
    'og:title': post?.title,
    'og:description': post?.description,
    'og:url': `${config.siteUrl}/articles/${post.slug.current}`,
    'twitter:card': 'summary_large_image',
  };
};

export async function loader({ params, request }) {
  const requestUrl = new URL(request?.url);

  //TODO: update this to load expected preview value from process.env.SANITY_PREVIEW_SECRET
  const preview = requestUrl?.searchParams?.get('preview') == 'preview';

  // Query for _all_ documents with this slug
  // There could be two: Draft and Published!
  const query = groq`
    *[_type == "post" && slug.current == $slug] {
      author,
      body,
      excerpt,
      mainImage,
      publishedAt,
      slug,
      title,
      youTubeId,
      "tags": tags[]->{title, slug}
    }`;
  const queryParams = { slug: params.slug };

  const sanityClient = getClient(preview);
  const data = await sanityClient.fetch(query, queryParams);

  return {
    canonical: requestUrl.href,
    sanityClient,
    data,
    preview,
    query: preview ? query : null,
    queryParams: preview ? queryParams : null,
  };
}

export default function Post() {
  let {
    canonical,
    data: initialData,
    preview,
    query,
    queryParams,
    sanityClient,
  } = useLoaderData();

  // If `preview` mode is active, its component update this state for us
  const [data, setData] = useState(initialData);

  const post = filterDataToSingleItem(data, preview);

  const urlBuilder = imageUrlBuilder(sanityClient);

  const headerImageUrl = post?.mainImage
    ? urlBuilder.image(post?.mainImage)
    : null;

  let youtubeEmbed = null;
  if (post?.youTubeId) {
    // responsive embed styles from https://avexdesigns.com/blog/responsive-youtube-embed
    youtubeEmbed = (
      <Box
        position="relative"
        paddingBottom="56.25%"
        paddingTop="30px"
        height="0"
        overflow={'hidden'}
      >
        <iframe
          title="YouTube video player"
          src={`https://www.youtube.com/embed/${post?.youTubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    );
  }

  let hero;
  if (youtubeEmbed) {
    hero = youtubeEmbed;
  } else if (headerImageUrl) {
    hero = (
      <Image
        src={headerImageUrl.width(1200).height(700).url()}
        objectFit="cover"
        alt={post?.mainImage?.alt}
        maxH={'40vh'}
      />
    );
  }

  return (
    <>
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <Stack spacing={8}>
        {preview ? (
          <Preview
            data={data}
            setData={setData}
            query={query}
            queryParams={queryParams}
          />
        ) : null}

        <Stack>
          {post?.title ? <Heading as="h1">{post.title}</Heading> : null}
          {post?.publishedAt ? (
            <Text
              as="time"
              dateTime={post.publishedAt}
              color={useColorModeValue('gray.600', 'gray.300')}
              fontSize={'sm'}
            >
              Published{' '}
              {formatRelative(new Date(post?.publishedAt), new Date())}
            </Text>
          ) : null}
          <Stack direction="row" spacing={4}>
            <TagList tags={post?.tags} />
          </Stack>
        </Stack>

        {hero}

        <Stack
          maxWidth={['100vw', '65ch']}
          width="65ch"
          alignSelf="center"
          spacing={4}
          fontSize={'larger'}
        >
          <Heading as="h2" size="lg">
            Summary
          </Heading>
          <BlockContentWrapper>{post?.body}</BlockContentWrapper>

          <NewsletterCTA />
        </Stack>
      </Stack>
    </>
  );
}
