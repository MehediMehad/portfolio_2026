import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
// import { UserInfo } from "@/types/user";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getMyInfo } from "@/services/auth/getUserInfo";
import { TUser } from "@/types";

const DashboardNavbar = async () => {
  // const userInfo = (await getUserInfo()) as UserInfo;
  // const navItems = await getNavItemsByRole(userInfo.role);
  // const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  const user: TUser = (await getMyInfo()) as TUser;

  return (
    <DashboardNavbarContent userInfo={user} navItems={[]} dashboardHome={""} />
  );
};

export default DashboardNavbar;
