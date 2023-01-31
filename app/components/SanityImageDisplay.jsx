import { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/react';

import imageUrlBuilder from '@sanity/image-url';
import { getClient } from '~/lib/sanity/getClient';

const builder = imageUrlBuilder(getClient());

const urlFor = (source) => builder.image(source);

export const SanityImageDisplay = ({ image, ...rest }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (image) {
      const url = urlFor(image).url();
      setUrl(url);
    }
  }, [image]);

  return (
    <figure>
      <Image src={url} alt={image?.alt} />
      <figcaption>{image?.caption}</figcaption>
    </figure>
  );
};

export default SanityImageDisplay;
