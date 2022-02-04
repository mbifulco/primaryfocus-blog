import { Box, Heading, Link, Text, WrapItem } from '@chakra-ui/react';
import { AuthorDisplay } from './AuthorDisplay';
import { TagList } from './TagList';
import { ArticleCoverImage } from './ArticleCoverImage';

export const ArticleListItem = ({
  author,
  excerpt,
  mainImage,
  publishedAt,
  tags,
  title,
  youTubeId,
  slug,
}) => {
  const articleUrl = `/articles/${slug?.current}`;
  return (
    <WrapItem
      as="article"
      width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
    >
      <Box w="100%">
        <Box borderRadius="lg" overflow="hidden">
          <Link
            href={articleUrl}
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            <ArticleCoverImage
              youTubeId={youTubeId}
              title={title}
              mainImage={mainImage}
              transform="scale(1.0)"
              alt="some text"
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: 'scale(1.05)',
              }}
            />
          </Link>
        </Box>
        <Heading as="h2" fontSize="xl" mt="4">
          <Link
            href={articleUrl}
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            {title}
          </Link>
        </Heading>
        <TagList tags={tags} marginTop="2" />
        <Text as="p" fontSize="md" marginTop="2">
          {excerpt ? excerpt : null}
        </Text>
      </Box>
    </WrapItem>
  );
};
