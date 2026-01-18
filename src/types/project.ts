import type { IconType } from "react-icons";

export interface Project {
    id: string;
    name: string;
    url?: string;
    codeUrl?: string;
    image?: IconType;
    description?: string;
    technologies?: string[];
}