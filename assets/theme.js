/**
 * THREADORA SHOPIFY OS 2.0 THEME - CORE JS CONTROLLER
 * Timeless Style, Modern You
 */

class ThreadoraTheme {
  constructor() {
    this.cart = {
      items: [
        {
          id: 1,
          title: "Linen Blend Shirt Dress",
          variant: "Sage / M",
          price: 54.99,
          quantity: 1,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBBEowAv6nO3m8dN9Nl8nhvoHW86COW0DNZh90J_KseCOsXl8JNKWNunio7YmrKPtif706uLL8uEfviBo1PXLDYZhdb885bMJl635pwc2S94M2rMByeHLPgVro22MIghSohsVYdWNNR56Q0eUbciOBEzYGi2e2VazgabwKyvN4WJ_dfqAfMPcldTiwwuluaq1ulbUj1dLayn22_vhifTS_3n2BFh9zDIKLHteydLLKFyDn4MDPEMtE"
        }
      ],
      shippingThreshold: 75.00
    };

    this.init();
  }

  init() {
    this.initCartDrawer();
    this.initMobileNav();
    this.initTestimonials();
    this.initSwatches();
    this.initWishlist();
    this.initStickyHeader();
    this.initNewsletter();
    this.updateCartUI();
  }

  /* -------------------------------------------------------------
   * CART DRAWER FUNCTIONALITY
   * ------------------------------------------------------------- */
  initCartDrawer() {
    const triggers = document.querySelectorAll('[data-cart-trigger]');
    const drawer = document.getElementById('CartDrawer');
    const overlay = document.getElementById('CartDrawerOverlay');
    const closeBtn = document.getElementById('CartDrawerClose');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCart();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCart());
    }

    if (overlay) {
      overlay.addEventListener('click', () => this.closeCart());
    }

    // Quick Add Buttons
    document.querySelectorAll('[data-quick-add]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const id = parseInt(button.getAttribute('data-product-id')) || Date.now();
        const title = button.getAttribute('data-product-title') || 'Threadora Garment';
        const price = parseFloat(button.getAttribute('data-product-price')) || 49.99;
        const image = button.getAttribute('data-product-image') || '';
        const variant = button.getAttribute('data-product-variant') || 'Default';

        this.addToCart({ id, title, price, image, variant, quantity: 1 });
      });
    });

    // Delegated cart actions (qty buttons, remove)
    const itemsContainer = document.getElementById('CartDrawerItems');
    if (itemsContainer) {
      itemsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('[data-cart-action]');
        if (!target) return;

        const action = target.getAttribute('data-cart-action');
        const id = parseInt(target.getAttribute('data-item-id'));

        if (action === 'increase') {
          this.changeQuantity(id, 1);
        } else if (action === 'decrease') {
          this.changeQuantity(id, -1);
        } else if (action === 'remove') {
          this.removeItem(id);
        }
      });
    }
  }

  openCart() {
    const drawer = document.getElementById('CartDrawer');
    const overlay = document.getElementById('CartDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.add('is-open');
      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCart() {
    const drawer = document.getElementById('CartDrawer');
    const overlay = document.getElementById('CartDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  addToCart(item) {
    const existing = this.cart.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.items.push(item);
    }
    this.updateCartUI();
    this.openCart();
    this.showToast(`Added "${item.title}" to bag`);
  }

  changeQuantity(id, delta) {
    const item = this.cart.items.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.updateCartUI();
      }
    }
  }

  removeItem(id) {
    this.cart.items = this.cart.items.filter(i => i.id !== id);
    this.updateCartUI();
    this.showToast('Item removed from bag');
  }

  updateCartUI() {
    const countElements = document.querySelectorAll('[data-cart-count]');
    const subtotalElements = document.querySelectorAll('[data-cart-subtotal]');
    const itemsContainer = document.getElementById('CartDrawerItems');
    const shippingText = document.getElementById('FreeShippingText');
    const shippingBar = document.getElementById('FreeShippingBar');

    const totalCount = this.cart.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = this.cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    // Update Counts
    countElements.forEach(el => el.textContent = totalCount);

    // Update Subtotals
    subtotalElements.forEach(el => el.textContent = `$${subtotal.toFixed(2)}`);

    // Free Shipping Calculation
    if (shippingText && shippingBar) {
      if (subtotal >= this.cart.shippingThreshold) {
        shippingText.innerHTML = `<strong>Congratulations!</strong> You have unlocked Free Shipping.`;
        shippingBar.style.width = '100%';
      } else {
        const remaining = (this.cart.shippingThreshold - subtotal).toFixed(2);
        const percentage = Math.min((subtotal / this.cart.shippingThreshold) * 100, 100);
        shippingText.innerHTML = `Add <strong>$${remaining}</strong> more for <strong>Free Shipping</strong>`;
        shippingBar.style.width = `${percentage}%`;
      }
    }

    // Render Items
    if (itemsContainer) {
      if (this.cart.items.length === 0) {
        itemsContainer.innerHTML = `
          <div class="cart-drawer__empty-state">
            <p class="text-neutral-500 text-sm mb-4">Your bag is currently empty.</p>
            <button class="btn btn-primary btn-sm" onclick="window.threadora.closeCart()">Start Shopping</button>
          </div>
        `;
      } else {
        itemsContainer.innerHTML = this.cart.items.map(item => `
          <div class="cart-drawer__item">
            <img src="${item.image}" alt="${item.title}" class="cart-drawer__item-image" />
            <div class="cart-drawer__item-details">
              <h4 class="cart-drawer__item-title">${item.title}</h4>
              <span class="cart-drawer__item-variant">${item.variant}</span>
              <span class="cart-drawer__item-price">$${item.price.toFixed(2)}</span>
              <div class="cart-drawer__qty-wrapper">
                <button class="cart-drawer__qty-btn" data-cart-action="decrease" data-item-id="${item.id}">-</button>
                <span class="cart-drawer__qty-value">${item.quantity}</span>
                <button class="cart-drawer__qty-btn" data-cart-action="increase" data-item-id="${item.id}">+</button>
              </div>
              <button class="cart-drawer__item-remove" data-cart-action="remove" data-item-id="${item.id}">Remove</button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  /* -------------------------------------------------------------
   * MOBILE NAVIGATION DRAWER
   * ------------------------------------------------------------- */
  initMobileNav() {
    const trigger = document.getElementById('MobileNavTrigger');
    const drawer = document.getElementById('MobileNavDrawer');
    const closeBtn = document.getElementById('MobileNavClose');
    const overlay = document.getElementById('MobileNavOverlay');

    if (trigger && drawer) {
      trigger.addEventListener('click', () => {
        drawer.classList.add('is-open');
        if (overlay) overlay.classList.add('is-active');
      });
    }

    const closeNav = () => {
      if (drawer) drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    if (overlay) overlay.addEventListener('click', closeNav);
  }

  /* -------------------------------------------------------------
   * TESTIMONIALS SLIDER
   * ------------------------------------------------------------- */
  initTestimonials() {
    const testimonials = [
      {
        quote: "The quality is amazing and the fit is perfect! I love how everything feels so comfortable and looks so stylish.",
        author: "Emily R."
      },
      {
        quote: "Threadora's linen dresses are unmatched. Breathable, durable, and effortlessly chic for everyday wear.",
        author: "Sophia M."
      },
      {
        quote: "Impressed by the sustainable ethos and exceptional attention to detail. Fast shipping and gorgeous packaging!",
        author: "Claire D."
      }
    ];

    let currentIndex = 0;
    const quoteEl = document.getElementById('TestimonialQuote');
    const authorEl = document.getElementById('TestimonialAuthor');
    const prevBtn = document.getElementById('TestimonialPrev');
    const nextBtn = document.getElementById('TestimonialNext');

    const render = () => {
      if (!quoteEl || !authorEl) return;
      quoteEl.style.opacity = '0';
      quoteEl.style.transform = 'translateY(10px)';
      setTimeout(() => {
        quoteEl.textContent = `"${testimonials[currentIndex].quote}"`;
        authorEl.textContent = testimonials[currentIndex].author;
        quoteEl.style.opacity = '1';
        quoteEl.style.transform = 'translateY(0)';
      }, 200);
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        render();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        render();
      });
    }
  }

  /* -------------------------------------------------------------
   * COLOR SWATCHES INTERACTION
   * ------------------------------------------------------------- */
  initSwatches() {
    document.querySelectorAll('.color-swatches').forEach(group => {
      const swatches = group.querySelectorAll('.color-swatch');
      swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
          swatches.forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
        });
      });
    });
  }

  /* -------------------------------------------------------------
   * WISHLIST TOGGLE
   * ------------------------------------------------------------- */
  initWishlist() {
    document.querySelectorAll('[data-wishlist-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('active');
        const isActive = btn.classList.contains('active');
        const fillPath = btn.querySelector('svg path');
        if (isActive) {
          if (fillPath) fillPath.setAttribute('fill', '#E11D48');
          this.showToast('Saved to your wishlist');
        } else {
          if (fillPath) fillPath.setAttribute('fill', 'none');
          this.showToast('Removed from wishlist');
        }
      });
    });
  }

  /* -------------------------------------------------------------
   * STICKY HEADER & SCROLL BEHAVIOR
   * ------------------------------------------------------------- */
  initStickyHeader() {
    const header = document.querySelector('[data-purpose="main-navigation"]');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    });
  }

  /* -------------------------------------------------------------
   * NEWSLETTER SUBMISSION
   * ------------------------------------------------------------- */
  initNewsletter() {
    document.querySelectorAll('[data-newsletter-form]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          this.showToast('Thank you for subscribing! Use code WELCOME10 for 10% off.');
          input.value = '';
        }
      });
    });
  }

  /* -------------------------------------------------------------
   * TOAST NOTIFICATIONS
   * ------------------------------------------------------------- */
  showToast(message) {
    let container = document.getElementById('ToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ToastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.threadora = new ThreadoraTheme();
});
