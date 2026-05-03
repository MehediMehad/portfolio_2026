import CreateProjectForm from "@/components/modules/DashboardPages/CreateProjectForm";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateProjectForm />
      </Suspense>
    </>
  );
};

export default page;
