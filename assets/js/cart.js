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
