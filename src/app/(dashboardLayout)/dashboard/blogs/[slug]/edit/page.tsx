export const dynamic = "force-dynamic";
import EditBlogForm from "@/components/modules/DashboardPages/EditBlogForm";
import { getBlogBySlug } from "@/services/blogs";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBlogForm blog={blog} />
    </Suspense>
  );
};

export default EditBlogPage;
