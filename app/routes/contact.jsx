import {
  Heading,
  Image,
  UnorderedList,
  ListItem,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';

const ContactPage = () => {
  const theme = useTheme();
  const pictureSize = 250;
  return (
    <Stack direction={['column', 'column', 'row']} spacing={12}>
      <Image
        height={pictureSize}
        width={pictureSize}
        src="/images/miss-natalie-square.png"
        alt="Miss Natalie headshot"
      />
      <Stack spacing={4}>
        <Heading as="h1">Interested in working together? Get in touch!</Heading>
        <Text>A few easy options:</Text>
        <UnorderedList listStylePosition={'inside'}>
          <ListItem>
            DM me on Instagram (
            <a
              style={{ color: theme.colors.pink[500] }}
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://www.instagram.com/primaryfocus_/"
            >
              @primaryfocus_
            </a>
            )
          </ListItem>
          <ListItem>
            DM me on Twitter (
            <a
              style={{ color: theme.colors.pink[500] }}
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://twitter.com/PrimaryFocus_"
            >
              @PrimaryFocus_
            </a>
            )
          </ListItem>
          <ListItem>
            Send me an email:{' '}
            <a
              style={{ color: theme.colors.pink[500] }}
              href="mailto:hello@primaryfocus.tv"
            >
              hello@primaryfocus.tv
            </a>
          </ListItem>
        </UnorderedList>
        <Text>Thanks so much! Looking forward to hearing from you.</Text>
      </Stack>
    </Stack>
  );
};

export default ContactPage;
