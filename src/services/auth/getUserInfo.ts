/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { TUser } from "@/types";

export const getUserInfo = async (): Promise<TUser | any> => {
    let userInfo: TUser | any;
    try {

        const accessToken = await getCookie("accessToken");

        console.log("accessToken", accessToken);


        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await serverFetch.get("/auth/me", {
            next: { tags: ["user-info"], revalidate: 180 },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        const result = await response.json();

        console.log("result", result);


        if (result.success) {
            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

            console.log("verifiedToken", verifiedToken);


            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }


        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }

}