// ============================================
// HUGO BRITO - GSAP ANIMATIONS
// ScrollTrigger, Smooth Reveals, Image Reveals, Magnetic Effects
// ============================================

// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all animations
    initPageAnimations();
    initScrollAnimations();
    initImageReveals();
    initTextAnimations();
    initProductAnimations();
});

// === PAGE-SPECIFIC ANIMATIONS ===
function initPageAnimations() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch(true) {
        case currentPage === 'index.html' || currentPage === '':
            animateHomePage();
            break;
        case currentPage.includes('shop.html'):
            animateShopPage();
            break;
        case currentPage.includes('product.html'):
            animateProductPage();
            break;
        case currentPage.includes('atelier.html'):
            animateAtelierPage();
            break;
        case currentPage.includes('runway.html'):
            animateRunwayPage();
            break;
        case currentPage.includes('team.html'):
            animateTeamPage();
            break;
        case currentPage.includes('innovation.html'):
            animateInnovationPage();
            break;
    }
}

// === HOME PAGE ANIMATION ===
function animateHomePage() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero animation sequence
    tl.from('.hero-logo-box, .logo-box', {
        scale: 0.8,
        opacity: 0,
        duration: 1
    })
    .from('.title-hero, .hero-title', {
        opacity: 0,
        y: 50,
        duration: 1.2
    }, '-=0.5')
    .from('.divider-gold, .hero-divider', {
        width: 0,
        duration: 1
    }, '-=0.5')
    .from('.subtitle, .hero-subtitle', {
        opacity: 0,
        duration: 1
    }, '-=0.5')
    .from('.hero-cta, .btn', {
        opacity: 0,
        y: 20,
        duration: 0.8
    }, '-=0.3')
    .from('.scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 0.8
    }, '-=0.5');

    // Three columns animation
    gsap.from('.column-link', {
        scrollTrigger: {
            trigger: '.three-columns',
            start: 'top 80%'
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });
}

// === SHOP PAGE ANIMATION ===
function animateShopPage() {
    // Filter sidebar
    gsap.from('.filter-sidebar', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Product grid stagger
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 80%'
        },
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// === PRODUCT PAGE ANIMATION ===
function animateProductPage() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Split screen animation
    tl.from('.product-image-section', {
        opacity: 0,
        x: -50,
        duration: 1
    })
    .from('.product-info-section', {
        opacity: 0,
        x: 50,
        duration: 1
    }, '-=0.7')
    .from('.product-title', {
        opacity: 0,
        y: 30,
        duration: 0.8
    }, '-=0.5')
    .from('.product-price', {
        opacity: 0,
        scale: 0.9,
        duration: 0.6
    }, '-=0.4')
    .from('.add-to-cart', {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, '-=0.3')
    .from('.accordion', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5
    }, '-=0.3');
}

// === ATELIER PAGE ANIMATION (Slow, Deliberate) ===
function animateAtelierPage() {
    // Title with slow reveal
    gsap.from('.atelier-title', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power2.out'
    });

    // Parallax images
    gsap.utils.toArray('.atelier-image').forEach((image, i) => {
        gsap.to(image, {
            scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: (i % 2 === 0) ? -100 : -150,
            ease: 'none'
        });
    });

    // Text blocks with fade and slide
    gsap.utils.toArray('.atelier-text-block').forEach(block => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: 'top 80%'
            },
            opacity: 0,
            x: -80,
            duration: 1.2,
            ease: 'power3.out'
        });
    });
}

