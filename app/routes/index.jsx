import { Stack } from '@chakra-ui/react';
import { Link, useLoaderData } from 'remix';
import ArticleList from '~/components/ArticleList';
import { getClient } from '~/lib/sanity/getClient';

export async function loader() {
  const posts = await getClient().fetch(
    `*[_type == "post"]{ _id, author, title, slug, mainImage, publishedAt, tags }`,
  );

  return { posts };
}

export default function Index() {
  let { posts } = useLoaderData();

  return (
    <Stack spacing={4}>
      <ArticleList articles={posts} />
    </Stack>
  );
}
