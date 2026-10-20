/**
 * Nexora Laptop & Parts Selling Business - Comprehensive Product Catalog
 * Includes Laptops, Replacement Parts, RAM/Storage Upgrades, and Accessories.
 */
export const initialProducts = [
  // ==========================================
  // LAPTOPS (Gaming, Ultrabook, Business)
  // ==========================================
  {
    id: "prod-laptop-01",
    name: "Quantum X17 Pro Gaming Laptop",
    brand: "ASUS / Quantum",
    category: "laptops",
    categoryLabel: "Gaming Laptops",
    partType: "laptop",
    price: 1899.00,
    originalPrice: 2199.00,
    rating: 4.9,
    reviewsCount: 84,
    badge: "Top Performance",
    badgeColor: "badge-cyan",
    inStock: true,
    stockCount: 8,
    sku: "NX-LPT-QX17P",
    shortDesc: "Intel Core i9-14900HX, NVIDIA RTX 4080 12GB GDDR6, 32GB DDR5 5600MHz, 1TB Gen4 NVMe, 17.3\" 240Hz QHD Display.",
    description: "Designed for hardcore gamers, 3D artists, and software developers. Features vapor chamber liquid metal cooling, per-key RGB mechanical-feel keyboard, Thunderbolt 4, and WiFi 7 connectivity. Fully stress-tested and certified with 2-year warranty.",
    specs: {
      "Processor": "Intel Core i9-14900HX (24 Cores / 32 Threads, up to 5.8 GHz)",
      "Graphics": "NVIDIA GeForce RTX 4080 (12GB GDDR6, 175W Max TGP)",
      "Display": "17.3-inch QHD (2560x1440) 240Hz 3ms, 100% DCI-P3, G-SYNC",
      "Memory": "32GB (2x 16GB) DDR5-5600MHz SODIMM (Expandable to 64GB)",
      "Storage": "1TB PCIe Gen4 NVMe M.2 SSD (Extra M.2 Slot Available)",
      "Battery": "90Wh 4-cell Lithium-Ion with 280W Rapid Adapter",
      "Ports": "1x Thunderbolt 4, 1x USB-C 3.2 Gen2, 3x USB-A 3.2, HDMI 2.1, RJ-45 2.5G",
      "Weight": "2.65 kg (5.84 lbs)"
    },
    compatibleModels: ["Standalone System - All PC Software Compatible"],
    warranty: "2-Year Manufacturer Warranty + 1-Year Local Technical Support",
    image: "assets/images/gaming-laptop-rog.jpg",
    gallery: [
      "assets/images/gaming-laptop-rog.jpg",
      "assets/images/hero-laptops.jpg"
    ]
  },
  {
    id: "prod-laptop-02",
    name: "AeroBook Pro 14 Titanium Ultrabook",
    brand: "Aero / Dell",
    category: "laptops",
    categoryLabel: "Ultrabooks & Business",
    partType: "laptop",
    price: 1249.00,
    originalPrice: 1399.00,
    rating: 4.8,
    reviewsCount: 62,
    badge: "Ultra-Light 1.1kg",
    badgeColor: "badge-blue",
    inStock: true,
    stockCount: 12,
    sku: "NX-LPT-AB14T",
    shortDesc: "Intel Core Ultra 7 155H AI processor, 16GB LPDDR5X, 1TB PCIe 4.0 SSD, 14\" 2.8K 120Hz OLED Infinity Display.",
    description: "The ultimate road warrior laptop crafted from precision CNC aerospace-grade magnesium-aluminum. Featuring an exceptional 18-hour battery life, stunning 2.8K OLED screen, AI copilot engine, and ultra-fast charging.",
    specs: {
      "Processor": "Intel Core Ultra 7 155H (16 Cores, 22 Threads, Intel AI Boost NPU)",
      "Graphics": "Intel Arc Graphics 8-Xe Cores",
      "Display": "14.0-inch 2.8K (2880x1800) 120Hz OLED 0.2ms, 500 nits HDR",
      "Memory": "16GB Dual-Channel LPDDR5X-7467MHz",
      "Storage": "1TB Samsung Gen4 M.2 NVMe SSD",
      "Battery": "75Wh with 65W GaN Fast Charger (50% in 30 mins)",
      "Weight": "1.18 kg (2.6 lbs)"
    },
    compatibleModels: ["Standalone Ultrabook"],
    warranty: "2-Year Warranty + Free Windows 11 Pro Pre-installed",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      "assets/images/hero-laptops.jpg"
    ]
  },
  {
    id: "prod-laptop-03",
    name: "ThinkWork P16s Enterprise Workstation",
    brand: "Lenovo ThinkPad",
    category: "laptops",
    categoryLabel: "Workstations & Office",
    partType: "laptop",
    price: 1450.00,
    originalPrice: 1650.00,
    rating: 5.0,
    reviewsCount: 45,
    badge: "Military Certified",
    badgeColor: "badge-emerald",
    inStock: true,
    stockCount: 6,
    sku: "NX-LPT-TWP16",
    shortDesc: "AMD Ryzen 7 PRO 7840U, 32GB DDR5, 1TB SSD, 16\" WUXGA Anti-Glare Display, Spill-Resistant Keyboard with TrackPoint.",
    description: "Built for engineers, financial analysts, and corporate power users. Tested against 12 military-grade specifications (MIL-STD 810H). Legendary durability with hardware TPM 2.0 and biometric fingerprint security.",
    specs: {
      "Processor": "AMD Ryzen 7 PRO 7840U (8C/16T, up to 5.1GHz, AMD Ryzen AI)",
      "Graphics": "Integrated Radeon 780M (Handles CAD & Data Modeling)",
      "Memory": "32GB LPDDR5x-6400MHz",
      "Storage": "1TB OPAL 2.0 Self-Encrypting PCIe Gen4 NVMe SSD",
      "Display": "16-inch WUXGA (1920x1200) IPS, 400 nits, 100% sRGB Low Blue Light",
      "Security": "dTPM 2.0, Fingerprint Reader, IR Camera for Windows Hello"
    },
    compatibleModels: ["Corporate & Professional Enterprise"],
    warranty: "3-Year Lenovo Premier Onsite Warranty",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
    ]
  },

  // ==========================================
  // LAPTOP REPLACEMENT PARTS
  // ==========================================
  {
    id: "prod-part-bat-01",
    name: "OEM Replacement Battery 86Wh (Dell XPS 15 & Precision)",
    brand: "Dell OEM / D-Tech",
    category: "parts",
    categoryLabel: "Laptop Batteries",
    partType: "battery",
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 118,
    badge: "100% OEM Grade A+",
    badgeColor: "badge-cyan",
    inStock: true,
    stockCount: 35,
    sku: "NX-BAT-DEL9570",
    shortDesc: "Genuine 11.4V 86Wh 6-Cell Li-Polymer Battery for Dell XPS 15 9570, 9560, 9550, Precision 5510, 5520, 5530.",
    description: "Brand new Grade-A Japanese battery cells ensuring 500+ recharge cycles with full charge capacity retention. Built-in intelligent protection circuit board prevents over-charging, short-circuit, and overheating.",
    specs: {
      "Battery Type": "Rechargeable Lithium-Polymer (Li-Po)",
      "Voltage": "11.4V",
      "Capacity": "86Wh / 7167mAh (6-Cell)",
      "Compatible Part #": "6GTPY, 5XJ28, 5046J, GPM03, H5H20",
      "Certifications": "CE, FCC, RoHS, UL Listed Safety Certified",
      "Condition": "Brand New OEM Replacement with installation toolkit"
    },
    compatibleModels: [
      "Dell XPS 15 9550",
      "Dell XPS 15 9560",
      "Dell XPS 15 9570",
      "Dell XPS 15 7590",
      "Dell Precision 5510",
      "Dell Precision 5520",
      "Dell Precision 5530",
      "Dell Precision 5540"
    ],
    warranty: "1-Year Hassle-Free Replacement Warranty",
    image: "assets/images/battery-pack.jpg",
    gallery: [
      "assets/images/battery-pack.jpg"
    ]
  },
  {
    id: "prod-part-bat-02",
    name: "OEM Replacement Battery 57Wh (Lenovo ThinkPad T480 / T490)",
    brand: "Lenovo OEM",
    category: "parts",
    categoryLabel: "Laptop Batteries",
    partType: "battery",
    price: 54.00,
    originalPrice: 70.00,
    rating: 4.8,
    reviewsCount: 94,
    badge: "High Capacity",
    badgeColor: "badge-emerald",
    inStock: true,
    stockCount: 22,
    sku: "NX-BAT-LEN-T480",
    shortDesc: "11.52V 57Wh Internal Li-Ion Battery for Lenovo ThinkPad T480, T490, P43s, T14 Gen 1/Gen 2.",
    description: "High durability OEM replacement battery manufactured with premium lithium polymer cells. Restores original 8 to 12 hour battery life. Includes precision screwdriver set.",
    specs: {
      "Voltage": "11.52V",
      "Capacity": "57Wh / 4950mAh",
      "Compatible Part #": "01AV423, 01AV424, 01AV425, SB10K97581",
      "Cycle Life": "500+ Recharge Cycles"
    },
    compatibleModels: [
      "Lenovo ThinkPad T480",
      "Lenovo ThinkPad T490",
      "Lenovo ThinkPad T14 Gen 1",
      "Lenovo ThinkPad T14 Gen 2",
      "Lenovo ThinkPad P43s"
    ],
    warranty: "1-Year Direct Replacement Warranty",
    image: "assets/images/battery-pack.jpg",
    gallery: ["assets/images/battery-pack.jpg"]
  },
  {
    id: "prod-part-scr-01",
    name: "15.6\" FHD 144Hz IPS Replacement Screen (30-Pin eDP)",
    brand: "BOE / LG Display",
    category: "parts",
    categoryLabel: "Laptop Screens",
    partType: "screen",
    price: 89.00,
    originalPrice: 110.00,
    rating: 5.0,
    reviewsCount: 142,
    badge: "A+ Zero Dead Pixel",
    badgeColor: "badge-cyan",
    inStock: true,
    stockCount: 40,
    sku: "NX-SCR-156-144HZ",
    shortDesc: "15.6 Inch Full HD (1920x1080) 144Hz Slim Matte IPS LED Display Panel, 30-Pin Bottom Right Connector, Narrow Bezel.",
    description: "Grade A+ pristine replacement display panel with zero dead pixels guaranteed. Smooth 144Hz refresh rate, 300 nits brightness, wide 178° viewing angles. Compatible with ASUS TUF, Acer Nitro 5, HP Pavilion Gaming, Lenovo Legion, Dell G15.",
    specs: {
      "Screen Size": "15.6 Inch Diagonal",
      "Resolution": "Full HD (1920 x 1080) at 144Hz",
      "Connector": "30-Pin eDP Connector (Bottom Right)",
      "Panel Type": "IPS Non-Glare Matte Surface",
      "Mounting": "Narrow Border Frame (No bracket tabs / standard tape mount)",
      "Compatible Part #": "NV156FHM-NX4, B156HAN13.0, LM156LF2F"
    },
    compatibleModels: [
      "Acer Nitro 5 AN515-54, AN515-55, AN515-57",
      "ASUS TUF Gaming A15, F15 FX505, FX506",
      "HP Pavilion Gaming 15-ec, 15-dk series",
      "Lenovo Legion 5 15IMH05, 15ARH05",
      "Dell G3 3590, G5 5590, G15 5510"
    ],
    warranty: "6-Month Dead Pixel & Manufacturing Warranty",
    image: "assets/images/screen-panel.jpg",
    gallery: [
      "assets/images/screen-panel.jpg"
    ]
  },
  {
    id: "prod-part-scr-02",
    name: "14.0\" FHD IPS Anti-Glare Replacement Screen (30-Pin)",
    brand: "Innolux / AUO",
    category: "parts",
    categoryLabel: "Laptop Screens",
    partType: "screen",
    price: 72.00,
    originalPrice: 90.00,
    rating: 4.8,
    reviewsCount: 79,
    badge: "Best Seller",
    badgeColor: "badge-purple",
    inStock: true,
    stockCount: 28,
    sku: "NX-SCR-140-FHD",
    shortDesc: "14.0 Inch 1080p FHD IPS Slim Screen Panel for HP ProBook, ThinkPad, Dell Latitude, and ASUS ZenBook.",
    description: "Direct OEM replacement panel for popular business and student 14-inch laptops. Crisp 1080p resolution with crystal-clear matte anti-glare finish.",
    specs: {
      "Screen Size": "14.0 Inch",
      "Resolution": "1920 x 1080 (FHD 60Hz)",
      "Connector": "30-Pin eDP",
      "Color Gamut": "72% NTSC (100% sRGB)"
    },
    compatibleModels: [
      "HP ProBook 440 G6, G7, G8",
      "Dell Latitude 5400, 5410, 7400, 7410",
      "Lenovo ThinkPad T480s, T490s, E14",
      "Acer Swift 3 SF314"
    ],
    warranty: "6-Month Replacement Warranty",
    image: "assets/images/screen-panel.jpg",
    gallery: ["assets/images/screen-panel.jpg"]
  },
  {
    id: "prod-part-chg-01",
    name: "VOLTOS 100W GaN Fast Charger & Multi-Tip Laptop Adapter",
    brand: "Voltos / D-Tech",
    category: "parts",
    categoryLabel: "Chargers & Adapters",
    partType: "charger",
    price: 49.00,
    originalPrice: 65.00,
    rating: 4.9,
    reviewsCount: 210,
    badge: "Universal 100W GaN",
    badgeColor: "badge-cyan",
    inStock: true,
    stockCount: 50,
    sku: "NX-CHG-100W-GAN",
    shortDesc: "100W Dual USB-C PD 3.0 + USB-A GaN Power Adapter with braided 2m cable and interchangeable laptop DC barrel tips.",
    description: "Compact next-generation Gallium Nitride (GaN III) fast charger. Delivers up to 100W Power Delivery to charge MacBooks, ThinkPads, Dell XPS, HP Envy, ASUS ZenBooks, as well as phones and tablets. Runs 40% cooler with advanced surge protection.",
    specs: {
      "Total Output": "100W Max Fast Power Delivery 3.0 / PPS",
      "Outputs": "2x USB-C (100W single / 65W+35W dual), 1x USB-A (22.5W Quick Charge)",
      "Input Voltage": "100-240V AC 50/60Hz Global Universal",
      "Included Accessories": "2-meter 100W braided USB-C cable + 6 popular DC tips for older laptops",
      "Dimensions": "68 x 68 x 31 mm (Ultra Compact)"
    },
    compatibleModels: [
      "Apple MacBook Pro 13\" / 14\" / 16\" & MacBook Air M1/M2/M3",
      "Dell XPS 13, XPS 15, Latitude Type-C Series",
      "Lenovo ThinkPad X1 Carbon, T14, Yoga USB-C",
      "HP Spectre x360, Envy, Pavilion x360 Type-C",
      "ASUS ROG Zephyrus G14 USB-C charging, ZenBook",
      "Standard 4.5mm HP, 7.4mm Dell, and Lenovo Slim Tip via included adapters"
    ],
    warranty: "18-Month Replacement Warranty",
    image: "assets/images/charger-adapter.jpg",
    gallery: [
      "assets/images/charger-adapter.jpg"
    ]
  },
  {
    id: "prod-part-chg-02",
    name: "Dell Original 65W 4.5mm Small Barrel AC Power Adapter",
    brand: "Dell Genuine",
    category: "parts",
    categoryLabel: "Chargers & Adapters",
    partType: "charger",
    price: 32.00,
    originalPrice: 45.00,
    rating: 4.8,
    reviewsCount: 165,
    badge: "Dell Genuine",
    badgeColor: "badge-blue",
    inStock: true,
    stockCount: 42,
    sku: "NX-CHG-DEL-65W",
    shortDesc: "Original 19.5V 3.34A 65W Round 4.5mm tip AC adapter for Dell Inspiron, Vostro, and Latitude series.",
    description: "Tested genuine Dell OEM charger with power cord. Features rubberized cord wrap and blue LED ring indicator on the barrel tip.",
    specs: {
      "Output": "19.5V -- 3.34A (65W)",
      "Connector Pin": "4.5mm x 3.0mm with center pin",
      "Model Number": "HA65NM130, LA65NM130, DA65NM130"
    },
    compatibleModels: [
      "Dell Inspiron 14 3000, 5000, 7000 Series",
      "Dell Inspiron 15 3501, 3511, 3520, 5510",
      "Dell Vostro 3400, 3500, 3510, 5402",
      "Dell Latitude 3410, 3420, 3510, 3520"
    ],
    warranty: "1-Year Replacement Warranty",
    image: "assets/images/charger-adapter.jpg",
    gallery: ["assets/images/charger-adapter.jpg"]
  },
  {
    id: "prod-part-kbd-01",
    name: "OEM Backlit Replacement Keyboard for HP Pavilion 15",
    brand: "HP OEM",
    category: "parts",
    categoryLabel: "Keyboards & Trackpads",
    partType: "keyboard",
    price: 38.00,
    originalPrice: 50.00,
    rating: 4.7,
    reviewsCount: 54,
    badge: "White Backlit",
    badgeColor: "badge-purple",
    inStock: true,
    stockCount: 19,
    sku: "NX-KBD-HP15-BL",
    shortDesc: "US Layout White LED Backlit Keyboard replacement for HP Pavilion 15-cs, 15-cw, 15-eg, 15-eh series.",
    description: "Restore your typing experience with tactile OEM chiclet keys and crisp white LED backlighting. Tested for 10 million keystrokes with original ribbon cable connector.",
    specs: {
      "Layout": "US English with Numeric Keypad",
      "Backlight": "Yes (White LED with dual brightness)",
      "Connector": "Original Flex Ribbon Cable Included",
      "Key Travel": "1.4mm tactile response"
    },
    compatibleModels: [
      "HP Pavilion 15-cs0000 to 15-cs3999",
      "HP Pavilion 15-cw0000 to 15-cw1999",
      "HP Pavilion 15-eg0000 to 15-eg2999"
    ],
    warranty: "6-Month Replacement Warranty",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"]
  },

  // ==========================================
  // STORAGE & MEMORY UPGRADES (SSD / RAM)
  // ==========================================
  {
    id: "prod-upg-ssd-01",
    name: "FORCE PRO 1TB PCIe 4.0 NVMe M.2 High-Speed SSD",
    brand: "Force Pro / Samsung",
    category: "storage-ram",
    categoryLabel: "Storage & RAM Upgrades",
    partType: "ssd",
    price: 89.00,
    originalPrice: 119.00,
    rating: 5.0,
    reviewsCount: 188,
    badge: "7400 MB/s Blazing Fast",
    badgeColor: "badge-cyan",
    inStock: true,
    stockCount: 45,
    sku: "NX-SSD-FP1TB-G4",
    shortDesc: "1TB M.2 2280 PCIe Gen4 x4 NVMe SSD with ultra-slim copper graphene heat spreader for gaming & laptop thermals.",
    description: "Drastically speed up boot times, game loading, and file transfers with read speeds up to 7,450 MB/s and write speeds up to 6,900 MB/s. Compatible with any laptop with an M.2 2280 NVMe slot (Gen4 and backward compatible with Gen3).",
    specs: {
      "Form Factor": "M.2 2280 Single-Sided (Fits thin ultrabooks)",
      "Interface": "PCIe Gen 4.0 x4, NVMe 1.4 / 2.0",
      "Sequential Read": "Up to 7,450 MB/s",
      "Sequential Write": "Up to 6,900 MB/s",
      "Endurance": "600 TBW (Terabytes Written)",
      "Heatsink": "0.8mm Copper & Graphene Thermal Composite Sticker"
    },
    compatibleModels: [
      "All Dell, Lenovo, HP, ASUS, Acer, MSI laptops with M.2 2280 slot",
      "PlayStation 5 Console compatible"
    ],
    warranty: "5-Year Manufacturer Warranty",
    image: "assets/images/ssd-ram-combo.jpg",
    gallery: [
      "assets/images/ssd-ram-combo.jpg"
    ]
  },
  {
    id: "prod-upg-ram-01",
    name: "Crucial Pro 32GB Kit (2x16GB) DDR5 5600MHz Laptop RAM",
    brand: "Crucial Micron",
    category: "storage-ram",
    categoryLabel: "Storage & RAM Upgrades",
    partType: "ram",
    price: 98.00,
    originalPrice: 125.00,
    rating: 4.9,
    reviewsCount: 153,
    badge: "Plug & Play",
    badgeColor: "badge-emerald",
    inStock: true,
    stockCount: 30,
    sku: "NX-RAM-CR32G-D5",
    shortDesc: "32GB (2x 16GB) DDR5-5600 SODIMM 262-pin Laptop Memory CL46 1.1V for 12th/13th/14th Gen Intel and AMD Ryzen 7000/8000.",
    description: "Supercharge your laptop multitasking and eliminate lag when running Adobe Premiere, AutoCAD, Docker, or modern AAA games. Downclocks automatically to 5200MHz or 4800MHz if required by your motherboard.",
    specs: {
      "Capacity": "32GB Kit (2x 16GB Sticks)",
      "Speed": "DDR5-5600 MT/s (PC5-44800)",
      "Form Factor": "SODIMM 262-Pin (Laptop Standard)",
      "CAS Latency": "CL46, On-die ECC",
      "Voltage": "1.1V Low Power"
    },
    compatibleModels: [
      "Dell XPS 15 9520/9530, G15 Gaming",
      "Lenovo Legion 5/7, ThinkPad T14 Gen 4/5, P16",
      "ASUS ROG Strix, Zephyrus G14/G16, TUF A15",
      "Acer Predator Helios, Nitro 16",
      "HP Omen 16, Victus 15/16"
    ],
    warranty: "Limited Lifetime Warranty",
    image: "assets/images/ssd-ram-combo.jpg",
    gallery: ["assets/images/ssd-ram-combo.jpg"]
  },
  {
    id: "prod-upg-ram-02",
    name: "Samsung 16GB DDR4 3200MHz SODIMM Laptop Memory",
    brand: "Samsung Original",
    category: "storage-ram",
    categoryLabel: "Storage & RAM Upgrades",
    partType: "ram",
    price: 36.00,
    originalPrice: 48.00,
    rating: 4.9,
    reviewsCount: 220,
    badge: "Best Value",
    badgeColor: "badge-blue",
    inStock: true,
    stockCount: 65,
    sku: "NX-RAM-SAM16-D4",
    shortDesc: "16GB DDR4 3200MHz PC4-25600 260-Pin SODIMM 1.2V Non-ECC Unbuffered Laptop Memory Module.",
    description: "The most reliable upgrade for 8th to 11th Gen Intel and AMD Ryzen 3000 to 5000 laptops. Instant boost in performance and multi-tab browsing responsiveness.",
    specs: {
      "Capacity": "16GB (1x 16GB Single Rank)",
      "Speed": "3200 MT/s (Auto-supports 2666MHz and 2400MHz)",
      "Voltage": "1.2V",
      "Pin Count": "260-Pin SODIMM"
    },
    compatibleModels: [
      "Dell Inspiron & Latitude DDR4 laptops",
      "HP Pavilion & 250 G7/G8 DDR4",
      "Lenovo IdeaPad 3/5 & ThinkPad E14/E15 DDR4",
      "Acer Aspire 5 & Swift 3"
    ],
    warranty: "Lifetime Replacement Warranty",
    image: "assets/images/ssd-ram-combo.jpg",
    gallery: ["assets/images/ssd-ram-combo.jpg"]
  },

  // ==========================================
  // ACCESSORIES & PERIPHERALS
  // ==========================================
  {
    id: "prod-acc-stand-01",
    name: "AeroCool Pro Ergonomic Aluminum Cooling Stand",
    brand: "D-Tech Gear",
    category: "accessories",
    categoryLabel: "Stands & Cooling Pads",
    partType: "stand",
    price: 39.00,
    originalPrice: 55.00,
    rating: 4.9,
    reviewsCount: 97,
    badge: "Dual Silent Fans",
    badgeColor: "badge-cyan",
    inStock: true,
    stockCount: 38,
    sku: "NX-ACC-STAND-RGB",
    shortDesc: "Aviation-grade aluminum adjustable laptop riser with dual silent 140mm cooling fans, 7 height levels, and subtle blue LED glow.",
    description: "Reduces laptop CPU/GPU temperatures by up to 12°C while elevating your display to ergonomic eye-level to prevent neck strain. Supports laptops from 11\" to 17.3\" with anti-slip silicone cushions and foldable travel design.",
    specs: {
      "Material": "CNC Anodized Aluminum Alloy (Solid 4mm)",
      "Fans": "Dual 140mm fans, 1200 RPM, <18dB ultra-quiet",
      "Adjustability": "7 Angles from 15° to 45°",
      "Ports": "Dual USB pass-through ports",
      "Compatibility": "Laptops up to 17.3 inches & 10kg load"
    },
    compatibleModels: ["Universal for all laptops (11\" to 17.3\")"],
    warranty: "1-Year Warranty",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80"]
  },
  {
    id: "prod-acc-dock-01",
    name: "D-Tech 12-in-1 Triple Display USB-C Docking Hub",
    brand: "D-Tech Gear",
    category: "accessories",
    categoryLabel: "Docks & USB-C Hubs",
    partType: "dock",
    price: 69.00,
    originalPrice: 89.00,
    rating: 4.8,
    reviewsCount: 78,
    badge: "Triple 4K Display",
    badgeColor: "badge-purple",
    inStock: true,
    stockCount: 25,
    sku: "DT-ACC-DOCK-12",
    shortDesc: "12-in-1 Aluminum USB-C Hub with Dual 4K HDMI, DisplayPort, 100W PD charging, 1Gbps Ethernet, SD/TF reader & 4x USB.",
    description: "Turn your single USB-C laptop port into a complete multi-monitor desktop workstation. Allows connecting two 4K 60Hz monitors, wired gigabit LAN, headphones, mouse, keyboard, and external storage with one single plug.",
    specs: {
      "Video Output": "2x HDMI 4K @ 60Hz + 1x DisplayPort 4K @ 60Hz",
      "Power Pass-through": "100W USB-C Power Delivery 3.0",
      "Network": "RJ-45 Gigabit Ethernet (1000 Mbps)",
      "Data Ports": "2x USB 3.0 (5Gbps), 2x USB 2.0, SD & MicroSD slot, 3.5mm Audio",
      "Body": "Space Gray Aluminum Heat-dissipating Shell"
    },
    compatibleModels: [
      "MacBook Pro/Air with M1/M2/M3 or Intel",
      "Dell XPS, Latitude, Inspiron with USB-C / Thunderbolt",
      "Lenovo ThinkPad, Yoga, IdeaPad with DisplayPort Alt Mode",
      "HP Spectre, Envy, EliteBook",
      "ASUS, Acer, Surface Laptop 3/4/5"
    ],
    warranty: "1-Year Full Warranty",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"]
  },
  {
    id: "prod-acc-bag-01",
    name: "CyberShield Shockproof Waterproof Laptop Backpack",
    brand: "D-Tech Carry",
    category: "accessories",
    categoryLabel: "Bags & Protective Sleeves",
    partType: "bag",
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.9,
    reviewsCount: 112,
    badge: "Waterproof & Anti-Theft",
    badgeColor: "badge-emerald",
    inStock: true,
    stockCount: 34,
    sku: "NX-ACC-BAG-SHIELD",
    shortDesc: "High-density ballistic Oxford waterproof backpack with 360° air-cushioned laptop compartment (fits up to 17.3\") and external USB charging port.",
    description: "Engineered specifically to protect delicate laptops, spare batteries, chargers, and tech gear from drops, shocks, and heavy rain. Features TSA-friendly 180° flat fold opening, hidden anti-theft back pocket, and breathable ergonomic shoulder padding.",
    specs: {
      "Laptop Pocket": "Fits laptops up to 17.3 inches with elastic safety strap",
      "Material": "900D Ballistic Waterproof Oxford Fabric with YKK zippers",
      "Capacity": "35 Liters with 15 organized compartments",
      "Features": "External USB pass-through port, Luggage strap, Sunglasses holder"
    },
    compatibleModels: ["Universal fit for 13\" to 17.3\" laptops"],
    warranty: "2-Year Craftsmanship Warranty",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"]
  },
  {
    id: "prod-acc-mouse-01",
    name: "ViperSpeed Wireless Dual-Mode Rechargeable Mouse",
    brand: "D-Tech Gear",
    category: "accessories",
    categoryLabel: "Mice & Keyboards",
    partType: "mouse",
    price: 25.00,
    originalPrice: 35.00,
    rating: 4.8,
    reviewsCount: 88,
    badge: "Dual Bluetooth + 2.4G",
    badgeColor: "badge-cyan",
    inStock: true,
    stockCount: 48,
    sku: "NX-ACC-MOUSE-VIPER",
    shortDesc: "Ergonomic 4000 DPI silent-click wireless mouse with Bluetooth 5.2 and 2.4GHz USB nano receiver, 90-day battery.",
    description: "Glide smoothly across any surface without mouse pads. Ultra-quiet silent switches make it ideal for offices, libraries, and late-night work.",
    specs: {
      "Connectivity": "Bluetooth 5.2 + 2.4GHz Wireless with USB Dongle",
      "Sensor": "High-precision Optical 800 - 4000 DPI (Adjustable)",
      "Battery": "Type-C Rechargeable 600mAh (Up to 90 days per charge)",
      "Switches": "90% Noise-reduced Silent Click"
    },
    compatibleModels: ["Windows, Mac, ChromeOS, Linux"],
    warranty: "1-Year Warranty",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    gallery: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80"]
  }
];

// Helper functions for catalog querying
export function getProductById(id) {
  return initialProducts.find(p => p.id === id);
}

export function getCategories() {
  return [
    { id: "all", label: "All Items", icon: "💻" },
    { id: "laptops", label: "Laptops", icon: "⚡" },
    { id: "parts", label: "Replacement Parts", icon: "🔧" },
    { id: "storage-ram", label: "RAM & SSD Upgrades", icon: "🚀" },
    { id: "accessories", label: "Accessories & Gear", icon: "🎧" }
  ];
}

export function getPopularBrands() {
  return ["All Brands", "Dell", "HP", "Lenovo", "ASUS", "Apple", "Samsung", "Crucial", "D-Tech Gear"];
}
