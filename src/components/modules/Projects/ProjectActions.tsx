"use client";

import { useState } from "react";

import { TProject } from "@/types";
import { Trash2Icon, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteProjectModal from "./DeleteProjectModal";

type Props = {
  project: TProject;
};

const ProjectActions = ({ project }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="absolute top-4 right-4 z-10 gap-2 hidden group-hover:flex transition-all duration-500">
        <Link
          href={`/dashboard/projects/${project.slug}/edit`}
          className="p-2 rounded-md bg-background/80 backdrop-blur border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
        >
          <PencilIcon className="w-4 h-4" />
        </Link>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="p-2 rounded-md bg-background/80 backdrop-blur border border-border text-muted-foreground hover:text-red-500 hover:border-red-500 transition-colors"
        >
          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>

      <DeleteProjectModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        project={project}
      />
    </>
  );
};

export default ProjectActions;
