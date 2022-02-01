import { Box, Image } from '@chakra-ui/react';
import imageUrlBuilder from '@sanity/image-url';

import { getClient } from '~/lib/sanity/getClient';
import YouTubeVideoThumbnail from '~/components/YouTubeVideoThumbnail';

export const ArticleCoverImage = ({ mainImage, youTubeId, title, ...rest }) => {
  const sanityClient = getClient();
  const urlBuilder = imageUrlBuilder(sanityClient);
  const headerImageUrl = mainImage ? urlBuilder.image(mainImage).url() : null;

  if (youTubeId) {
    return <YouTubeVideoThumbnail youTubeId={youTubeId} title={title} />;
  }

  return <Image src={headerImageUrl} {...rest} fallback={Box} />;
};
