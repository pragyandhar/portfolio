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
});
