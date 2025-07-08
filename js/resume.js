// resume.js
// Meraki Portfolio: Resume Page Interactivity & Animations

document.addEventListener('DOMContentLoaded', () => {
  // Dropdown toggles for resume domains
  document.querySelectorAll('.resume-header').forEach(header => {
    header.addEventListener('click', function() {
      const card = this.closest('.resume-card');
      if (!card.classList.contains('coming-soon')) {
        card.classList.toggle('expanded');
        const content = card.querySelector('.resume-content');
        if (content) content.style.display = card.classList.contains('expanded') ? 'block' : 'none';
      }
    });
  });

  // Animate resume cards on load (GSAP)
  if (window.gsap) {
    gsap.from('.resume-card', {
      y: 40,
      opacity: 0,
      stagger: 0.18,
      duration: 0.9,
      ease: 'power2.out',
    });
  }
});
