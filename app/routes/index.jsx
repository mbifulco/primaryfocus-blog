import { Stack } from '@chakra-ui/react';
import { useLoaderData } from 'remix';
import ArticleList from '~/components/ArticleList';
import { getClient } from '~/lib/sanity/getClient';
import config from '~/config';

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
      <ArticleList articles={posts} />
    </Stack>
  );
}
