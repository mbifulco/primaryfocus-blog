import { Box, Image } from '@chakra-ui/react';
import imageUrlBuilder from '@sanity/image-url';

import { getClient } from '~/lib/sanity/getClient';
import { getYouTubeThumbnailUrlForId } from '~/lib/util/getYouTubeThumbnailUrlForId';

export const ArticleCoverImage = ({ mainImage, youTubeId, title, ...rest }) => {
  const sanityClient = getClient();
  const urlBuilder = imageUrlBuilder(sanityClient);
  const headerImageUrl = mainImage ? urlBuilder.image(mainImage).url() : null;

  if (youTubeId) {
    return (
      <Image
        src={getYouTubeThumbnailUrlForId(youTubeId)}
        alt={`${title} thumbnail`}
        clipPath={'inset(40px 0px)'}
        margin="-40px 0"
      />
    );
  }

  return <Image src={headerImageUrl} {...rest} fallback={Box} />;
};
