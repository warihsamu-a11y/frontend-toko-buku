/**
 * Product Detail Page Script
 */

class ProductDetailPage {
    constructor() {
        this.productId = this.getProductIdFromURL();
        this.product = productService.getProductById(this.productId);
        this.init();
    }

    /**
     * Get product ID from URL
     */
    getProductIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id')) || 1;
    }

    /**
     * Initialize page
     */
    init() {
        if (!this.product) {
            document.body.innerHTML = '<div style="padding: 40px; text-align: center;"><h1>Produk tidak ditemukan</h1><a href="../index.html" style="color: #3498db;">Kembali ke halaman utama</a></div>';
            return;
        }

        this.renderProductDetails();
        this.setupEventListeners();
        this.loadRelatedProducts();
        this.generateReviews();
        this.updateCartCount();

        // Subscribe to cart changes
        cartService.addListener(() => this.updateCartCount());
    }

    /**
     * Render product details
     */
    renderProductDetails() {
        // Basic Info
        document.getElementById('productTitle').textContent = this.product.title;
        document.getElementById('productAuthor').textContent = `Penulis: ${this.product.author}`;
        document.getElementById('productBreadcrumb').textContent = this.product.title;
        
        // Image
        document.getElementById('productImageLarge').textContent = this.product.image;

        // Rating
        document.getElementById('productStars').textContent = productService.getStarRating(this.product.rating);
        document.getElementById('productRating').textContent = this.product.rating.toFixed(1);
        document.getElementById('productReviews').textContent = `(${this.product.reviews} ulasan)`;

        // Price
        document.getElementById('productPrice').textContent = productService.formatPrice(this.product.price);

        // Discount
        if (this.product.originalPrice) {
            document.getElementById('productOriginalPrice').textContent = productService.formatPrice(this.product.originalPrice);
            document.getElementById('productOriginalPrice').style.display = 'inline';
            
            const discount = productService.getDiscount(this.product.originalPrice, this.product.price);
            document.getElementById('discountBadge').style.display = 'flex';
            document.getElementById('discountPercent').textContent = discount;
        }

        // Stock
        if (this.product.stock > 0) {
            document.getElementById('stockStatus').textContent = 'Tersedia';
            document.getElementById('stockStatus').className = 'status-available';
            document.getElementById('stockCount').textContent = `- ${this.product.stock > 10 ? '10+' : this.product.stock} tersedia`;
            document.getElementById('quantityInput').max = this.product.stock;
        } else {
            document.getElementById('stockStatus').textContent = 'Habis terjual';
            document.getElementById('stockStatus').className = 'status-unavailable';
            document.getElementById('stockCount').textContent = '';
            document.getElementById('quantityInput').disabled = true;
            document.getElementById('addCartBtn').disabled = true;
        }

        // Specs
        document.getElementById('publisher').textContent = this.product.publisher;
        document.getElementById('year').textContent = this.product.year;
        document.getElementById('pages').textContent = this.product.pages + ' halaman';
        document.getElementById('isbn').textContent = this.product.isbn;

        // Description & Details tabs
        document.getElementById('productDescription').textContent = this.product.description;
        document.getElementById('detail-title').textContent = this.product.title;
        document.getElementById('detail-author').textContent = this.product.author;
        document.getElementById('detail-publisher').textContent = this.product.publisher;
        document.getElementById('detail-year').textContent = this.product.year;
        document.getElementById('detail-pages').textContent = this.product.pages;
        document.getElementById('detail-isbn').textContent = this.product.isbn;
        document.getElementById('detail-category').textContent = this.capitalizeFirstLetter(this.product.category);

        // Badge
        if (this.product.badges.length > 0) {
            const badgeText = this.product.badges[0] === 'new' ? 'BARU' : 'PROMO';
            const badgeColor = this.product.badges[0] === 'new' ? '#27ae60' : '#e74c3c';
            const badge = document.getElementById('imageBadge');
            badge.textContent = badgeText;
            badge.style.backgroundColor = badgeColor;
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Quantity buttons
        document.getElementById('decreaseQty').addEventListener('click', () => {
            const input = document.getElementById('quantityInput');
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });

        document.getElementById('increaseQty').addEventListener('click', () => {
            const input = document.getElementById('quantityInput');
            const max = parseInt(input.max) || 999;
            if (parseInt(input.value) < max) {
                input.value = parseInt(input.value) + 1;
            }
        });

        // Add to cart
        document.getElementById('addCartBtn').addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantityInput').value);
            cartService.addItem(this.product, quantity);
            this.showNotification(`${this.product.title} ditambahkan ke keranjang!`);
        });

        // Wishlist
        document.getElementById('wishlistBtn').addEventListener('click', () => {
            this.showNotification('Produk ditambahkan ke wishlist!', 'success');
        });

        // Tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Cart button
        document.getElementById('cartBtn').addEventListener('click', () => {
            alert('Keranjang: ' + cartService.getCartCount() + ' item\nTotal: ' + cartService.formatPrice(cartService.getCartTotal()));
        });

        // Search
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    /**
     * Switch tab
     */
    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Deactivate all buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(`tab-${tabName}`).classList.add('active');
        document.querySelector(`[data-tab=${tabName}]`).classList.add('active');
    }

    /**
     * Load related products
     */
    loadRelatedProducts() {
        const relatedProducts = productService.getRelatedProducts(this.product.id, 4);
        const grid = document.getElementById('relatedProductsGrid');
        grid.innerHTML = '';

        if (relatedProducts.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray-text);">Tidak ada produk terkait</p>';
            return;
        }

        relatedProducts.forEach(product => {
            const card = this.createProductCard(product);
            grid.appendChild(card);
        });
    }

    /**
     * Create product card for related products
     */
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card-small';
        card.style.cursor = 'pointer';
        card.onclick = () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        };

        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-author">${product.author}</div>
                <div class="product-rating">
                    <span class="star-rating">${productService.getStarRating(product.rating)}</span>
                </div>
                <div class="product-price">${productService.formatPrice(product.price)}</div>
            </div>
        `;

        return card;
    }

    /**
     * Generate sample reviews
     */
    generateReviews() {
        const reviewsList = document.getElementById('reviewsList');
        const reviewStats = document.getElementById('reviewStats');

        // Review stats
        const stats = [
            { stars: 5, count: Math.round(this.product.reviews * 0.6) },
            { stars: 4, count: Math.round(this.product.reviews * 0.25) },
            { stars: 3, count: Math.round(this.product.reviews * 0.1) },
            { stars: 2, count: Math.round(this.product.reviews * 0.03) },
            { stars: 1, count: Math.round(this.product.reviews * 0.02) }
        ];

        stats.forEach(stat => {
            const pct = Math.round((stat.count / this.product.reviews) * 100);
            reviewStats.innerHTML += `
                <div class="stat">
                    <span style="min-width: 50px;">${'⭐'.repeat(stat.stars)}</span>
                    <div class="stat-bar"><div class="stat-fill" style="width: ${pct}%"></div></div>
                    <span style="min-width: 40px; text-align: right;">${stat.count}</span>
                </div>
            `;
        });

        // Sample reviews
        const sampleReviews = [
            {
                name: 'Budi S.',
                rating: 5,
                date: '2 minggu lalu',
                text: 'Buku ini sangat bagus! Ceritanya menarik dan menginspirasi. Pengiriman cepat dan kondisi buku sempurna.'
            },
            {
                name: 'Siti N.',
                rating: 5,
                date: '1 bulan lalu',
                text: 'Recommended! Saya sudah membaca berkali-kali dan masih tidak bosan. Kualitas kertas juga sangat baik.'
            },
            {
                name: 'Ahmad R.',
                rating: 4,
                date: '2 bulan lalu',
                text: 'Buku yang mantap. Hanya sayang harga sedikit mahal. Tapi worth it untuk dibaca.'
            },
            {
                name: 'Dewi M.',
                rating: 5,
                date: '3 bulan lalu',
                text: 'Luar biasa! Cerita yang dikupas sangat detail dan menyentuh. Cocok untuk berbagai kalangan usia.'
            }
        ];

        sampleReviews.forEach(review => {
            const reviewEl = document.createElement('div');
            reviewEl.className = 'review-item';
            reviewEl.innerHTML = `
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-helpful">
                    <button style="background: none; border: none; color: var(--secondary-color); cursor: pointer;">👍 Membantu</button>
                    <button style="background: none; border: none; color: var(--gray-text); cursor: pointer; margin-left: 15px;">👎 Tidak membantu</button>
                </div>
            `;
            reviewsList.appendChild(reviewEl);
        });
    }

    /**
     * Handle search
     */
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value;
        if (searchTerm.trim()) {
            window.location.href = `../index.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }

    /**
     * Update cart count
     */
    updateCartCount() {
        const count = cartService.getCartCount();
        const cartCountElement = document.getElementById('cartCount');
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Capitalize first letter utility
     */
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProductDetailPage();
    });
} else {
    new ProductDetailPage();
}
