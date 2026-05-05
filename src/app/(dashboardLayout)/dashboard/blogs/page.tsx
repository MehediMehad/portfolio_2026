import { BlogCard } from "@/components/shared/Card/BlogCard";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getBlogs } from "@/services/blogs";
import { TBlog } from "@/types";
import { Suspense } from "react";

export const revalidate = 600;

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter({
    limit: "6",
    page: "1",
    ...searchParamsObj,
  });

  const blogsResponse = await getBlogs(queryString);
  const blogs: TBlog[] = blogsResponse?.data || [];

  return (
    <>
      <Suspense fallback={<TableSkeleton columns={3} />}>
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} isAdmin />
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
          defaultLimit={6}
          limitOptions={[6, 9, 12, 15, 18, 21, 24, 27, 30]}
        />
      </div>
    </>
  );
};

export default page;
