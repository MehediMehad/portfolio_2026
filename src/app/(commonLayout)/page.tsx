import { HeroSection } from "@/components/modules/Portfolio/Home/HeroSection";
import { getMyInfo } from "@/services/auth/getUserInfo";

const HomePage = async () => {
  // server side render
  const myInfo = await getMyInfo();

  return (
    <div className="">
      <HeroSection myInfo={myInfo} />
    </div>
  );
};

export default HomePage;
