import { Link, useLoaderData } from 'remix';
import { getClient } from '~/lib/sanity/getClient';

export async function loader() {
  const posts = await getClient().fetch(
    `*[_type == "post"]{ _id, title, slug }`,
  );

  return { posts };
}

export default function Index() {
  let { posts } = useLoaderData();

  return (
    <div>
      {posts?.length > 1
        ? posts.map((post) => (
            <div style={{ padding: 10 }} key={post._id}>
              <Link to={`/articles/${post.slug.current}`}>{post.title}</Link>
            </div>
          ))
        : null}
    </div>
  );
}
