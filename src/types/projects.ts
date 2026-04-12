
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


export interface TProjectDetails {
    id: string
    image: string
    title: string
    slug: string
    overview: string
    description: string
    types: string[]
    techStack: string[]
    features: string[]
    whatILearned: string[]
    futureImprovements: string[]
    liveURL: string
    gitHubURL: string
    is_public: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}
