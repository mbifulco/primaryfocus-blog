// eslint-disable-next-line no-undef
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

  // hackish dedupe here - sometimes we publish a newsletter a _second_ time as a correction, or to a different audience.
  // In those cases, they should always have the same subject. We're using subject as a way to deduplicate newsletters in that case
  const dedupedBySubject = {};

  // return only newsletters that have been published, and sort by most recent to oldest
  newsletters
    .filter((newsletter) => !!newsletter.published_at)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .forEach((newsletter) => {
      // the first one we encounter in this order will be the newest, so if there's one already we don't make any changes to the object map
      if (!dedupedBySubject[newsletter.subject])
        dedupedBySubject[newsletter.subject] = newsletter;
    });

  let nls = [];
  // iterate over the map we have of subject->newsletter, and push into a fresh array, which we'll return
  for (let subject in dedupedBySubject) {
    nls.push(dedupedBySubject[subject]);
  }

  return nls;
};

export const getNewsletter = async (broadcastId) => {
  const res = await fetch(
    `https://api.convertkit.com/v3/broadcasts/${broadcastId}?api_secret=${CONVERTKIT_API_SECRET}`,
  );
  const { broadcast: newsletter } = await res.json();

  return newsletter;
};
