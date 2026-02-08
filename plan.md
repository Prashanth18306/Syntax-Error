# Project Plan: CareerOptima - Intelligent Career Guidance System

## 1. Executive Summary

**CareerOptima** is a Next.js-based web application designed to solve critical gaps in student career preparation. It unifies three key features: a comprehensive company database (S4), a structured skill prioritization system (M1), and an AI-driven adaptive guidance loop (H2). The goal is to provide students with clarity, efficiency, and personalized feedback to crack high-value roles.

### Core Problems Addressed
1.  **S4 (Easy): Company Discovery**: Helping users find diverse employers (Startups, MNCs, Specific Industries) beyond just the famous giants.
2.  **M1 (Medium): Skill Prioritization**: Converting scattered learning into structured, prioritized roadmaps.
3.  **H2 (Hard): Closed-Loop Guidance**: Dynamically adjusting learning paths based on real-time feedback from mock interviews and assessments.

---

## 2. Technology Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
-   **UI Library**: [Shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)
-   **Theming**: [TweakCN](https://tweakcn.com/) (Custom themes and design tokens)
-   **Styling**: Vanilla CSS / Tailwind CSS for custom animations
-   **State Management**: React Context / Zustand
-   **Persistence**: LocalStorage (MVP) / Mock API Routes

---

## 3. Architecture & Data Flow

High-level architecture focusing on the interplay between the three modules.

```mermaid
graph TD
    User -->|Explores| CompanyExplorer[Company Discovery Module (S4)]
    User -->|Selects Role| SkillEngine[Skill Prioritization Engine (M1)]
    SkillEngine -->|Generates| Roadmap[Personalized Roadmap]
    Roadmap -->|Completes| Assessment[Mock Interviews & Projects]
    Assessment -->|Feedback| AdaptiveLoop[Adaptive Guidance System (H2)]
    AdaptiveLoop -->|Adjusts| Roadmap
```

---

## 4. Feature Specifications

### Feature A: The Company Explorer (S4)
*Solves: Lack of role-specific company information.*

-   **Description**: A searchable, filterable database of companies tagged by Role, Type (MNC, Startup, unicorn), and Domain (Automotive, Aerospace, Fintech).
-   **Key Components**:
    -   `CompanyCard`: Displays company details, hiring roles, and vibe.
    -   `FilterBar`: Filter by "Startup vs MNC", "Location", "Tech Stack".
    -   `HiddenGems`: A section highlighting lesser-known but high-paying companies (e.g., Tesla for Electrical, ISRO for Aerospace).
-   **Data Structure**:
    ```typescript
    interface Company {
      id: string;
      name: string;
      type: 'Startup' | 'MNC' | 'Govt';
      roles: string[]; // e.g., ["Embedded Systems", "Backend"]
      industry: string;
    }
    ```

### Feature B: Skill Mastery Roadmap (M1)
*Solves: Scattered and shallow learning.*

-   **Description**: A visual roadmap that forces prioritization. Instead of a flat list, skills are a dependency graph (e.g., "Master SQL Basics" -> "Learn Advanced Joins" -> "Project: Analyze Sales Data").
-   **Key Components**:
    -   `SkillTree`: Interactive node graph of skills.
    -   `PriorityBadge`: Labels skills as "Critical", "Good to have", "Niche".
    -   `ResourceCard`: Curated, single-source resource for each skill node to prevent "tutorial hell".
-   **Logic**: Users cannot unlock "Advanced" nodes without checking off "Core" nodes.

### Feature C: Adaptive Guidance Engine (H2)
*Solves: Static learning plans that ignore failure.*

-   **Description**: The "Brain" of the app. It takes input from "Mock Interviews" (simulated via forms or AI chat) and updates the Skill Roadmap.
-   **Workflow**:
    1.  User takes a Mock Interview for "Machine Learning".
    2.  User inputs/receives feedback: "Weak in Model Interpretation".
    3.  **System Action**:
        -   *Reduces* priority of generic coding problems.
        -   *Injects* a new module: "Model Interpretability" into the active roadmap.
        -   *Suggests* a portfolio project: "Explainable AI Dashboard".
-   **Logic**:
    ```typescript
    if (mockInterview.score.communication < threshold) {
        roadmap.push({ type: 'SoftSkill', topic: 'Technical Communication' });
        roadmap.reorderPriority('Technical Communication', 'High');
    }
    ```

---

## 5. UI/UX Design System (Shadcn + TweakCN)

-   **Theme**: "Future Professional" - Clean, dark-mode dominant, with vibrant accent colors (Violet/Blue) for active learning states.
-   **Key Shadcn Components**:
    -   `Card`: For Company and Skill nodes.
    -   `Progress`: Visualizing mastery.
    -   `Sheet`: For side-panel resource details.
    -   `Toast`: For "Roadmap Updated" alerts.
    -   `Accordion`: For expanding detailed company profiles.

---

## 6. Implementation Steps (GitHub Ready)

### Phase 1: Setup & Foundation
1.  Initialize Next.js project with TypeScript.
    -   `npx create-next-app@latest . --typescript --tailwind --eslint`
2.  Install Shadcn/ui.
    -   `npx shadcn-ui@latest init`
3.  Configure TweakCN theme (colors, radius).
4.  Set up directory structure:
    -   `/components/ui` (Shadcn basics)
    -   `/components/features` (CompanyCard, SkillGraph)
    -   `/lib` (Data and Utilities)
    -   `/app` (Routes)

### Phase 2: Feature S4 - Company Explorer
5.  Create `data/companies.ts` with mock data for various industries.
6.  Build `/companies` page with `FilterBar` and `CompanyGrid`.
7.  Implement dynamic tags for "Startup" vs "MNC".

### Phase 3: Feature M1 - Skill Roadmap
8.  Create `data/roadmaps.ts` defining skills and dependencies.
9.  Build `/roadmap` page using a list or graph visualization.
10. Implement state to track "Completed" vs "Pending" skills.

### Phase 4: Feature H2 - Adaptive Engine
11. Create a "Mock Interview Feedback" form/modal.
12. Implement the `GuidanceEngine` logic in `/lib/engine.ts`.
13. Wire up the form so submitting "Weakness" updates the global Roadmap state.
14. Add visual feedback (Toast notifications) when the roadmap changes dynamically.

### Phase 5: Polish & Deployment
15. Add smooth transitions (Framer Motion or CSS transitions).
16. Ensure SEO tags are present.
17. Final code cleanup and documentation.

---

## 7. Folder Structure

```
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx            # Landing Page
│   ├── companies/          # S4: Company Explorer
│   ├── roadmap/            # M1: Skill Roadmap
│   └── interview/          # H2: Mock Interview & Feedback
├── components/
│   ├── ui/                 # Shadcn primitives
│   ├── company/            # CompanyCard, Filter
│   ├── skill/              # SkillNode, ResourceModal
│   └── adaptive/           # FeedbackForm, Notification
├── lib/
│   ├── companies-data.ts
│   ├── skills-data.ts
│   └── adaptive-engine.ts  # The H2 Core Logic
├── public/
└── styles/
```