// === RUNWAY PAGE ANIMATION (Chaotic, Overlapping) ===
function animateRunwayPage() {
    // Chaotic title entrance
    const titleChars = document.querySelector('.runway-title');
    if (titleChars) {
        const chars = titleChars.textContent.split('');
        titleChars.textContent = '';
        chars.forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            titleChars.appendChild(span);
        });

        gsap.from('.runway-title span', {
            opacity: 0,
            y: () => gsap.utils.random(-100, 100),
            rotation: () => gsap.utils.random(-45, 45),
            stagger: 0.03,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    }

    // Overlapping images
    gsap.utils.toArray('.runway-image').forEach((image, i) => {
        gsap.from(image, {
            scrollTrigger: {
                trigger: image,
                start: 'top 80%'
            },
            opacity: 0,
            scale: 0.8,
            rotation: gsap.utils.random(-10, 10),
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Text with random delays
    gsap.from('.runway-text', {
        scrollTrigger: {
            trigger: '.runway-text',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        stagger: {
            amount: 0.5,
            from: 'random'
        },
        duration: 0.8
    });
}

// === TEAM PAGE ANIMATION ===
function animateTeamPage() {
    gsap.from('.team-intro > *', {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.flip-card', {
        scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%'
        },
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.6,
        ease: 'back.out(1.2)'
    });
}

// === INNOVATION PAGE ANIMATION ===
function animateInnovationPage() {
    gsap.from('.innovation-icon', {
        scale: 0.5,
        opacity: 0,
        rotation: 180,
        duration: 1,
        ease: 'back.out(1.5)'
    });

    gsap.from('.glitch-title, .glitch', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3
    });

    gsap.from('.comparison-card', {
        scrollTrigger: {
            trigger: '.comparison-grid',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 0.8
    });
}

// === SCROLL-TRIGGERED ANIMATIONS ===
function initScrollAnimations() {
    // Fade in elements
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Slide up elements
    gsap.utils.toArray('.slide-up').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Scale in elements
    gsap.utils.toArray('.scale-in').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'back.out(1.2)'
        });
    });
}

// === IMAGE REVEAL ANIMATIONS ===
function initImageReveals() {
    gsap.utils.toArray('.image-reveal').forEach(container => {
        const image = container.querySelector('img');

        // Create overlay for curtain effect
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            inset: 0;
            background-color: var(--color-black);
            z-index: 2;
            transform-origin: left;
        `;
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        container.appendChild(overlay);

        // Animate overlay and image
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });

        tl.to(overlay, {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            transformOrigin: 'right'
        })
        .from(image, {
            scale: 1.3,
            duration: 1.2,
            ease: 'power2.out'
        }, '-=1.2');
    });
}

// === TEXT ANIMATIONS ===
function initTextAnimations() {
    // Stagger text lines
    gsap.utils.toArray('.text-stagger').forEach(container => {
        const lines = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6');

        gsap.from(lines, {
            scrollTrigger: {
                trigger: container,
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Split text reveal (character by character)
    gsap.utils.toArray('.text-split').forEach(element => {
        const text = element.textContent;
        const chars = text.split('');
        element.textContent = '';

        chars.forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            element.appendChild(span);
        });

        gsap.from(element.querySelectorAll('span'), {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%'
            },
            opacity: 0,
            y: 20,
            stagger: 0.03,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
}

// === PRODUCT ANIMATIONS ===
function initProductAnimations() {
    // Product card hover animations are handled by CSS
    // Add entrance animations here

    gsap.utils.toArray('.feature-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// === PARALLAX SCROLL ===
gsap.utils.toArray('.parallax').forEach(element => {
    const depth = element.dataset.depth || 0.5;

    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * depth,
        ease: 'none'
    });
});

// === SMOOTH SCROLL WITH GSAP ===
function smoothScroll() {
    gsap.registerPlugin(ScrollTrigger);

    let scrollTween;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                if (scrollTween) scrollTween.kill();

                scrollTween = gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 100
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// === UTILITY: Refresh ScrollTrigger ===
window.refreshScrollTrigger = function() {
    ScrollTrigger.refresh();
};

// Refresh on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// === CONSOLE MESSAGE ===
console.log('%c Animations Initialized ', 'background: #D4AF37; color: #0a0a0a; font-weight: bold; padding: 4px 8px;');
