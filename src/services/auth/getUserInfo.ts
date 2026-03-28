// src/services/auth/getUserInfo.ts
import { serverFetch } from "@/lib/server-fetch";
import { TUser } from "@/types";

export const getMyInfo = async (): Promise<TUser | null> => {
    try {
        const response = await serverFetch.get("/user/me", {
            next: {
                tags: ["user-info"],
                revalidate: 180, // 3 minutes
            },
        });

        const result = await response.json();

        if (result.success) {
            return result.data;
        }
        return null;
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
}