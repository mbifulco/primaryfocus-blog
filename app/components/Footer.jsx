import {
  Box,
  Button,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

import config from '~/config';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.500', 'whiteAlpha.400'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Primary Focus</ListHeader>
            <Link href={'https://youtube.com/c/primaryfocus'} isExternal>
              YouTube
            </Link>
            <Link href={'/'}>Articles</Link>
            <Link href={'/tags'}>Categories</Link>
            <Link href={'/contact'}>Contact</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Follow me!</ListHeader>
            <Link href={config.social.instagram}>
              <Stack direction={'row'} alignItems={'center'}>
                <FaInstagram />
                <Text>@primaryfocus_</Text>
              </Stack>
            </Link>
            <Link href={config.social.youTube}>
              <Stack direction={'row'} alignItems={'center'}>
                <FaYoutube />
                <Text>Primary Focus</Text>
              </Stack>
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text>
            &copy; 2021 - {new Date().getFullYear()} Primary Focus. All rights
            reserved
          </Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'YouTube'} href={config.social.youTube}>
              <FaYoutube height={'2rem'} width={'2rem'} />
            </SocialButton>
            <SocialButton label={'Instagram'} href={config.social.instagram}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
