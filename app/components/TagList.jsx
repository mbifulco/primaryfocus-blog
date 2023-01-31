import { Link, Tag, Box } from '@chakra-ui/react';

export const TagList = ({ tags }) => {
  return (
    <Box spacing={2} lineHeight="2rem">
      {tags?.map((tag) => {
        if (!tag?.title) return null;
        if (!tag?.slug?.current) return null;

        return (
          <Link
            key={tag?.slug?.current}
            href={`/tags/${tag?.slug?.current}`}
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
            mr="1ch"
          >
            <Tag as="div" size={'md'} variant="solid" colorScheme="pink">
              {tag?.title}
            </Tag>
          </Link>
        );
      })}
    </Box>
  );
};
