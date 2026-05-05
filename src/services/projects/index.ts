"use server";

// src/services/projects/index.ts
import { defaultMeta } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { FetchResponse, TProjectDetails } from "@/types";
import { revalidateTag } from "next/cache";
import { getCookie } from "../auth/tokenHandlers";

const TAG = "projects";

const revalidateProjects = (id?: string, slug?: string) => {
    revalidateTag(TAG, { expire: 0 });
    revalidateTag("projects-list", { expire: 0 });

    if (id) {
        revalidateTag(`project-${id}`, { expire: 0 });
    }

    if (slug) {
        revalidateTag(`project-${slug}`, { expire: 0 });
    }
};

// Create project
export const createProject = async (formData: FormData) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await serverFetch.post("/projects", {
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to create project");
        }

        const result = await response.json();

        revalidateProjects(result?.data?._id, result?.data?.slug);

        return {
            success: true,
            data: result.data,
            message: result.message || "Project created successfully",
        };
    } catch (error: any) {
        console.error("❌ createProject error:", error);

        return {
            success: false,
            message: error?.message || "Failed to create project",
        };
    }
};

// Get all projects
export const getProjects = async (queryString?: string) => {
    try {
        const searchParams = new URLSearchParams(queryString);

        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/projects${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        TAG,
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
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
            data: [],
            meta: defaultMeta,
        };
    }
};

// Get project by slug
export const getProjectBySlug = async (slug: string) => {
    try {
        const res = await serverFetch.get(`/projects/${slug}`, {
            next: {
                tags: [TAG, `project-${slug}`],
                revalidate: 180,
            },
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
};

// Soft delete project
export const softDeleteProject = async (id: string, slug?: string) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await serverFetch.patch(`/projects/${id}/soft-delete`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to delete project");
        }

        const result = await response.json();

        revalidateProjects(id, slug || result?.data?.slug);

        return {
            success: true,
            data: result.data,
            message: result.message || "Project deleted successfully",
        };
    } catch (error: any) {
        console.error("❌ softDeleteProject error:", error);

        return {
            success: false,
            message: error?.message || "Failed to delete project",
        };
    }
};