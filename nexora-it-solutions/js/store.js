/**
 * Nexora Laptop & Parts - Central Reactive State Store
 * Handles Cart, Currency Conversion, Dynamic Products, Orders, and WhatsApp Message Generation.
 */
import { SHOP_CONFIG } from './data/config.js';
import { initialProducts } from './data/products.js';

class LaptopStore {
  constructor() {
    this.listeners = [];
    
    // Load persisted state or fallback
    const savedConfig = this.loadFromStorage('nx_config', null);
    if (!savedConfig || savedConfig.name !== SHOP_CONFIG.name || savedConfig.phone !== SHOP_CONFIG.phone || savedConfig.email !== SHOP_CONFIG.email) {
      this.config = { ...SHOP_CONFIG };
      this.saveToStorage('nx_config', this.config);
    } else {
      this.config = savedConfig;
    }

    this.products = this.loadFromStorage('nx_products', initialProducts);
    this.cart = this.loadFromStorage('nx_cart', []);
    this.orders = this.loadFromStorage('nx_orders', this.getSampleOrders());
    
    // Default to LKR if not set or if previously defaulted to USD
    const savedCurrency = this.loadFromStorage('nx_currency', null);
    this.currency = savedCurrency === 'USD' ? 'LKR' : (savedCurrency || this.config.defaultCurrency || 'LKR');
    
    // Filter State
    this.activeCategory = 'all';
    this.activeBrand = 'All Brands';
    this.activePartType = 'all';
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.inStockOnly = false;
    
    // Selected product for modal preview
    this.selectedProduct = null;
  }

  loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Error reading storage for " + key, e);
      return fallback;
    }
  }

  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage write failed for " + key, e);
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(eventType, payload) {
    this.listeners.forEach(cb => {
      try {
        cb(eventType, payload);
      } catch (err) {
        console.error("Store listener error:", err);
      }
    });
  }

  // ==========================================
  // CURRENCY CONVERSION & FORMATTING
  // ==========================================
  getCurrencies() {
    return this.config.currencies || [];
  }

  getCurrentCurrency() {
    return this.currency;
  }

  setCurrency(currencyCode) {
    this.currency = currencyCode;
    this.saveToStorage('nx_currency', this.currency);
    this.notify('CURRENCY_CHANGED', this.currency);
  }

  formatPrice(amountInUSD) {
    const curObj = this.getCurrencies().find(c => c.code === this.currency) || {
      code: "USD",
      symbol: "$",
      rate: 1.0
    };
    const converted = amountInUSD * curObj.rate;
    
    if (curObj.code === "LKR" || curObj.code === "INR") {
      return `${curObj.symbol} ${Math.round(converted).toLocaleString()}`;
    }
    return `${curObj.symbol}${converted.toFixed(2)}`;
  }

  // ==========================================
  // CART OPERATIONS
  // ==========================================
  getCartItems() {
    return this.cart;
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  getCartShipping(deliveryMethod = 'standard') {
    if (deliveryMethod === 'pickup') return 0;
    const subtotal = this.getCartSubtotal();
    if (subtotal >= this.config.shipping.freeShippingThreshold) return 0;
    return deliveryMethod === 'express' ? this.config.shipping.expressFee : this.config.shipping.standardFee;
  }

  getCartTotal(deliveryMethod = 'standard') {
    return this.getCartSubtotal() + this.getCartShipping(deliveryMethod);
  }

  addToCart(product, quantity = 1, options = {}) {
    const existingIndex = this.cart.findIndex(i => i.id === product.id);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        sku: product.sku,
        image: product.image,
        category: product.category,
        brand: product.brand,
        quantity: quantity,
        options: options,
        addedAt: new Date().toISOString()
      });
    }
    this.saveToStorage('nx_cart', this.cart);
    this.notify('CART_UPDATED', this.cart);
    if (window.showToast) {
      window.showToast(`Added "${product.name}" to cart!`);
    }
  }

  updateQuantity(index, delta) {
    if (this.cart[index]) {
      this.cart[index].quantity += delta;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
      this.saveToStorage('nx_cart', this.cart);
      this.notify('CART_UPDATED', this.cart);
    }
  }

  removeFromCart(index) {
    if (this.cart[index]) {
      const removedName = this.cart[index].name;
      this.cart.splice(index, 1);
      this.saveToStorage('nx_cart', this.cart);
      this.notify('CART_UPDATED', this.cart);
      if (window.showToast) {
        window.showToast(`Removed "${removedName}" from cart.`);
      }
    }
  }

  clearCart() {
    this.cart = [];
    this.saveToStorage('nx_cart', this.cart);
    this.notify('CART_UPDATED', this.cart);
  }

  // ==========================================
  // WHATSAPP ORDER GENERATOR
  // ==========================================
  buildWhatsAppOrderUrl(orderDetails) {
    const waNumber = this.config.whatsappNumber;
    const curObj = this.getCurrencies().find(c => c.code === this.currency) || { symbol: "$" };
    
    let text = `⚡ *NEW ORDER - ${this.config.name.toUpperCase()}*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📋 *Order Ref:* #${orderDetails.orderId}\n`;
    text += `👤 *Customer:* ${orderDetails.customerName}\n`;
    text += `📱 *Phone / WA:* ${orderDetails.customerPhone}\n`;
    if (orderDetails.customerEmail) {
      text += `📧 *Email:* ${orderDetails.customerEmail}\n`;
    }
    text += `📍 *Delivery Address:* ${orderDetails.customerAddress}, ${orderDetails.customerCity}\n`;
    if (orderDetails.laptopModel) {
      text += `💻 *Customer Laptop Model:* ${orderDetails.laptopModel}\n`;
    }
    text += `🚚 *Delivery Method:* ${orderDetails.deliveryMethod === 'pickup' ? 'Store Pickup (Free)' : orderDetails.deliveryMethod === 'express' ? 'Express Priority Courier' : 'Standard Delivery'}\n`;
    text += `💳 *Payment Method:* ${orderDetails.paymentMethod}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📦 *ITEMS ORDERED:*\n`;

    orderDetails.items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}*\n`;
      text += `   • SKU: ${item.sku} | Qty: ${item.quantity}\n`;
      text += `   • Price: ${this.formatPrice(item.price)} each = ${this.formatPrice(item.price * item.quantity)}\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `💵 *Subtotal:* ${this.formatPrice(orderDetails.subtotal)}\n`;
    text += `🚚 *Delivery Fee:* ${orderDetails.shipping === 0 ? 'FREE' : this.formatPrice(orderDetails.shipping)}\n`;
    text += `💰 *TOTAL PAYABLE:* ${this.formatPrice(orderDetails.total)}\n`;
    
    if (orderDetails.notes) {
      text += `📝 *Customer Notes:* ${orderDetails.notes}\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `_Please confirm availability and dispatch schedule. Thank you!_`;

    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  }

  buildWhatsAppDirectProductUrl(product) {
    const waNumber = this.config.whatsappNumber;
    let text = `👋 Hello ${this.config.shortName}!\n`;
    text += `I am interested in buying this item from your website:\n\n`;
    text += `💻 *${product.name}*\n`;
    text += `🏷️ SKU: ${product.sku}\n`;
    text += `💵 Price: ${this.formatPrice(product.price)}\n`;
    text += `📂 Category: ${product.categoryLabel}\n`;
    text += `🛡️ Warranty: ${product.warranty || 'Included'}\n\n`;
    text += `Is this item currently in stock? Can you assist me with ordering and delivery details?`;

    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  }

  buildWhatsAppPartsInquiryUrl(brand, partType, laptopModel, notes) {
    const waNumber = this.config.whatsappNumber;
    let text = `🔧 *PARTS INQUIRY & COMPATIBILITY CHECK*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `💻 *Laptop Brand:* ${brand}\n`;
    text += `🔩 *Part Needed:* ${partType}\n`;
    text += `🏷️ *Laptop Exact Model:* ${laptopModel || 'Not Specified'}\n`;
    if (notes) {
      text += `📝 *Notes/Problem:* ${notes}\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Hi, can you confirm if you have this replacement part in stock and let me know the price and delivery timeline?`;

    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  }

  // ==========================================
  // ORDERS MANAGEMENT
  // ==========================================
  createOrder(orderData) {
    const orderId = 'DT-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      orderId: orderId,
      date: new Date().toISOString(),
      status: 'Confirmed', // Confirmed, Packed, Shipped, Delivered, Cancelled
      ...orderData
    };

    this.orders.unshift(newOrder);
    this.saveToStorage('nx_orders', this.orders);
    this.clearCart();
    this.notify('ORDER_CREATED', newOrder);
    return newOrder;
  }

  getOrders() {
    return this.orders;
  }

  getOrderById(orderId) {
    const clean = (orderId || '').trim().toUpperCase();
    return this.orders.find(o => o.orderId === clean || o.orderId === `NX-${clean}`);
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
      this.saveToStorage('nx_orders', this.orders);
      this.notify('ORDER_STATUS_CHANGED', order);
      return true;
    }
    return false;
  }

  // ==========================================
  // PRODUCT CATALOG & FILTERING
  // ==========================================
  getAllProducts() {
    return this.products;
  }

  getFilteredProducts() {
    return this.products.filter(item => {
      // Category match
      if (this.activeCategory !== 'all' && item.category !== this.activeCategory) {
        return false;
      }
      // Brand match
      if (this.activeBrand !== 'All Brands' && !item.brand.toLowerCase().includes(this.activeBrand.toLowerCase())) {
        return false;
      }
      // In stock match
      if (this.inStockOnly && !item.inStock) {
        return false;
      }
      // Search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchSku = item.sku.toLowerCase().includes(query);
        const matchDesc = item.shortDesc.toLowerCase().includes(query);
        const matchBrand = item.brand.toLowerCase().includes(query);
        const matchCompat = (item.compatibleModels || []).some(m => m.toLowerCase().includes(query));
        if (!matchName && !matchSku && !matchDesc && !matchBrand && !matchCompat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (this.sortBy === 'price-low') return a.price - b.price;
      if (this.sortBy === 'price-high') return b.price - a.price;
      if (this.sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' retains natural ranking
    });
  }

  setCategory(category) {
    this.activeCategory = category;
    this.notify('FILTER_CHANGED', { category });
  }

  setBrand(brand) {
    this.activeBrand = brand;
    this.notify('FILTER_CHANGED', { brand });
  }

  setSearchQuery(query) {
    this.searchQuery = query;
    this.notify('FILTER_CHANGED', { query });
  }

  setSortBy(sort) {
    this.sortBy = sort;
    this.notify('FILTER_CHANGED', { sort });
  }

  setInStockOnly(value) {
    this.inStockOnly = value;
    this.notify('FILTER_CHANGED', { inStockOnly: value });
  }

  // ==========================================
  // INVENTORY / ADMIN ACTIONS (STORE OWNER)
  // ==========================================
  addProduct(productData) {
    const newProduct = {
      id: 'prod-custom-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      badge: productData.badge || 'New Arrival',
      badgeColor: 'badge-cyan',
      inStock: true,
      gallery: [productData.image],
      specs: {},
      compatibleModels: [],
      ...productData
    };
    this.products.unshift(newProduct);
    this.saveToStorage('nx_products', this.products);
    this.notify('PRODUCTS_UPDATED', this.products);
    return newProduct;
  }

  updateProduct(id, updatedFields) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx > -1) {
      this.products[idx] = { ...this.products[idx], ...updatedFields };
      this.saveToStorage('nx_products', this.products);
      this.notify('PRODUCTS_UPDATED', this.products);
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    this.saveToStorage('nx_products', this.products);
    this.notify('PRODUCTS_UPDATED', this.products);
  }

  resetProductsToDefault() {
    this.products = [...initialProducts];
    this.saveToStorage('nx_products', this.products);
    this.notify('PRODUCTS_UPDATED', this.products);
  }

  // ==========================================
  // MODAL PRODUCT PREVIEW
  // ==========================================
  setSelectedProduct(product) {
    this.selectedProduct = product;
    this.notify('PRODUCT_SELECTED', product);
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }

  // ==========================================
  // SAMPLE ORDERS FOR DEMO
  // ==========================================
  getSampleOrders() {
    return [
      {
        orderId: "NX-84920",
        date: new Date(Date.now() - 3600000 * 2).toISOString(),
        customerName: "Michael Adams",
        customerPhone: "+1 (555) 728-1944",
        customerEmail: "m.adams@techmail.com",
        customerAddress: "742 Evergreen Terrace",
        customerCity: "Springfield",
        laptopModel: "Dell XPS 15 9570",
        deliveryMethod: "standard",
        paymentMethod: "Cash on Delivery",
        status: "Processing",
        subtotal: 68.00,
        shipping: 9.99,
        total: 77.99,
        items: [
          {
            id: "prod-part-bat-01",
            name: "OEM Replacement Battery 86Wh (Dell XPS 15 & Precision)",
            sku: "NX-BAT-DEL9570",
            price: 68.00,
            quantity: 1,
            image: "assets/images/battery-pack.jpg"
          }
        ]
      },
      {
        orderId: "NX-84882",
        date: new Date(Date.now() - 3600000 * 26).toISOString(),
        customerName: "Elena Rostova",
        customerPhone: "+1 (555) 391-4420",
        customerEmail: "elena.r@designhub.io",
        customerAddress: "124 Innovation Blvd, Apt 4B",
        customerCity: "San Jose",
        laptopModel: "Acer Nitro 5 AN515-55",
        deliveryMethod: "express",
        paymentMethod: "Bank Transfer",
        status: "Dispatched",
        subtotal: 138.00,
        shipping: 0,
        total: 138.00,
        items: [
          {
            id: "prod-part-scr-01",
            name: "15.6\" FHD 144Hz IPS Replacement Screen (30-Pin eDP)",
            sku: "NX-SCR-156-144HZ",
            price: 89.00,
            quantity: 1,
            image: "assets/images/screen-panel.jpg"
          },
          {
            id: "prod-part-chg-01",
            name: "VOLTOS 100W GaN Fast Charger & Multi-Tip Laptop Adapter",
            sku: "NX-CHG-100W-GAN",
            price: 49.00,
            quantity: 1,
            image: "assets/images/charger-adapter.jpg"
          }
        ]
      }
    ];
  }
}

export const store = new LaptopStore();
