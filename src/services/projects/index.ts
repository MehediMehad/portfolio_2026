"use server";
// src/services/projects/index.ts
import { defaultMeta } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { FetchResponse, TMeta, TProject, TProjectDetails } from "@/types";
import { revalidateTag } from "next/cache";
import { getCookie } from "../auth/tokenHandlers";

interface GetProjectsParams {
    page?: number;
    limit?: number;
}


const TAG = "projects";


// Create createProject
export const createProject = async (formData: FormData) => {

    console.log("image", formData);


    try {
        const accessToken = await getCookie("accessToken");
        console.log(accessToken);


        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await serverFetch.post("/projects", {
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,

                // Do NOT set Content-Type here - browser will set multipart/form-data automatically
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to create meal");
        }

        const result = await response.json();

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            data: result.data,
            message: result.message || "Meal created successfully",
        };
    } catch (error: any) {
        console.error("❌ createProject error:", error);
        return {
            success: false,
            message: error?.message || "Failed to create meal",
        };
    }
};

export const getProjects2 = async (
    params: GetProjectsParams = {}
): Promise<{ meta: TMeta; data: TProject[] }> => {
    const { page = 1, limit = 6 } = params;
    try {
        const queryParams = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        const res = await serverFetch.get(`/projects?${queryParams}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const result: FetchResponse<TProject[]> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return {
            meta: result.meta ?? defaultMeta,
            data: result.data ?? [],
        };
    } catch (error) {
        console.error("❌ getProjects error:", error);
        return {
            meta: defaultMeta,
            data: [],
        };
    }
};

export async function getProjects(queryString?: string) {
    try {
        const searchParams = new URLSearchParams(queryString);

        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/projects${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "projects-list",
                        `projects-page-${page}`,
                        `projects-search-${searchTerm}`,
                    ],
                    revalidate: 180,
                },
            }
        );

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);

        return {
            success: false,
            message: `${process.env.NODE_ENV === "development"
                ? error.message
                : "Something went wrong"
                }`,
            data: [],
            meta: defaultMeta,
        };
    }
}
export const getProjectBySlug = async (slug: string) => {
    try {
        const res = await serverFetch.get(`/projects/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const result: FetchResponse<TProjectDetails> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        console.error("❌ getProjectBySlug error:", error);
        return null;
    }
}