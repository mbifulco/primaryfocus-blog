import { Box, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react';

import { ArticleCoverImage } from './ArticleCoverImage';
import { AuthorDisplay } from './AuthorDisplay';
import { TagList } from './TagList';

const FeaturedArticle = ({ article }) => (
  <Box
    marginTop={{ base: '1', sm: '5' }}
    marginBottom={{ base: '1', sm: '5' }}
    display="flex"
    flexDirection={{ base: 'column', sm: 'row' }}
    justifyContent="space-between"
  >
    <Box
      display="flex"
      flex="1"
      marginRight="3"
      position="relative"
      alignItems="center"
    >
      <Box
        width={{ base: '100%', sm: '85%' }}
        zIndex="2"
        marginLeft={{ base: '0', sm: '5%' }}
        marginTop="2%"
      >
        <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
          <ArticleCoverImage
            borderRadius="lg"
            {...article}
            alt="some good alt text"
            objectFit="contain"
          />
        </Link>
      </Box>
      <Box zIndex="1" width="97%" position="absolute" height="118%">
        <Box
          bgGradient={useColorModeValue(
            'radial(pink.600 3px, transparent 3px)',
            'radial(pink.300 3px, transparent 3px)',
          )}
          backgroundSize="20px 20px"
          opacity="0.4"
          height="100%"
        />
      </Box>
    </Box>
    <Box
      as="article"
      display="flex"
      flex="1"
      flexDirection="column"
      justifyContent="center"
      marginTop={{ base: '3', sm: '0' }}
    >
      <TagList tags={article?.tags} />
      <Heading as="h1" marginTop="1">
        <Link
          href={`/articles/${article?.slug?.current}`}
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
        >
          {article?.title}
        </Link>
      </Heading>
      <Text
        as="p"
        marginTop="2"
        color={useColorModeValue('gray.700', 'gray.200')}
        fontSize="lg"
      >
        {article?.excerpt}
      </Text>
      {article?.author ? (
        <AuthorDisplay
          name={article?.author?.name}
          date={new Date(article?.publishedAt)}
        />
      ) : null}
    </Box>
  </Box>
);

export default FeaturedArticle;
