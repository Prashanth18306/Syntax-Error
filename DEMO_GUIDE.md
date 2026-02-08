# 🚀 CareerOptima: Competition Demo Script

**Project Name:** Syntax Error (CareerOptima)
**Tagline:** The Adaptive Career Guidance System
**Core Features to Showcase:**
1.  **S4 (Easy):** Company Discovery (Finding hidden gems)
2.  **M1 (Medium):** Skill Prioritization (The dependency graph)
3.  **H2 (Hard):** Adaptive Guidance (The "Self-Healing" Roadmap)

---

## 🎤 Host Script & Walkthrough

### 1. The Hook (0:00 - 0:30)
*   **Say:** "Most students fail placements not because they lack talent, but because they lack *direction*. They study random topics and apply to the same 10 companies everyone else is applying to."
*   **Say:** "We built **CareerOptima** to solve this. It's an intelligent system that unifies Discovery, Strategy, and Feedback into one loop."

### 2. Feature 1: Company Discovery (S4) (0:30 - 1:00)
*   **Navigate to:** `/companies`
*   **Say:** "First, we solve the 'Tunnel Vision' problem. Students only know Google or Microsoft. Our database highlights high-paying niches."
*   **Action:**
    1.  Click the **"SpaceTech"** or **"Embedded"** domain filter badge.
    2.  Show how the list filters instantly.
    3.  Point out a "Hidden Gem" or "Startup" tag.
    4.  **Mention:** "We index startups and core engineering firms often missed by standard portals."

### 3. Feature 2: Skill Mastery Roadmap (M1) (1:00 - 1:30)
*   **Navigate to:** `/roadmap`
*   **Say:** "Once a target is picked, students drown in tutorials. Our Roadmap Engine provides structure."
*   **Action:**
    1.  Scroll down to the Skill Nodes.
    2.  Point to a **"Locked"** skill (Greyed out).
    3.  **Say:** "Notice how 'Advanced' skills are locked? You cannot skip foundations."
    4.  Click a **"Pending"** skill (Yellow/Blue).
    5.  **Click "Mark Complete"**: Show the toast notification and how it unlocks the next node.

### 4. Feature 3: The "Magic" - Adaptive Guidance (H2) (1:30 - 3:00)
*   **Say:** "But here is our killer feature. Static roadmaps fail because they don't know *you*. Our system adapts based on your performance."
*   **Navigate to:** `/interview`
*   **Action - The Mock Interview:**
    1.  **Role:** Enter "Junior React Developer".
    2.  **JD:** Paste "Must know hooks and state management."
    3.  **Resume:** Click the "Upload Resume" box (it uses a mock file automatically).
    4.  Click **"INITIATE COMPREHENSIVE SCAN"**.
*   **The Interaction:**
    *   *Tip:* Use the **Text Input** box to type answers quickly. Do not rely on Voice in a noisy room.
    *   **Answer 1:** Type a short, weak answer (e.g., "I worked on a website.").
    *   **Answer 2:** Type another weak answer.
    *   **Answer 3:** Type "I don't know much about large scale systems."
*   **The Result:**
    1.  Wait for the "Quantizing..." animation.
    2.  Show the **"Strategic Critical Gap"** screen (Red Box).
    3.  **Read aloud:** "The AI detected a gap in [Weakness, e.g., System Design]."
*   **The Climax:**
    1.  Click **"ENTER ADAPTIVE HUB"** (redirects to `/roadmap`).
    2.  **Show the Banner:** Point to the new "Adaptive Goal Injected" banner at the top of the roadmap.
    3.  **Say:** "The system automatically injected a remedial module into my roadmap to fix the gap I just showed. The roadmap heals itself."

### 5. Closing (3:00 - 3:30)
*   **Say:** "CareerOptima isn't just a tracker; it's an active mentor that evolves with the student. From discovery to mastery to correction, we cover the entire lifecycle."
*   **Tech Stack:** "Built with Next.js 14, Shadcn UI, and custom Adaptive Logic Engines."

---

## 🛠️ Pre-Demo Checklist

1.  **Clean State:** Clear your browser's LocalStorage before the demo so the Roadmap starts fresh.
    *   *How?* Open DevTools (F12) -> Application -> Local Storage -> Right Click Javascript -> Clear.
2.  **Fallback:** If the internet fails, have the server running on `localhost:3000` beforehand.
3.  **Zoom:** Keep browser zoom at 100% or 110% for visibility.
4.  **Audio:** If you plan to use the Text-to-Speech feature, ensure "PC Sound" is shared or volume is up. **Recommendation:** Keep volume LOW or OFF and narrate it yourself to save time.

## ❓ Probable Q&A

*   **Q: How does the AI analyze the text?**
    *   *A:* "We use a heuristic keyword matching engine combined with logic density scoring. It checks for specific technical terminology relative to the job description."
*   **Q: Where is the data stored?**
    *   *A:* "Currently, we use LocalStorage for the MVP to ensure privacy and speed, but the architecture allows for a PostgreSQL backend."
*   **Q: Can you add custom companies?**
    *   *A:* "Yes, the data structure is JSON-based and easily extensible."
