# AI Usage Report – Assignment 3

I relied on four AI assistants during this assignment. Each tool played a different role, and I kept control of the final code by reviewing, editing, and testing everything they suggested.

---

## 1. Tool Overview

| Tool | How I used it | Notes |
| --- | --- | --- |
| **Lovable** | Early design exploration. I sketched several layout ideas, reviewed the generated mockups, and then rebuilt the winning direction manually in HTML/CSS. | Treated as a visual brainstorming partner—no code was copied. |
| **ChatGPT** | Planning and research. I asked for API comparisons, validation checklists, and step-by-step outlines before writing code. | Helped me confirm feasibility (e.g., picking wttr.in for weather). |
| **GitHub Copilot** | Inline boilerplate suggestions inside VS Code. It filled in predictable pieces like debounce helpers or repetitive state setters. | Every snippet was inspected/edited to match my style and requirements. |
| **Cursor (this assistant)** | Focused coding help, refactors, debugging, and documentation reviews while I converted the React prototype to pure HTML/CSS/JS. | Great for double-checking changes and keeping the repo organized. |

---

## 2. Concrete Use Cases

1. **Project Planning (ChatGPT)**
   - Prompted it for a “setup checklist” covering API integration, state management, and docs.
   - Outcome: a clear roadmap I followed while structuring `index.html`, `styles.css`, and `script.js`.

2. **Design Polish (Lovable)**
   - Uploaded written requirements and asked for animated, portfolio-friendly layout suggestions.
   - Outcome: reference artboards that influenced my hero layout, filter toolbar spacing, and card styling.

3. **Code Generation (GitHub Copilot)**
   - Used primarily for repetitive functions: debounced search handler, toast helper skeleton, and localStorage key switch statements.
   - Outcome: faster typing with zero blind adoption; I rewrote anything that didn’t feel right.

4. **Implementation + Fixes (Cursor)**
   - Helped me convert React hooks into vanilla JavaScript patterns, catch typos, and reword documentation.
   - Outcome: confident migration from the original React project to a static-site version that still meets every rubric item.

---

## 3. Benefits Noticed

- **Momentum**: Having AI help with ideation and boilerplate kept me focused on higher-level logic.
- **Quality**: Suggestions often reminded me of edge cases—especially around error handling and accessibility.
- **Learning**: Comparing AI-generated solutions with my own approach sharpened my understanding of vanilla JavaScript patterns.

---

## 4. Challenges & How AI Helped

| Challenge | Tool(s) | Resolution |
| --- | --- | --- |
| Converting React hooks to plain JS without losing state behavior | Cursor, ChatGPT | Planned the conversion with ChatGPT, then used Cursor to spot mistakes and ensure localStorage replaced the removed hooks. |
| Picking stable APIs that don’t require keys | ChatGPT | Asked for keyless options and tested each suggestion; wttr.in and Quotable fit perfectly. |
| Keeping large documentation sections readable | Cursor | Used it to review tone, restructure headings, and ensure the README + docs were human and assignment-friendly. |

---

## 5. Responsible Usage

- I never pasted production code blindly. Every snippet was reviewed, edited, and tested.
- All AI involvement is documented here and referenced in the README.
- Design decisions, architecture, and final wording are mine; AI was a co-pilot, not the driver.
- Manual testing confirmed that the final site behaves exactly as described in the assignment brief.

---

**Summary:** Using Lovable, ChatGPT, GitHub Copilot, and Cursor together gave me faster iterations without sacrificing understanding. Each tool covered a different part of the workflow—design ideation, planning, coding assistance, and documentation polish—while I stayed accountable for the final product.***
