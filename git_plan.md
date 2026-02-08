# Git Integration & Localhost Presentation Strategy

**Repository**: `https://github.com/Prashanth18306/Syntax-Error.git`

## Stack Configuration for Localhost Presentation
To ensure a flawless presentation on localhost without dependency on external servers or unstable internet connections, we will adapt the stack as follows:

1.  **Framework**: **Next.js 14 (App Router)** - Remains the best choice for a structured, responsive web app.
2.  **Data Layer**: **In-Memory Mock Data + LocalStorage**.
    *   *Why*: Removes the need for a running backend (Node/Python) or Database (Mongo/Postgres). The app will work 100% offline.
    *   *Implementation*: All company and skill data will be in TypeScript files (`data/companies.ts`). User progress will be saved to the browser's LocalStorage so it persists across refreshes during the demo.
3.  **Authentication**: **Mock Auth**.
    *   *Why*: Real auth (Firebase/Clerk) requires internet and API keys.
    *   *Implementation*: A simple "Enter Name" screen that stores the user in Context.
4.  **Styling**: **Tailwind CSS + Shadcn/UI**.
    *   Ensures the "Wow" factor with minimal custom CSS debugging.

---

## 5-Step Progressive Implementation & Commit Plan

This plan aims to build the application logically, ensuring distinct commits for each major feature (Problem Statement).

### Step 1: Foundation & Scaffolding
*Set up the project structure, install dependencies, and configure the design system.*
-   **Actions**:
    -   Initialize Next.js project.
    -   Install `shadcn-ui`, `lucide-react`, `framer-motion`.
    -   Configure `globals.css` with the chosen color palette.
    -   Set up the Git remote.
-   **Deliverable**: A running "Hello World" app with the correct fonts and easy-to-read structure.
-   **Commit Message**: `chore: Initialize Next.js project with Shadcn/UI and basic configuration`

### Step 2: Core UI & Landing Page ("The Hook")
*Build the main layout and the landing page to capture attention immediately (Marks: UI/Design).*
-   **Actions**:
    -   Create responsive `Navbar` and `Footer`.
    -   Build a high-impact Landing Page explaining the problem.
    -   Create the "Revenue Model" static page (Marks requirement).
-   **Deliverable**: A beautiful, navigable website shell.
-   **Commit Message**: `feat: Implement App Shell, Landing Page, and Revenue Model`

### Step 3: Module S4 - Company Explorer (Easy)
*Implement the company discovery feature.*
-   **Actions**:
    -   Create `data/companies.ts` with diverse mock data (Tesla, Startups, ISRO).
    -   Build the `/companies` page with Search and Filter components.
    -   Implement "Card" UI for companies.
-   **Deliverable**: Functional Company Explorer.
-   **Commit Message**: `feat(S4): Implement Company Explorer with mock data and filtering`

### Step 4: Module M1 - Skill Roadmap (Medium)
*Implement the skill prioritization and tracking feature.*
-   **Actions**:
    -   Create `data/skills.ts` with dependency logic.
    -   Build the `/roadmap` page with a visual list/graph of skills.
    -   Implement "Complete" toggle functionality (persisted to LocalStorage).
-   **Deliverable**: Interactive Skill Roadmap.
-   **Commit Message**: `feat(M1): Implement Interactive Skill Roadmap with local persistence`

### Step 5: Module H2 - Adaptive Engine (Hard) & Final Polish
*Implement the intelligence that connects interviews to the roadmap.*
-   **Actions**:
    -   Create the "Mock Interview" input form.
    -   Implement the `AdaptiveEngine` logic (e.g., if Score < 50, add "Remedial Module").
    -   Add Toast notifications to show the "System Logic" in action.
    -   Final polish of animations and transitions.
-   **Deliverable**: fully functional closed-loop guidance system options.
-   **Commit Message**: `feat(H2): Implement Adaptive Guidance Engine and final presentation polish`
