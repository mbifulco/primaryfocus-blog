import BlockContent from '@sanity/block-content-to-react';

import { Heading, List, Link, ListItem, Text } from '@chakra-ui/react';

import SanityImageDisplay from '~/components/SanityImageDisplay';
import { config } from '~/lib/sanity/config';

const ImageRenderer = ({ node }) => <SanityImageDisplay image={node} />;

const BlockRenderer = (props) => {
  const { style = 'normal' } = props.node;

  // set up headings based on the style sanity feeds into block descriptions
  // this regex pulls out the heading number from the style string
  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '');
    return (
      <Heading m={0} p={0} as={`h${Number.parseInt(level) + 1}`}>
        {props.children}
      </Heading>
    );
  }
  switch (style) {
    case 'normal':
      return <Text>{props.children}</Text>;
    case 'blockquote':
      return (
        <Text
          as="blockquote"
          paddingLeft="1rem"
          borderLeft={'10px solid'}
          borderColor={'teal.600'}
          fontSize="larger"
          color={'gray.700'}
        >
          {props.children}
        </Text>
      );
  }

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props);
};

const CustomList = ({ options, type, ...rest }) => {
  if (type === 'bullet') {
    return (
      <List styleType={'disc'} stylePosition={'inside'} as="ul" {...rest} />
    );
  }
  return (
    <List
      styleType={'number'}
      stylePosition={'inside'}
      as="ol"
      {...rest}
      m={0}
      p={0}
    />
  );
};

// the structure for this insane object came from
// @sanity/block-content-to-hyperscript/lib/serializers.js
// I apologize in advance to my future self for having to deal with this
// look for `var = defaultSerializers = {` somewhere in that file
const serializers = {
  container: ({ children }) => <>{children}</>,
  types: {
    block: BlockRenderer,
    image: ImageRenderer,
  },
  list: CustomList,
  bullet: CustomList,
  listItem: (props) => <ListItem>{props.children}</ListItem>,
  marks: {
    strong: (props) => <Text as="strong">{props.children}</Text>,
    em: (props) => <Text as="em">{props.children}</Text>,
    code: (props) => <Text as="code">{props.children}</Text>,
    underline: (props) => <Text as="u">{props.children}</Text>,
    'strike-through': (props) => <Text as="s">{props.children}</Text>,
    link: (props) => (
      <Link href={props?.mark?.href || props.children[0]} color={'teal.500'}>
        {props.children}
      </Link>
    ),
  },
};

const BlockContentWrapper = ({ children }) => {
  if (!children) return null;

  return (
    <BlockContent
      projectId={config.projectId}
      dataset={config.dataset}
      blocks={children}
      serializers={serializers}
    />
  );
};

export default BlockContentWrapper;
