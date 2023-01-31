import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  ListItem,
  Skeleton,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

const coverImage = '/images/courses/choosing-the-best-school/cover.png';

export const FeaturedCourse = () => (
  <Box maxW="6xl" mx="auto">
    <Stack
      direction={{
        base: 'column',
        lg: 'row',
      }}
      spacing={{
        base: '0',
        lg: '20',
      }}
    >
      <Flex flex="1" position="relative">
        <Box
          zIndex="-10"
          width="50%"
          position="absolute"
          height="50%"
          ml="-20%"
          mt="-20%"
        >
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
        <Image
          src={coverImage}
          alt="What is the BEST school?"
          fallback={<Skeleton />}
          maxH="450px"
          minW="300px"
          objectFit="cover"
          flex="1"
        />
      </Flex>
      <Box
        width={{
          lg: 'sm',
        }}
        transform={{
          base: 'translateY(-10%)',
          lg: 'none',
        }}
        bg={{
          base: useColorModeValue('red.50', 'gray.700'),
          lg: 'transparent',
        }}
        mx={{
          base: '16',
          md: '8',
          lg: '0',
        }}
        px={{
          base: '6',
          md: '8',
          lg: '0',
        }}
        py={{
          base: '6',
          md: '8',
          lg: '12',
        }}
      >
        <Stack
          spacing={{
            base: '2',
            lg: '5',
          }}
        >
          <Stack
            spacing={{
              base: '2',
              lg: '2',
            }}
            as="header"
          >
            <Heading size="sm" color={'pink.600'} as="p" className="tagline">
              FREE email course
            </Heading>
            <Heading size="2xl" fontWeight="bold" as="h1">
              Choosing the BEST school
            </Heading>
          </Stack>
          <Text color={'gray.900'} fontSize="xl">
            In just 7 days, you'll know what type of school is{' '}
            <Text fontWeight="bold" as="span">
              BEST
            </Text>{' '}
            for your family.
          </Text>
          <UnorderedList listStylePosition={'inside'}>
            <ListItem>Learn about the 7 most popular school choices</ListItem>
            <ListItem>Hear from the experts</ListItem>
            <ListItem>Compare the pros and cons</ListItem>
            <ListItem>Learn the right questions to ask</ListItem>
          </UnorderedList>

          <HStack spacing="3">
            <Link
              color={'pink.600'}
              fontWeight="bold"
              fontSize="lg"
              href="/courses/choosing-the-best-school"
            >
              Sign me up!
            </Link>
            <Link href="/courses/choosing-the-best-school">
              <Icon color={'pink.600'} as={FaArrowRight} />
            </Link>
          </HStack>
        </Stack>
      </Box>
    </Stack>
  </Box>
);

export default FeaturedCourse;
