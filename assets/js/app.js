/**
 * Main Application
 * Handles UI rendering and event management
 */

class App {
    constructor() {
        this.currentFilters = {
            category: [],
            minPrice: 0,
            maxPrice: 500000,
            publishers: [],
            minRating: 0,
            search: ''
        };
        this.currentSort = 'terbaru';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartCount();
        
        // Subscribe to cart changes
        cartService.addListener(() => this.updateCartCount());
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Search
        document.getElementById('searchInput').addEventListener('change', () => this.handleSearch());
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value ? [e.target.value] : [];
            this.currentPage = 1;
            this.renderProducts();
        });

        // Sort
        document.getElementById('sortFilter').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderProducts();
        });

        // Price range slider
        document.getElementById('priceRange').addEventListener('input', (e) => {
            const price = parseInt(e.target.value);
            this.currentFilters.maxPrice = price;
            document.getElementById('priceDisplay').textContent = `Harga: Rp0 - Rp${this.formatPrice(price)}`;
            this.renderProducts();
        });

        // Sidebar filters - Price
        document.getElementById('applyPriceFilter').addEventListener('click', () => this.applyPriceFilter());

        // Sidebar filters - Publishers
        document.querySelectorAll('.publisher-check').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyPublisherFilter());
        });

        // Sidebar filters - Rating
        document.querySelectorAll('.rating-check').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyRatingFilter());
        });

        // Cart button
        document.getElementById('cartBtn').addEventListener('click', () => this.showCart());

        // Modal close
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('productModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('productModal')) {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    /**
     * Handle search
     */
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.trim();
        this.currentFilters.search = searchTerm;
        this.currentPage = 1;
        this.renderProducts();
    }

    /**
     * Apply price filter from sidebar
     */
    applyPriceFilter() {
        const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseInt(document.getElementById('maxPrice').value) || 500000;

        this.currentFilters.minPrice = minPrice;
        this.currentFilters.maxPrice = maxPrice;
        this.currentPage = 1;
        this.renderProducts();
    }

    /**
     * Apply publisher filter
     */
    applyPublisherFilter() {
        const publishers = [];
        document.querySelectorAll('.publisher-check:checked').forEach(checkbox => {
            publishers.push(checkbox.value);
        });
        this.currentFilters.publishers = publishers;
        this.currentPage = 1;
        this.renderProducts();
    }

    /**
     * Apply rating filter
     */
    applyRatingFilter() {
        const ratingValues = [];
        document.querySelectorAll('.rating-check:checked').forEach(checkbox => {
            ratingValues.push(parseInt(checkbox.value));
        });

        if (ratingValues.length > 0) {
            this.currentFilters.minRating = Math.min(...ratingValues);
        } else {
            this.currentFilters.minRating = 0;
        }
        this.currentPage = 1;
        this.renderProducts();
    }

    /**
     * Render products
     */
    renderProducts() {
        const filteredProducts = productService.filterProducts(this.currentFilters);
        const sortedProducts = productService.sortProducts(filteredProducts, this.currentSort);

        // Update result count
        document.getElementById('resultCount').textContent = `Ditemukan ${sortedProducts.length} produk`;

        // Render grid
        const gridContainer = document.getElementById('productGrid');
        gridContainer.innerHTML = '';

        if (sortedProducts.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <h3>Produk tidak ditemukan</h3>
                    <p>Coba ubah filter atau cari dengan kata kunci lain</p>
                </div>
            `;
            return;
        }

        // Pagination
        const totalPages = Math.ceil(sortedProducts.length / this.itemsPerPage);
        const startIdx = (this.currentPage - 1) * this.itemsPerPage;
        const endIdx = startIdx + this.itemsPerPage;
        const productsToShow = sortedProducts.slice(startIdx, endIdx);

        // Render product cards
        productsToShow.forEach(product => {
            const card = this.createProductCard(product);
            gridContainer.appendChild(card);
        });

        // Add pagination
        if (totalPages > 1) {
            this.renderPagination(totalPages, sortedProducts.length);
        }
    }

    /**
     * Create product card element
     */
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const discount = product.originalPrice ? productService.getDiscount(product.originalPrice, product.price) : 0;
        const discountBadge = discount > 0 ? `<span class="product-badge discount">-${discount}%</span>` : '';
        const newBadge = product.badges.includes('new') ? '<span class="product-badge new">BARU</span>' : '';

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" class="book-cover" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22225%22%3E%3Crect fill=%22%23ccc%22 width=%22150%22 height=%22225%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2214%22%3E📚 No Image%3C/text%3E%3C/svg%3E'">
                ${newBadge}
                ${discountBadge}
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.title}</h4>
                <p class="product-author">${product.author}</p>
                <div class="product-rating">
                    <span class="star-rating">${productService.getStarRating(product.rating)}</span>
                    <span>(${product.reviews})</span>
                </div>
                <div style="display: flex; align-items: baseline; gap: 8px;">
                    <span class="product-price">${productService.formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="product-price original">${productService.formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="app.addToCart(${product.id})">+ Keranjang</button>
                    <button class="btn-quick-view" onclick="app.showProductDetail(${product.id})" title="Preview">👁️</button>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Render pagination
     */
    renderPagination(totalPages, totalItems) {
        const gridContainer = document.getElementById('productGrid');
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'pagination';
        paginationDiv.style.gridColumn = '1 / -1';

        // Previous button
        if (this.currentPage > 1) {
            const prevBtn = document.createElement('a');
            prevBtn.textContent = '← Sebelumnya';
            prevBtn.onclick = () => {
                this.currentPage--;
                this.renderProducts();
                window.scrollTo(0, 300);
            };
            paginationDiv.appendChild(prevBtn);
        }

        // Page numbers
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        if (startPage > 1) {
            const firstPage = document.createElement('a');
            firstPage.textContent = '1';
            firstPage.onclick = () => {
                this.currentPage = 1;
                this.renderProducts();
                window.scrollTo(0, 300);
            };
            paginationDiv.appendChild(firstPage);

            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                paginationDiv.appendChild(dots);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('a');
            pageBtn.textContent = i;
            if (i === this.currentPage) {
                pageBtn.className = 'active';
                pageBtn.style.cursor = 'default';
            } else {
                pageBtn.onclick = () => {
                    this.currentPage = i;
                    this.renderProducts();
                    window.scrollTo(0, 300);
                };
            }
            paginationDiv.appendChild(pageBtn);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                paginationDiv.appendChild(dots);
            }

            const lastPage = document.createElement('a');
            lastPage.textContent = totalPages;
            lastPage.onclick = () => {
                this.currentPage = totalPages;
                this.renderProducts();
                window.scrollTo(0, 300);
            };
            paginationDiv.appendChild(lastPage);
        }

        // Next button
        if (this.currentPage < totalPages) {
            const nextBtn = document.createElement('a');
            nextBtn.textContent = 'Selanjutnya →';
            nextBtn.onclick = () => {
                this.currentPage++;
                this.renderProducts();
                window.scrollTo(0, 300);
            };
            paginationDiv.appendChild(nextBtn);
        }

        gridContainer.parentElement.appendChild(paginationDiv);
    }

    /**
     * Show product detail in modal
     */
    showProductDetail(productId) {
        const product = productService.getProductById(productId);
        if (!product) return;

        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.title;
        document.getElementById('modalImage').onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22300%22%3E%3Crect fill=%22%23ccc%22 width=%22200%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2216%22%3E📚%3C/text%3E%3C/svg%3E';
        };
        document.getElementById('modalTitle').textContent = product.title;
        document.getElementById('modalAuthor').textContent = `Penulis: ${product.author}`;
        document.getElementById('modalRating').innerHTML = `
            <span class="star-rating">${productService.getStarRating(product.rating)}</span>
            <span>${product.rating}/5</span>
        `;
        document.getElementById('modalReviewCount').textContent = `${product.reviews} ulasan`;
        document.getElementById('modalPrice').textContent = productService.formatPrice(product.price);
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalPublisher').textContent = product.publisher;
        document.getElementById('modalYear').textContent = product.year;
        document.getElementById('modalPages').textContent = product.pages + ' halaman';
        document.getElementById('modalStock').textContent = product.stock > 0 ? `${product.stock} tersedia` : 'Habis terjual';
        document.getElementById('modalQuantity').value = 1;
        document.getElementById('modalQuantity').max = product.stock;

        document.getElementById('modalAddCart').onclick = () => this.addCartFromModal(product.id);
        document.getElementById('modalViewDetail').href = `pages/product-detail.html?id=${product.id}`;

        document.getElementById('productModal').classList.add('active');
    }

    /**
     * Close modal
     */
    closeModal() {
        document.getElementById('productModal').classList.remove('active');
    }

    /**
     * Add to cart from modal
     */
    addCartFromModal(productId) {
        const quantity = parseInt(document.getElementById('modalQuantity').value);
        this.addToCart(productId, quantity);
    }

    /**
     * Add product to cart
     */
    addToCart(productId, quantity = 1) {
        const product = productService.getProductById(productId);
        if (product && product.stock > 0) {
            cartService.addItem(product, quantity);
            this.showNotification(`${product.title} ditambahkan ke keranjang!`, 'success');
            this.closeModal();
        } else {
            this.showNotification('Produk tidak tersedia', 'error');
        }
    }

    /**
     * Show cart
     */
    showCart() {
        const cart = cartService.getCart();
        if (cart.length === 0) {
            this.showNotification('Keranjang belanja Anda kosong', 'info');
            return;
        }

        // For now, we'll show a simple alert with cart summary
        const summary = cartService.getCheckoutSummary();
        const cartDetail = cart.map(item => `${item.title} x${item.quantity}`).join('\n');

        const message = `Keranjang Anda (${summary.quantity} item):\n\n${cartDetail}\n\n` +
            `Subtotal: ${cartService.formatPrice(summary.subtotal)}\n` +
            `Pajak (10%): ${cartService.formatPrice(summary.tax)}\n` +
            `Ongkir: ${summary.shipping === 0 ? 'GRATIS' : cartService.formatPrice(summary.shipping)}\n` +
            `Total: ${cartService.formatPrice(summary.total)}`;

        alert(message);

        // You can also create a dedicated cart page later
        // window.location.href = 'pages/cart.html';
    }

    /**
     * Update cart count display
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
        const notifications = document.getElementById('notifications') || this.createNotificationContainer();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
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

        notifications.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Create notification container
     */
    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notifications';
        container.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            z-index: 2000;
        `;
        document.body.appendChild(container);

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        return container;
    }

    /**
     * Format price (utility)
     */
    formatPrice(price) {
        return new Intl.NumberFormat('id-ID').format(price);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new App();
    });
} else {
    window.app = new App();
}
