// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    updateBackgroundAnimation();
});

// Function to create animated circles
function createCircles() {
    const heroBackground = document.querySelector('.hero-background');
    const circlesContainer = document.createElement('div');
    circlesContainer.classList.add('circles');

    for (let i = 0; i < 15; i++) {
        const circle = document.createElement('div');
        const size = Math.random() * 60 + 10;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        circle.style.animationDelay = `${Math.random() * 5}s`;
        circlesContainer.appendChild(circle);
    }

    heroBackground.appendChild(circlesContainer);
}

// Function to update background animation based on theme
function updateBackgroundAnimation() {
    const circles = document.querySelectorAll('.circles div');
    
    if (body.classList.contains('dark-theme')) {
        circles.forEach(circle => {
            circle.style.background = 'rgba(255, 255, 255, 0.2)';
            circle.style.boxShadow = 'none';
        });
    } else {
        circles.forEach(circle => {
            circle.style.background = 'rgba(76, 154, 255, 0.3)';
            circle.style.boxShadow = '0 0 10px rgba(76, 154, 255, 0.5), 0 0 20px rgba(76, 154, 255, 0.3)';
        });
    }
}

// Initialize background animation
document.addEventListener('DOMContentLoaded', () => {
    createCircles();
    updateBackgroundAnimation();
});

// Animate hero section
gsap.from('.hero h1', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.hero p', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.hero .cta-button', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.6,
    ease: 'power3.out'
});

// Animate sections on scroll
gsap.utils.toArray('.glassy-section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate service cards
gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Animate project cards
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero .container');
    heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
});

// Animate navigation on scroll
const nav = document.querySelector('.glassy-nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
        gsap.to(nav, { y: '-100%', duration: 0.3 });
    } else {
        gsap.to(nav, { y: '0%', duration: 0.3 });
    }
    lastScrollY = window.scrollY;
});

// Initialize AOS for scroll animations
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Zoom functionality
function setupZoom() {
    const zoomableElements = document.querySelectorAll('.service-card, .project-card, .hero h1, .hero p');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  
    zoomableElements.forEach(element => {
      element.classList.add('zoomable');
      element.addEventListener('click', () => {
        if (!element.classList.contains('zoomed')) {
          element.classList.add('zoomed');
          overlay.style.display = 'block';
        } else {
          element.classList.remove('zoomed');
          overlay.style.display = 'none';
        }
      });
    });
  
    overlay.addEventListener('click', () => {
      const zoomedElement = document.querySelector('.zoomed');
      if (zoomedElement) {
        zoomedElement.classList.remove('zoomed');
        overlay.style.display = 'none';
      }
    });
  }
  
  // Initialize zoom functionality
  document.addEventListener('DOMContentLoaded', () => {
    createCircles();
    updateBackgroundAnimation();
    setupZoom();
  });

// Hamburger menu functionality
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);
  
    function toggleMenu() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
  
    hamburger.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
  
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }
  
  // Initialize all functionality
  document.addEventListener('DOMContentLoaded', () => {
    createCircles();
    updateBackgroundAnimation();
    setupZoom();
    setupHamburgerMenu();
  });
