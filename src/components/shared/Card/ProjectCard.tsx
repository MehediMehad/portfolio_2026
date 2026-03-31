"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLinkIcon, GithubIcon, ArrowRightIcon } from "lucide-react";
import { TProject } from "@/types/projects";

interface Props {
  project: TProject;
  index?: number;
  isVisible?: boolean;
}

export function ProjectCard({ project, index = 0, isVisible }: Props) {
  // Color mapping for project types
  const typeColors: Record<string, string> = {
    Full_Stack: "bg-violet-500/10 text-violet-500 border-violet-500/30",
    Frontend: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    Backend: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    Dashboard: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    Mobile: "bg-rose-500/10 text-rose-500 border-rose-500/30",
    New_Feature: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
    Experiment: "bg-purple-500/10 text-purple-500 border-purple-500/30",
    Fun: "bg-pink-500/10 text-pink-500 border-pink-500/30",
    Learning: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    Client: "bg-teal-500/10 text-teal-500 border-teal-500/30",
    Open_Source: "bg-lime-500/10 text-lime-500 border-lime-500/30",
    Other: "bg-gray-500/10 text-gray-500 border-gray-500/30",
  };
  return (
    <div
      className={`bg-card border-2 border-border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-all duration-500 hover:shadow-[0_10px_30px_rgba(28,199,105,0.15)] group opacity-0 ${isVisible ? `animate-fade-in-up delay-${index * 100}` : ""}`}
    >
      {/* Image */}
      <div className="h-80 bg-linear-to-r from-secondary to-background border-b-2 border-border relative overflow-hidden group-hover:border-primary/50 transition-colors">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground/30 font-bold text-2xl">
            Project Preview
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Project Types */}
        {project.types && project.types.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.types.map((type) => (
              <span
                key={type}
                className={`inline-block px-3 py-1 text-xs font-bold rounded-md border ${typeColors[type] || "bg-primary/10 text-primary border-primary/20"}`}
              >
                {type.replace("_", " ")}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <span className="text-xs font-semibold text-primary mb-2 block">
            Tech Stack:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-md border border-border bg-background text-muted-foreground group-hover:border-primary/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-border group-hover:border-primary/20 transition-colors mt-auto">
          <div className="flex gap-3">
            <a
              href={project.liveURL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(28,199,105,0.2)] hover:shadow-[0_0_15px_rgba(28,199,105,0.4)]"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Live View
            </a>

            <a
              href={project.gitHubURL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-border text-muted-foreground text-sm font-medium rounded-md hover:border-primary hover:text-primary transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              Repository
            </a>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
          >
            View Details
            <ArrowRightIcon className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
