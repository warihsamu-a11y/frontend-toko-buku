# 📂 Struktur File Lengkap - Frontend Toko Buku Sam

## 📋 File Listing

```
frontend/
│
├── 📄 index.html                          ⭐ Halaman Utama (Katalog Produk)
├── 📄 README.md                           📚 Dokumentasi Lengkap
├── 📄 QUICKSTART.md                       🚀 Panduan Cepat
├── 📄 API_DOCS.md                         🔌 API Integration Guide
├── 📄 package.json                        📦 Project Info & Metadata
├── 🔧 setup.sh                            🐧 Setup Script (Linux/Mac)
├── 🔧 setup.bat                           🪟 Setup Script (Windows)
│
├── 📁 assets/
│   │
│   ├── 📁 css/
│   │   ├── 📄 styles.css                  ✨ Global & Utility Styles
│   │   ├── 📄 header.css                  🎨 Header, Nav & Footer Styles
│   │   ├── 📄 product-catalog.css         🏪 Product Grid & Filter Styles
│   │   ├── 📄 product-detail.css          📖 Product Detail Page Styles
│   │   └── 📄 cart.css                    🛒 Shopping Cart Styles
│   │
│   ├── 📁 js/
│   │   ├── 📄 product-service.js          🔧 Product Data & Business Logic
│   │   ├── 📄 cart-service.js             🛍️ Shopping Cart Logic
│   │   ├── 📄 app.js                      🎯 Main Application Logic
│   │   ├── 📄 product-detail.js           📖 Product Detail Page Logic
│   │   └── 📄 cart.js                     🛒 Cart Page Logic
│   │
│   └── 📁 images/
│       └── (Folder for product images)
│
└── 📁 pages/
    ├── 📄 product-detail.html             📖 Halaman Detail Produk
    └── 📄 cart.html                       🛒 Halaman Keranjang Belanja
```

---

## 📄 File Details

### 🏠 Root Files

#### `index.html` (8.2 KB)
**Halaman Utama - Katalog Produk Buku**
- Header dengan search bar dan cart icon
- Filter section: kategori, harga, sort, publisher, rating
- Product grid dengan pagination
- Quick view modal
- Footer dengan info kontak
- Items di root:
  - Header navigation
  - Filter sidebar
  - Product grid container
  - Modal for quick view
  - Footer

#### `README.md` (6.5 KB)
**Dokumentasi Lengkap Proyek**
- Fitur-fitur utama
- Struktur folder
- Cara menggunakan
- Warna & tema
- Customization
- Development guide

#### `QUICKSTART.md` (5.2 KB)
**Panduan Cepat Memulai**
- Quick start instructions
- Scenario usage examples
- Feature details
- Customization tips
- FAQ & troubleshooting
- Tips & tricks

#### `API_DOCS.md` (8.1 KB)
**API Integration Documentation**
- 14 API endpoints
- Request/Response format
- Error handling
- Authentication
- Rate limiting
- Database schema
- Testing guide

#### `package.json` (1.8 KB)
**Project Metadata & Info**
- Project name & version
- Technologies used
- Features list
- File structure
- Sample data
- Future roadmap

#### `setup.sh` (0.8 KB)
**Setup Script untuk Linux/Mac**
- Python setup
- Node.js setup
- Live Server setup
- Instructions

#### `setup.bat` (0.8 KB)
**Setup Script untuk Windows**
- Python setup
- Node.js setup
- Live Server setup
- Instructions

---

### 🎨 CSS Files (`assets/css/`)

#### `styles.css` (5.2 KB)
**Global Styles & Utilities**
- CSS Variables (colors, shadows, fonts)
- Base styles (body, typography, links)
- Button styles (primary, secondary, icon)
- Modal styles
- Loading states
- Pagination
- Responsive breakpoints

**Komponen:**
- Typography
- Buttons (.btn-primary, .btn-secondary, .btn-icon, .btn-large)
- Modals (.modal, .modal-content, .close-modal)
- Loading states
- Pagination styles
- Utilities (.text-center, .mt-20, .mb-20)

