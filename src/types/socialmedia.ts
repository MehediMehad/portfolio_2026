
export type Platform = "Portfolio" | "LinkedIn" | "GitHub" | "Twitter" | "Facebook" | "Instagram" | "YouTube"

export interface TSocialMedia {
    id: string
    platformName: Platform
    url: string
    image: string
}