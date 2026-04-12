export type BlogType =
    | "Tech"
    | "Personal"
    | "Lifestyle"
    | "Health"
    | "Travel"
    | "Food"
    | "Entertainment"
    | "Education";



export interface TBlogDetails {
    id: string
    title: string
    slug: string
    overview: string
    image: string
    content: string
    tags: string[]
    type: BlogType
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}


export interface TRelatedBlog {
    id: string
    slug: string
    title: string
    overview: string
    tags: string[]
    type: BlogType
    image: string
    createdAt: string
    score: number
}


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


