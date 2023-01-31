import { Spacer, Stack } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import ArticleList from '~/components/ArticleList';
import { getClient } from '~/lib/sanity/getClient';
import config from '~/config';

import FeaturedCourse from '~/components/FeaturedCourse';

export async function loader() {
  const posts = await getClient().fetch(
    `*[_type == "post"]{
      _id,
      excerpt,
      author,
      title,
      slug,
      mainImage,
      publishedAt,
      youTubeId,
      "tags": tags[]->{title, slug}
    
    } | order(publishedAt desc)`,
  );

  return { posts };
}

export function meta() {
  return {
    canonical: config.siteUrl,
  };
}

export default function Index() {
  let { posts } = useLoaderData();
  return (
    <Stack spacing={4}>
      <FeaturedCourse />
      <Spacer gap={6} />
      <ArticleList articles={posts} />
    </Stack>
  );
}
