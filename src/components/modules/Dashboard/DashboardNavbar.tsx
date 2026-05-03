import DashboardNavbarContent from "./DashboardNavbarContent";
import { getMyInfo } from "@/services/auth/getUserInfo";
import { TUser } from "@/types";

const DashboardNavbar = async () => {
  const user: TUser = (await getMyInfo()) as TUser;

  return (
    <DashboardNavbarContent userInfo={user} navItems={[]} dashboardHome={""} />
  );
};

export default DashboardNavbar;
