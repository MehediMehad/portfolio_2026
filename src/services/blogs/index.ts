// src/services/blogs/index.ts
import { defaultMeta } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { FetchResponse, TBlog, TBlogDetails, TMeta, TRelatedBlog } from "@/types";

interface GetProjectsParams {
    searchTerm?: string;
    page?: number;
    limit?: number;
    type?: string;
}

export const getBlogs = async (
    params: GetProjectsParams = {}
): Promise<{ meta: TMeta; data: TBlog[] }> => {
    const { page = 1, limit = 6, type, searchTerm } = params;
    try {
        const queryParams = new URLSearchParams({
            page: String(page),
            limit: String(limit),
        });

        if (searchTerm) {
            queryParams.set("searchTerm", searchTerm);
        }

        if (type && type !== "All") {
            queryParams.set("type", type);
        }

        const res = await serverFetch.get(`/blogs?${queryParams}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const result: FetchResponse<TBlog[]> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return {
            meta: result.meta ?? defaultMeta,
            data: result.data ?? [],
        };
    } catch (error) {
        console.error("❌ getBlogs error:", error);
        return {
            meta: defaultMeta,
            data: [],
        };
    }
};

export const getBlogBySlug = async (slug: string) => {
    try {
        const res = await serverFetch.get(`/blogs/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const result: FetchResponse<TBlogDetails> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data;


    } catch (error) {
        console.error("❌ getBlogBySlug error:", error);
        return null;
    }
}


export const getRelatedBlogs = async (slug: string): Promise<TRelatedBlog[]> => {
    try {
        const res = await serverFetch.get(`/blogs/related/${slug}?limit=3`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        const result: FetchResponse<TRelatedBlog[]> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result.data ?? [];
    } catch (error) {
        console.error("❌ getBlogBySlug error:", error);
        return [];
    }
}

