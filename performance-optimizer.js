(function() {
    // Throttle function to limit the rate at which a function can fire
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimize scroll events
    function optimizeScroll() {
        const scrollHandler = throttle(() => {
            const scrollY = window.scrollY;
            
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
                // Parallax effect for hero section
                const heroContent = document.querySelector('.hero .container');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
                }

                // Animate navigation on scroll
                const nav = document.querySelector('.glassy-nav');
                if (nav) {
                    if (window.lastScrollY < scrollY) {
                        gsap.to(nav, { y: '-100%', duration: 0.3 });
                    } else {
                        gsap.to(nav, { y: '0%', duration: 0.3 });
                    }
                    window.lastScrollY = scrollY;
                }
            });
        }, 16); // ~60fps

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    // Optimize GSAP animations
    function optimizeGSAPAnimations() {
        ScrollTrigger.config({ limitCallbacks: true });
        ScrollTrigger.clearMatchMedia();
    }

    // Defer non-critical operations
    function deferOperations() {
        // Defer AOS initialization
        setTimeout(() => {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }, 100);

        // Defer zoom setup
        setTimeout(setupZoom, 200);
    }

    // Optimize circle creation
    function optimizeCircles() {
        const createCircles = throttle(() => {
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground && !heroBackground.querySelector('.circles')) {
                const circlesContainer = document.createElement('div');
                circlesContainer.classList.add('circles');
                const fragment = document.createDocumentFragment();

                // Use a more efficient loop
                const circleCount = window.innerWidth <= 768 ? 8 : 15;
                for (let i = 0; i < circleCount; i++) {
                    const circle = document.createElement('div');
                    const size = Math.random() * (window.innerWidth <= 768 ? 40 : 60) + 10;
                    circle.style.cssText = `
                        width: ${size}px;
                        height: ${size}px;
                        left: ${Math.random() * 100}%;
                        animation-duration: ${Math.random() * 10 + 5}s;
                        animation-delay: ${Math.random() * 5}s;
                    `;
                    fragment.appendChild(circle);
                }

                circlesContainer.appendChild(fragment);
                heroBackground.appendChild(circlesContainer);
            }
        }, 100);

        createCircles();
        window.addEventListener('resize', createCircles, { passive: true });
    }

    // Main optimization function
    function runOptimizations() {
        optimizeScroll();
        optimizeGSAPAnimations();
        deferOperations();
        optimizeCircles();
    }

    // Run optimizations when the page is loaded
    if (document.readyState === 'complete') {
        runOptimizations();
    } else {
        window.addEventListener('load', runOptimizations);
    }
})();
