import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  broadcastTemplateParse,
  newsletterHasValidThumbnail,
} from '../lib/util/convertKit';

export const Blob = (props) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};

const NewsletterListItem = ({ newsletter }) => {
  const publishedAt = new Date(newsletter.published_at);
  return (
    <Stack
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      direction={{ base: 'column', md: 'row' }}
      as="a"
      href={`/newsletter/${newsletter.id}`}
    >
      <Stack flex={1} spacing={{ base: 5, md: 5 }}>
        <Heading
          lineHeight={1}
          fontWeight={600}
          fontSize={{ base: 'xl', sm: '2xl', lg: '4xl' }}
        >
          <Text
            as={'span'}
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: '30%',
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'red.400',
              zIndex: -1,
            }}
          >
            {newsletter.subject}
          </Text>
          <br />
          <Text as={'span'} color={'red.400'} fontSize="lg">
            {publishedAt.toLocaleDateString()}
          </Text>
        </Heading>
        <Text
          as="div"
          color={'gray.500'}
          dangerouslySetInnerHTML={{
            __html: broadcastTemplateParse({ template: newsletter.content }),
          }}
          maxH="6em"
          overflow={'clip'}
        />
      </Stack>
      <Flex
        flex={1}
        justify={'center'}
        align={'center'}
        position={'relative'}
        w={'full'}
      >
        <Blob
          w={'150%'}
          h={'150%'}
          position={'absolute'}
          top={'-20%'}
          left={0}
          zIndex={-1}
          color={useColorModeValue('red.50', 'red.400')}
        />
        {newsletterHasValidThumbnail(newsletter) && (
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
          >
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={newsletter.thumbnail_url}
            />
          </Box>
        )}
      </Flex>
    </Stack>
  );
};

export default NewsletterListItem;
