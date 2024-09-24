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

// Navigation indicator
function setupNavIndicator() {
    const nav = document.querySelector('.nav-links');
    const navItems = nav.querySelectorAll('a');
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    nav.appendChild(indicator);

    function moveIndicator(el) {
        if (window.innerWidth > 768) {  // Only move indicator on desktop
            indicator.style.width = `${el.offsetWidth}px`;
            indicator.style.left = `${el.offsetLeft}px`;
        }
    }

    navItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            moveIndicator(this);
        });
    });

    // Update indicator on page load and resize
    function updateIndicator() {
        if (window.innerWidth > 768) {  // Only update on desktop
            const activeItem = nav.querySelector('a.active') || navItems[0];
            moveIndicator(activeItem);
        }
    }

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    nav.addEventListener('mouseleave', updateIndicator);
}

// Function to create animated circles
function createCircles() {
    const heroBackground = document.querySelector('.hero-background');
    const circlesContainer = document.createElement('div');
    circlesContainer.classList.add('circles');

    const circleCount = window.innerWidth <= 768 ? 8 : 15; // Reduce circles on mobile

    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        const size = Math.random() * (window.innerWidth <= 768 ? 40 : 60) + 10;
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

// GSAP Animations (unchanged)
function setupGSAPAnimations() {
    // ... (keep your existing GSAP animations)
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 70; // Adjust based on your header height
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Logo click functionality (unchanged)
function setupLogoClick() {
    // ... (keep your existing logo click function)
}

// Parallax effect for hero section
function setupParallax() {
    if (window.innerWidth > 768) { // Only apply parallax on desktop
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroContent = document.querySelector('.hero .container');
            heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }
}

// Animate navigation on scroll (unchanged)
function setupNavAnimation() {
    // ... (keep your existing nav animation function)
}

// Zoom functionality (unchanged)
function setupZoom() {
    // ... (keep your existing zoom function)
}

// Hamburger menu functionality
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.glassy-nav');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        // Ensure nav is visible when menu is open
        if (navLinks.classList.contains('active')) {
            nav.style.transform = 'translateY(0)';
            nav.style.opacity = '1';
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });
}
//hide footer links mobile
function handleFooterLinksVisibility() {
    const footerLinks = document.querySelector('.footer-links');
    if (window.innerWidth <= 768) {
        footerLinks.style.display = 'none';
    } else {
        footerLinks.style.display = 'flex';
    }
}

window.addEventListener('resize', handleFooterLinksVisibility);
window.addEventListener('orientationchange', handleFooterLinksVisibility);

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    setupNavIndicator();
    createCircles();
    updateBackgroundAnimation();
    setupGSAPAnimations();
    setupSmoothScrolling();
    setupLogoClick();
    setupParallax();
    setupNavAnimation();
    setupZoom();
    setupHamburgerMenu();
    handleFooterLinksVisibility();

    // Initialize AOS for scroll animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: 'mobile' // Disable AOS on mobile for better performance
    });

    // Adjust on window resize
    window.addEventListener('resize', () => {
        createCircles(); // Recreate circles on resize
        setupParallax(); // Re-setup parallax
    });
});
