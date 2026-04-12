import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  ArrowRightIcon,
  TagIcon,
  Layers3Icon,
} from "lucide-react";
import { TBlogDetails, TRelatedBlog } from "@/types";
import { BlogCard } from "@/components/shared/Card/BlogCard";

type Props = {
  blog: TBlogDetails;
  relatedBlogs: TRelatedBlog[];
  author: { name: string; image: string };
};

const BlogDetailsPage = ({ blog, relatedBlogs, author }: Props) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const typeColors: Record<TBlogDetails["type"], string> = {
    Tech: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Personal: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Lifestyle: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    Health: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Travel: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    Food: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Entertainment: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    Education: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  };

  const currentTypeStyle =
    typeColors[blog.type] || "bg-primary/10 text-primary border-primary/20";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Only */}
      <section className="container mx-auto px-4 pt-16 md:pt-20">
        <div className="relative h-[260px] w-full overflow-hidden rounded-2xl border border-border sm:h-[360px] md:h-[620px]">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-card text-muted-foreground">
              No Preview Available
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Content */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-10">
              {/* Blog Meta */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold ${currentTypeStyle}`}
                >
                  {blog.type}
                </span>

                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-5 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-4xl">
                {blog.title}
              </h1>

              {/* Overview */}
              <p className="mb-10 text-base leading-8 text-muted-foreground md:text-lg">
                {blog.overview}
              </p>

              {/* Divider */}
              <div className="mb-10 border-t border-border" />

              {/* Content */}
              <div
                className="
                  prose prose-invert max-w-none
                  prose-headings:text-foreground
                  prose-headings:scroll-mt-24
                  prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-3xl prose-h2:font-bold
                  prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-2xl prose-h3:font-semibold
                  prose-p:text-muted-foreground prose-p:leading-8
                  prose-strong:text-foreground
                  prose-a:text-primary
                  prose-a:no-underline hover:prose-a:underline
                  prose-li:text-muted-foreground
                  prose-ul:pl-5
                  prose-ol:pl-5
                  prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                  prose-img:rounded-2xl
                  prose-code:text-primary
                  prose-pre:border prose-pre:border-border prose-pre:bg-background
                "
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-5 text-xl font-bold text-foreground">
                  Article Info
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border border-border bg-background p-2.5">
                      <Layers3Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium text-foreground">{blog.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border border-border bg-background p-2.5">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Published</p>
                      <p className="font-medium text-foreground">
                        {formatDate(blog.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-5">
                    <h3 className="mb-4 text-lg font-bold text-foreground">
                      Tags
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          <TagIcon className="h-3.5 w-3.5 text-primary" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  Want more articles?
                </h3>
                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                  Explore more blogs, stories, and practical insights.
                </p>

                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Browse All Blogs
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="container mx-auto px-4 pb-20">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
                More to read
              </p>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Related Articles
              </h2>
            </div>

            <Link
              href="/blogs"
              className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary md:flex"
            >
              View all blogs
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {relatedBlogs.map((relatedBlog, index) => (
              <BlogCard
                key={relatedBlog.id}
                blog={relatedBlog}
                author={author}
                index={index}
                isVisible={true}
              />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              View all blogs
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetailsPage;
