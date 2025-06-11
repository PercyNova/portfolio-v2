import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function animateOnScroll() {
  // Target multiple selectors that exist in your Home component
  const targets = [
    '.grid > div', // All direct div children of grid containers
    '.grid > a',   // All direct anchor children of grid containers (for current projects)
  ];

  targets.forEach(target => {
    gsap.set(target, { opacity: 0, y: 50 }); // Set initial state
    
    gsap.to(target, {
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });
  });

  // Alternative: target by data attributes (if you add them)
  gsap.set('[data-animate]', { opacity: 0, y: 50 });
  
  gsap.to('[data-animate]', {
    scrollTrigger: {
      trigger: '[data-animate]',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });
}

export default animateOnScroll;