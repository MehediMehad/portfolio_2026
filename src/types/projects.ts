
export type TProjectType = "Full_Stack" | "Frontend" | "Backend" | "Dashboard" | "Mobile" | "New_Feature" | "Experiment" | "Fun" | "Learning" | "Client" | "Open_Source" | "Other"

export interface TProject {
    id: string
    slug: string
    image: string
    title: string
    overview: string
    description: string
    types: TProjectType[]
    techStack: string[]
    liveURL: string
    gitHubURL: string
    createdAt: string
}
