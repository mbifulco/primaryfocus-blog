import { Heading } from '@chakra-ui/react';
import { useLoaderData } from 'remix';
import { getClient } from '~/lib/sanity/getClient';
import groq from 'groq';

import { TagList } from '~/components/TagList';
import config from '~/config';

export async function loader() {
  const tags = await getClient().fetch(
    groq`*[_type == "tag"]{
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

  return { tags };
}

export function meta() {
  const { meta } = config;
  return {
    canonical: config.siteUrl,
    title: `Topics and tags used on ${meta.title}`,
    description: `A list of all topics and tags used in articles and videos on ${meta.title}`,
  };
}

const TagsPage = () => {
  const { tags } = useLoaderData();

  return (
    <>
      <Heading as="h1">
        Browse {tags.length} {tags.length === 1 ? 'Tag' : 'Tags'} used in
        articles and videos on Primary Focus
      </Heading>
      <TagList tags={tags} />
    </>
  );
};

export default TagsPage;
