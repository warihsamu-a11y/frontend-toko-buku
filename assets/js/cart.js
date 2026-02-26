/**
 * Shopping Cart Page
 */

class CartPage {
    constructor() {
        this.cart = cartService.getCart();
        this.init();
    }

    /**
     * Initialize page
     */
    init() {
        this.renderCart();
        this.setupEventListeners();
        this.updateSummary();

        // Subscribe to cart changes
        cartService.addListener(() => {
            this.cart = cartService.getCart();
            this.renderCart();
            this.updateSummary();
        });
    }

    /**
     * Render cart items
     */
    renderCart() {
        const container = document.getElementById('cartItemsContainer');
        container.innerHTML = '';

        if (this.cart.length === 0) {
            container.parentElement.style.display = 'none';
            document.querySelector('.empty-state-modal').classList.add('show');
            document.querySelector('.cart-summary').style.display = 'none';
            return;
        }

        container.parentElement.style.display = 'block';
        document.querySelector('.empty-state-modal').classList.remove('show');
        document.querySelector('.cart-summary').style.display = 'flex';

        this.cart.forEach(item => {
            const cartItem = this.createCartItem(item);
            container.appendChild(cartItem);
        });
    }

    /**
     * Create cart item element
     */
    createCartItem(item) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.id = `cart-item-${item.id}`;

        const itemTotal = item.price * item.quantity;

        div.innerHTML = `
            <div class="item-image"><img src="${item.image}" alt="${item.title}" class="cart-book-cover" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%22120%22%3E%3Crect fill=%22%23ccc%22 width=%2280%22 height=%22120%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22 font-size=%2210%22%3E📚%3C/text%3E%3C/svg%3E'"></div>
            <div class="item-details">
                <div class="item-title">${item.title}</div>
                <div class="item-author">Penulis: ${item.author}</div>
                <div class="item-price">${cartService.formatPrice(item.price)}</div>
            </div>
            <div class="item-controls">
                <div class="quantity-control">
                    <button class="qty-btn-small" onclick="cartPage.decreaseQuantity(${item.id})">−</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button class="qty-btn-small" onclick="cartPage.increaseQuantity(${item.id})">+</button>
                </div>
                <div class="item-subtotal">${cartService.formatPrice(itemTotal)}</div>
                <button class="item-delete" onclick="cartPage.removeItem(${item.id}, '${item.title}')">Hapus</button>
            </div>
        `;

        return div;
    }

    /**
     * Update summary
     */
    updateSummary() {
        const summary = cartService.getCheckoutSummary();

        document.getElementById('subtotalAmount').textContent = cartService.formatPrice(summary.subtotal);
        document.getElementById('taxAmount').textContent = cartService.formatPrice(summary.tax);
        document.getElementById('shippingAmount').textContent = summary.shipping === 0 ? 'GRATIS' : cartService.formatPrice(summary.shipping);
        document.getElementById('totalAmount').textContent = cartService.formatPrice(summary.total);

        // Update shipping note
        if (summary.subtotal >= 100000) {
            document.getElementById('shippingNote').textContent = '✓ Gratis ongkir (pembelian >Rp 100.000)';
            document.getElementById('shippingNote').style.backgroundColor = '#d4edda';
            document.getElementById('shippingNote').style.borderLeftColor = '#28a745';
        } else {
            const remaining = 100000 - summary.subtotal;
            document.getElementById('shippingNote').textContent = `Tambah Rp ${cartService.formatPrice(remaining)} untuk gratis ongkir`;
            document.getElementById('shippingNote').style.backgroundColor = '#fff3cd';
            document.getElementById('shippingNote').style.borderLeftColor = '#ffc107';
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        document.getElementById('applyCoupon').addEventListener('click', () => this.applyCoupon());
        document.getElementById('checkoutBtn').addEventListener('click', () => this.checkout());

        // Apply coupon on Enter
        document.getElementById('couponCode').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.applyCoupon();
            }
        });
    }

    /**
     * Increase quantity
     */
    increaseQuantity(productId) {
        const item = cartService.getItem(productId);
        if (item) {
            cartService.updateQuantity(productId, item.quantity + 1);
        }
    }

    /**
     * Decrease quantity
     */
    decreaseQuantity(productId) {
        const item = cartService.getItem(productId);
        if (item && item.quantity > 1) {
            cartService.updateQuantity(productId, item.quantity - 1);
        }
    }

    /**
     * Remove item from cart
     */
    removeItem(productId, title) {
        if (confirm(`Hapus "${title}" dari keranjang?`)) {
            const itemElement = document.getElementById(`cart-item-${productId}`);
            itemElement.classList.add('removing');

            setTimeout(() => {
                cartService.removeItem(productId);
                this.showNotification(`${title} dihapus dari keranjang`, 'info');
            }, 300);
        }
    }

    /**
     * Apply coupon
     */
    applyCoupon() {
        const code = document.getElementById('couponCode').value.trim().toUpperCase();

        if (!code) {
            this.showNotification('Masukkan kode kupon', 'error');
            return;
        }

        const coupon = cartService.applyCoupon(code);

        if (!coupon) {
            this.showNotification('Kode kupon tidak valid', 'error');
            document.getElementById('couponCode').value = '';
            return;
        }

        this.showNotification(`Kupon "${code}" berhasil diterapkan: ${coupon.description}`, 'success');
        // In real app, apply discount logic here
    }

    /**
     * Checkout
     */
    checkout() {
        const summary = cartService.getCheckoutSummary();

        if (this.cart.length === 0) {
            this.showNotification('Keranjang belanja kosong', 'error');
            return;
        }

        const orderSummary = `
========== RINGKASAN PESANAN ==========

Total Item: ${summary.items} produk (${summary.quantity} buku)

Daftar Produk:
${this.cart.map(item => `  • ${item.title} x${item.quantity} = ${cartService.formatPrice(item.price * item.quantity)}`).join('\n')}

-----------------------------------
Subtotal:    ${cartService.formatPrice(summary.subtotal)}
Pajak (10%): ${cartService.formatPrice(summary.tax)}
Ongkir:      ${summary.shipping === 0 ? 'GRATIS' : cartService.formatPrice(summary.shipping)}
-----------------------------------
TOTAL:       ${cartService.formatPrice(summary.total)}

Terima kasih telah berbelanja di Toko Buku Sam!
        `;

        alert(orderSummary + '\n\nSilakan lanjutkan ke halaman pembayaran untuk menyelesaikan pesanan.');

        // In real app, redirect to payment page
        // window.location.href = 'checkout.html';
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `status-message status-${type}`;
        notification.textContent = message;
        notification.style.animation = 'slideInDown 0.3s ease';

        document.querySelector('.main-content .container').insertBefore(
            notification,
            document.querySelector('h1').nextSibling
        );

        setTimeout(() => {
            notification.style.animation = 'slideOutUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cartPage = new CartPage();
    });
} else {
    window.cartPage = new CartPage();
}
