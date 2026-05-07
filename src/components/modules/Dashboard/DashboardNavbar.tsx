import DashboardNavbarContent from "./DashboardNavbarContent";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { TUser } from "@/types";

const DashboardNavbar = async () => {
  const user: TUser = (await getUserInfo()) as TUser;

  return (
    <DashboardNavbarContent userInfo={user} navItems={[]} dashboardHome={""} />
  );
};

export default DashboardNavbar;
