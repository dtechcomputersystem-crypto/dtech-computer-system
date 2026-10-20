/**
 * D-Tech Computer System - Business Configuration
 * Manage store branding, contact numbers, WhatsApp ordering, currencies, and policies.
 */
export const SHOP_CONFIG = {
  // Brand Identity
  name: "D-Tech Computer System",
  shortName: "D-Tech",
  tagline: "Your Tech Partner | Genuine Laptop Replacement Parts, High-Performance Laptops & Accessories",
  foundedYear: 2020,
  logo: "assets/images/d-tech-logo.jpg",

  // Direct Contact & WhatsApp Ordering
  phone: "077 490 6048",
  displayPhone: "077 490 6048",
  // International WhatsApp number without '+' or spaces for wa.me API
  whatsappNumber: "94774906048",
  email: "dtechcomputersystem@gmail.com",
  salesEmail: "dtechcomputersystem@gmail.com",
  address: "D-Tech Computer Center, Main Street",
  city: "Sri Lanka",

  // Operating Hours
  hours: {
    weekdays: "Mon - Fri: 8:30 AM – 7:30 PM",
    saturday: "Saturday: 9:00 AM – 6:00 PM",
    sunday: "Sunday: 9:30 AM – 3:30 PM (Emergency Parts & WhatsApp Orders)"
  },

  // Order & Shipping Policy
  currencies: [
    { code: "LKR", symbol: "Rs.", rate: 305.0, label: "LKR (Rs.)" },
    { code: "USD", symbol: "$", rate: 1.0, label: "USD ($)" },
    { code: "EUR", symbol: "€", rate: 0.92, label: "EUR (€)" },
    { code: "GBP", symbol: "£", rate: 0.79, label: "GBP (£)" },
    { code: "INR", symbol: "₹", rate: 83.5, label: "INR (₹)" }
  ],
  defaultCurrency: "LKR",
  
  shipping: {
    standardFee: 500.00,
    expressFee: 1200.00,
    freeShippingThreshold: 25000.00,
    storePickupFree: true,
    estimatedStandardDays: "1 - 3 Business Days Islandwide",
    estimatedExpressDays: "Same-Day / Next-Day Delivery"
  },

  // Warranty & Guarantees
  guaranteeDays: 30, // 30-day money-back guarantee
  standardPartsWarrantyMonths: 12, // 1 year warranty on parts
  laptopWarrantyMonths: 24, // 2 year warranty on brand new laptops
  oemTested: true
};
