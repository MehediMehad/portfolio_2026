// src/services/auth/getUserInfo.ts

"use server";

import { cookies } from "next/headers";
import { TUser } from "@/types";

export const getMyInfo = async (): Promise<TUser | null> => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return null;
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/me`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },

                next: {
                    tags: ["user-info"],
                    revalidate: 180,
                },
            }
        );

        const result = await response.json();

        console.log("result", result);

        if (result.success) {
            return result.data;
        }

        return null;
    } catch (error) {
        console.error("Fetch Error:", error);
        return null;
    }
};