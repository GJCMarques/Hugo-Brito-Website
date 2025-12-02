// ============================================
// HUGO BRITO - SHOPPING CART SYSTEM
// LocalStorage-based cart management
// ============================================

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartCount();
        this.bindEvents();
    }

    // Load cart from localStorage
    loadCart() {
        try {
            const cart = localStorage.getItem('hb_cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem('hb_cart', JSON.stringify(this.items));
            this.updateCartCount();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    // Add item to cart
    addItem(product) {
        // Check if item already exists
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
            });
        }

        this.saveCart();
        this.showAddedNotification(product);
        return true;
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Get cart items
    getItems() {
        return this.items;
    }

    // Get cart count
    getCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
            return total + (price * item.quantity);
        }, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // Update cart count in header
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getCount();

        cartCountElements.forEach(element => {
            if (count > 0) {
                element.textContent = count;
                element.style.display = 'flex';

                // Animate cart icon
                const cartIcon = element.closest('.cart-icon');
                if (cartIcon) {
                    cartIcon.classList.add('cart-updated');
                    setTimeout(() => {
                        cartIcon.classList.remove('cart-updated');
                    }, 600);
                }
            } else {
                element.style.display = 'none';
            }
        });
    }

    // Show "Added to Cart" notification
    showAddedNotification(product) {
        // Remove existing notification if any
        const existing = document.querySelector('.cart-notification');
        if (existing) {
            existing.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="cart-notification-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <div>
                    <p class="cart-notification-title">Added to Bag</p>
                    <p class="cart-notification-product">${product.name}</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);

        // GSAP animation for cart icon
        if (typeof gsap !== 'undefined') {
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                gsap.to(cartIcon, {
                    scale: 1.2,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            }
        }
    }

    // Bind events
    bindEvents() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart')) {
                e.preventDefault();
                const button = e.target.closest('.add-to-cart');
                const productData = button.dataset;

                const product = {
                    id: productData.productId,
                    name: productData.productName,
                    price: productData.productPrice,
                    image: productData.productImage,
                    category: productData.productCategory
                };

                this.addItem(product);
            }
        });
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Expose cart to window for external access
window.HBCart = cart;

// Add cart notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .cart-notification {
        position: fixed;
        top: 100px;
        right: 2rem;
        background-color: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(15px);
        border: 1px solid var(--color-gold);
        padding: 1.25rem 1.5rem;
        border-radius: 4px;
        z-index: 1001;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    }

    .cart-notification.show {
        opacity: 1;
        transform: translateX(0);
    }

    .cart-notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .cart-notification-content svg {
        color: var(--color-gold);
        flex-shrink: 0;
    }

    .cart-notification-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--color-gold);
        margin-bottom: 0.25rem;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .cart-notification-product {
        font-size: 0.85rem;
        color: var(--color-cream);
    }

    .cart-icon.cart-updated {
        animation: cartBounce 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }

    @media (max-width: 768px) {
        .cart-notification {
            right: 1rem;
            left: 1rem;
            top: 80px;
        }
    }
`;
document.head.appendChild(notificationStyles);
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
