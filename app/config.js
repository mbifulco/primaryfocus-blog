const config = {
  // Your website's name, used for favicons, app name/title, and app notifications.
  siteUrl:
    typeof window !== 'undefined'
      ? window.ENV.SITE_URL || 'http://localhost:3000'
      : process.env.SITE_URL || 'http://localhost:3000',
  social: {
    youTube: 'https://youtube.com/c/primaryfocus',
    instagram: 'https://instagram.com/primaryfocus_',
  },
};

export default config;
