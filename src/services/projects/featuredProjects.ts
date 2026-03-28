// src/services/projects/featuredProjects.ts

import { serverFetch } from "@/lib/server-fetch";
import { TProject } from "@/types";

export const getFeaturedProjects = async (): Promise<TProject[] | null> => {
    try {
        const res = await serverFetch.get("/featured-projects", {
            cache: "no-store", // SSR fresh data
        });

        if (!res.ok) {
            throw new Error("Failed to fetch featured projects");
        }

        const data = await res.json();

        return data?.data || [];
    } catch (error) {
        console.error("❌ getFeaturedProjects error:", error);
        return [];
    }
};