export type CompanyType = "Startup" | "MNC" | "Govt" | "Unicorn";
export type Domain = "AI/ML" | "Web Dev" | "Embedded" | "Cybersecurity" | "Data Science";

export interface Company {
    id: string;
    name: string;
    type: CompanyType;
    roles: string[];
    domain: Domain[];
    location: string;
    description: string;
    logo: string; // Emoji for this demo
    isHiddenGem: boolean; // For S4 feature
    salaryRange?: string;
    techStack: string[];
}

export const COMPANIES: Company[] = [
    // --- Embedded Systems (S4 Example) ---
    {
        id: "1",
        name: "Tesla",
        type: "MNC",
        roles: ["Firmware Engineer", "Autopilot Engineer"],
        domain: ["Embedded", "AI/ML"],
        location: "Austin/Remote",
        description: "Designing the brain of electric vehicles. Heavy focus on C++, RTOS, and sensor fusion.",
        logo: "🚗",
        isHiddenGem: true, // Many ECE students don't think "Car company"
        salaryRange: "$120k - $180k",
        techStack: ["C++", "RTOS", "CUDA"]
    },
    {
        id: "2",
        name: "Atherlyte",
        type: "Startup",
        roles: ["IoT Engineer", "Hardware Design"],
        domain: ["Embedded"],
        location: "Bangalore",
        description: "Building next-gen smart grid solutions for Indian metro cities.",
        logo: "⚡",
        isHiddenGem: true,
        salaryRange: "₹12L - ₹20L",
        techStack: ["C", "PCB Design", "LoRaWAN"]
    },
    {
        id: "3",
        name: "ISRO",
        type: "Govt",
        roles: ["Scientist/Engineer 'SC'", "Avionics Engineer"],
        domain: ["Embedded", "Web Dev"],
        location: "Bangalore/Trivandrum",
        description: "India's premier space agency. Working on Chandrayaan and Gaganyaan missions.",
        logo: "🚀",
        isHiddenGem: false,
        salaryRange: "₹56k/mo + Perks",
        techStack: ["VHDL", "C++", "Python"]
    },

    // --- Web Dev / SaaS ---
    {
        id: "4",
        name: "Atlassian",
        type: "MNC",
        roles: ["Frontend Engineer", "Full Stack Developer"],
        domain: ["Web Dev"],
        location: "Bangalore/Remote",
        description: "Makers of Jira and Trello. Focus on collaboration tools.",
        logo: "📫",
        isHiddenGem: false,
        salaryRange: "₹24L - ₹45L",
        techStack: ["React", "Java", "AWS"]
    },
    {
        id: "5",
        name: "Postman",
        type: "Unicorn",
        roles: ["API Platform Engineer", "DevRel"],
        domain: ["Web Dev"],
        location: "Bangalore",
        description: "The world's leading API platform. Heavily engineering focused.",
        logo: "👨‍🚀",
        isHiddenGem: false,
        salaryRange: "₹30L - ₹60L",
        techStack: ["Node.js", "Electron", "React"]
    },

    // --- Data Science / AI ---
    {
        id: "6",
        name: "Fractal",
        type: "Unicorn",
        roles: ["Decision Scientist", "AI Engineer"],
        domain: ["Data Science", "AI/ML"],
        location: "Gurgaon/Mumbai",
        description: "Pure-play AI and analytics. Solving complex enterprise problems.",
        logo: "❄️",
        isHiddenGem: true,
        salaryRange: "₹15L - ₹25L",
        techStack: ["Python", "PyTorch", "Tableau"]
    },
    {
        id: "7",
        name: "Hugging Face",
        type: "Startup",
        roles: ["ML Engineer", "Open Source Maintainer"],
        domain: ["AI/ML"],
        location: "Remote",
        description: "The GitHub of Machine Learning. Democratizing AI models.",
        logo: "🤗",
        isHiddenGem: true,
        salaryRange: "$150k - $220k",
        techStack: ["Transformers", "Python", "Rust"]
    }
];
