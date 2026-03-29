export interface TBlog {
    id: string
    title: string
    overview: string
    image: string
    tags: string[]
    type: "Tech" | "Personal" | "Business" | "Lifestyle" | "Health" | "Travel" | "Food" | "Entertainment" | "Education"
    createdAt: string
}

