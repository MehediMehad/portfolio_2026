"use client";
import { ArrowRightIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TBlog } from "@/types";
import { BlogCard } from "@/components/shared/Card/BlogCard";

type Props = {
  blogs: TBlog[];
};

export function FeaturedBlogs({ blogs }: Props) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="blogs" className="py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <div
          className={`flex justify-between items-end mb-12 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
        >
          <h2 className="text-4xl font-bold text-primary flex items-center gap-4">
            Featured Blogs
            <div className="h-0.5 w-24 bg-linear-to-r from-primary to-transparent hidden md:block"></div>
          </h2>
          <a
            href="/blogs"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group font-medium"
          >
            View All
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
              isVisible={true}
            />
          ))}

          {/* Empty State */}
          {!blogs?.length && (
            <p className="text-muted-foreground col-span-full text-center">
              No blogs found
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
