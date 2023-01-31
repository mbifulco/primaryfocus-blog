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
    title:
      'Primary Focus: Resources for parents and teachers of elementary school kids',
    description:
      'Courses, articles, and videos to help you make the most of your child’s elementary school years from a 10 year elementary school teaching veteran.',
    canonical: config.siteUrl,
  };
}

export default function Index() {
  let { posts } = useLoaderData();
  return (
    <Stack spacing={4}>
      <link rel="canonical" href="https://primaryfocus.tv" />
      <FeaturedCourse />
      <Spacer gap={6} />
      <ArticleList articles={posts} />
    </Stack>
  );
}
