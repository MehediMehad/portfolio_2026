import { ProjectCard } from "@/components/shared/Card/ProjectCard";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getProjects } from "@/services/projects";
import { TProject } from "@/types";
import { Suspense } from "react";

export const revalidate = 600;

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter({
    limit: "6",
    page: "1",
    ...searchParamsObj,
  });

  const projectsResponse = await getProjects(queryString);

  console.log("projectsResponse", projectsResponse);

  const projects: TProject[] = projectsResponse?.data || [];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="flex items-center gap-4 text-4xl font-bold text-primary">
            Projects
            <div className="hidden h-0.5 w-24 bg-linear-to-r from-primary to-transparent md:block" />
          </h2>
        </div>

        <Suspense fallback={<TableSkeleton columns={3} />}>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-2xl text-muted-foreground">
                No projects found
              </p>
            </div>
          )}
        </Suspense>

        <div className="mt-16">
          <TablePagination
            currentPage={projectsResponse?.meta?.page || 1}
            totalPages={projectsResponse?.meta?.totalPage || 1}
            defaultLimit={6}
            limitOptions={[6, 9, 12, 15, 18, 21, 24, 27, 30]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
