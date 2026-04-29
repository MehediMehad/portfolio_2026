"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import { TBlog, TRelatedBlog } from "@/types";

interface Props {
  blog: TBlog;
  index?: number;
  isVisible?: boolean;
  author?: { name: string; image: string };
}

export function BlogCard({ blog, index = 0, isVisible = true, author }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Color mapping for blog types
  const typeColors: Record<TBlog["type"], string> = {
    Tech: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Personal: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Lifestyle: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    Health: "bg-green-500/10 text-green-500 border-green-500/20",
    Travel: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    Food: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Entertainment: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    Education: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  };

  const currentTypeStyle =
    typeColors[blog.type] || "bg-primary/10 text-primary border-primary/20";

  return (
    <div
      className={`border-2 border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-all duration-500 hover:shadow-[0_10px_30px_rgba(28,199,105,0.15)] group opacity-0 ${isVisible ? `animate-fade-in-up delay-${index * 100}` : ""}`}
    >
      {/* Image */}
      <div className="h-80 bg-linear-to-r from-secondary to-background border-b-2 border-border relative overflow-hidden group-hover:border-primary/50 transition-colors">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground/30 font-bold text-2xl">
            Blog Preview
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Blog Type Badge */}
        <div className="mb-4">
          <span
            className={`inline-block px-3 py-1 text-xs font-bold rounded-md border ${currentTypeStyle}`}
          >
            {blog.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>

        {/* Overview */}
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
          {blog.overview}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-6">
            <span className="text-xs font-semibold text-primary mb-2 block">
              Tags:
            </span>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-md border border-border bg-background text-muted-foreground group-hover:border-primary/30 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Meta & Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <span>{formatDate(blog.createdAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-border group-hover:border-primary/20 transition-colors mt-auto">
          <div className="flex items-center gap-3">
            {author?.image ? (
              <Image
                src={author.image}
                alt={author.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-primary"
              />
            ) : author?.name ? (
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold text-xs">
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            ) : null}

            {author?.name && (
              <span className="font-medium text-foreground text-sm">
                {author.name}
              </span>
            )}
          </div>

          <Link
            href={`/blogs/${blog.slug}`} /// blog/${blog.slug}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
          >
            Read Full
            <ArrowRightIcon className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
