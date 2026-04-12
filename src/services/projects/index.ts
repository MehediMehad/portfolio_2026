// src/services/projects/index.ts
import { defaultMeta } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { FetchResponse, TMeta, TProject, TProjectDetails } from "@/types";

interface GetProjectsParams {
    page?: number;
    limit?: number;
}

export const getProjects = async (
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