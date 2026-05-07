// src/app/(dashboardLayout)/dashboard/projects/page.tsx
import { ProjectCard } from "@/components/shared/Card/ProjectCard";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getProjects } from "@/services/projects";
import { TProject } from "@/types";
import { Suspense } from "react";

export const revalidate = 600;

const DashboardProjectsPage = async ({
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

  const projects: TProject[] = projectsResponse?.data || [];

  return (
    <>
      <Suspense fallback={<TableSkeleton columns={3} />}>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} isAdmin />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-2xl text-muted-foreground">No projects found</p>
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
    </>
  );
};

export default DashboardProjectsPage;
