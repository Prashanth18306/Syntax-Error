export type SkillStatus = "Locked" | "Pending" | "Completed";

export interface Resource {
    title: string;
    url: string;
    type: "Video" | "Article" | "Course" | "Doc";
}

export interface SkillNode {
    id: string;
    title: string;
    description: string;
    icon: string;
    dependsOn?: string[];
    priority: "Critical" | "High" | "Medium" | "Nice to Have";
    resources: Resource[];
    projects?: { title: string; difficulty: "Easy" | "Medium" | "Hard" }[];
}

export const SKILL_ROADMAP: SkillNode[] = [
    {
        id: "core-math",
        title: "Engineering Mathematics",
        description: "Foundational calculus, linear algebra, and probability for all engineers.",
        icon: "📐",
        priority: "Critical",
        resources: [
            { title: "Linear Algebra - Khan Academy", url: "https://www.khanacademy.org/math/linear-algebra", type: "Course" },
            { title: "Calculus for Engineers", url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/", type: "Doc" }
        ]
    },
    {
        id: "programming-101",
        title: "Programming Foundations",
        description: "Master the basics of C++ or Python. Focus on loops, data types, and logic.",
        icon: "💻",
        priority: "Critical",
        resources: [
            { title: "Python for Everybody", url: "https://www.py4e.com/", type: "Course" },
            { title: "C++ Programming Docs", url: "https://en.cppreference.com/w/", type: "Doc" }
        ],
        projects: [
            { title: "Calculator App", difficulty: "Easy" },
            { title: "CLI Todo List", difficulty: "Medium" }
        ]
    },
    {
        id: "data-structures",
        title: "Data Structures & Algorithms",
        description: "Understand كيف items are stored and processed efficiently.",
        icon: "🔗",
        dependsOn: ["programming-101"],
        priority: "High",
        resources: [
            { title: "GfK DSA Self Paced", url: "https://www.geeksforgeeks.org/data-structures/", type: "Article" },
            { title: "Visualgo - Algorithm Visualization", url: "https://visualgo.net/en", type: "Doc" }
        ]
    },
    {
        id: "embedded-systems",
        title: "Embedded C & Microcontrollers",
        description: "Bridge between hardware and software. Programming 8051/ARM.",
        icon: "📟",
        dependsOn: ["core-math", "programming-101"],
        priority: "High",
        resources: [
            { title: "Intro to Embedded Systems", url: "https://www.edx.org/learn/embedded-systems", type: "Video" },
            { title: "Microcontroller Projects", url: "https://www.instructables.com/circuits/microcontrollers/projects/", type: "Article" }
        ]
    },
    {
        id: "system-design",
        title: "System Design & Architecture",
        description: "How to build scalable, reliable distributed systems.",
        icon: "🏗️",
        dependsOn: ["data-structures"],
        priority: "Medium",
        resources: [
            { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "Doc" },
            { title: "High Scalability Blog", url: "http://highscalability.com/", type: "Article" }
        ]
    },
    {
        id: "ai-fundamentals",
        title: "AI & Machine Learning",
        description: "Basics of neural networks, regression, and data modeling.",
        icon: "🤖",
        dependsOn: ["core-math", "data-structures"],
        priority: "High",
        resources: [
            { title: "Andrew Ng ML Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction", type: "Course" },
            { title: "Fast.ai Practical Deep Learning", url: "https://www.fast.ai/", type: "Doc" }
        ]
    },
    {
        id: "soft-skills",
        title: "Technical Communication",
        description: "Art of explaining complex engineering concepts to non-technical stakeholders.",
        icon: "🗣️",
        priority: "Medium",
        resources: [
            { title: "Technical Writing Course", url: "https://developers.google.com/tech-writing", type: "Course" },
            { title: "Public Speaking for Engineers", url: "https://www.toastmasters.org/", type: "Article" }
        ],
        projects: [
            { title: "Technical Blog on Medium", difficulty: "Easy" },
            { title: "Deliver a 5-min Lightning Talk", difficulty: "Medium" }
        ]
    }
];
