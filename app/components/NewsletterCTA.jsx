import { FormEvent, ChangeEvent, useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('initial');
  const [error, setError] = useState(false);

  return (
    <Container
      maxW={'xl'}
      bg={useColorModeValue('white', 'whiteAlpha.100')}
      boxShadow={`
        5.17px 5.17px 12.925px hsl(0, 0%, 78.8%),
        -5.17px -4.17px 12.925px hsl(0, 0%, 121.2%),
        inset -0.53px -0.53px 2.12px hsl(0, 0%, 78.8%),
        inset 0.53px 0.53px 2.12px hsl(0, 0%, 121.2%);
      `}
      rounded={'lg'}
      p={6}
      direction={'column'}
      alignSelf={'center'}
    >
      <Heading
        as={'h2'}
        textAlign={'center'}
        fontSize={{ base: 'xl', sm: '2xl' }}
        mb={5}
      >
        Get updates from me in you inbox
      </Heading>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        as={'form'}
        spacing={'12px'}
        onSubmit={(e) => {
          e.preventDefault();
          setError(false);
          setState('submitting');

          // remove this code and implement your submit logic right here
          setTimeout(() => {
            if (email === 'fail@example.com') {
              setError(true);
              setState('initial');
              return;
            }

            setState('success');
          }, 1000);
        }}
      >
        <FormControl>
          <Input
            variant={'solid'}
            borderWidth={1}
            color={'gray.800'}
            _placeholder={{
              color: 'gray.400',
            }}
            borderColor={useColorModeValue('gray.300', 'gray.700')}
            id={'email'}
            type={'email'}
            required
            placeholder={'Your Email'}
            aria-label={'Your Email'}
            value={email}
            disabled={state !== 'initial'}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl w={{ base: '100%', md: '40%' }}>
          <Button
            colorScheme={state === 'success' ? 'green' : 'purple'}
            isLoading={state === 'submitting'}
            w="100%"
            type={state === 'success' ? 'button' : 'submit'}
          >
            {state === 'success' ? <CheckIcon /> : 'Submit'}
          </Button>
        </FormControl>
      </Stack>
      <Text mt={2} color={error ? 'red.500' : 'gray.500'}>
        {error
          ? 'Oh no an error occured! 😢 Please try again later.'
          : "You won't receive any spam! ✌️"}
      </Text>
    </Container>
  );
};

export default NewsletterCTA;
