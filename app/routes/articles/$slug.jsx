import { useEffect, useState } from 'react';
import { useLoaderData } from 'remix';
import BlockContent from '@sanity/block-content-to-react';

import { getClient } from '~/lib/sanity/getClient';
import { filterDataToSingleItem } from '~/lib/sanity/filterDataToSingleItem';
import Preview from '~/components/Preview';

export async function loader({ params, request }) {
  const requestUrl = new URL(request?.url);

  //TODO: update this to load expected preview value from process.env.SANITY_PREVIEW_SECRET
  const preview = requestUrl?.searchParams?.get('preview') == 'preview';

  // Query for _all_ documents with this slug
  // There could be two: Draft and Published!
  const query = `*[_type == "post" && slug.current == $slug]`;
  const queryParams = { slug: params.slug };
  const initialData = await getClient(preview).fetch(query, queryParams);

  return {
    initialData,
    preview,
    query: preview ? query : null,
    queryParams: preview ? queryParams : null,
  };
}

export default function Post() {
  let { initialData, preview, query, queryParams } = useLoaderData();

  // If `preview` mode is active, its component update this state for us
  const [data, setData] = useState(initialData);

  const post = filterDataToSingleItem(data, preview);

  return (
    <div>
      {preview ? (
        <Preview
          data={data}
          setData={setData}
          query={query}
          queryParams={queryParams}
        />
      ) : null}
      {post?.title ? <h1>{post.title}</h1> : null}
      {post?.body ? <BlockContent blocks={post.body} /> : null}
    </div>
  );
}
