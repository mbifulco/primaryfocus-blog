import { format } from 'date-fns';

import config from '~/config';
import { getClient } from '~/lib/sanity/getClient';
import { getAllNewsletters } from '../lib/util/convertKit.server';

export const fullUrl = (url) => {
  if (url.startsWith('http')) {
    return url;
  }

  if (url.startsWith('/')) {
    return `${config.siteUrl}${url}`;
  }

  return `${config.siteUrl}/${url}`;
};

export const SitemapUrl = ({
  frequency = 'daily',
  priority = 1.0,
  url,
  lastModified = new Date(),
}) => {
  if (!url) return null;

  // format date as yyyy-mm-dd
  const formattedLastModified = format(lastModified, 'yyyy-MM-dd');

  return `<url>
    <loc>${fullUrl(url)}</loc>
    <lastmod>${formattedLastModified}</lastmod>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

export async function loader({ params }) {
  const staticUrls = [
    '/',
    '/about',
    '/contact',
    '/articles',
    '/tags',
    '/courses/choosing-the-best-school',
  ];

  const newsletters = await getAllNewsletters();

  const posts = await getClient().fetch(
    `*[_type == "post"]{
      slug,
      publishedAt,
      "tags": tags[]->{title, slug}
    } `,
  );

  const tags = await getClient().fetch(
    `*[_type == "tag"]{
      slug,
      title
    } `,
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls.map((url) => SitemapUrl({ url })).join('\n')}
    ${posts
      .map((post) => SitemapUrl({ url: `/articles/${post?.slug?.current}` }))
      .join('\n')}
    ${tags
      .map((tag) => SitemapUrl({ url: `/tags/${tag?.slug?.current}` }))
      .join('\n')}
    ${newsletters
      .map((newsletter) => SitemapUrl({ url: `/newsletter/${newsletter.id}` }))
      .join('\n')}
  </urlset>
  `;
  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
