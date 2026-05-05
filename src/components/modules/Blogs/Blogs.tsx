"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/shared/Card/BlogCard"; // We'll use the BlogCard you got earlier
import { getBlogs } from "@/services/blogs";
import { TMeta, TBlog, BlogType } from "@/types";

const Blogs = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [meta, setMeta] = useState<TMeta>({
    page: 1,
    limit: 9,
    total: 0,
    totalPage: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("All");

  type BlogFilterType = "All" | BlogType;

  const blogTypes: BlogFilterType[] = [
    "All",
    "Tech",
    "Personal",
    "Lifestyle",
    "Health",
    "Travel",
    "Food",
    "Entertainment",
    "Education",
  ] as const;

  // Fetch blogs
  const fetchBlogs = async (page: number, type: string) => {
    setLoading(true);
    try {
      const params: any = {
        page,
        limit: 9,
      };

      // Add type filter if not "All"
      if (type !== "All") {
        params.type = type;
      }

      const { meta: newMeta, data } = await getBlogs(params);

      setBlogs(data);
      setMeta(newMeta);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1, selectedType);
  }, [selectedType]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > meta.totalPage) return;
    fetchBlogs(page, selectedType);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <h2 className="text-4xl font-bold text-primary flex items-center gap-4">
            Blogs
            <div className="h-0.5 w-24 bg-linear-to-r from-primary to-transparent hidden md:block"></div>
          </h2>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2">
            {blogTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-5 py-2 text-sm font-medium rounded-xl border transition-all ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary hover:"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[520px]  border border-border rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.slug} blog={blog} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {blogs.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-2xl text-muted-foreground">
                  No blogs found for "{selectedType}"
                </p>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {meta.totalPage > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!meta.hasPrevPage}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-foreground">
                Page {currentPage}
              </span>
              <span className="text-muted-foreground">of</span>
              <span className="font-medium text-foreground">
                {meta.totalPage}
              </span>
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!meta.hasNextPage}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
