import { Liquid } from 'liquidjs';
const engine = new Liquid();

export const broadcastTemplateParse = ({ template, data }) => {
  const t = template.replaceAll('&quot;', '"');
  const res = engine.parseAndRenderSync(t, data);
  return res;
};

export const newsletterHasValidThumbnail = (newsletter) => {
  const { thumbnail_url: thumbnailUrl } = newsletter;
  if (!thumbnailUrl) return false;
  if (thumbnailUrl.startsWith('https://functions-js.convertkit.com/icons'))
    return false;
  return true;
};
