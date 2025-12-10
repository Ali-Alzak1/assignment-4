# 📁 Assignment 3 – Advanced Functionality  
### Personal Portfolio Web Application

This repository contains my implementation for **Assignment 3 – Advanced Functionality**, where I continued developing my personal portfolio web application.  
The focus for this stage of the project was to implement **API integrations**, **complex logic**, **state management**, **performance improvements**, and a **documented use of AI tools**.

---

# 🚀 Overview

This version of my portfolio expands on the structure built in Assignments 1 and 2 and introduces more advanced features including:

- Live API-powered components (GitHub, weather, quotes)
- Complex client-side logic (filtering, sorting, form validation)
- State persistence using localStorage
- Optimized performance and accessibility
- Detailed documentation of AI-assisted development

The entire application runs on **HTML, CSS, and vanilla JavaScript** with no build tools, making it lightweight, fast, and easy to run locally.

---

# 📂 Project Structure

<pre>
assignment-3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
</pre>




---

# 🧠 Key Features

## 🔗 1. External API Integrations
Implemented fully-functional fetch requests with graceful error handling:

### **GitHub API**
- Displays my latest repositories  
- Shows language, stars, forks, and last updated time  
- Includes skeleton loaders and offline fallback messaging  

### **Weather API (wttr.in)**
- Fetches live weather data (temperature, humidity, conditions)  
- Converts weather codes to emoji for friendly UI  

### **Quotes API (Quotable → ZenQuotes → Local fallback)**
- Motivational tech/programming quotes  
- Multi-layer fallback ensures this widget never fails  

---

## 🧩 2. Complex Logic

### **Project Explorer**
- Debounced search  
- Tag-based filtering  
- Difficulty filtering  
- Sorting options  
- Empty-state handling  
- Persistent filters  

### **Contact Form**
- Live validation  
- Email formatting checks  
- Character counter  
- Prevents invalid submissions  
- Success toast notifications  

### **Skills & Sections**
- Animated skill bars  
- Category filtering  
- Collapsible website sections with saved state  

---

## 💾 3. State Management

Using `localStorage`, the site remembers:

- Theme (light / dark / system)
- Visitor’s name (personalized greeting)
- Section visibility
- Project filters
- Skills category selection

State is restored on refresh automatically.

---

# ⚡ 4. Performance Enhancements

- Lazy-loaded images  
- Single optimized CSS + JS payload  
- Debounced event handlers  
- No external frameworks → fast load  
- Prefers-reduced-motion support  
- Removed unused assets and code  

---

# ♿ Accessibility & UX

- Semantic HTML structure  
- ARIA labels and aria-expanded sync  
- Keyboard navigation + skip link  
- Toast notifications with aria-live regions  
- Sticky navigation + scroll progress indicator  
- Fully responsive layout across devices  

---

# 🛠 Running the Project Locally

1. Clone the repository:

git clone https://github.com/Ali-Alzak1/assignment-3.git


2. Navigate into the folder:

cd assignment-3


3. Open `index.html` in your browser.  
_No setup or installation needed._

---

# 🧪 Testing Summary

Manually tested for:

- API success/failure handling  
- All project filter combinations  
- Contact form validation  
- Section toggle persistence  
- Theme switching  
- Mobile and desktop breakpoints  
- Keyboard navigation  
- Multiple browser compatibility  

---

# 🤖 AI Usage Summary

A detailed log is available in:

docs/ai-usage-report.md


### High-Level Summary
AI Tools Used:
- **Lovable** – design exploration  
- **ChatGPT** – planning, research, troubleshooting  
- **GitHub Copilot** – boilerplate suggestions in code editor  
- **Cursor** – refactoring, debugging, documentation shaping  

### Responsible Use
- All AI suggestions were reviewed, edited, rewritten, or adapted manually.  
- No AI output was used blindly.  
- Full transparency is provided in the AI usage report.  

---

# 📄 Additional Documentation

| File | Description |
|------|-------------|
| `docs/technical-documentation.md` | Architecture, APIs, logic, testing, and performance details |
| `docs/ai-usage-report.md` | Required documentation of all AI assistance |

---


---

# 📜 Academic Integrity

All work in this assignment is my own.  
AI tools were used responsibly for brainstorming, debugging, and documentation—not for replacing understanding.  
All AI usage is fully documented as required.

---

# ✅ Final Notes

This version of the portfolio includes advanced interactivity, APIs, state management, and performance improvements—meeting all Assignment 3 requirements.  
It also forms a strong foundation for future portfolio iterations.

If you want:
- a banner image  
- badges (GitHub, license, status)  
- screenshots or GIF previews  
Just let me know!


