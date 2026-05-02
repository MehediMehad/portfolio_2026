import type { StaticImageData } from "next/image";

import typescript from "@/assets/icons/typescript.png";
import docker from "@/assets/icons/Docker.png";
import express from "@/assets/icons/Express.png";
import mongodb from "@/assets/icons/MongoDB.png";
import mongoose from "@/assets/icons/Mongoose.js.png";
import nextjs from "@/assets/icons/Next.js.png";
import nodejs from "@/assets/icons/Node.js.png";
import postgresql from "@/assets/icons/PostgresSQL.png";
import prisma from "@/assets/icons/prism.png";


type TSkill = {
    level: string;
    icon: StaticImageData;
};

export const skills: TSkill[] = [
    {
        level: "Next.js",
        icon: nextjs,
    },
    {
        level: "Node.js",
        icon: nodejs,
    },
    {
        level: "Express.js",
        icon: express,
    },
    {
        level: "PostgreSQL",
        icon: postgresql,
    },

    {
        level: "MongoDB",
        icon: mongodb,
    },

    {
        level: "Prisma",
        icon: prisma,
    },
    {
        level: "Mongoose",
        icon: mongoose,
    },
    {
        level: "Docker",
        icon: docker,
    },
];