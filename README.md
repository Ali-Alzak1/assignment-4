# 📁 Assignment 4 – Personal Web Application
### Final Portfolio Project

This repository contains my implementation for **Assignment 4 – Personal Web Application**, the final and most polished version of my personal portfolio web application. This project brings together all the skills and concepts learned throughout the course into a production-ready, professional portfolio website.

---

# 🚀 Overview

This final version of my portfolio is a comprehensive, fully-featured web application that demonstrates:

- **Complete Application**: Full-featured, functional, and deployed web app
- **Professional Quality**: Production-ready code and design
- **Innovation**: Unique features and creative implementation
- **Comprehensive Documentation**: Detailed setup instructions and technical documentation
- **AI Integration**: Transparent and responsible use of AI tools throughout development

The entire application runs on **HTML, CSS, and vanilla JavaScript** with no build tools, making it lightweight, fast, and easy to run locally or deploy.

---

# 📂 Project Structure

```
assignment-4/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── evaluation hub project.jpg
│       ├── student impact hub project.jpg
│       ├── my photo.jpg
│       └── details.png
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── presentation/
│   ├── slides.pdf (to be added)
│   └── demo-video.mp4 (to be added)
├── SWE216 Project (PDF)
└── .gitignore
```

---

# 🧠 Key Features

## 🔗 1. External API Integrations

Implemented fully-functional fetch requests with graceful error handling:

### **GitHub API**
- Displays latest repositories dynamically
- Shows programming language, stars, forks, and last updated time
- Includes skeleton loaders for better UX
- Offline fallback messaging with retry functionality

### **Weather API (wttr.in)**
- Fetches live weather data (temperature, humidity, wind speed, conditions)
- Converts weather codes to emoji for friendly UI
- Displays location-based weather information

### **Quotes API (Quotable → ZenQuotes → Local fallback)**
- Motivational tech/programming quotes
- Multi-layer fallback ensures this widget never fails
- Refresh button for new quotes

---

## 🧩 2. Complex Logic

### **Project Explorer**
- **Debounced search**: Real-time search with 300ms debounce for performance
- **Tag-based filtering**: Filter by project type (Web, Game, UI/UX)
- **Difficulty filtering**: Filter by skill level (Beginner, Intermediate, Advanced)
- **Sorting options**: Sort by date (newest/oldest) or alphabetically (A-Z/Z-A)
- **Empty-state handling**: User-friendly messages when no projects match
- **Persistent filters**: All filter states saved to localStorage

### **Contact Form**
- **Live validation**: Real-time field validation with error messages
- **Email formatting checks**: Regex-based email validation
- **Character counter**: Live character count for message field
- **Prevents invalid submissions**: Form won't submit until all fields are valid
- **Success toast notifications**: Visual feedback on successful submission

### **Skills & Sections**
- **Animated skill bars**: Smooth progress bar animations
- **Category filtering**: Filter skills by Frontend, Backend, Tools, or Soft Skills
- **Collapsible website sections**: Hide/show sections with saved state
- **Persistent preferences**: All UI preferences saved to localStorage

---

## 💾 3. State Management

Using `localStorage`, the site remembers:

- **Theme**: Light / Dark / System preference
- **Visitor's name**: Personalized greeting message
- **Section visibility**: Which sections are collapsed/expanded
- **Project filters**: Search term, tag filter, sort order, and difficulty level
- **Skills category**: Last-selected skills tab

State is automatically restored on page refresh, providing a seamless user experience.

---

## ⚡ 4. Performance Enhancements

- **Lazy-loaded images**: Images load only when needed
- **Single optimized CSS + JS payload**: No external framework dependencies
- **Debounced event handlers**: Reduced unnecessary function calls
- **No external frameworks**: Fast load times and minimal bundle size
- **Prefers-reduced-motion support**: Respects user accessibility preferences
- **Optimized assets**: Compressed images and minimal code

---

## ♿ Accessibility & UX

- **Semantic HTML structure**: Proper use of HTML5 semantic elements
- **ARIA labels and aria-expanded sync**: Screen reader support
- **Keyboard navigation**: Full keyboard accessibility with skip link
- **Toast notifications with aria-live regions**: Accessible notifications
- **Sticky navigation + scroll progress indicator**: Visual feedback on scroll position
- **Fully responsive layout**: Works seamlessly across all devices and screen sizes
- **Focus management**: Clear focus indicators for keyboard users

---

# 🛠 Setup Instructions

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended for testing)
- Git (optional, for cloning the repository)

## Installation Methods

### Method 1: Direct File Opening (Simplest)

1. **Download or clone the repository**:
   ```bash
   git clone https://github.com/your-username/assignment-4.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd assignment-4
   ```

3. **Open `index.html` directly in your browser**:
   - Double-click `index.html`, or
   - Right-click → Open with → Your preferred browser

   **Note**: Some features (like API calls) may be limited when opening files directly due to CORS restrictions. For full functionality, use Method 2.

### Method 2: Local Web Server (Recommended)

#### Option A: Using Python (if installed)

1. Navigate to the project directory:
   ```bash
   cd assignment-4
   ```

2. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

3. Open your browser and visit:
   ```
   http://localhost:8000
   ```

#### Option B: Using Node.js (if installed)

1. Install a simple HTTP server globally:
   ```bash
   npm install -g http-server
   ```

2. Navigate to the project directory:
   ```bash
   cd assignment-4
   ```

3. Start the server:
   ```bash
   http-server -p 8000
   ```

4. Open your browser and visit:
   ```
   http://localhost:8000
   ```