#### `header.css` (4.1 KB)
**Header, Navigation & Footer Styles**
- Header styling (#2c3e50 background)
- Search bar grid layout
- Filter section dengan price range slider
- Cart count badge
- Footer styling
- Responsive design

**Komponen:**
- .header, .header-top, .header-bottom
- .search-bar, .btn-search
- .filter-section, .filter-select
- .price-range (input range styling)
- .cart-count (badge)
- .footer, .footer-content, .footer-section
- Social links styling

#### `product-catalog.css` (7.3 KB)
**Product Grid & Filter Styles**
- Main content layout (grid 250px sidebar + 1fr content)
- Sidebar filter widgets
- Product grid (auto-fill columns)
- Product cards dengan hover effects
- Quick view buttons
- Empty state
- Skeleton loading animations

**Komponen:**
- .main-content, .sidebar
- .filter-widget
- .product-grid, .product-card
- .product-image, .product-badge
- .product-info, .product-actions
- .btn-add-cart, .btn-quick-view
- Skeleton animations
- Responsive grid adjustments

#### `product-detail.css` (8.5 KB)
**Product Detail Page Styles**
- 2-column layout (image + info)
- Image gallery styling
- Rating & review display
- Price section dengan discount badge
- Quantity selector
- Action buttons
- Tabs interface
- Info table
- Related products grid

**Komponen:**
- .product-detail, .detail-image, .detail-info
- .rating-display, .review-summary
- .price-section, .discount-badge
- .purchase-section, .quantity-control
- .tabs, .tab-button, .tab-pane
- .review-item, .faq-item
- Responsive adjustments

#### `cart.css` (4.9 KB)
**Shopping Cart Page Styles**
- Cart container grid layout
- Cart items list dengan remove button
- Item quantity control
- Cart summary card (sticky)
- Coupon input section
- Checkout button
- Trust badges
- Empty state

**Komponen:**
- .cart-container, .cart-items, .cart-summary
- .cart-item, .item-image, .item-details
- .quantity-control, .qty-btn-small
- .summary-card, .summary-line, .summary-total
- .coupon-section, .btn-apply
- .btn-checkout
- Status messages

---

### 🔧 JavaScript Files (`assets/js/`)

#### `product-service.js` (4.8 KB)
**Product Data & Business Logic**
- Class: `ProductService`
- Methods:
  - `initializeProducts()` - Initialize 12 sample books
  - `getAllProducts()` - Get all products
  - `getProductById(id)` - Get single product
  - `filterProducts(filters)` - Apply filters
  - `sortProducts(products, sortType)` - Sort products
  - `searchProducts(query)` - Search functionality
  - `getCategories()` - Get list of categories
  - `getPublishers()` - Get list of publishers
  - `getRelatedProducts(id, limit)` - Get similar products
  - `getBestSellingProducts(limit)` - Get featured products
  - `formatPrice(price)` - Format to Indonesian currency
  - `getDiscount(original, current)` - Calculate discount %
  - `getStarRating(rating)` - Generate star emoji rating

**Sample Data: 12 Books**
- Laskar Pelangi, Ayat-Ayat Cinta, Saya Ingin Mencintai Aku Sendiri
- The Innovation Stack, Filosofi Teras, Atomic Habits
- Sang Pemimpi, Juara Kelas, Rich Dad Poor Dad
- Buku Pintar Percaya Diri, The 7 Habits, Anak-Anak Langit

#### `cart-service.js` (3.2 KB)
**Shopping Cart Logic & Management**
- Class: `CartService`
- Methods:
  - `loadCart()` - Load from localStorage
  - `saveCart()` - Save to localStorage
  - `addItem(product, quantity)` - Add to cart
  - `removeItem(productId)` - Remove from cart
  - `updateQuantity(productId, quantity)` - Update quantity
  - `getCart()` - Get all cart items
  - `getCartCount()` - Get item count
  - `getCartTotal()` - Get total price
  - `clearCart()` - Empty cart
  - `calculateTax()` - Calculate 10% tax
  - `calculateShipping()` - Free shipping >Rp 100K
  - `getCheckoutSummary()` - Get summary
  - `applyCoupon(code)` - Validate coupon
  - `formatPrice(price)` - Format currency

**Features:**
- localStorage persistence (key: 'tokobukusam_cart')
- Event listeners for cart changes
- Tax calculation (10%)
- Free shipping logic
- Coupon support (PROMO10, PROMO20, GRATIS)

#### `app.js` (6.1 KB)
**Main Application Logic**
- Class: `App`
- Constructor: Initialize filters, sort, pagination
- Methods:
  - `init()` - Initialize app
  - `setupEventListeners()` - Add all event handlers
  - `handleSearch()` - Search products
  - `applyPriceFilter()` - Apply price filter
  - `applyPublisherFilter()` - Apply publisher filter
  - `applyRatingFilter()` - Apply rating filter
  - `renderProducts()` - Render product grid
  - `createProductCard(product)` - Create card element
  - `renderPagination(totalPages)` - Paginate results
  - `showProductDetail(productId)` - Open modal
  - `closeModal()` - Close modal
  - `addToCart(productId, quantity)` - Add to cart
  - `showCart()` - Show cart summary
  - `updateCartCount()` - Update badge
  - `showNotification(message, type)` - Show toast

**Features:**
- Pagination (12 items per page)
- Multi-filter support
- Real-time filtering
- Quick view modal
- Add to cart with quantity
- Cart count display
- Notifications

#### `product-detail.js` (4.5 KB)
**Product Detail Page Logic**
- Class: `ProductDetailPage`
- Methods:
  - `getProductIdFromURL()` - Get ID from query string
  - `init()` - Initialize page
  - `renderProductDetails()` - Display product info
  - `setupEventListeners()` - Setup interactions
  - `switchTab(tabName)` - Tab switching
  - `loadRelatedProducts()` - Load similar items
  - `generateReviews()` - Create review list
  - `applyPriceFilter()` - Price filter
  - `updateCartCount()` - Update cart badge
  - `showNotification()` - Show toast

**Page Features:**
- Product details from service
- Quantity selector
- Add to cart
- Tab interface (Deskripsi, Detail, Ulasan, FAQ)
- Related products carousel
- Sample reviews (4 items)
- Rating distribution
- Responsive layout

#### `cart.js` (3.8 KB)
**Shopping Cart Page Logic**
- Class: `CartPage`
- Methods:
  - `init()` - Initialize cart page
  - `renderCart()` - Display all items
  - `createCartItem(item)` - Create item element
  - `updateSummary()` - Update totals
  - `setupEventListeners()` - Setup interactions
  - `increaseQuantity(id)` - Inc item qty
  - `decreaseQuantity(id)` - Dec item qty
  - `removeItem(id, title)` - Remove item
  - `applyCoupon()` - Apply promo code
  - `checkout()` - Proceed to payment
  - `showNotification()` - Show feedback

**Features:**
- Display all cart items
- Quantity controls
- Item removal
- Real-time total calculation
- Coupon application
- Order summary
- Free shipping logic
- Empty state

---

### 📄 HTML Pages

#### `pages/product-detail.html` (6.2 KB)
**Product Detail Page**
- Single product information display
- Image section dengan badge
- Product details (rating, price, stock)
- Quantity selector
- Add to cart & wishlist buttons
- Tabbed interface:
  - Deskripsi (Description)
  - Detail Produk (Specs)
  - Ulasan Pembeli (Reviews)
  - Pertanyaan (FAQ)
- Related products section
- Breadcrumb navigation

**Key Elements:**
- `#productImageLarge` - Big product image
- `#productTitle`, `#productAuthor` - Title & author
- `#productStars`, `#productRating` - Rating display
- `#productPrice`, `#discountBadge` - Price section
- `#quantityInput` - Quantity selector
- `.tabs`, `.tab-pane` - Tab interface
- `.review-item` - Review listing
- Related products grid

#### `pages/cart.html` (4.1 KB)
**Shopping Cart Page**
- Empty state with call-to-action
- Cart items list:
  - Product image
  - Title & author
  - Price per item
  - Quantity controls
  - Subtotal
  - Delete button
- Cart summary section:
  - Subtotal
  - Tax (10%)
  - Shipping cost/Free
  - Total price
  - Coupon input
  - Checkout button
- Trust badges

**Key Elements:**
- `#cartItemsContainer` - Items list
- `.cart-item` - Item component
- `.quantity-control` - Qty selector
- `.cart-summary` - Summary card
- Coupon section
- Checkout button

---

## 📊 Statistics

### Total Files: 16
- HTML Files: 3 (index.html, product-detail.html, cart.html)
- CSS Files: 5 (styles.css + 4 specialized)
- JavaScript Files: 5 (services + page logic)
- Documentation: 4 (README, QUICKSTART, API_DOCS, package.json)
- Scripts: 2 (setup.sh, setup.bat)

### Total Lines of Code: ~2,500+
- HTML: ~500 lines
- CSS: ~1,200 lines
- JavaScript: ~800 lines

### Features Implemented: 15+
1. ✅ Product Catalog/Grid
2. ✅ Search Functionality
3. ✅ Category Filter
4. ✅ Price Range Filter
5. ✅ Publisher Filter
6. ✅ Rating Filter
7. ✅ Sort/Ordering
8. ✅ Pagination
9. ✅ Product Quick View
10. ✅ Product Detail Pages
11. ✅ Rating & Reviews Display
12. ✅ Shopping Cart
13. ✅ Cart Item Management
14. ✅ Order Summary
15. ✅ Coupon System

---

## 🗂️ File Organization Best Practices

### CSS Organization
- **styles.css**: Global styles & variables
- **Specialized CSS**: One file per page/component
- All styles use CSS variables for theming
- Mobile-first responsive design

### JavaScript Organization
- **Services**: Business logic (ProductService, CartService)
- **Page-specific**: Logic for each page (app.js, product-detail.js, cart.js)
- Modular class-based architecture
- Event listeners centralized

### HTML Organization
- Semantic HTML5 structure
- Data attributes for JavaScript hooks
- Accessibility considerations
- Responsive meta viewport

---

## 🔄 Component Relationships

```
index.html (App)
├── product-service.js (data + methods)
├── cart-service.js (cart logic)
├── app.js (UI interaction)
└── assets/css/product-catalog.css

pages/product-detail.html (ProductDetailPage)
├── product-service.js (get product data)
├── cart-service.js (add to cart)
├── product-detail.js (page logic)
└── assets/css/product-detail.css

pages/cart.html (CartPage)
├── cart-service.js (cart data & methods)
├── product-service.js (format data)
├── cart.js (page logic)
└── assets/css/cart.css
```

---

## 📱 Responsive Breakpoints

```
Desktop:  ≥ 1200px (full layout)
Tablet:   768px - 1199px (2-column grid)
Mobile:   ≤ 767px (1-column grid)
Small:    ≤ 480px (optimized mobile)
```

---

## 🎨 Asset Colors Used

```
Primary:    #2c3e50 (Dark Navy)
Secondary:  #3498db (Sky Blue)
Accent:     #e74c3c (Coral Red)
Success:    #27ae60 (Green)
Light:      #ecf0f1 (Light Gray)
Border:     #bdc3c7 (Medium Gray)
Text:       #7f8c8d (Dim Gray)
```

---

## 📊 Sample Data Size

- **Products**: 12 books
- **Categories**: 6 types
- **Publishers**: 4 publishers
- **Price Range**: Rp 75.000 - Rp 185.000
- **Ratings**: 4.5 - 4.9 stars
- **Reviews**: 123 - 1,203 per product

---

## 🔐 Data Storage

### localStorage Keys
- `tokobukusam_cart` - Shopping cart data

### Session Storage
- None currently used

### Cookies
- None currently used

---

## 🚀 Performance Metrics

- Lightweight: No external dependencies
- Fast Loading: Pure vanilla JavaScript
- Responsive: Mobile-optimized
- Accessible: Semantic HTML
- Maintainable: Well-organized structure

---

**Total Project Size**: ~45 KB (uncompressed HTML/CSS/JS)
**Created**: February 2024
**Last Updated**: February 22, 2024

---
