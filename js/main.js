// main.js
// Meraki Portfolio: Home Page Animations & Navigation
// Uses GSAP for advanced, punky effects

document.addEventListener('DOMContentLoaded', () => {
  // GSAP Hero Animations
  if (window.gsap) {
    gsap.from('.navbar', { y: -60, opacity: 0, duration: 1, ease: 'power4.out' });
    gsap.from('.big-name', { x: -80, opacity: 0, duration: 1.2, delay: 0.2, ease: 'expo.out' });
    gsap.from('.tagline', { x: 80, opacity: 0, duration: 1.1, delay: 0.5, ease: 'expo.out' });
    gsap.from('.about', { y: 40, opacity: 0, duration: 1, delay: 0.8, ease: 'power2.out' });
    gsap.from('.contact-icons .icon', {
      scale: 0.5,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      delay: 1.1,
      ease: 'back.out(1.7)'
    });
    gsap.from('.profile-pic', {
      scale: 0.7,
      opacity: 0,
      rotate: -12,
      duration: 1.2,
      delay: 0.7,
      ease: 'elastic.out(1, 0.7)'
    });
  }

  // Navigation active link highlight
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Add fade-in-up to hero section
  document.querySelector('.hero')?.classList.add('fade-in-up');

  // === Animated Dark Mode Toggle Button ===
  function createDarkModeToggle() {
    const btn = document.createElement('button');
    btn.className = 'dark-mode-toggle';
    btn.title = 'Toggle dark mode';
    btn.innerHTML = '<span id="dark-toggle-icon">🌙</span>';
    document.body.appendChild(btn);
    return btn;
  }

  function setDarkMode(enabled) {
    if (enabled) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
      document.getElementById('dark-toggle-icon').textContent = '☀️';
      localStorage.setItem('darkMode', '1');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
      document.getElementById('dark-toggle-icon').textContent = '🌙';
      localStorage.setItem('darkMode', '0');
    }
  }

  // Insert toggle button and set initial mode
  const darkBtn = createDarkModeToggle();
  let darkMode = localStorage.getItem('darkMode') === '1';
  setDarkMode(darkMode);
  darkBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    setDarkMode(darkMode);
    darkBtn.animate([
      { transform: 'scale(1) rotate(0deg)' },
      { transform: 'scale(1.25) rotate(18deg)' },
      { transform: 'scale(1) rotate(0deg)' }
    ], { duration: 400, easing: 'cubic-bezier(.68,-0.55,.27,1.55)' });
  });

  // Optional: Add dark mode CSS if not present
  if (!document.getElementById('dark-mode-style')) {
    const style = document.createElement('style');
    style.id = 'dark-mode-style';
    style.textContent = `
      html.dark-mode {
        background: #121212;
        color: #e0e0e0;
      }
      body.dark-mode {
        background: linear-gradient(135deg, #181818 0%, #2d0036 100%) !important;
        color: #e6d6ff !important;
      }
      body.dark-mode .domain-card, body.dark-mode .domain-card.expanded,
      body.dark-mode .resume-card, body.dark-mode .resume-card.expanded {
        background: #181818 !important;
        color: #ff3c28 !important;
        border-color: #ff3c28 !important;
        box-shadow: 0 4px 32px #a259ff !important;
      }
      body.dark-mode .skills-section, body.dark-mode .resume-section {
        background: linear-gradient(135deg, #2d0036 0%, #181818 100%) !important;
      }
      body.dark-mode .section-title,
      body.dark-mode .domain-header, body.dark-mode .resume-header {
        color: #ff3c28 !important;
        text-shadow: 0 2px 16px #a259ff !important;
      }
      body.dark-mode .soon-label, body.dark-mode .domain-card .coming-soon {
        background: #2d0036 !important;
        color: #e6d6ff !important;
        border-color: #a259ff !important;
      }
      body.dark-mode .resume-modal .modal-content, body.dark-mode .project-modal .modal-content {
        background: #181818 !important;
        color: #e6d6ff !important;
        border-color: #ff3c28 !important;
      }
      body.dark-mode .resume-modal, body.dark-mode .project-modal {
        background: rgba(24,24,24,0.98) !important;
      }
      body.dark-mode .download-resume, body.dark-mode .view-resume-btn, body.dark-mode .modal-live, body.dark-mode .view-project {
        background: linear-gradient(90deg, #ff3c28 0%, #a259ff 100%) !important;
        color: #fff !important;
      }
      body.dark-mode .download-resume:hover, body.dark-mode .view-resume-btn:hover, body.dark-mode .modal-live:hover, body.dark-mode .view-project:hover {
        background: #a259ff !important;
        color: #ff3c28 !important;
      }
      body.dark-mode .contact-icons .icon {
        background: #181818 !important;
      }
      body.dark-mode .contact-icons .icon:hover {
        background: linear-gradient(135deg, #ff3c28 0%, #a259ff 100%) !important;
      }
      body.dark-mode .dark-mode-toggle {
        background: linear-gradient(90deg, #ff3c28 0%, #a259ff 100%) !important;
        color: #fff !important;
      }
      body.dark-mode .dark-mode-toggle:hover {
        background: linear-gradient(90deg, #a259ff 0%, #ff3c28 100%) !important;
      }
    `;
    document.head.appendChild(style);
  }
});
