export const getYouTubeThumbnailUrlForId = (youTubeId) => {
  if (!youTubeId) return null;
  return `https://img.youtube.com/vi/${youTubeId}/0.jpg`;
};

export default getYouTubeThumbnailUrlForId;
