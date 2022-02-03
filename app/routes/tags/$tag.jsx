import { useLoaderData } from 'remix';
import groq from 'groq';

import { Heading } from '@chakra-ui/react';

import { getClient } from '~/lib/sanity/getClient';
import config from '~/config';

export async function loader({ params, request }) {
  const requestUrl = new URL(request?.url);

  //TODO: update this to load expected preview value from process.env.SANITY_PREVIEW_SECRET
  const preview = requestUrl?.searchParams?.get('preview') == 'preview';

  // Query for _all_ documents with this slug
  // There could be two: Draft and Published!
  const query = groq`
    *[_type == "post" && $tag in tags] {
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
  const queryParams = { tag: params.tag };

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

const PageForTag = () => {
  const { data, preview, query, queryParams } = useLoaderData();

  return (
    <>
      <Heading as="h1">
        {data?.posts?.length} Articles and videos tagged with {queryParams?.tag}
      </Heading>
    </>
  );
};

export default PageForTag;
