import {
  Button,
  Heading,
  Image,
  Input,
  Link,
  ListItem,
  Skeleton,
  Spacer,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

const ChoosingTheBestSchoolPage = () => (
  <>
    <Heading size="sm" as="p" className="tagline">
      A{' '}
      <Text as="span" color={'pink.600'}>
        FREE
      </Text>{' '}
      email course from Primary Focus
    </Heading>
    <Heading size="2xl" fontWeight="bold" as="h1" pb={8}>
      Choosing the BEST school
    </Heading>

    <Stack
      direction={{
        base: 'column',
        lg: 'row',
      }}
      borderRadius="xl"
      outline={'1px solid #f7f7f7'}
      overflow={'hidden'}
      boxShadow="0 0px 2px rgb(0 0 0 / 15%)"
      maxW="3xl"
      alignSelf={'center'}
      id="enroll"
    >
      <Image
        src="/images/courses/choosing-the-best-school/cover.png"
        alt="What is the BEST school?"
        fallback={<Skeleton />}
        minW="300px"
        maxW={{ base: '100%', lg: '50%' }}
        objectFit="cover"
        flex="1"
      />
      <Stack px={12} py={16} fontSize="lg">
        <Text as="h2" fontWeight="bold" fontSize="xl">
          Choosing the right school sucks...
        </Text>
        <Text>
          ...but it doesn't have to! In just 7 days, you'll decide{' '}
          <Text as="span" fontWeight="bold">
            which is the BEST school
          </Text>{' '}
          for your child.
        </Text>
        <Text>
          Sign up for the email course to learn about the most popular methods
          of schooling, including:{' '}
          <Text as="span" fontWeight="bold">
            Montessori, IB, &amp; Unschooling.
          </Text>{' '}
        </Text>
        <form action="https://app.convertkit.com/forms/4800374/subscriptions">
          <Stack>
            <Input
              name="email_address"
              aria-label="Email Address"
              placeholder="Email Address"
              required=""
              type="email"
              size="lg"
              variant="flushed"
            />
            <Input
              aria-label="First Name"
              name="fields[first_name]"
              placeholder="First Name"
              type="text"
              size="lg"
              variant="flushed"
            />
            <Button type="submit" colorScheme={'pink'} borderRadius={3}>
              Send it my way!
            </Button>
            <Text color="gray.500" fontSize="sm">
              We respect your privacy. Unsubscribe at anytime.
            </Text>
          </Stack>
        </form>
      </Stack>
    </Stack>

    <Spacer gap={20} />
    <Stack
      maxW="clamp(65ch, 75ch, 50%)"
      alignSelf={'center'}
      pt={10}
      fontSize="lg"
      spacing={4}
    >
      <Text>
        Choosing the best school to enroll your child in is hard work. Whether
        you’ve moved to a new city and need to choose a school or your four or
        five year old is finally ready for kindergarten, picking out the right
        school can feel like a full time job.
      </Text>

      <Text>That's why I created...</Text>

      <Text fontWeight={'bold'}>
        Choosing the BEST School: A FREE email course from Primary Focus
      </Text>

      <Text>
        No more stress or getting advice from your unqualified neighbor.
      </Text>
      <Text>
        Hear from experts about 7 different types of schools to answer the
        question:{' '}
        <Text as="span" fontWeight="bold">
          should I send my child to...
        </Text>
      </Text>

      <UnorderedList listStylePosition={'inside'} pl={6}>
        <ListItem>Public School</ListItem>
        <ListItem>Private School</ListItem>
        <ListItem>
          International Baccalaureate Primary Years Programme (IB PYP) School
        </ListItem>
        <ListItem>Montessori elementary</ListItem>
        <ListItem>Reggio Emilia kindergarten</ListItem>
        <ListItem>Leader in Me school</ListItem>
        <ListItem>Homeschool</ListItem>
        <ListItem>Unschool</ListItem>
      </UnorderedList>

      <Text>Learn the real questions to ask as your search for a school</Text>

      <Text>
        …and find out which programs may be available for free through public
        and charter schools.
      </Text>

      <Link
        alignSelf={'center'}
        href="#enroll"
        fontSize="3xl"
        color={'pink.600'}
        fontWeight="bold"
      >
        Sign up now!
      </Link>
    </Stack>
  </>
);

export default ChoosingTheBestSchoolPage;
