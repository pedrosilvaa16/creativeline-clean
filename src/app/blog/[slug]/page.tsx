export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Blog post</h1>
      <p>Slug: <code>{params.slug}</code></p>
    </main>
  );
}
