# HUGO BRITO - Luxury Portuguese Fashion Brand

![Hugo Brito Logo](assets/img/hero-background.jpg)

## 📖 Overview

**HUGO BRITO** is a fictional luxury Portuguese fashion brand created as an immersive case study for **organizational behavior analysis**. The website showcases the intersection of traditional Portuguese craftsmanship and modern digital innovation, while revealing the psychological tensions within a luxury brand's leadership.

This is a **static HTML/CSS/JavaScript website** with no build tools or frameworks—pure, elegant web development focused on performance, luxury aesthetics, and storytelling.

---

## 🎯 Project Purpose

This project serves as:
- A **luxury e-commerce experience** demonstrating high-end web design principles
- An **organizational behavior case study** revealing leadership dynamics through psychological profiles
- A **technical showcase** of advanced CSS animations, GSAP, and responsive design
- A **narrative exploration** of the tension between tradition and innovation in luxury brands

---

## ✨ Key Features

### 🛍️ E-Commerce Functionality
- **Shopping Cart System** with localStorage persistence
- **Product Filtering** by category (Ready-to-Wear, Leather Goods, Bespoke)
- **Product Detail Pages** with size selection and "Add to Cart"
- **Responsive Product Grid** with hover animations

### 🎨 Luxury Design System
- **Color Palette**: Deep Black (#0a0a0a), Luxury Gold (#D4AF37), Cream (#f5f5dc)
- **Typography**: Playfair Display (serif) + Inter (sans-serif)
- **Glassmorphism Effects** and gold accents throughout
- **GSAP Scroll Animations** for cinematic storytelling

### 🧠 Psychological Depth
- **Team Flip Cards** revealing confidential psychological profiles
- **Innovation vs Heritage Animations** showcasing organizational tensions
- **Character-Specific Pages** (Atelier = tradition, Runway = chaos)

### 📱 Fully Responsive
- Mobile-first approach with breakpoints at 768px and 1024px
- Custom mobile fixes for complex animations
- Sticky navigation with scroll-triggered background changes

---

## 📂 Project Structure

```
Hugo-Brito-Website/
│
├── index.html              # Homepage with cinematic hero section
├── style.css               # Consolidated styles (merged from assets/css/*)
├── script.js               # Consolidated JavaScript (merged from assets/js/*)
├── README.md               # Project documentation (this file)
│
├── pages/                  # All secondary pages
│   ├── shop.html           # Product catalog with filtering
│   ├── product.html        # Product detail page with cart functionality
│   ├── atelier.html        # Guilherme's world - tradition & craftsmanship
│   ├── runway.html         # Nuno's world - creative chaos & disruption
│   ├── team.html           # Team profiles with psychological flip cards
│   ├── innovation.html     # Digital transformation page with custom animations
│   └── about.html          # Brand culture and values
│
└── assets/
    └── img/                # All images and placeholders
        ├── hero-background.jpg
        ├── shop-column.jpg
        ├── atelier-column.jpg
        ├── runway-column.jpg
        ├── hands-working.jpg
        ├── workshop.jpg
        ├── design-1.jpg → design-4.jpg
        ├── blazer.jpg
        ├── briefcase.jpg
        ├── coat.jpg
        └── ... (other product images)
```

---

## 🛠️ Technologies Used

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Modern vanilla JS, no frameworks

### Libraries & CDNs
- **GSAP 3.12.2** - Professional animation library
- **ScrollTrigger** - Scroll-based animations
- **Tailwind CSS CDN** - Utility-first styling
- **Google Fonts** - Playfair Display & Inter

### Design Tools
- **placehold.co** - Product image placeholders
- Custom CSS animations for brand storytelling

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Hugo-Brito-Website.git
   cd Hugo-Brito-Website
   ```

2. **Open with a local server** (recommended)

   Using Python:
   ```bash
   python -m http.server 8000
   ```

   Using Node.js:
   ```bash
   npx http-server
   ```

3. **Or open directly in browser**
   ```bash
   open index.html
   # or
   start index.html
   ```

4. **Navigate to**
   ```
   http://localhost:8000
   ```

---

## 📄 Page Descriptions

### 🏠 Homepage (`index.html`)
**"The New Era of Portuguese Luxury"**

- Full-screen cinematic hero section with background image
- Luxury logo reveal with HB monogram
- Three-column grid linking to Shop, Atelier, and Runway
- Scroll indicator and smooth transitions

**Key Features:**
- Fixed gradient header that becomes opaque on scroll
- GSAP animations for logo and content
- Responsive three-column layout
- Magnetic button effects

---

### 🛍️ Shop (`pages/shop.html`)
**"The Collection"**

- Product catalog with 6 luxury items (€2,900 - €6,200)
- Sticky filter sidebar with custom checkbox styling
- Category filtering (Ready-to-Wear, Leather, Bespoke)
- Hover effects revealing "View Details" buttons

**Key Features:**
- Custom checkbox animations (gold checkmark on click)
- Product count display updating on filter
- GSAP stagger animation on page load
- Responsive grid layout (auto-fill minmax)

---

### 👔 Product Detail (`pages/product.html`)
**"Heritage Wool Blazer - €4,200"**

- Split-screen layout (fixed image left, scrolling info right)
- Size selection buttons (S, M, L, XL)
- "Add to Bag" functionality with cart integration
- Three accordions: Composition, Delivery & Returns, Artisan Note

**Key Features:**
- Sticky product image section
- Interactive size selection
- Accordion animations
- Shopping cart data attributes for easy integration

---

### 🏛️ Atelier (`pages/atelier.html`)
**"Where Time Stands Still for Perfection"**

Represents **Guilherme Marques'** world - the Head of Production who values tradition, slow craftsmanship, and non-negotiable quality standards.

- Hero section with workshop background image
- Quote: "We refuse to rush perfection"
- Three-step process: Selection → Craft → Inspection
- "The Guardian of Quality" section highlighting tensions

**Key Features:**
- Slow, deliberate GSAP animations (2s duration)
- Background image with parallax effect
- Process cards with hover transitions
- Emphasis on patience and mastery

---

### 🎨 Runway (`pages/runway.html`)
**"Breaking Boundaries"**

Represents **Nuno Magalhães'** world - the Creative Director who sees fashion as art in rebellion, embracing chaos and disruption.

- "VISION NOT RULES CHAOS" text styling
- Overlapping images with random rotations (desktop)
- Mobile fix: images stacked vertically with forced visibility
- Quote: "If we're not making them uncomfortable, we're not making art"

**Key Features:**
- Chaotic desktop layout with absolute positioning
- Mobile-responsive vertical stack (flex-direction: column)
- GSAP matchMedia for desktop-only animations
- Custom rotation and scale effects on scroll

---

### 👥 Team (`pages/team.html`)
**"Meet the Leaders Behind Hugo Brito"**

The **"X-Ray" effect** - flip cards revealing psychological profiles of leadership.

**4 Team Members:**
1. **Hugo Brito** - CEO & Founder (High Power Motivation, prone to micromanagement)
2. **Nuno Magalhães** - Creative Director (High Creativity, low rule orientation)
3. **Manuel Santos** - CFO (Risk-Averse, Resistance to Change)
4. **Guilherme Marques** - Head of Production (Perfectionist, Inflexible Standards)

**Key Features:**
- 3D flip card animations using CSS transforms
- Front: Professional appearance
- Back: Dark red "CONFIDENTIAL" psychological profile
- Hover triggers 180° Y-axis rotation
- Reveals organizational tensions

---

### ⚡ Innovation (`pages/innovation.html`)
**"Digital Transformation - Where Tradition Meets Technology"**

Showcases the tension between heritage and innovation through **custom animations**.

**Two Comparison Cards:**

1. **Heritage Card**
   - Title: "Heritage"
   - Description: "Slow. Deliberate. Timeless."
   - Animation Style: Slow 6s glow, gentle floating, smooth transitions

2. **Innovation Card**
   - Title: "Innovation"
   - Description: "Fast. Disruptive. Uncertain."
   - Animation Style: Rapid 0.4s glitch, pulsing, flickering effects

**Key Features:**
- Custom CSS keyframe animations embedded in file
- Contrasting animation speeds reflecting philosophies
- Hover effects: Heritage = steady glow, Innovation = chaotic glitch
- Quote: "Can a brand built on human mastery survive the age of algorithms?"

---

### ℹ️ About (`pages/about.html`)
**"The Culture"**

- Brand values and philosophy
- Three feature cards: Exclusivity, Artisanal, Timeless
- Mission statement
- Emphasis on Portuguese heritage

---

## 🎭 Characters & Organizational Tensions

### The Leadership Dynamics

| Character | Role | Trait | Conflict |
|-----------|------|-------|----------|
| **Hugo Brito** | CEO | Visionary, Power-Driven | Micromanages, struggles to delegate |
| **Nuno Magalhães** | Creative Director | Chaotic, Rule-Breaker | Clashes with Guilherme's perfectionism |
| **Guilherme Marques** | Head of Production | Perfectionist, Traditional | Resists digital transformation |
| **Manuel Santos** | CFO | Risk-Averse | Blocks innovation investments |

### Thematic Tensions

- **Tradition vs Innovation** - Can heritage survive digital transformation?
- **Speed vs Quality** - Fast fashion vs slow craftsmanship
- **Creativity vs Structure** - Artistic freedom vs quality control
- **Vision vs Viability** - Bold ideas vs financial constraints

---

## 🎨 Design Philosophy

### Color System
```css
--color-black: #0a0a0a;    /* Deep black backgrounds */
--color-gold: #D4AF37;     /* Luxury gold accents */
--color-cream: #f5f5dc;    /* Warm cream text */
```

### Typography Scale
```css
--font-serif: 'Playfair Display', serif;  /* Headings, luxury feel */
--font-sans: 'Inter', sans-serif;         /* Body text, readability */
```

### Animation Principles

1. **Heritage = Slow**
   - Durations: 2s - 6s
   - Easing: ease-in-out, cubic-bezier smooth curves
   - Effects: Gentle glow, slow floating, steady transitions

2. **Innovation = Fast**
   - Durations: 0.2s - 0.8s
   - Easing: Back, elastic, bouncy curves
   - Effects: Glitch, flicker, rapid pulses, chaotic movement

3. **Luxury = Subtle**
   - Avoid jarring animations
   - Use gold accents sparingly
   - Emphasize elegance over flashiness

---

## 🛒 Shopping Cart System

### Implementation
```javascript
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.init();
    }

    loadCart() {
        const cart = localStorage.getItem('hb_cart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem('hb_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product) { /* ... */ }
    removeItem(productId) { /* ... */ }
    clearCart() { /* ... */ }
}
```

### Cart Persistence
- Uses **localStorage** to persist cart across page navigation
- Cart count displayed in header navigation
- Survives browser refresh and tab closure

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (max-width: 768px) {
    /* Mobile styles */
}

@media (max-width: 1024px) {
    /* Tablet styles */
}

@media (min-width: 769px) {
    /* Desktop styles */
}
```

