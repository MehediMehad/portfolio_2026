// src/app/(commonLayout)/blogs/[slug]/page.tsx
import BlogDetailsPage from "@/components/modules/Blogs/BlogDetailsPage";
import { getMyInfo } from "@/services/auth/getUserInfo";
import { getBlogBySlug, getRelatedBlogs } from "@/services/blogs";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const myInfo = await getMyInfo();

  const blog = await getBlogBySlug(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  if (!blog) {
    return <div>blog not found</div>;
  }

  const author = {
    name: myInfo?.name || "N/A",
    image: myInfo?.image || "",
  };

  return (
    <BlogDetailsPage blog={blog} relatedBlogs={relatedBlogs} author={author} />
  );
};

export default Page;
