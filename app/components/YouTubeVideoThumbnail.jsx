import { Image } from '@chakra-ui/react';

const YouTubeVideoThumbnail = ({ title, youTubeId }) => {
  if (!youTubeId) return null;
  return (
    <Image
      src={`https://img.youtube.com/vi/${youTubeId}/0.jpg`}
      alt={`${title} thumbnail`}
      clipPath={'inset(40px 0px)'}
      margin="-40px 0"
    />
  );
};

export default YouTubeVideoThumbnail;