### Mobile Optimizations
- Three-column grid becomes single column
- Sticky sidebar becomes relative
- Chaotic runway layout becomes vertical stack
- Header navigation becomes hamburger menu
- Touch-friendly button sizes

---

## 🔧 Technical Highlights

### CSS Features
- CSS Custom Properties for theming
- CSS Grid for complex layouts
- Flexbox for component alignment
- CSS Animations with @keyframes
- 3D Transforms for flip cards
- Backdrop filters for glassmorphism

### JavaScript Features
- ES6+ syntax (classes, arrow functions, destructuring)
- LocalStorage API for cart persistence
- Event delegation for performance
- GSAP Timeline and ScrollTrigger
- matchMedia for responsive animations

### Performance
- No build step required
- CDN-hosted libraries (cached globally)
- Lazy loading for images
- Minimal JavaScript payload
- CSS-only animations where possible

---

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 (not supported - uses modern CSS features)

---

## 📝 Code Structure

### File Organization

**style.css** (Consolidated from 3 files)
```
1. CSS Reset & Root Variables
2. Typography System
3. Layout & Grid
4. Header & Navigation
5. Hero & Sections
6. Flip Cards (Team)
7. Product Components
8. Shopping Cart
9. Buttons & Forms
10. Footer
11. Animations
12. Responsive Media Queries
```

