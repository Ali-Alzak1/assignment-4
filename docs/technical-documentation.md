# Technical Documentation – Assignment 3

This document explains how the Assignment‑3 portfolio is assembled, why each requirement was implemented the way it was, and how a reviewer can navigate the code quickly. Everything runs on plain HTML, CSS, and vanilla JavaScript—no build tooling—so the source can be opened directly in a browser or editor.

---

## 1. Architecture at a Glance

| Layer | File(s) | Notes |
| --- | --- | --- |
| Structure | `index.html` | Semantic layout for hero, about, projects, skills, GitHub feed, contact form, and footer. |
| Styling | `css/styles.css` | Theme tokens, responsive grid/flex layouts, animations, utility classes, and accessibility refinements. |
| Behavior | `js/script.js` | API calls, state management, filters, modals, validators, keyboard shortcuts, and toast notifications. |
| Assets | `assets/images/` + `SWE216 Project` | Images used in cards + the downloadable PDF described in the project brief. |
| Docs | `README.md`, `docs/*` | Human-friendly overview, deep technical notes, and AI usage log. |
| Housekeeping | `.gitignore` | Removes OS artifacts and scratch files from commits. |

### Stack choices
- **HTML5 landmarks + ARIA** to keep the DOM accessible.
- **CSS custom properties** for theming + a single stylesheet for performance.
- **ES6+ JavaScript** with async/await, fetch, Intersection Observer, and localStorage.
- **External APIs**: GitHub (repos), wttr.in (weather), Quotable + ZenQuotes (quotes).

---

## 2. Feature Deep Dive

### 2.1 API Integrations (js/script.js)
1. **GitHub repositories (`fetchGitHubRepos`)**
   - Endpoint: `https://api.github.com/users/{username}/repos?sort=updated&per_page=6`
   - Shows name, description, language, stars, forks, and “updated X days ago”.
   - Uses skeleton loaders, error messaging, and a retry button.
2. **Weather widget (`fetchWeather`)**
   - Endpoint: `https://wttr.in/NewYork?format=j1`
   - Displays temperature, condition, humidity, wind speed, and location.
   - Converts weather codes to emoji for quick visual cues.
3. **Quotes (`fetchQuote`)**
   - Primary: Quotable (technology/programming tags).
   - Fallback: ZenQuotes.
   - Final fallback: curated local list so the card never renders empty.

All API responses are sanitized through a lightweight `escapeHtml` helper before they hit the DOM.

### 2.2 Complex Logic
- **Project explorer (`initProjectsFiltering`)** combines debounced search, tag filters, difficulty dropdown, and sort order. The results count and empty state keep users oriented.
- **Skills board (`initSkills`)** allows filtering by category with animated progress bars to reinforce changes.
- **Contact form (`initContactForm`)** includes field-level validation, live character counting, loading states, and toast confirmations.
- **Section toggles (`initSectionToggles`)** let visitors collapse any section they are done with and persist that preference via localStorage.

### 2.3 State Management
| Key | Purpose |
| --- | --- |
| `aa_theme` | Light/dark/system preferences (system is inferred via `matchMedia`). |
| `aa_visitor_name` | Personalized greeting message. |
| `aa_section_visibility` | JSON map of `{section-id: boolean}` for collapsible sections. |
| `aa_project_*` | Search term, tag, sort order, and difficulty level for the project explorer. |
| `aa_skill_category` | Last-selected skills tab. |

When the page loads, each initialization function reads its key, applies the state, and updates ARIA attributes so assistive tech stays in sync.

---

## 3. Performance, UX, and Accessibility

### Performance tactics
- Lazy-loaded images with preserved aspect ratios to avoid layout shifts.
- Intersection Observer for scroll-triggered reveals and navigation highlighting (zero scroll polling).
- Debounced search input (300 ms) to avoid hammering the DOM.
- Single CSS/JS payloads with no external framework dependencies.

### UX and accessibility
- Focus outlines, skip link, and keyboard shortcuts (`/` to focus search, etc.).
- Back-to-top floating button, sticky transparent nav, and scroll-progress indicator.
- ARIA live regions for toasts and validation messages.
- Respects `prefers-reduced-motion` by toning down animations automatically.

---

## 4. Testing Summary

Manual verification covered:
- Theme toggle persistence and localStorage resets.
- Every combination of project filters and sort orders.
- Form validation errors + the success toast.
- API integrations under both connected and forced-offline conditions.
- Responsive layouts on Chrome, Edge, Firefox, and Safari (mobile + desktop).
- Accessibility basics: tab order, skip link, proper aria-expanded states on toggles.
- Asset links (Figma prototype and `SWE216 Project` PDF) to ensure they open/download as expected.

Given the static nature of the project, automated tests weren’t required for this assignment; manual testing hit every rubric item.

---

## 5. Future Considerations
- Swap the demo GitHub username for my live account or authenticated requests.
- Wire the contact form to a serverless endpoint (Netlify Functions, Supabase, etc.).
- Add a service worker for offline caching.
- Expand the API section (news feed, blog posts, or calendar events).
- Layer in lightweight analytics to understand how visitors interact with filters.

---

This documentation reflects the code currently shipped in the Assignment‑3 submission and should give any reviewer the context needed to trace requirements back to implementation quickly.***
