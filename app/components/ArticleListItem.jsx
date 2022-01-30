import { Box, Heading, Link, Text, WrapItem } from '@chakra-ui/react';
import { AuthorDisplay } from './AuthorDisplay';
import { TagList } from './TagList';
import { ArticleCoverImage } from './ArticleList';

export const ArticleListItem = ({
  author,
  excerpt,
  mainImage,
  publishedAt,
  tags,
  title,
  slug,
}) => {
  return (
    <WrapItem
      as="article"
      width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
    >
      <Box w="100%">
        <Box borderRadius="lg" overflow="hidden">
          <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <ArticleCoverImage
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
        <TagList tags={tags} marginTop="3" />
        <Heading as="h2" fontSize="xl" marginTop="2">
          <Link
            href={`/articles/${slug}`}
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            {title}
          </Link>
        </Heading>
        <Text as="p" fontSize="md" marginTop="2">
          {excerpt ? excerpt : null}
        </Text>
        <AuthorDisplay name={author?.name} date={new Date(publishedAt)} />
      </Box>
    </WrapItem>
  );
};
