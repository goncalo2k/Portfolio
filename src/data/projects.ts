import { LuGithub } from "react-icons/lu";
import type { Project } from "../types/project";
import { LiaBrushSolid } from "react-icons/lia";
import { GiSteampunkGoggles } from "react-icons/gi";

export const projectsData: Project[] = [
    {
        id: "gitdash",
        name: "gitdash",
        url: "https://gitdash.goncalo2k.pt",
        codeUrl: "https://github.com/goncalo2k/ads-iscte-frontend/",
        image: LuGithub,
        description:
            "GitDash is a GitHub analytics dashboard that summarizes repository activity and contributor stats.",
        technologies: ['Next.js', 'NestJS', 'Redis', 'Github API', 'JWT-based Authentication', 'Cloudflare Workers']
    },
    {
        id: "portofolio",
        name: "Portofolio",
        url: "https://goncalo2k.pt",
        codeUrl: "https://github.com/goncalo2k/Portfolio",
        image: GiSteampunkGoggles,
        description:
            "This is what you are currently looking at! My own portfolio!",
        technologies: ['Cloudflare Workers', 'React', 'Vite', 'Sass', 'Spotify API']
    },
    {
        id: "g2k-styles",
        name: "G2K Styles",
        url: "https://www.npmjs.com/package/@goncalo2k/g2k-styles",
        codeUrl: "https://github.com/goncalo2k/g2k-styles",
        image: LiaBrushSolid,
        description:
            "G2K-Styles is my small Sass library, published to NPM, used to swiften my projects. ",
        technologies: ['Cloudflare Workers', 'React', 'Vite', 'Sass', 'Spotify API']
    },
];