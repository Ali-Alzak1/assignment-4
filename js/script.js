// =========================================================
// Ali Alzaki — Portfolio (Assignment 3)
// Advanced Functionality with API Integration
// State Management, Complex Logic, Performance Optimization
// =========================================================

(function() {
  'use strict';

  // ========== Utility Functions ==========
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  // Debounce function for performance
  function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Format date relative to now
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

  // Toast notification system
  function showToast(title, message, type = 'success') {
    const container = $('#toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.innerHTML = `
      <div class="toast-title">${escapeHtml(title)}</div>
      <div class="toast-message">${escapeHtml(message)}</div>
    `;

    container.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  // ========== LocalStorage Keys ==========
  const STORAGE_KEYS = {
    theme: 'aa_theme',
    visitorName: 'aa_visitor_name',
    sectionVisibility: 'aa_section_visibility',
    projectFilter: 'aa_project_filter',
    projectSort: 'aa_project_sort',
    projectSearch: 'aa_project_search',
    projectDifficulty: 'aa_project_difficulty',
    skillCategory: 'aa_skill_category'
  };

  // ========== Theme Management ==========
  function initTheme() {
    const themeToggle = $('#theme-toggle');
    const html = document.documentElement;
    
    // Get saved theme or default to system
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'system';
    applyTheme(savedTheme);

    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (html.getAttribute('data-theme') === 'system') {
          applyTheme('system');
        }
      });
    }

    // Theme toggle button
    themeToggle?.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      let next;
      
      if (current === 'system') {
        next = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
      } else if (current === 'dark') {
        next = 'light';
      } else {
        next = 'dark';
      }
      
      applyTheme(next);
      localStorage.setItem(STORAGE_KEYS.theme, next);
      showToast('Theme updated', `Switched to ${next} mode.`);
    });
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    const themeIcon = $('#theme-toggle .theme-icon');
    
    html.setAttribute('data-theme', theme);
    
    // Update icon
    if (themeIcon) {
      const isDark = theme === 'dark' || (theme === 'system' && 
        window.matchMedia('(prefers-color-scheme: dark)').matches);
      themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
  }

  // ========== Personalized Greeting ==========
  function initGreeting() {
    const greetingText = $('#greeting-text');
    const personalizeBtn = $('#personalize-btn');
    if (!greetingText || !personalizeBtn) return;

    function updateGreeting() {
    const hour = new Date().getHours();
      let base;
      if (hour < 12) base = 'Good morning';
      else if (hour < 18) base = 'Good afternoon';
      else base = 'Good evening';

      const name = localStorage.getItem(STORAGE_KEYS.visitorName);
      greetingText.textContent = name ? `${base}, ${name}!` : `${base}! I'm`;
    }

    personalizeBtn.addEventListener('click', () => {
      const current = localStorage.getItem(STORAGE_KEYS.visitorName) || '';
    const name = prompt('What name should I greet you with?', current);
      
    if (name === null) return;
      
    const cleaned = name.trim().replace(/\s+/g, ' ');
    if (cleaned) {
        localStorage.setItem(STORAGE_KEYS.visitorName, cleaned);
        updateGreeting();
      showToast('Personalized', `I'll greet you as ${cleaned}.`);
    } else {
        localStorage.removeItem(STORAGE_KEYS.visitorName);
        updateGreeting();
      showToast('Reset', 'Greeting personalization cleared.');
    }
  });

    updateGreeting();
  }

  // ========== Section Visibility Toggle ==========
  function initSectionToggles() {
    const toggles = $$('.toggle-section-btn');
    
  function getSectionVisibility() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.sectionVisibility) || '{}');
    } catch {
      return {};
    }
  }

  function saveSectionVisibility(id, visible) {
    const vis = getSectionVisibility();
    vis[id] = visible;
      localStorage.setItem(STORAGE_KEYS.sectionVisibility, JSON.stringify(vis));
    }

    toggles.forEach(toggle => {
      const sectionId = toggle.getAttribute('data-section');
      if (!sectionId) return;

      const section = $(`#${sectionId}`);
      if (!section) return;

      // Load saved state
      const vis = getSectionVisibility();
      const isVisible = vis[sectionId] !== undefined ? vis[sectionId] : true;
      
      if (!isVisible) {
        section.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Show Section';
      }

      toggle.addEventListener('click', () => {
        const currentlyVisible = !section.hidden;
        section.hidden = currentlyVisible;
        toggle.setAttribute('aria-expanded', String(!currentlyVisible));
        toggle.textContent = currentlyVisible ? 'Show Section' : 'Hide Section';
        saveSectionVisibility(sectionId, !currentlyVisible);
        showToast(
          currentlyVisible ? 'Section hidden' : 'Section shown',
          `The ${sectionId.replace('-content', '')} section is now ${currentlyVisible ? 'hidden' : 'visible'}.`
        );
      });
    });
  }

  // ========== Scroll Progress ==========
  function initScrollProgress() {
  const progress = $('#scroll-progress');
    if (!progress) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = `${progressPercent}%`;
    }

  updateProgress();
    window.addEventListener('scroll', debounce(updateProgress, 10), { passive: true });
  window.addEventListener('resize', updateProgress);
  }

  // ========== Navigation ==========
  function initNavigation() {
    const navLinks = $$('.nav-link');
    const mobileMenuToggle = $('#mobile-menu-toggle');
    const navLinksContainer = $('#nav-links');
    const sections = navLinks.map(link => {
      const href = link.getAttribute('href');
      return href.startsWith('#') ? $(href) : null;
    }).filter(Boolean);

    // Mobile menu toggle
    mobileMenuToggle?.addEventListener('click', () => {
      navLinksContainer?.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer?.classList.remove('open');
      });
    });

    // Active link highlighting
  if ('IntersectionObserver' in window && sections.length) {
      const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
        const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
      });
    }, { rootMargin: '-50% 0px -40% 0px', threshold: 0.01 });

      sections.forEach(section => observer.observe(section));
    }

    // Smooth scroll
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = $(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // ========== Back to Top Button ==========
  function initBackToTop() {
    const backToTop = $('#back-to-top');
    if (!backToTop) return;

    function toggleButton() {
      backToTop.hidden = window.scrollY < 400;
    }

    toggleButton();
    window.addEventListener('scroll', debounce(toggleButton, 100), { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== GitHub API Integration ==========
  async function fetchGitHubRepos() {
    const reposContainer = $('#github-repos');
    const errorContainer = $('#github-error');
    const retryBtn = $('#retry-github');
    
    if (!reposContainer) return;

    // Show loading state
    reposContainer.innerHTML = `
      <div class="skeleton-card"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div></div>
      <div class="skeleton-card"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div></div>
      <div class="skeleton-card"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line"></div></div>
    `;
    
    if (errorContainer) errorContainer.hidden = true;

    try {
      // Replace with your GitHub username
      const username = 'octocat'; // Change this to your GitHub username
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=all`
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const repos = await response.json();
      
      if (!Array.isArray(repos) || repos.length === 0) {
        throw new Error('No repositories found');
      }

      reposContainer.innerHTML = repos.map(repo => `
        <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener" class="github-card">
          <div class="github-card-header">
            <h3 class="github-card-title">${escapeHtml(repo.name)}</h3>
            ${repo.language ? `<span class="github-card-lang">${escapeHtml(repo.language)}</span>` : ''}
          </div>
          <p class="github-card-desc">${escapeHtml(repo.description || 'No description available.')}</p>
          <div class="github-card-meta">
            <span>⭐ ${repo.stargazers_count || 0}</span>
            <span>🍴 ${repo.forks_count || 0}</span>
            <span>📅 ${formatDate(repo.updated_at)}</span>
          </div>
        </a>
      `).join('');

    } catch (error) {
      console.error('GitHub API Error:', error);
      reposContainer.innerHTML = '';
      if (errorContainer) {
        errorContainer.hidden = false;
        showToast('GitHub Error', 'Unable to load repositories. Please try again later.', 'error');
      }
    }
  }

  // Retry button
  $('#retry-github')?.addEventListener('click', fetchGitHubRepos);

  // ========== Weather API Integration ==========
  async function fetchWeather() {
    const weatherWidget = $('#weather-widget .weather-content');
    if (!weatherWidget) return;

    try {
      // Using wttr.in free weather API (no key required)
      const response = await fetch('https://wttr.in/NewYork?format=j1');
      
      if (!response.ok) {
        throw new Error('Weather API error');
      }

      const data = await response.json();
      const current = data.current_condition[0];
      
      const temp = parseInt(current.temp_C);
      const condition = current.weatherDesc[0].value;
      const humidity = parseInt(current.humidity);
      const windSpeed = parseInt(current.windspeedKmph);
      const location = data.nearest_area[0].areaName[0].value;

      weatherWidget.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--text);">${temp}°C</div>
            <p style="color: var(--text-muted); margin: 0.25rem 0 0;">${escapeHtml(condition)}</p>
          </div>
          <div style="font-size: 2.5rem;">${getWeatherEmoji(current.weatherCode)}</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);">
          <div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0 0 0.25rem;">Humidity</p>
            <p style="font-weight: 600; color: var(--text); margin: 0;">${humidity}%</p>
          </div>
          <div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0 0 0.25rem;">Wind</p>
            <p style="font-weight: 600; color: var(--text); margin: 0;">${windSpeed} km/h</p>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          📍 ${escapeHtml(location)}
        </p>
      `;

    } catch (error) {
      console.error('Weather API Error:', error);
      weatherWidget.innerHTML = `
        <p style="color: var(--text-muted); text-align: center;">Weather unavailable</p>
      `;
    }
  }

  function getWeatherEmoji(code) {
    const codeNum = parseInt(code);
    if (codeNum === 113) return '☀️';
    if (codeNum >= 119 && codeNum <= 122) return '☁️';
    if (codeNum >= 176 && codeNum <= 395) return '🌧';
    return '☀️';
  }

  // ========== Quotes API Integration ==========
  async function fetchQuote() {
    const quoteText = $('#quote-widget .quote-text');
    const quoteAuthor = $('#quote-widget .quote-author');
    if (!quoteText || !quoteAuthor) return;

    quoteText.textContent = 'Loading inspiration...';
    quoteAuthor.textContent = '';

    try {
      // Try Quotable API first
      let quote;
      try {
        const response = await fetch('https://api.quotable.io/random?tags=technology|programming|inspirational');
        if (response.ok) {
          const data = await response.json();
          quote = { content: data.content, author: data.author };
        } else {
          throw new Error('Quotable failed');
        }
      } catch {
        // Fallback to ZenQuotes
        const response = await fetch('https://zenquotes.io/api/random');
        if (response.ok) {
          const data = await response.json();
          const item = Array.isArray(data) ? data[0] : data;
          quote = { 
            content: item.q || item.quote || item.content, 
            author: item.a || item.author || 'Unknown' 
          };
        } else {
          throw new Error('All APIs failed');
        }
      }

      if (!quote) {
        throw new Error('No quote received');
      }

      quoteText.textContent = `"${quote.content}"`;
      quoteAuthor.textContent = `— ${quote.author}`;

    } catch (error) {
      console.error('Quote API Error:', error);
      // Fallback quotes
      const fallbackQuotes = [
        { content: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
        { content: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
        { content: 'Make it work, make it right, make it fast.', author: 'Kent Beck' }
      ];
      const fallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      quoteText.textContent = `"${fallback.content}"`;
      quoteAuthor.textContent = `— ${fallback.author}`;
    }
  }

  $('#refresh-quote')?.addEventListener('click', fetchQuote);

  // ========== Projects Filtering & Sorting ==========
  function initProjectsFiltering() {
    const searchInput = $('#project-search');
    const filterBtns = $$('.filter-btn');
    const sortSelect = $('#project-sort');
    const difficultySelect = $('#difficulty-filter');
    const projectGrid = $('#project-grid');
    const resultsCount = $('#results-count');
    const emptyState = $('#empty-state');
    const clearFiltersBtn = $('#clear-filters');

    if (!projectGrid) {
      console.warn('Project grid not found, filtering will not work');
      return;
    }

    const projectCards = $$('.project-card', projectGrid);
    
    if (projectCards.length === 0) {
      console.warn('No project cards found, filtering will not work');
      return;
    }

    const projects = projectCards.map(card => ({
      element: card,
      title: (card.dataset.title || '').toLowerCase(),
      tags: (card.dataset.tags || '').split(',').map(t => t.trim().toLowerCase()),
      date: new Date(card.dataset.date || '2000-01-01'),
      difficulty: (card.dataset.difficulty || '').toLowerCase(),
      category: (card.dataset.category || '').toLowerCase(),
      text: (card.textContent || '').toLowerCase()
    }));

    const state = {
      search: localStorage.getItem(STORAGE_KEYS.projectSearch) || '',
      filter: localStorage.getItem(STORAGE_KEYS.projectFilter) || 'all',
      sort: localStorage.getItem(STORAGE_KEYS.projectSort) || 'newest',
      difficulty: localStorage.getItem(STORAGE_KEYS.projectDifficulty) || 'all'
    };

    // Restore state
    if (searchInput) searchInput.value = state.search;
    filterBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.filter === state.filter);
    });
    if (sortSelect) sortSelect.value = state.sort;
    if (difficultySelect) difficultySelect.value = state.difficulty;

    function applyFilters() {
      const searchTerm = state.search.trim().toLowerCase();
      const filterTag = state.filter;
      const difficulty = state.difficulty;
    
      let filtered = projects.filter(project => {
        const matchesSearch = !searchTerm || 
          project.title.includes(searchTerm) || 
          project.text.includes(searchTerm);
        const matchesFilter = filterTag === 'all' || 
          project.tags.includes(filterTag) || 
          project.category === filterTag;
        const matchesDifficulty = difficulty === 'all' || 
          project.difficulty === difficulty;

        return matchesSearch && matchesFilter && matchesDifficulty;
      });

      // Sort
      filtered.sort((a, b) => {
        switch (state.sort) {
          case 'newest':
            return b.date - a.date;
          case 'oldest':
            return a.date - b.date;
          case 'az':
            return a.title.localeCompare(b.title);
          case 'za':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });

      // Update DOM - hide all first, then show filtered
      projects.forEach(project => {
        project.element.hidden = true;
      });
      
      filtered.forEach(project => {
        project.element.hidden = false;
      });

      // Update count
      const count = filtered.length;
      if (resultsCount) {
        resultsCount.textContent = `Showing ${count} of ${projects.length} project${projects.length !== 1 ? 's' : ''}`;
      }
      if (emptyState) {
        emptyState.hidden = count > 0;
      }
    }

    // Event listeners
    searchInput?.addEventListener('input', debounce((e) => {
      state.search = e.target.value;
      localStorage.setItem(STORAGE_KEYS.projectSearch, state.search);
      applyFilters();
    }, 300));

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.filter = btn.dataset.filter || 'all';
        localStorage.setItem(STORAGE_KEYS.projectFilter, state.filter);
        applyFilters();
      });
    });

    sortSelect?.addEventListener('change', (e) => {
      state.sort = e.target.value;
      localStorage.setItem(STORAGE_KEYS.projectSort, state.sort);
      applyFilters();
    });

    difficultySelect?.addEventListener('change', (e) => {
      state.difficulty = e.target.value;
      localStorage.setItem(STORAGE_KEYS.projectDifficulty, state.difficulty);
      applyFilters();
    });

    clearFiltersBtn?.addEventListener('click', () => {
      state.search = '';
      state.filter = 'all';
      state.sort = 'newest';
      state.difficulty = 'all';
      
      if (searchInput) searchInput.value = '';
      filterBtns.forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.filter === 'all');
      });
      if (sortSelect) sortSelect.value = 'newest';
      if (difficultySelect) difficultySelect.value = 'all';
      
      localStorage.removeItem(STORAGE_KEYS.projectSearch);
      localStorage.removeItem(STORAGE_KEYS.projectFilter);
      localStorage.removeItem(STORAGE_KEYS.projectSort);
      localStorage.removeItem(STORAGE_KEYS.projectDifficulty);
      
      applyFilters();
    });

    applyFilters();
  }

  // ========== Skills Management ==========
  function initSkills() {
    const skillsGrid = $('#skills-grid');
    const categoryBtns = $$('.skill-category-btn');
    if (!skillsGrid) return;

    const skills = [
      // Frontend
      { name: 'React', level: 85, category: 'frontend' },
      { name: 'JavaScript', level: 90, category: 'frontend' },
      { name: 'HTML/CSS', level: 95, category: 'frontend' },
      { name: 'TypeScript', level: 75, category: 'frontend' },
      { name: 'Tailwind CSS', level: 80, category: 'frontend' },
      // Backend
      { name: 'Node.js', level: 70, category: 'backend' },
      { name: 'Python', level: 75, category: 'backend' },
      { name: 'Java', level: 65, category: 'backend' },
      { name: 'SQL', level: 70, category: 'backend' },
      // Tools
      { name: 'Git', level: 85, category: 'tools' },
      { name: 'Figma', level: 80, category: 'tools' },
      { name: 'VS Code', level: 90, category: 'tools' },
      { name: 'Unity', level: 60, category: 'tools' },
      // Soft Skills
      { name: 'Problem Solving', level: 90, category: 'soft' },
      { name: 'Communication', level: 85, category: 'soft' },
      { name: 'Teamwork', level: 88, category: 'soft' },
      { name: 'Time Management', level: 82, category: 'soft' }
    ];

    let activeCategory = localStorage.getItem(STORAGE_KEYS.skillCategory) || 'all';

    function renderSkills() {
      const filtered = activeCategory === 'all' 
        ? skills 
        : skills.filter(s => s.category === activeCategory);

      skillsGrid.innerHTML = filtered.map(skill => `
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${escapeHtml(skill.name)}</span>
            <span class="skill-level">${skill.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" style="width: ${skill.level}%"></div>
          </div>
        </div>
      `).join('');

      // Animate progress bars
      setTimeout(() => {
        $$('.skill-progress', skillsGrid).forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      }, 100);
    }

    categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeCategory = btn.dataset.category || 'all';
        localStorage.setItem(STORAGE_KEYS.skillCategory, activeCategory);
        renderSkills();
      });
    });

    // Set initial active button
    const initialBtn = categoryBtns.find(btn => btn.dataset.category === activeCategory) || categoryBtns[0];
    if (initialBtn) {
      categoryBtns.forEach(b => b.classList.remove('is-active'));
      initialBtn.classList.add('is-active');
    }

    renderSkills();
  }

  // ========== Contact Form Validation ==========
  function initContactForm() {
  const form = $('#contact-form');
    const submitBtn = $('#submit-btn');
    const charCount = $('#char-count');
    const messageTextarea = $('#message');
    const formStatus = $('#form-status');

    if (!form) return;

  const validators = {
      name: (value) => {
        const trimmed = value.trim();
      return trimmed.length >= 2 && trimmed.length <= 50;
    },
      email: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      },
      subject: (value) => {
        const trimmed = value.trim();
        return trimmed.length >= 5 && trimmed.length <= 100;
      },
      message: (value) => {
        const trimmed = value.trim();
        return trimmed.length >= 20 && trimmed.length <= 1000;
      }
    };

    function showFieldError(fieldName, show) {
      const errorEl = $(`.error-message[data-error-for="${fieldName}"]`);
      const inputEl = $(`#${fieldName}`);
      
      if (errorEl) errorEl.hidden = !show;
      if (inputEl) {
        inputEl.classList.toggle('error', show);
      }
    }

    // Character counter
    messageTextarea?.addEventListener('input', (e) => {
      const length = e.target.value.length;
      if (charCount) {
        charCount.textContent = length;
        const charCountParent = charCount.parentElement;
        if (charCountParent) {
          charCountParent.classList.toggle('over', length > 1000);
      }
    }
  });

    // Real-time validation
    ['name', 'email', 'subject', 'message'].forEach(fieldName => {
      const input = $(`#${fieldName}`);
      if (input) {
        input.addEventListener('blur', () => {
          const value = input.value;
          const isValid = validators[fieldName](value);
          showFieldError(fieldName, !isValid);
        });
      }
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        subject: formData.get('subject') || '',
        message: formData.get('message') || ''
      };

      // Validate all fields
      let isValid = true;
      Object.keys(validators).forEach(fieldName => {
        const fieldValid = validators[fieldName](data[fieldName]);
        showFieldError(fieldName, !fieldValid);
        if (!fieldValid) isValid = false;
      });

      if (!isValid) {
        showToast('Validation Error', 'Please fix the errors in the form.', 'error');
      return; 
    }

      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      if (formStatus) {
        formStatus.textContent = 'Sending...';
        formStatus.className = 'form-status';
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      form.reset();
      if (charCount) charCount.textContent = '0';
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      
      if (formStatus) {
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
      }

      showToast('Message Sent!', 'Thanks for reaching out. I\'ll get back to you soon.');

      // Clear status after 5 seconds
      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }
      }, 5000);
    });
  }

  // ========== Initialize Everything ==========
  function init() {
    // Set current year
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Initialize all features
    initTheme();
    initGreeting();
    initScrollProgress();
    initNavigation();
    initBackToTop();
    initSectionToggles();
    // Initialize projects filtering after a small delay to ensure DOM is ready
    setTimeout(() => {
      initProjectsFiltering();
    }, 100);
    initSkills();
    initContactForm();

    // Fetch API data
    fetchGitHubRepos();
    fetchWeather();
    fetchQuote();

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // '/' to focus search
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && 
          document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        $('#project-search')?.focus();
      }
    });

    console.log('Portfolio initialized successfully! 🚀');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
