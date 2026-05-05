"use client";

import { useState } from "react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

import { TBlog } from "@/types";

import DeleteBlogModal from "./DeleteBlogModal";

type Props = {
  blog: TBlog;
};

const BlogActions = ({ blog }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="absolute top-4 right-4 z-10 hidden gap-2 transition-all duration-500 group-hover:flex">
        <Link
          href={`/dashboard/blogs/${blog.slug}/edit`}
          className="rounded-md border border-border bg-background/80 p-2 text-muted-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
        >
          <PencilIcon className="h-4 w-4" />
        </Link>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="rounded-md border border-border bg-background/80 p-2 text-muted-foreground backdrop-blur transition-colors hover:border-red-500 hover:text-red-500"
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
      </div>

      <DeleteBlogModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        blog={blog}
      />
    </>
  );
};

export default BlogActions;