#### Option C: Using VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The site will automatically open in your browser

#### Option D: Using PHP (if installed)

1. Navigate to the project directory:
   ```bash
   cd assignment-4
   ```

2. Start PHP's built-in server:
   ```bash
   php -S localhost:8000
   ```

3. Open your browser and visit:
   ```
   http://localhost:8000
   ```

## Configuration

### GitHub API Configuration

To display your own GitHub repositories:

1. Open `js/script.js`
2. Find the line: `const username = 'Ali-Alzak1';` (around line 333)
3. Replace `'Ali-Alzak1'` with your GitHub username if needed:
   ```javascript
   const username = 'your-github-username';
   ```

### Weather Location Configuration

To change the weather location:

1. Open `js/script.js`
2. Find the line: `const response = await fetch('https://wttr.in/NewYork?format=j1');` (around line 377)
3. Replace `NewYork` with your desired city:
   ```javascript
   const response = await fetch('https://wttr.in/YourCity?format=j1');
   ```

## Troubleshooting

### API Calls Not Working

- **Issue**: GitHub repos, weather, or quotes not loading
- **Solution**: 
  - Ensure you're using a local web server (Method 2) instead of opening the file directly
  - Check your internet connection
  - Some APIs may have rate limits; wait a few minutes and try again

### Images Not Displaying

- **Issue**: Project images or profile photo not showing
- **Solution**: 
  - Verify that all image files exist in `assets/images/`
  - Check file paths in `index.html` match actual file names
  - Ensure image file names don't have special characters

### Theme Not Persisting

- **Issue**: Theme resets to default on page refresh
- **Solution**: 
  - Check browser settings to ensure localStorage is enabled
  - Clear browser cache and try again
  - Check browser console for JavaScript errors

### Mobile Layout Issues

- **Issue**: Layout looks broken on mobile devices
- **Solution**: 
  - Clear browser cache
  - Ensure viewport meta tag is present in `index.html`
  - Test in different browsers

---

# 🧪 Testing

## Manual Testing Checklist

The application has been manually tested for:

- ✅ **API Integration**: GitHub, Weather, and Quotes APIs
- ✅ **Form Validation**: All contact form fields
- ✅ **Filtering & Sorting**: All project filter combinations
- ✅ **State Persistence**: Theme, filters, section visibility
- ✅ **Responsive Design**: Mobile, tablet, and desktop breakpoints
- ✅ **Browser Compatibility**: Chrome, Firefox, Safari, Edge
- ✅ **Accessibility**: Keyboard navigation, screen reader compatibility
- ✅ **Error Handling**: Graceful degradation when APIs fail

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

# 🤖 AI Usage Summary

A detailed log is available in: **`docs/ai-usage-report.md`**

### High-Level Summary

**AI Tools Used:**
- **Lovable** – Design exploration and UI/UX inspiration
- **ChatGPT** – Planning, research, troubleshooting, and code explanation
- **GitHub Copilot** – Boilerplate suggestions and code completion
- **Cursor** – Refactoring, debugging, documentation shaping, and code review

### Responsible Use

- All AI suggestions were reviewed, edited, rewritten, or adapted manually
- No AI output was used blindly without understanding
- Full transparency is provided in the AI usage report
- AI was used as a learning tool, not a replacement for understanding

---

# 📄 Additional Documentation

| File | Description |
|------|-------------|
| `docs/technical-documentation.md` | Comprehensive architecture, APIs, logic, testing, and performance details |
| `docs/ai-usage-report.md` | Detailed documentation of all AI assistance with specific use cases |

---

# 🌐 Live Deployment

The portfolio is deployed and accessible at:

**GitHub Pages**: [Link to be added]  
**Netlify**: [Link to be added]  
**Vercel**: [Link to be added]

---

# 🎯 Projects Showcase

This portfolio showcases three projects:

1. **Evaluation Hub** (Beginner)
   - Students evaluate instructors monthly with simple, interactive flows
   - Technologies: React, UI/UX Design
   - [View Figma Design](https://www.figma.com/design/e7590jddXaMW7LUXvPNr5y/Instructor-Rating-App?node-id=0-1&p=f&t=EkXtbk1I00IdTlIe-0)

2. **Student Impact Hub** (Intermediate)
   - Activities and events in one place to encourage student involvement
   - Technologies: Web Development, Community Platform
   - [Download Project PDF](SWE216%20Project)

3. **JadwalGYM** (Advanced)
   - Full-stack MERN application for discovering, creating, and managing workout programs
   - Technologies: MERN Stack (MongoDB, Express.js, React, Node.js)
   - Features: User authentication, program ratings, custom schedule builder, admin dashboard
   - [View Figma Design](https://www.figma.com/design/kcLsyUcdHoMwOS8iJ0dojI/SWE-web-project?node-id=0-1&p=f)
   - [Live Demo](https://jadwal-gym-git-main-karraralqallafs-projects.vercel.app/)

---

# 📜 Academic Integrity

All work in this assignment is my own. AI tools were used responsibly for brainstorming, debugging, and documentation—not for replacing understanding. All AI usage is fully documented as required.

---

# ✅ Final Notes

This final version of the portfolio represents a complete, production-ready web application that demonstrates:

- Mastery of all course concepts
- Professional code quality and design
- Innovation and creativity
- Comprehensive documentation
- Responsible AI integration

The portfolio is ready to be shared, deployed, and showcased as a professional project.

---

# 📞 Contact

For questions or feedback about this project, please reach out through the contact form on the portfolio website or via the contact information provided in the portfolio.

---

**Made with ❤️ and lots of coffee** ☕
