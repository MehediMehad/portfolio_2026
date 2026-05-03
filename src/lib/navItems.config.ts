""
import { NavSection } from "@/types/dashboard.interface";
import { UserRole } from "./auth-utils";

export const getAdminNavItems = (role: UserRole): NavSection[] => {
    return [
        {
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home", // ✅ String
                    roles: ["ADMIN"],
                },
                {
                    title: "Dashboard",
                    href: '/dashboard',
                    icon: "LayoutDashboard",
                    roles: ["ADMIN"],
                },

            ]
        },
        {
            title: "Projects",
            items: [
                {
                    title: "My Projects",
                    href: "/my-projects",
                    icon: "LayoutDashboard", // ✅ String
                    roles: ["ADMIN"],
                },
                {
                    title: "Create Project",
                    href: "/create-project",
                    icon: "Plus",
                    roles: ["ADMIN"],
                },
            ],
        },
        {
            title: "Blogs",
            items: [

                {
                    title: "Create Blog",
                    href: "/create-blog",
                    icon: "Plus",
                    roles: ["ADMIN"],
                },
                {
                    title: "My Blogs",
                    href: "/my-blogs",
                    icon: "LayoutDashboard", // ✅ String
                    roles: ["ADMIN"],
                },
            ],
        },

        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["PATIENT"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["ADMIN"],
                },
            ],
        },
    ]
}


export const getNavItemsByRole = async (role: UserRole): Promise<NavSection[]> => {
    const adminNavItems = getAdminNavItems(role);

    switch (role) {
        case "ADMIN":
            return adminNavItems;
        default:
            return [];
    }
}