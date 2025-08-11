import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize animations on elements with the reveal class
export const initRevealAnimations = () => {
  // Get all elements with the reveal class
  const revealElements = document.querySelectorAll('.reveal');
  
  // Initialize animations for each element
  revealElements.forEach((element) => {
    gsap.fromTo(element, 
      { 
        y: 50, 
        opacity: 0 
      }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
};

// Animate hero section
export const animateHero = () => {
  const tl = gsap.timeline();
  
  tl.fromTo('.hero-title', 
    { y: 50, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
  )
  .fromTo('.hero-subtitle', 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
    '-=0.6'
  )
  .fromTo('.hero-cta', 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
    '-=0.6'
  )
  .fromTo('.hero-image', 
    { scale: 0.9, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, 
    '-=0.8'
  );
  
  return tl;
};

// Parallax effect for hero background
export const initParallaxEffect = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach((element) => {
    gsap.to(element, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: element.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};

// Stagger animation for product cards
export const animateProductCards = () => {
  const cards = document.querySelectorAll('.product-card');
  
  if (cards.length === 0) return;
  
  gsap.fromTo(cards,
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cards[0].parentElement,
        start: 'top 80%',
      }
    }
  );
};

// Cart animation
export const animateCartItem = (element: HTMLElement) => {
  gsap.fromTo(element,
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
  );
};

// Initialize all animations
export const initAllAnimations = () => {
  // Wait for DOM to be fully loaded
  window.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    animateHero();
    initParallaxEffect();
    animateProductCards();
    
    // Re-run animations on page change
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        setTimeout(() => {
          initRevealAnimations();
          animateProductCards();
        }, 100);
      }
    });
  });
};