**script.js** (Consolidated from 3 files)
```
1. Shopping Cart Class
2. Header Scroll Behavior
3. Mobile Menu Toggle
4. GSAP Animations
5. Magnetic Button Effects
6. Accordion Functionality
7. Product Filtering
8. Cart UI Updates
```

---

## 🎬 Animation Showcase

### Heritage Card (innovation.html)
```css
@keyframes heritageGlow {
    0%, 100% { text-shadow: 0 0 5px rgba(212, 175, 55, 0.2); }
    50% { text-shadow: 0 0 25px rgba(212, 175, 55, 0.5); }
}

.comparison-card.heritage .comparison-title {
    animation: heritageGlow 6s ease-in-out infinite;
    transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### Innovation Card (innovation.html)
```css
@keyframes innovationGlitch {
    0%, 90%, 100% { transform: translate(0, 0) skew(0deg); }
    10% { transform: translate(-2px, 1px) skew(0.5deg); }
    20% { transform: translate(2px, -1px) skew(-0.5deg); }
}

.comparison-card.tech .comparison-title {
    animation: innovationGlitch 0.4s ease-in-out infinite;
}
```

---

## 🚨 Known Issues & Solutions

### Issue: Images not loading
**Solution:** Ensure all image paths use relative paths (`../assets/img/`)

### Issue: Cart count not updating
**Solution:** Check localStorage is enabled in browser

### Issue: Animations not smooth on mobile
**Solution:** Use `will-change` CSS property and disable heavy animations on mobile

### Issue: Runway images disappearing on mobile
**Solution:** Applied `!important` CSS overrides for mobile visibility

---

## 🔮 Future Enhancements

- [ ] Full checkout process with payment integration
- [ ] User authentication and profile pages
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Backend integration (Node.js/Express)
- [ ] Database for products (MongoDB/PostgreSQL)
- [ ] Email notifications for orders
- [ ] Multi-language support (PT/EN)
- [ ] Advanced filtering (price range, size, color)
- [ ] Augmented Reality try-on feature

---

## 🙏 Credits & Acknowledgments

### Design Inspiration
- **Hermès** - Luxury brand storytelling
- **Burberry** - Heritage meets innovation
- **Tom Ford** - Bold, cinematic web design

### Technologies
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Google Fonts](https://fonts.google.com/) - Typography

### Images
- Placeholder images from [placehold.co](https://placehold.co/)
- *Note: Replace with actual product photography for production*

---

## 📄 License

This is a **fictional brand created for educational purposes**.

The code is provided as-is for learning and demonstration. Feel free to use this as a reference for your own luxury e-commerce projects.

---

## 👤 Author

**Hugo Brito Website Project**
- Created as an organizational behavior case study
- Demonstrates luxury web design principles
- Showcases modern web development techniques

---

## 📞 Contact & Support

For questions about this project:
- Open an issue in the repository
- Review the code comments for implementation details
- Check the browser console for debugging information

---

**© 2025 Hugo Brito. A fictional brand created for organizational behavior analysis.**

*Porto, Portugal*

---

## 🎯 Quick Links

- [Homepage](index.html)
- [Shop](pages/shop.html)
- [Team Profiles](pages/team.html)
- [Innovation](pages/innovation.html)
- [Atelier](pages/atelier.html)
- [Runway](pages/runway.html)

---

**Built with ❤️ and ☕ in Portugal**
