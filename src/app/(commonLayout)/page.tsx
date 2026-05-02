import { FeaturedBlogs } from "@/components/modules/Portfolio/Home/FeaturedBlogs";
import { FeaturedProjects } from "@/components/modules/Portfolio/Home/FeaturedProjects";
import { HeroSection } from "@/components/modules/Portfolio/Home/HeroSection";
import { getFeaturedBlogs } from "@/services/blogs/featuredBlogs";
import { getFeaturedProjects } from "@/services/projects/featuredProjects";

const HomePage = async () => {
  const projects = await getFeaturedProjects();
  // console.log("🚀 ~ projects:", projects);
  const blogs = await getFeaturedBlogs();
  // console.log("🚀 ~ blogs:", blogs);

  return (
    <div className="">
      <HeroSection />
      <FeaturedProjects projects={projects || []} />
      <FeaturedBlogs blogs={blogs || []} />
    </div>
  );
};

export default HomePage;
