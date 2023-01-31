import { Heading, Stack } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import ArticleList from '~/components/ArticleList';
import { getClient } from '~/lib/sanity/getClient';
import config from '~/config';
import FeaturedArticle from '~/components/FeaturedArticle';

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

  const [first, ...rest] = posts;
  return (
    <Stack spacing={4}>
      <link rel="canonical" href="https://primaryfocus.tv/articles" />
      <FeaturedArticle article={first} />
      <Heading as="h2" paddingTop="10" size="md">
        More from Primary Focus
      </Heading>
      <ArticleList articles={rest} />
    </Stack>
  );
}
