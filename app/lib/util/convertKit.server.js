const CONVERTKIT_API_SECRET = process.env.CONVERTKIT_API_SECRET;

export const getAllNewsletters = async () => {
  const response = await fetch(
    `https://api.convertkit.com/v3/broadcasts?api_secret=${CONVERTKIT_API_SECRET}`,
  );
  const data = await response.json();

  const { broadcasts } = data;

  const newsletters = await Promise.all(
    broadcasts.map((broadcast) => getNewsletter(broadcast.id)),
  );

  return newsletters
    .filter((newsletter) => !!newsletter.published_at)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
};

export const getNewsletter = async (broadcastId) => {
  const res = await fetch(
    `https://api.convertkit.com/v3/broadcasts/${broadcastId}?api_secret=${CONVERTKIT_API_SECRET}`,
  );
  const { broadcast: newsletter } = await res.json();

  return newsletter;
};
