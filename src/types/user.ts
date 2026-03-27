import { TSkill, TSocialMedia } from "@/types"


export interface TUser {
    id: string
    name: string
    image: string
    email: string
    number: string
    aboutMe: string
    shortBio: string
    designation: string
    address: string
    skills: TSkill[]
    socialMedias: TSocialMedia[]
}



