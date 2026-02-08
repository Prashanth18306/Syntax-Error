export type CompanyType = "Startup" | "MNC" | "Govt" | "Unicorn";
export type Domain =
    | "AI/ML"
    | "Web Dev"
    | "Embedded"
    | "Cybersecurity"
    | "Data Science"
    | "EV"
    | "Aerospace"
    | "Semiconductor"
    | "Civil"
    | "Mechanical"
    | "Fintech"
    | "Biotech"
    | "Robotics"
    | "Renewable Energy"
    | "EdTech"
    | "Automotive"
    | "Medical Devices"
    | "SpaceTech"
    | "Logistics"
    | "AgriTech"
    | "Oil & Gas"
    | "IT Services";

export interface Company {
    id: string;
    name: string;
    type: CompanyType;
    roles: string[];
    domain: Domain[];
    location: string;
    description: string;
    logo: string;
    isHiddenGem: boolean;
    isTrending?: boolean;
    salaryRange?: string;
    techStack: string[];
    isHiring?: boolean;
    requirements?: string[];
    website: string; // Added website link field
}

const SEED_COMPANIES: Company[] = [
    // --- IT & Software Giants ---
    {
        id: "it-1",
        name: "Microsoft",
        type: "MNC",
        roles: ["Software Engineer", "Azure Architect", "AI Researcher"],
        domain: ["Web Dev", "AI/ML", "Cybersecurity"],
        location: "Redmond/Bangalore",
        description: "A world leader in software, services, devices, and solutions.",
        logo: "💻",
        isHiddenGem: false,
        isTrending: true,
        techStack: ["C#", "Azure", "TypeScript"],
        isHiring: true,
        requirements: ["Strong Fundamentals", "System Design"],
        website: "https://careers.microsoft.com"
    },
    {
        id: "it-2",
        name: "Infosys",
        type: "MNC",
        roles: ["Systems Engineer", "Bridge Lead", "Consultant"],
        domain: ["IT Services"],
        location: "Bangalore/Global",
        description: "Global leader in next-generation digital services and consulting.",
        logo: "🔷",
        isHiddenGem: false,
        techStack: ["Java", "Salesforce", "Sap"],
        isHiring: true,
        website: "https://www.infosys.com/careers"
    },

    // --- Core Mechanical & Automotive Giants ---
    {
        id: "mech-1",
        name: "Tata Motors",
        type: "MNC",
        roles: ["Design Engineer", "Quality Lead", "EV Specialist"],
        domain: ["Automotive", "Mechanical", "EV"],
        location: "Pune/Lucknow",
        description: "India's largest automobile manufacturer leading the EV revolution.",
        logo: "🚙",
        isHiddenGem: false,
        isTrending: true,
        techStack: ["CATIA", "Simulink"],
        isHiring: true,
        requirements: ["Automobile Design", "Material Science"],
        website: "https://www.tatamotors.com/careers"
    },
    {
        id: "mech-2",
        name: "Ashok Leyland",
        type: "MNC",
        roles: ["Production Engineer", "Maintenance Head"],
        domain: ["Automotive", "Mechanical"],
        location: "Chennai/Hosur",
        description: "Flagship of the Hinduja Group and a world leader in heavy commercial vehicles.",
        logo: "🚛",
        isHiddenGem: false,
        techStack: ["Mechanical Engineering", "ERP"],
        isHiring: true,
        website: "https://www.ashokleyland.com/careers"
    },
    {
        id: "mech-3",
        name: "Reliance Industries",
        type: "MNC",
        roles: ["Petrochemical Engineer", "Operations Manager"],
        domain: ["Oil & Gas", "Mechanical"],
        location: "Jamnagar/Mumbai",
        description: "A fortune 500 company and India's largest private sector corporation.",
        logo: "🔆",
        isHiddenGem: false,
        techStack: ["Chemical Engg", "Maintenance"],
        isHiring: true,
        website: "https://www.ril.com/Careers.aspx"
    },

    // --- Previous Featured ---
    { id: "t1", name: "OpenAI", type: "Unicorn", roles: ["Research Scientist", "AI Engineer"], domain: ["AI/ML"], location: "San Francisco", description: "Creators of GPT-4 and Sora.", logo: "🧠", isHiddenGem: false, isTrending: true, techStack: ["PyTorch", "Python"], isHiring: true, requirements: ["ML Theory", "Distributed Systems"], website: "https://openai.com/careers" },
    { id: "t2", name: "SpaceX", type: "Unicorn", roles: ["Propulsion Engineer", "Avionics"], domain: ["Aerospace", "Mechanical"], location: "Hawthorne", description: "Making life multi-planetary.", logo: "🚀", isHiddenGem: false, isTrending: true, techStack: ["C++", "Python"], isHiring: true, website: "https://www.spacex.com/careers" },
    { id: "t3", name: "NVIDIA", type: "MNC", roles: ["GPU Architect", "Deep Learning Dev"], domain: ["Semiconductor", "AI/ML"], location: "Global", description: "The platform for AI.", logo: "🟢", isHiddenGem: false, isTrending: true, techStack: ["CUDA", "Verilog"], isHiring: true, website: "https://www.nvidia.com/en-us/about-nvidia/careers/" },
    { id: "c2", name: "L&T Construction", type: "MNC", roles: ["Graduate Engineer Trainee", "Project Lead"], domain: ["Civil"], location: "Chennai", description: "Building the foundations of modern India.", logo: "🏗️", isHiddenGem: false, techStack: ["AutoCAD", "BIM"], isHiring: true, website: "https://www.lntecc.com/careers/" }
];

const generateCompanies = (count: number): Company[] => {
    const generated: Company[] = [...SEED_COMPANIES];
    const domains: Domain[] = ["Mechanical", "Civil", "AI/ML", "Web Dev", "Embedded", "Aerospace"];
    const names = ["Bosch", "Siemens", "Google", "Amazon", "Oracle", "Cisco", "Ford", "General Motors", "ABB", "Shell"];

    for (let i = generated.length; i < count; i++) {
        const domain = domains[i % domains.length];
        generated.push({
            id: `gen-${i}`,
            name: `${names[i % names.length]} ${i}`,
            type: i % 3 === 0 ? "MNC" : "Startup",
            roles: [`${domain} Specialist`],
            domain: [domain],
            location: "Remote/Global",
            description: `Dynamic solutions in the field of ${domain}. Joining global innovation.`,
            logo: "🏢",
            isHiddenGem: i % 20 === 0,
            isTrending: i % 25 === 0,
            techStack: ["Industry Standard"],
            isHiring: true,
            website: "https://www.google.com/search?q=careers"
        });
    }
    return generated;
};

export const COMPANIES: Company[] = generateCompanies(1001);
