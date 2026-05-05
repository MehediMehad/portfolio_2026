// src/services/blogs/index.ts
import { defaultMeta } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { FetchResponse, TBlogDetails, TRelatedBlog } from "@/types";
import { revalidateTag } from "next/cache";
import { getCookie } from "../auth/tokenHandlers";

const TAG = "blogs";

const revalidateBlogs = (id?: string, slug?: string) => {
    revalidateTag(TAG, { expire: 0 });
    revalidateTag("blogs-list", { expire: 0 });
    revalidateTag("related-blogs", { expire: 0 });

    if (id) {
        revalidateTag(`blog-${id}`, { expire: 0 });
    }

    if (slug) {
        revalidateTag(`blog-${slug}`, { expire: 0 });
        revalidateTag(`related-blogs-${slug}`, { expire: 0 });
    }
};

// Create blog
export const createBlog = async (formData: FormData) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await serverFetch.post("/blogs", {
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to create blog");
        }

        const result = await response.json();

        revalidateBlogs(result?.data?._id, result?.data?.slug);

        return {
            success: true,
            data: result.data,
            message: result.message || "Blog created successfully",
        };
    } catch (error: any) {
        console.error("❌ createBlog error:", error);

        return {
            success: false,
            message: error?.message || "Failed to create blog",
        };
    }
};

// Get all blogs
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
                        TAG,
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
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
            data: [],
            meta: defaultMeta,
        };
    }
};

// Get blog by slug
export const getBlogBySlug = async (slug: string) => {
    try {
        const res = await serverFetch.get(`/blogs/${slug}`, {
            next: {
                tags: [TAG, `blog-${slug}`],
                revalidate: 180,
            },
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
};

// Get related blogs
export const getRelatedBlogs = async (
    slug: string
): Promise<TRelatedBlog[]> => {
    try {
        const res = await serverFetch.get(`/blogs/related/${slug}?limit=3`, {
            next: {
                tags: [TAG, "related-blogs", `related-blogs-${slug}`],
                revalidate: 180,
            },
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
        console.error("❌ getRelatedBlogs error:", error);
        return [];
    }
};

// Soft delete blog
export const softDeleteBlog = async (id: string, slug?: string) => {
    try {
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await serverFetch.delete(`/blogs/${id}/soft-delete`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to delete blog");
        }

        const result = await response.json();

        revalidateBlogs(id, slug || result?.data?.slug);

        return {
            success: true,
            data: result.data,
            message: result.message || "Blog deleted successfully",
        };
    } catch (error: any) {
        console.error("❌ softDeleteBlog error:", error);

        return {
            success: false,
            message: error?.message || "Failed to delete blog",
        };
    }
};