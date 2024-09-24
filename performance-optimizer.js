(function() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Throttle function
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
            // Parallax effect for hero section (disabled on mobile)
            if (!isMobile) {
                const scrollY = window.scrollY;
                const heroContent = document.querySelector('.hero .container');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
                }
            }

            // Animate navigation on scroll (simplified for mobile)
            const nav = document.querySelector('.glassy-nav');
            if (nav) {
                if (isMobile) {
                    nav.style.transform = window.scrollY > 50 ? 'translateY(-100%)' : 'translateY(0)';
                } else {
                    if (window.lastScrollY < window.scrollY) {
                        gsap.to(nav, { y: '-100%', duration: 0.3 });
                    } else {
                        gsap.to(nav, { y: '0%', duration: 0.3 });
                    }
                    window.lastScrollY = window.scrollY;
                }
            }
        }, isMobile ? 100 : 16); // Lower frequency on mobile

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    // Optimize GSAP animations
    function optimizeGSAPAnimations() {
        ScrollTrigger.config({ limitCallbacks: true });
        ScrollTrigger.clearMatchMedia();

        if (isMobile) {
            // Simplify animations on mobile
            gsap.utils.toArray('.glassy-section, .service-card, .project-card').forEach(element => {
                gsap.from(element, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 90%',
                        once: true
                    }
                });
            });
        }
    }

    // Defer non-critical operations
    function deferOperations() {
        setTimeout(() => {
            AOS.init({
                duration: isMobile ? 500 : 1000,
                once: true,
                offset: isMobile ? 50 : 100,
                disable: isMobile ? 'phone' : false
            });
        }, isMobile ? 1000 : 100);

        if (!isMobile) {
            setTimeout(setupZoom, 200);
        }
    }

    // Optimize circle creation
    function optimizeCircles() {
        const createCircles = throttle(() => {
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground && !heroBackground.querySelector('.circles')) {
                const circlesContainer = document.createElement('div');
                circlesContainer.classList.add('circles');
                const fragment = document.createDocumentFragment();

                const circleCount = isMobile ? 8 : 15; // Reduce number of circles on mobile
                for (let i = 0; i < circleCount; i++) {
                    const circle = document.createElement('div');
                    const size = Math.random() * (isMobile ? 40 : 60) + 10;
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
        }, isMobile ? 200 : 100);

        createCircles();
    }

    // Optimize images
    function optimizeImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.onload = () => img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Main optimization function
    function runOptimizations() {
        optimizeScroll();
        optimizeGSAPAnimations();
        deferOperations();
        optimizeCircles();
        optimizeImages();
    }

    // Run optimizations when the page is loaded
    if (document.readyState === 'complete') {
        runOptimizations();
    } else {
        window.addEventListener('load', runOptimizations);
    }
})();
