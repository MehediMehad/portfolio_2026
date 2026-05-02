import type { StaticImageData } from "next/image";

import typescript from "@/assets/icons/typescript.png";
import docker from "@/assets/icons/Docker.png";
import express from "@/assets/icons/Express.png";
import mongodb from "@/assets/icons/MongoDB.png";
import mongoose from "@/assets/icons/Mongoose.js.png";
import nextjs from "@/assets/icons/Next.js.png";
import nodejs from "@/assets/icons/Node.js.png";
import postgresql from "@/assets/icons/PostgresSQL.png";
import react from "@/assets/icons/React (1).png";

type TSkill = {
    level: string;
    icon: StaticImageData;
};

export const skills: TSkill[] = [
    {
        level: "React",
        icon: react,
    },
    {
        level: "Next.js",
        icon: nextjs,
    },
    {
        level: "TypeScript",
        icon: typescript,
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
        level: "Docker",
        icon: docker,
    },

    {
        level: "MongoDB",
        icon: mongodb,
    },
    {
        level: "Mongoose",
        icon: mongoose,
    },
];