export type SkillPriority = "Critical" | "High" | "Medium" | "Nice to Have";
export type SkillStatus = "Locked" | "Pending" | "In Progress" | "Completed";

export interface Resource {
    title: string;
    url: string;
    type: "Article" | "Video" | "Course" | "Project";
}

export interface SkillNode {
    id: string;
    icon: string;
    title: string;
    description: string;
    priority: SkillPriority;
    dependsOn?: string[]; // IDs of prerequisite skills
    resources: Resource[];
    domain: string; // e.g., "Product Management"
}

export const SKILL_ROADMAP: SkillNode[] = [
    // --- M1 Example: Product Management ---
    {
        id: "pm-1",
        icon: "📊",
        title: "Data Analysis Basics (SQL)",
        description: "Learn to pull your own data. Don't rely on analysts for everything.",
        priority: "Critical",
        resources: [{ title: "Mode Analytics SQL Tutorial", url: "#", type: "Course" }],
        domain: "Product Management"
    },
    {
        id: "pm-2",
        icon: "📝",
        title: "PRD Writing",
        description: "How to write clear Product Requirement Documents.",
        priority: "Critical",
        dependsOn: ["pm-1"], // Can't write good PRD without understanding data feasibility
        resources: [{ title: "Airbnb's PRD Template", url: "#", type: "Article" }],
        domain: "Product Management"
    },
    {
        id: "pm-3",
        icon: "🧪",
        title: "A/B Testing",
        description: "Statistical significance and experiment design.",
        priority: "High",
        dependsOn: ["pm-1"],
        resources: [{ title: "Udacity A/B Testing", url: "#", type: "Course" }],
        domain: "Product Management"
    },
    {
        id: "pm-4",
        icon: "🗣️",
        title: "Stakeholder Management",
        description: "Aligning engineering, design, and business.",
        priority: "Medium",
        dependsOn: ["pm-2"],
        resources: [{ title: "Reforge Engineering Alignment", url: "#", type: "Article" }],
        domain: "Product Management"
    },
    {
        id: "pm-5",
        icon: "🚀",
        title: "Roadmap Prioritization",
        priority: "High",
        description: "RICE, Kano, and MoSCoW frameworks.",
        dependsOn: ["pm-2", "pm-3"],
        resources: [],
        domain: "Product Management"
    },

    // --- H2 Dynamic Entry (Initially Hidden or Low Priority) ---
    {
        id: "pm-comm-1",
        icon: "🎤",
        title: "Technical Communication",
        description: "Explaining complex trade-offs to non-technical stakeholders.",
        priority: "Nice to Have", // Will be upgraded by H2 engine
        resources: [],
        domain: "Product Management"
    }
];
