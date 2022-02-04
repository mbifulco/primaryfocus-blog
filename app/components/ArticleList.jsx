import {
  Box,
  Heading,
  Link,
  Text,
  Divider,
  Wrap,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

import { ArticleCoverImage } from './ArticleCoverImage';
import { ArticleListItem } from './ArticleListItem';
import { AuthorDisplay } from './AuthorDisplay';
import { TagList } from './TagList';

const ArticleList = ({ articles }) => {
  const [featured, ...rest] = articles;

  return (
    <>
      <Box
        marginTop={{ base: '1', sm: '5' }}
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
                {...featured}
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
          <TagList tags={featured?.tags} />
          <Heading as="h1" marginTop="1">
            <Link
              href={`articles/${featured?.slug?.current}`}
              textDecoration="none"
              _hover={{ textDecoration: 'none' }}
            >
              {featured?.title}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            {featured?.excerpt}
          </Text>
          {featured?.author ? (
            <AuthorDisplay
              name={featured?.author?.name}
              date={new Date(featured?.publishedAt)}
            />
          ) : null}
        </Box>
      </Box>
      {rest.length > 0 && (
        <>
          <Heading as="h2" marginTop="5">
            Latest articles
          </Heading>
          <Divider marginTop="5" />
          <Wrap spacing="30px" marginTop="5">
            {rest.map((article) => {
              return (
                <ArticleListItem {...article} key={article?.slug?.current} />
              );
            })}
          </Wrap>
        </>
      )}
    </>
  );
};

export default ArticleList;
