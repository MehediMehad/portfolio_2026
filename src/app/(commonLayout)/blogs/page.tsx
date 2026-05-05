import BlogSearchFilters from "@/components/modules/Blogs/BlogSearchFilters";
import { BlogCard } from "@/components/shared/Card/BlogCard";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getBlogs } from "@/services/blogs";
import { BlogType, TBlog } from "@/types";
import { Suspense } from "react";

export const revalidate = 600;

const blogTypes: ("All" | BlogType)[] = [
  "All",
  "Tech",
  "Personal",
  "Lifestyle",
  "Health",
  "Travel",
  "Food",
  "Entertainment",
  "Education",
];

const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter({
    limit: "9",
    page: "1",
    ...searchParamsObj,
  });

  const blogsResponse = await getBlogs(queryString);

  const blogs: TBlog[] = blogsResponse?.data || [];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="flex items-center gap-4 text-4xl font-bold text-primary">
            Blogs
            <div className="hidden h-0.5 w-24 bg-linear-to-r from-primary to-transparent md:block" />
          </h2>

          <BlogSearchFilters blogTypes={blogTypes} />
        </div>

        <Suspense fallback={<TableSkeleton columns={3} />}>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.slug} blog={blog} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-2xl text-muted-foreground">No blogs found</p>
            </div>
          )}
        </Suspense>

        <div className="mt-16">
          <TablePagination
            currentPage={blogsResponse?.meta?.page || 1}
            totalPages={blogsResponse?.meta?.totalPage || 1}
            defaultLimit={9}
            limitOptions={[6, 9, 12, 15, 18, 21, 24, 27, 30]}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
