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
    <div className="">
      <HeroSection />
      <FeaturedProjects projects={projects || []} />
      <FeaturedBlogs blogs={blogs || []} />
    </div>
  );
};

export default HomePage;
