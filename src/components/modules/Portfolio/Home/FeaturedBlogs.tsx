"use client";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

export interface TBlog {
  id: string;
  title: string;
  overview: string;
  image: string;
  tags: string[];
  createdAt: string;
}

type Props = {
  blogs: TBlog[];
  author: { name: string; image: string };
};

export function FeaturedBlogs({ blogs, author }: Props) {
  const { ref, isVisible } = useScrollAnimation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          {blogs?.map((post, index) => (
            <div
              key={post.id}
              className={`bg-card border-2 border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-all duration-500 hover:shadow-[0_10px_30px_rgba(28,199,105,0.1)] group opacity-0 ${isVisible ? `animate-fade-in-up delay-${index * 100}` : ""}`}
            >
              {/* Image */}
              <div className="h-80 bg-linear-to-r from-secondary to-background border-b-2 border-border relative overflow-hidden flex items-center justify-center p-8 group-hover:border-primary/50 transition-colors">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground/30 font-bold text-2xl">
                    No Image
                  </div>
                )}
                {/* <h3 className="text-3xl font-bold text-foreground/50 text-center relative z-10 group-hover:text-primary/50 transition-colors">
                  {post.title.split(":")[0]}
                </h3> */}
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-bold rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-6 line-clamp-2 flex-1">
                  {post.overview}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t-2 border-border group-hover:border-primary/20 transition-colors mt-auto">
                  <div className="flex items-center gap-3">
                    {author.image ? (
                      <Image
                        src={author.image}
                        alt={author.name}
                        width={32}
                        height={32}
                        loading="lazy"
                        className="w-8 h-8 rounded-full object-cover border border-primary"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold text-xs">
                        {author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("") || "MM"}
                      </div>
                    )}
                    <span className="font-medium text-foreground">
                      {author.name}
                    </span>
                  </div>
                  <a
                    href={`/blogs/${post.id}`}
                    className="px-4 py-2 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
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
