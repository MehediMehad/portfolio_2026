export type BlogType =
    | "Tech"
    | "Personal"
    | "Lifestyle"
    | "Health"
    | "Travel"
    | "Food"
    | "Entertainment"
    | "Education";

export interface TBlog {
    id: string
    slug: string
    title: string
    overview: string
    image: string
    tags: string[]
    type: BlogType
    createdAt: string
}
