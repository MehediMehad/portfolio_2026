// src/components/modules/Projects/Projects.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/shared/Card/ProjectCard";
import { getProjects, TMeta } from "@/services/projects";
import { TProject } from "@/types";

const Projects = () => {
  const [projects, setProjects] = useState<TProject[]>([]);
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

  // Fetch projects
  const fetchProjects = async (page: number) => {
    setLoading(true);
    try {
      const { meta: newMeta, data } = await getProjects({
        page,
        limit: 9, // 9 projects per page
      });

      setProjects(data);
      setMeta(newMeta);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > meta.totalPage) return;
    fetchProjects(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-end mb-12`}>
          <h2 className="text-4xl font-bold text-primary flex items-center gap-4">
            Projects
            <div className="h-0.5 w-24 bg-linear-to-r from-primary to-transparent hidden md:block"></div>
          </h2>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[520px] bg-card border border-border rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={true} // Always visible on this page
                />
              ))}
            </div>

            {/* Empty State */}
            {projects.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-2xl text-muted-foreground">
                  No projects found
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
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-card"
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
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-card"
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

export default Projects;
