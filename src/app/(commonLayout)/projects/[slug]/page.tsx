// src/app/(commonLayout)/projects/[slug]/page.tsx
import ProjectDetailsPage from "@/components/modules/Projects/ProjectDetailsPage";
import { getProjectBySlug } from "@/services/projects";

const Page = async ({ params }: { params: { slug: string } }) => {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return <ProjectDetailsPage project={project} />;
};

export default Page;
