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
import { softDeleteProject } from "@/services/projects";
import { TProject } from "@/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: TProject;
};

const DeleteProjectModal = ({ open, onOpenChange, project }: Props) => {
  const router = useRouter();
  const [typedTitle, setTypedTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const isMatched = useMemo(
    () => typedTitle.trim() === project.title.trim(),
    [project.title, typedTitle]
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
      const result = await softDeleteProject(project.id, project.slug);

      if (!result.success) {
        toast.error(result.message || "Failed to delete project");
        return;
      }

      toast.success(result.message || "Project deleted successfully");
      handleClose(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[560px] overflow-hidden border border-white/10 bg-[#080d1c] p-0 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <DialogHeader className="border-b border-white/10 px-6 py-6 text-left">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 text-red-400">
            <Trash2Icon className="h-8 w-8" />
          </div>

          <DialogTitle className="text-3xl font-bold text-white">
            Delete Project
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-slate-300">
            You are about to delete the following project:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 py-6">
          <div className="flex gap-4 rounded-xl border border-indigo-500/20 bg-[#0d1428] p-4">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-slate-900">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-500">
                  No image
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold text-violet-400">
                {project.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-300">
                {project.overview}
              </p>
              {project.techStack?.length > 0 && (
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                  <span className="font-medium text-violet-300">Tech Stack:</span>{" "}
                  {project.techStack.join(", ")}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-red-500/30 bg-red-500/8 p-4 text-red-300">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm leading-6">
                This action cannot be undone. This will permanently delete the
                project and all related data, files, and information.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-100">
              To confirm, please type the project title below.
            </p>

            <Input
              value={typedTitle}
              onChange={(e) => setTypedTitle(e.target.value)}
              placeholder={`Type "${project.title}" here`}
              className="h-12 border-violet-500/40 bg-[#090f20] text-white placeholder:text-slate-500 focus-visible:border-violet-400 focus-visible:ring-violet-500/20"
            />

            <p
              className={`text-sm ${isMatched ? "text-emerald-400" : "text-violet-300"}`}
            >
              {isMatched
                ? "Project title matched. You can delete it now."
                : "Please type the exact project title to confirm deletion."}
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
            {isPending ? "Deleting..." : "Delete Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectModal;
