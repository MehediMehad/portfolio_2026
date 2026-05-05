// src/app/(commonLayout)/blogs/[slug]/page.tsx
import BlogDetailsPage from "@/components/modules/Blogs/BlogDetailsPage";
import { getBlogBySlug, getRelatedBlogs } from "@/services/blogs";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  if (!blog) {
    return <div>blog not found</div>;
  }

  return <BlogDetailsPage blog={blog} relatedBlogs={relatedBlogs} />;
};

export default Page;
