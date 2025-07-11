// skills.js
// Meraki Portfolio: Skills Page Interactivity & Animations
// Uses GSAP for project cards and modal popups


document.addEventListener('DOMContentLoaded', () => {
  // Dropdown toggles for domains
  document.querySelectorAll('.domain-header.dropdown-toggle').forEach(header => {
    header.addEventListener('click', function() {
      const card = this.closest('.domain-card');
      if (!card.classList.contains('coming-soon')) {
        card.classList.toggle('expanded');
        const content = card.querySelector('.domain-content');
        if (content) content.style.display = card.classList.contains('expanded') ? 'block' : 'none';
      }
    });
  });
  // Skills dropdown
  document.querySelectorAll('.skill-header').forEach(header => {
    header.addEventListener('click', function() {
      const exercises = this.nextElementSibling;
      if (exercises) exercises.classList.toggle('hide');
    });
  });

  // Project modal logic
  const modal = document.getElementById('projectModal');
  const closeModal = modal?.querySelector('.close-modal');
  document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.project-card');
      const title = card.querySelector('.project-title').textContent;
      modal.querySelector('.modal-title').textContent = title;
      modal.querySelector('.modal-desc').textContent = 'Problem statement and solution will appear here.';
      modal.classList.add('active');
      modal.querySelector('.modal-content').classList.add('pop-in');
    });
  });
  closeModal?.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.querySelector('.modal-content').classList.remove('pop-in');
  });
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.querySelector('.modal-content').classList.remove('pop-in');
    }
  });

  // Exercise modal logic
  const exerciseModal = document.getElementById('exerciseModal');
  const closeExerciseModal = exerciseModal?.querySelector('.close-modal');
  document.querySelectorAll('.exercise-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const question = this.getAttribute('data-question');
      const video = this.getAttribute('data-video');
      exerciseModal.querySelector('.modal-title').textContent = question;
      exerciseModal.querySelector('.modal-desc').textContent = `Question: ${question}`;
      const videoTag = exerciseModal.querySelector('.modal-video');
      videoTag.querySelector('source').src = video;
      videoTag.load();
      exerciseModal.classList.add('active');
      exerciseModal.querySelector('.modal-content').classList.add('pop-in');
    });
  });
  closeExerciseModal?.addEventListener('click', () => {
    exerciseModal.classList.remove('active');
    exerciseModal.querySelector('.modal-content').classList.remove('pop-in');
  });
  exerciseModal?.addEventListener('click', (e) => {
    if (e.target === exerciseModal) {
      exerciseModal.classList.remove('active');
      exerciseModal.querySelector('.modal-content').classList.remove('pop-in');
    }
  });

  // Animate project cards on scroll (GSAP)
  if (window.gsap) {
    gsap.from('.project-card', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.projects-list',
        start: 'top 80%',
      }
    });
  }

  // === Animated Dark Mode Toggle Button ===
  function createDarkModeToggle() {
    if (document.querySelector('.dark-mode-toggle')) return null;
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
  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      darkMode = !darkMode;
      setDarkMode(darkMode);
      darkBtn.animate([
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.25) rotate(18deg)' },
        { transform: 'scale(1) rotate(0deg)' }
      ], { duration: 400, easing: 'cubic-bezier(.68,-0.55,.27,1.55)' });
    });
  }

  // Add dark mode CSS if not present
  if (!document.getElementById('dark-mode-style')) {
    const style = document.createElement('style');
    style.id = 'dark-mode-style';
    style.textContent = `
      html.dark-mode, body.dark-mode {
        background: linear-gradient(135deg, #181818 0%, #2d0036 100%) !important;
        color: #e6d6ff !important;
      }
      html.dark-mode .skills-section, body.dark-mode .skills-section,
      html.dark-mode .resume-section, body.dark-mode .resume-section {
        background: linear-gradient(135deg, #181818 0%, #2d0036 100%) !important;
        box-shadow: 0 4px 32px #a259ff !important;
      }
      html.dark-mode .navbar, body.dark-mode .navbar {
        background: #181818 !important;
        box-shadow: 0 2px 24px 0 #a259ff !important;
      }
      html.dark-mode .logo, body.dark-mode .logo {
        color: #ff3c28 !important;
        text-shadow: 0 2px 12px #a259ff !important;
      }
      html.dark-mode .nav-links a, body.dark-mode .nav-links a {
        color: #e6d6ff !important;
        background: transparent !important;
      }
      html.dark-mode .nav-links a.active, html.dark-mode .nav-links a:hover,
      body.dark-mode .nav-links a.active, body.dark-mode .nav-links a:hover {
        background: linear-gradient(90deg, #a259ff 0%, #ff3c28 100%) !important;
        color: #181818 !important;
      }
      html.dark-mode h1, html.dark-mode h2, html.dark-mode h3, html.dark-mode h4, html.dark-mode h5, html.dark-mode h6,
      body.dark-mode h1, body.dark-mode h2, body.dark-mode h3, body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 {
        color: #ff3c28 !important;
        text-shadow: 0 2px 12px #a259ff !important;
      }
      html.dark-mode .about, body.dark-mode .about {
        color: #e6d6ff !important;
      }
      html.dark-mode .big-name, body.dark-mode .big-name {
        color: #ff3c28 !important;
        text-shadow: 0 4px 32px #a259ff !important;
      }
      html.dark-mode .domain-card, html.dark-mode .domain-card.expanded,
      html.dark-mode .resume-card, html.dark-mode .resume-card.expanded,
      body.dark-mode .domain-card, body.dark-mode .domain-card.expanded,
      body.dark-mode .resume-card, body.dark-mode .resume-card.expanded {
        background: #181818 !important;
        color: #ff3c28 !important;
        border-color: #ff3c28 !important;
        box-shadow: 0 4px 32px #a259ff !important;
      }
      html.dark-mode .section-title,
      html.dark-mode .domain-header, html.dark-mode .resume-header,
      body.dark-mode .section-title,
      body.dark-mode .domain-header, body.dark-mode .resume-header {
        color: #ff3c28 !important;
        text-shadow: 0 2px 16px #a259ff !important;
      }
      html.dark-mode .soon-label, html.dark-mode .domain-card .coming-soon,
      body.dark-mode .soon-label, body.dark-mode .domain-card .coming-soon {
        background: #2d0036 !important;
        color: #e6d6ff !important;
        border-color: #a259ff !important;
      }
      html.dark-mode .resume-modal .modal-content, html.dark-mode .project-modal .modal-content,
      body.dark-mode .resume-modal .modal-content, body.dark-mode .project-modal .modal-content {
        background: #181818 !important;
        color: #e6d6ff !important;
        border-color: #ff3c28 !important;
      }
      html.dark-mode .resume-modal, html.dark-mode .project-modal,
      body.dark-mode .resume-modal, body.dark-mode .project-modal {
        background: rgba(24,24,24,0.98) !important;
      }
      html.dark-mode .download-resume, html.dark-mode .view-resume-btn, html.dark-mode .modal-live, html.dark-mode .view-project,
      body.dark-mode .download-resume, body.dark-mode .view-resume-btn, body.dark-mode .modal-live, body.dark-mode .view-project {
        background: linear-gradient(90deg, #ff3c28 0%, #a259ff 100%) !important;
        color: #fff !important;
      }
      html.dark-mode .download-resume:hover, html.dark-mode .view-resume-btn:hover, html.dark-mode .modal-live:hover, html.dark-mode .view-project:hover,
      body.dark-mode .download-resume:hover, body.dark-mode .view-resume-btn:hover, body.dark-mode .modal-live:hover, body.dark-mode .view-project:hover {
        background: #a259ff !important;
        color: #ff3c28 !important;
      }
      html.dark-mode .contact-icons .icon,
      body.dark-mode .contact-icons .icon {
        background: #181818 !important;
      }
      html.dark-mode .contact-icons .icon:hover,
      body.dark-mode .contact-icons .icon:hover {
        background: linear-gradient(135deg, #ff3c28 0%, #a259ff 100%) !important;
      }
      html.dark-mode .dark-mode-toggle,
      body.dark-mode .dark-mode-toggle {
        background: linear-gradient(90deg, #ff3c28 0%, #a259ff 100%) !important;
        color: #fff !important;
      }
      html.dark-mode .dark-mode-toggle:hover,
      body.dark-mode .dark-mode-toggle:hover {
        background: linear-gradient(90deg, #a259ff 0%, #ff3c28 100%) !important;
      }
    `;
    document.head.appendChild(style);
  }
});
