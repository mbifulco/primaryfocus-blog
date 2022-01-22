import { Box, Link, Stack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bgColor={'teal.500'} minHeight={'15rem'}>
      <Stack
        color={'white'}
        minH={'60px'}
        py={{ base: 4 }}
        px={{ base: 4 }}
        direction="column"
      >
        <Link href="/contact">Contact</Link>
        <span>&copy; 2022 Primaryfocus</span>
      </Stack>
    </Box>
  );
};

export default Footer;
