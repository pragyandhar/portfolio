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
});
