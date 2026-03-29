// src/services/projects/index.ts
import { serverFetch } from "@/lib/server-fetch";

export interface ProjectsResponse {
    success: boolean
    statusCode: number
    message: string
    meta: Meta
    data: TProject[]
}

export interface Meta {
    page: number
    limit: number
    total: number
    totalPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
}

export interface TProject {
    id: string
    image: string
    title: string
    overview: string
    description: string
    techStack: string[]
    liveURL: string
    gitHubURL: string
    is_public: boolean
    createdAt: string
}


export const getProjects = async (params: {
    page?: number;
    limit?: number;
} = {}): Promise<{ meta: Meta; data: TProject[] }> => {

    const { page = 1, limit = 6 } = params;
    try {

        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        const res = await serverFetch.get(`/projects?${queryParams.toString()}`, {
            cache: "no-store", // SSR fresh data
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }

        const data: ProjectsResponse = await res.json();
        if (!data.success) {
            throw new Error(data.message);
        }


        return {
            meta: data.meta,
            data: data.data,
        };
    } catch (error) {
        console.error("❌ getProjects error:", error);
        return {
            meta: {
                page: 0,
                limit: 0,
                total: 0,
                totalPage: 0,
                hasNextPage: false,
                hasPrevPage: false,
            },
            data: [],
        };
    }
};

