import { useLoaderData } from '@remix-run/react';
import groq from 'groq';

import { Heading, Stack } from '@chakra-ui/react';

import { getClient } from '~/lib/sanity/getClient';
import ArticleList from '~/components/ArticleList';
import NewsletterCTA from '~/components/NewsletterCTA';

export async function loader({ params, request }) {
  const requestUrl = new URL(request?.url);

  //TODO: update this to load expected preview value from process.env.SANITY_PREVIEW_SECRET
  const preview = requestUrl?.searchParams?.get('preview') == 'preview';

  // Query for _all_ documents with this slug
  // There could be two: Draft and Published!
  const query = groq`
    *[_type == "post" && $tag in tags[]->slug.current] {
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
    tag: params.tag,
  };
}

const PageForTag = () => {
  const ld = useLoaderData();
  const { data, preview, query, queryParams, tag } = useLoaderData();

  return (
    <Stack spacing={8}>
      <Heading as="div">
        {data?.length === 1
          ? `Articles tagged with ${tag}`
          : `${data.length} Articles and videos tagged with ${tag}`}
      </Heading>
      <ArticleList articles={data} />
      <NewsletterCTA />
    </Stack>
  );
};

export default PageForTag;
