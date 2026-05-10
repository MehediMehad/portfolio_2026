// src/app/(commonLayout)/projects/[slug]/page.tsx
import ProjectDetailsPage from "@/components/modules/Projects/ProjectDetailsPage";
import { getProjectBySlug } from "@/services/projects";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return <ProjectDetailsPage project={project} />;
};

export default Page;
