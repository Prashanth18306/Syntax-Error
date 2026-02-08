# CareerOptima - Intelligent Career Guidance System

CareerOptima is a modern, intelligent web application designed to bridge the gap between academic learning and industry requirements. It provides a unified platform for students to discover companies, prioritize skills, and receive adaptive guidance to crack high-value roles.

![Project Status](https://img.shields.io/badge/Status-Development-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### 1. **Company Discovery (S4)**
*   **Explore Diverse Employers:** A searchable database of companies beyond just the famous giants, including Startups, MNCs, and specialized industries.
*   **Refined Filtering:** Filter companies by role (e.g., Embedded Systems, Backend), type (Startup vs. MNC), and domain.
*   **Hidden Gems:** Discover lesser-known but high-potential employers.

### 2. **Skill Mastery Roadmap (M1)**
*   **Structured Learning:** Visual dependency graphs for skills instead of flat lists.
*   **Prioritization:** Clear distinction between "Critical", "Good to have", and "Niche" skills.
*   **Curated Resources:** Single-source, high-quality resources for each skill node to prevent "tutorial hell".

### 3. **Adaptive Guidance Engine (H2)**
*   **Dynamic Adjustments:** The "Brain" of the application that adapts your learning path based on real-time feedback.
*   **Mock Interview Integration:** Input feedback from mock interviews to automatically update skill priorities.
*   **Smart Suggestions:** Automatically injects new modules or projects into your roadmap based on identified weaknesses.

## 🛠️ Technology Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
*   **UI Library:** [Shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)
*   **Styling:** Tailwind CSS with custom animations
*   **State Management:** React Context / Zustand
*   **Icons:** Lucide React

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Prashanth18306/Syntax-Error.git
    cd Syntax-Error
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open the app:**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
.
├── app/                  # Next.js App Router pages
│   ├── companies/        # Company Explorer feature
│   ├── interview/        # Mock Interview & Feedback feature
│   └── roadmap/          # Skill Roadmap feature
├── components/           # Reusable UI components
│   ├── adaptive/         # Adaptive engine components
│   ├── company/          # Company explorer components
│   ├── roadmap/          # Roadmap visualization components
│   ├── resume/           # Resume components
│   └── ui/               # Shadcn UI primitives
├── data/                 # Static data (companies, skills)
├── lib/                  # Utilities and core logic
│   └── adaptive-engine.ts # Adaptive guidance logic
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
