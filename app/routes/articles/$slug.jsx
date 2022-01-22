import { useState } from 'react';
import { useLoaderData } from 'remix';

import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';

import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { formatRelative } from 'date-fns';

import { getClient } from '~/lib/sanity/getClient';
import { filterDataToSingleItem } from '~/lib/sanity/filterDataToSingleItem';
import Preview from '~/components/Preview';

export const meta = ({ data: loaderData, sanityClient }) => {
  const post = filterDataToSingleItem(loaderData.data, loaderData.preview);

  const urlBuilder = imageUrlBuilder(sanityClient);
  const headerImageUrl = post?.mainImage
    ? urlBuilder.image(post?.mainImage)
    : null;

  return {
    description: post?.description,
    keywords: post?.keywords,
    title: post?.title,
    ogImage: headerImageUrl?.width(1200).height(600).url(),
    ogType: 'article',
  };
};

export async function loader({ params, request }) {
  const requestUrl = new URL(request?.url);

  //TODO: update this to load expected preview value from process.env.SANITY_PREVIEW_SECRET
  const preview = requestUrl?.searchParams?.get('preview') == 'preview';

  // Query for _all_ documents with this slug
  // There could be two: Draft and Published!
  const query = `*[_type == "post" && slug.current == $slug]`;
  const queryParams = { slug: params.slug };

  const sanityClient = getClient(preview);
  const data = await sanityClient.fetch(query, queryParams);

  return {
    sanityClient,
    data,
    preview,
    query: preview ? query : null,
    queryParams: preview ? queryParams : null,
  };
}

export default function Post() {
  let {
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

  return (
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
            Published {formatRelative(new Date(post?.publishedAt), new Date())}
          </Text>
        ) : null}
      </Stack>

      {youtubeEmbed ? youtubeEmbed : null}
      {headerImageUrl ? (
        <Image
          src={headerImageUrl.width(1200).height(700).url()}
          objectFit="cover"
          alt={post?.mainImage?.alt}
          maxH={'40vh'}
        />
      ) : null}

      <Stack width="65ch" alignSelf="center" spacing={4} fontSize={'larger'}>
        {post?.body ? <BlockContent blocks={post.body} /> : null}
      </Stack>
    </Stack>
  );
}
