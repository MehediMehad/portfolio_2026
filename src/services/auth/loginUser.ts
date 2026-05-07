/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { BACKEND_API_URL } from "@/lib/server-fetch";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const baseAPI = BACKEND_API_URL;

export const loginUser = async (userData: FieldValues) => {
    try {
        // https://portfolio-server-neon-alpha.vercel.app 
        const res = await fetch(`${baseAPI}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await res.json();

        if (result?.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken);
            (await cookies()).set("refreshToken", result?.data?.refreshToken);
        }

        return result;
    } catch (error: any) {
        return Error(error);
    }
};