// ============================================
// HUGO BRITO - GLOBAL APPLICATION LOGIC
// Header, Mobile Menu, Page Transitions, Magnetic Buttons
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initMagneticButtons();
    initAccordions();
    initFilters();
    setActiveNav();
});

// === HEADER SCROLL BEHAVIOR ===
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// === MOBILE MENU ===
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!toggle || !navLinks) return;

    // Toggle menu
    toggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Animate hamburger icon
        const spans = toggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translateY(12px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
            body.classList.remove('menu-open');

            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
                body.classList.remove('menu-open');

                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

// === MAGNETIC BUTTONS ===
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic, .btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move button towards cursor (with limits)
            const moveX = x * 0.3;
            const moveY = y * 0.3;

            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// === ACCORDIONS (Product Details) ===
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        const content = accordion.querySelector('.accordion-content');

        if (!header || !content) return;

        header.addEventListener('click', () => {
            const isActive = accordion.classList.contains('active');

            // Close all other accordions
            accordions.forEach(acc => {
                if (acc !== accordion) {
                    acc.classList.remove('active');
                }
            });

            // Toggle current accordion
            accordion.classList.toggle('active');
        });
    });
}

// === PRODUCT FILTERS ===
function initFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    const productCards = document.querySelectorAll('.product-card');

    if (filterOptions.length === 0 || productCards.length === 0) return;

    filterOptions.forEach(option => {
        option.addEventListener('click', () => {
            const checkbox = option.querySelector('.filter-checkbox');
            const category = option.dataset.category;

            // Toggle checkbox
            checkbox.classList.toggle('checked');

            // Filter products
            filterProducts();
        });
    });

    function filterProducts() {
        const checkedCategories = Array.from(
            document.querySelectorAll('.filter-checkbox.checked')
        ).map(cb => cb.closest('.filter-option').dataset.category);

        productCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (checkedCategories.length === 0 || checkedCategories.includes(cardCategory)) {
                card.style.display = 'block';
                // Animate in
                if (typeof gsap !== 'undefined') {
                    gsap.from(card, {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// === SET ACTIVE NAV LINK ===
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Handle both direct links and dropdown items
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }

        // Special handling for pages in subdirectories
        if (href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === PAGE TRANSITION EFFECT ===
function pageTransition(url) {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    // Animate overlay in
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    // Navigate after animation
    setTimeout(() => {
        window.location.href = url;
    }, 600);
}

// Add page transition styles
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    .page-transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-black);
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
    }

    .page-transition-overlay.active {
        transform: translateY(0);
    }

    body.menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(transitionStyles);

// === PARALLAX EFFECT ON SCROLL ===
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;

            // Parallax elements
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach((element) => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        });

        ticking = true;
    }
});

// === IMAGE REVEAL ON SCROLL ===
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            imageObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all image-reveal elements
document.querySelectorAll('.image-reveal').forEach(img => {
    imageObserver.observe(img);
});

// === CURSOR FOLLOWER (Optional Enhancement) ===
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    cursor.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.15;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;

        cursorX += distX * speed;
        cursorY += distY * speed;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .product-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Uncomment to enable custom cursor
// initCustomCursor();

// === UTILITY FUNCTIONS ===

// Format price
window.formatPrice = function(price) {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
};

// Debounce function
window.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Log page load
console.log('%c HUGO BRITO ', 'background: #D4AF37; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Luxury Portuguese Craftsmanship ', 'color: #D4AF37; font-size: 14px;');
