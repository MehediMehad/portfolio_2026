import { FeaturedBlogs } from "@/components/modules/Portfolio/Home/FeaturedBlogs";
import { FeaturedProjects } from "@/components/modules/Portfolio/Home/FeaturedProjects";
import { HeroSection } from "@/components/modules/Portfolio/Home/HeroSection";
import { getMyInfo } from "@/services/auth/getUserInfo";
import { getFeaturedBlogs } from "@/services/blogs/featuredBlogs";
import { getFeaturedProjects } from "@/services/projects/featuredProjects";

const HomePage = async () => {
  // server side render
  const myInfo = await getMyInfo();
  const projects = await getFeaturedProjects();
  // console.log("🚀 ~ projects:", projects);
  const blogs = await getFeaturedBlogs();
  // console.log("🚀 ~ blogs:", blogs);

  console.log("");

  const author = {
    name: myInfo?.name || "N/A",
    image: myInfo?.image || "",
  };

  return (
    <div className="">
      <HeroSection />
      <FeaturedProjects projects={projects || []} />
      <FeaturedBlogs blogs={blogs || []} author={author} />
    </div>
  );
};

export default HomePage;
