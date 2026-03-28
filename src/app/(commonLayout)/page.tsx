import { FeaturedProjects } from "@/components/modules/Portfolio/Home/FeaturedProjects";
import { HeroSection } from "@/components/modules/Portfolio/Home/HeroSection";
import { getMyInfo } from "@/services/auth/getUserInfo";
import { getFeaturedProjects } from "@/services/projects/featuredProjects";

const HomePage = async () => {
  // server side render
  const myInfo = await getMyInfo();
  const projects = await getFeaturedProjects();
  console.log("🚀 ~ projects:", projects);

  return (
    <div className="">
      <HeroSection myInfo={myInfo} />
      <FeaturedProjects projects={projects || []} />
    </div>
  );
};

export default HomePage;
