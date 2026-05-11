export const dynamic = "force-dynamic";
import CreateBlogForm from "@/components/modules/DashboardPages/CreateBlogForm";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateBlogForm />
      </Suspense>
    </>
  );
};

export default page;
