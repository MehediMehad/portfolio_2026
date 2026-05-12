// src/app/(commonLayout)/page.tsx

import { FeaturedBlogs } from "@/components/modules/Portfolio/Home/FeaturedBlogs";
import { FeaturedProjects } from "@/components/modules/Portfolio/Home/FeaturedProjects";
import { HeroSection } from "@/components/modules/Portfolio/Home/HeroSection";
import { getFeaturedBlogs } from "@/services/blogs/featuredBlogs";
import { getFeaturedProjects } from "@/services/projects/featuredProjects";

export const revalidate = 600;
const HomePage = async () => {
  const [projects, blogs] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedBlogs(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedProjects projects={projects || []} />
      <FeaturedBlogs blogs={blogs || []} />
    </>
  );
};

export default HomePage;
