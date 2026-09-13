# THREADORA — Shopify Online Store 2.0 Theme
> **Timeless Style, Modern You**

A Shopify Online Store 2.0 theme built for modern, sustainable, and luxury fashion apparel brands.

---

## 🌟 Key Features

- **Shopify Online Store 2.0 Architecture**: JSON templates (`index.json`, `product.json`, `collection.json`, `cart.json`, `page.json`, `404.json`), modular sections, and dynamic block support.
- **Modern Luxury Aesthetic**: Tailored color palette featuring Olive (`#4D5943`), Dark Olive (`#3E4836`), Sand (`#F7F4F0`), Cream (`#FAF9F6`), Charcoal (`#222222`), and Cormorant Garamond / Montserrat typography.
- **Interactive AJAX Cart Drawer**:
  - Live slide-out drawer on adding products or clicking the bag icon
  - Dynamic free shipping calculation bar ($75 threshold)
  - Seamless real-time quantity adjustment and instant remove with automatic subtotal update
- **Product Showcase & Micro-interactions**:
  - Image hover zoom effect
  - Interactive color variant swatches
  - 1-Click Wishlist heart toggling with feedback
  - Slide-up "+ Quick Add" action button
- **Interactive Testimonial Carousel**: Smooth customer reviews slider with 5-star rating.
- **Eco-Friendly Sustainability Banner**: Dedicated banner highlighting ethical craftsmanship.
- **Full Shopify Theme Customizer Support**: Extensive `settings_schema.json` controls for brand colors, typography, header, footer, social links, and cart settings.

---

## 📁 Theme Directory Structure

```
threadora-theme/
├── assets/
│   ├── theme.css                  # Core CSS design system & custom properties
│   └── theme.js                   # Interactive controller (AJAX cart, drawer, slider, swatches)
├── config/
│   ├── settings_schema.json       # Shopify Theme Editor schema & customization settings
│   └── settings_data.json         # Default brand presets
├── layout/
│   ├── theme.liquid               # Master layout (SEO meta, fonts, header, footer, drawer)
│   └── password.liquid            # Opening soon / password protection page layout
├── locales/
│   └── en.default.json            # English translations & UI dictionary
├── sections/
│   ├── announcement-bar.liquid    # Promotional message bar
│   ├── header.liquid              # Sticky navigation, logo, desktop & mobile menu, search, icons
│   ├── hero-banner.liquid         # Luxury hero banner with CTA
│   ├── value-props.liquid         # 4 Trust badges (Free shipping, Easy returns, Quality, Security)
│   ├── new-arrivals.liquid        # Product showcase grid with quick-add and swatches
│   ├── sustainable-banner.liquid  # Brand story & eco-friendly values banner
│   ├── shop-by-category.liquid    # Visual category cards (Dresses, Tops, Bottoms, Accessories)
│   ├── testimonials.liquid        # Customer reviews slider
│   ├── main-product.liquid        # Product page layout with accordion & selectors
│   ├── main-collection.liquid     # Collection grid with filters & sorting
│   ├── main-cart.liquid           # Full cart page
│   ├── main-page.liquid           # Standard text page
│   ├── main-404.liquid            # Custom 404 error page
│   └── footer.liquid              # 5-column footer with newsletter & payment badges
├── snippets/
│   ├── card-product.liquid        # Reusable product card
│   ├── price.liquid               # Price formatter with sales badges
│   ├── color-swatches.liquid      # Interactive color swatches
│   ├── cart-drawer.liquid         # Slide-out AJAX cart drawer
│   ├── icon-cart.liquid           # Shopping bag SVG
│   ├── icon-search.liquid         # Search SVG
│   ├── icon-account.liquid        # User SVG
│   ├── icon-heart.liquid          # Wishlist SVG
│   ├── icon-arrow.liquid          # Arrow navigation SVGs
│   ├── icon-social.liquid         # Social media SVGs
│   └── icon-payment.liquid        # Payment badges (Visa, Mastercard, PayPal, Apple Pay)
├── templates/
│   ├── index.json                 # Homepage structure
│   ├── product.json               # Product template
│   ├── collection.json            # Collection template
│   ├── cart.json                  # Cart template
│   ├── page.json                  # Standard page template
│   ├── 404.json                   # 404 error template
│   └── search.json                # Search results template
├── preview.html                   # Interactive browser preview demo
└── README.md
```

---

## 🚀 How to Install and Use in Shopify

### Method 1: Upload via Shopify Admin (ZIP File)
1. Zip the contents of the `threadora-theme/` directory (ensure `layout/`, `templates/`, `sections/`, etc., are at the root of the `.zip`).
2. In your Shopify Admin, navigate to **Online Store > Themes**.
3. Under the **Theme library** section, click **Add theme > Upload zip file**.
4. Select your zip file and click **Upload file**.
5. Once uploaded, click **Customize** to tailor your colors, banners, and menus, or click **Publish** to make it live!

### Method 2: Connect via GitHub
1. Push this repository or `threadora-theme` to your GitHub account.
2. In Shopify Admin, navigate to **Online Store > Themes**.
3. Click **Add theme > Connect from GitHub**.
4. Select your repository and branch. Any commits pushed to GitHub will automatically sync with your Shopify theme!

### Method 3: Using Shopify CLI
To develop locally using Shopify CLI:
```bash
cd threadora-theme
shopify theme dev --store your-store.myshopify.com
```

---

## 💻 Standalone Browser Preview
You can open `preview.html` directly in any web browser to test all interactive features (AJAX cart drawer, swatches, testimonial slider, wishlist, and responsive layout) without needing a live Shopify store.

---
&copy; 2024 THREADORA. Designed & Developed for Shopify Online Store 2.0.
