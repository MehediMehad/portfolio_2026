import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getMyInfo } from "@/services/auth/getUserInfo";
import { NavSection } from "@/types/dashboard.interface";
import { TUser } from "@/types";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  const userInfo = (await getMyInfo()) as TUser;

  // const navItems: NavSection[] = await getNavItemsByRole(userInfo.role);
  // const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  const navItems: NavSection[] = await getNavItemsByRole("ADMIN");
  const dashboardHome = getDefaultDashboardRoute("ADMIN");

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
