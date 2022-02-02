const siteUrl =
  typeof window !== 'undefined'
    ? window.ENV.SITE_URL || 'http://localhost:3000'
    : process.env.SITE_URL || 'http://localhost:3000';

const config = {
  // Your website's name, used for favicons, app name/title, and app notifications.
  siteUrl,
  social: {
    youTube: 'https://youtube.com/c/primaryfocus',
    instagram: 'https://instagram.com/primaryfocus_',
  },
  meta: {
    creator: 'Primary Focus',
    title: 'Primary Focus with Miss Natalie',
    description:
      'Articles, videos, and resources for teachers and parents of elementary aged children.',
    publisher: siteUrl,
    keywords:
      'education, kindergarten, learning, teaching, parenting, children',
  },
};

export default config;
