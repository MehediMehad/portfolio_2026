// src/services/blogs/index.ts
import { defaultMeta } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { FetchResponse, TBlog, TBlogDetails, TMeta, TRelatedBlog } from "@/types";

export const getBlogs = async (queryString?: string) => {
    try {
        const searchParams = new URLSearchParams(queryString);

        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";
        const type = searchParams.get("type") || "all";

        const response = await serverFetch.get(
            `/blogs${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "blogs-list",
                        `blogs-page-${page}`,
                        `blogs-search-${searchTerm}`,
                        `blogs-type-${type}`,
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

