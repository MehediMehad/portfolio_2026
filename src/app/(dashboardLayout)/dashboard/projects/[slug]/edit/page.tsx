import EditProjectForm from "@/components/modules/DashboardPages/EditProjectForm";
import { getProjectBySlug } from "@/services/projects";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProjectForm project={project} />
    </Suspense>
  );
};

export default EditProjectPage;
