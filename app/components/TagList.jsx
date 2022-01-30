import { Link, HStack, Tag } from '@chakra-ui/react';

export const TagList = ({ tags }) => {
  return (
    <HStack spacing={2}>
      {tags?.map((tag) => {
        if (!tag?.title) return null;
        if (!tag?.slug?.current) return null;

        return (
          <Link
            key={tag?.slug?.current}
            href={`/tags/${tag?.slug?.current}`}
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            <Tag size={'md'} variant="solid" colorScheme="orange">
              {tag?.title}
            </Tag>
          </Link>
        );
      })}
    </HStack>
  );
};
