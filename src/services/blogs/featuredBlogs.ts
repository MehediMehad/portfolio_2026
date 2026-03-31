// src/services/projects/featuredBlogs.ts

import { serverFetch } from "@/lib/server-fetch";
import { TBlog } from "@/types";

export const getFeaturedBlogs = async (): Promise<TBlog[] | null> => {
    try {
        const res = await serverFetch.get("/featured-blogs", {
            // cache: "no-store", // SSR fresh data
            next: {
                revalidate: 180, // 3 minutes
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch featured blogs");
        }

        const data = await res.json();

        return data?.data || [];
    } catch (error) {
        console.error("❌ getFeaturedBlogs error:", error);
        return [];
    }
};