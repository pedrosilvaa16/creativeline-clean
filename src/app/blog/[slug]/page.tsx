// força o ficheiro a ser um MÓDULO para o TypeScript
import type { FC } from "react";

type PageProps = { params: { slug: string } };

const BlogPostPage: FC<PageProps> = ({ params }) => {
  return (
    <main style={{ padding: 24 }}>
      <h1>Blog post</h1>
      <p>
        Slug: <code>{params.slug}</code>
      </p>
    </main>
  );
};

export default BlogPostPage;
