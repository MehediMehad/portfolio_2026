"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { softDeleteBlog } from "@/services/blogs";
import { TBlog } from "@/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: TBlog;
};

const DeleteBlogModal = ({ open, onOpenChange, blog }: Props) => {
  const router = useRouter();
  const [typedTitle, setTypedTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const isMatched = useMemo(
    () => typedTitle.trim() === blog.title.trim(),
    [blog.title, typedTitle],
  );

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setTypedTitle("");
    }
  };

  const handleDelete = () => {
    if (!isMatched || isPending) return;

    startTransition(async () => {
      const result = await softDeleteBlog(blog.id, blog.slug);

      if (!result.success) {
        toast.error(result.message || "Failed to delete blog");
        return;
      }

      toast.success(result.message || "Blog deleted successfully");
      handleClose(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className=" overflow-hidden border border-white/10 bg-[#080d1c] p-0 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <DialogHeader className="border-b border-white/10 px-6 py-6 text-left">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 text-red-400">
            <Trash2Icon className="h-8 w-8" />
          </div>

          <DialogTitle className="text-3xl font-bold text-white">
            Delete Blog
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-slate-300">
            You are about to delete the following blog:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 overflow-hidden px-6 py-6">
          <div className="flex overflow-hidden gap-4 rounded-xl border border-indigo-500/20 bg-[#0d1428] p-4">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-slate-900">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-500">
                  No image
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 overflow-hidden">
              <h3 className="line-clamp-2 wrap-break-word text-lg font-semibold text-violet-400">
                {blog.title}
              </h3>
              <p className="mt-1 line-clamp-2 wrap-break-word text-sm text-slate-300">
                {blog.overview}
              </p>
              {blog.tags?.length > 0 && (
                <p className="mt-2 line-clamp-2 wrap-break-word text-sm text-slate-400">
                  <span className="font-medium text-violet-300">Tags:</span>{" "}
                  {blog.tags.join(", ")}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-red-500/30 bg-red-500/8 p-4 text-red-300">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm leading-6">
                This action cannot be undone. This will permanently delete the
                blog and all related data, files, and information.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-100">
              To confirm, please type the blog title below.
            </p>

            <Input
              value={typedTitle}
              onChange={(e) => setTypedTitle(e.target.value)}
              placeholder={`Type "${blog.title}" here`}
              className="h-12 w-full min-w-0 border-violet-500/40 bg-[#090f20] text-white placeholder:text-slate-500 focus-visible:border-violet-400 focus-visible:ring-violet-500/20"
            />

            <p
              className={`text-sm ${isMatched ? "text-emerald-400" : "text-violet-300"}`}
            >
              {isMatched
                ? "Blog title matched. You can delete it now."
                : "Please type the exact blog title to confirm deletion."}
            </p>
          </div>
        </div>

        <DialogFooter className="border-t border-white/10 bg-[#060b17] px-6 py-5 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={isPending}
            className="border-white/10 bg-transparent text-slate-200 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={!isMatched || isPending}
            className="min-w-40"
          >
            <Trash2Icon className="h-4 w-4" />
            {isPending ? "Deleting..." : "Delete Blog"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlogModal;
