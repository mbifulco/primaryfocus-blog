import { Container, Stack } from '@chakra-ui/react';

import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Stack spacing={8} minH={'100vh'}>
      <Navigation />
      <Container maxW={'6xl'} alignSelf={'center'}>
        <Stack>{children}</Stack>
      </Container>
      <Footer />
    </Stack>
  );
};

export default Layout;
