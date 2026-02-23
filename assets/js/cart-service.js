/**
 * Cart Service
 * Handles shopping cart operations and local storage
 */

class CartService {
    constructor() {
        this.storageKey = 'tokobukusam_cart';
        this.cart = this.loadCart();
    }

    /**
     * Load cart from localStorage
     */
    loadCart() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Save cart to localStorage
     */
    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
        this.notifyListeners();
    }

    /**
     * Add item to cart
     */
    addItem(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                author: product.author,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        return true;
    }

    /**
     * Remove item from cart
     */
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    /**
     * Update item quantity
     */
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    /**
     * Get all cart items
     */
    getCart() {
        return this.cart;
    }

    /**
     * Get cart count
     */
    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Get cart total price
     */
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    /**
     * Clear cart
     */
    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    /**
     * Check if product is in cart
     */
    isInCart(productId) {
        return this.cart.some(item => item.id === productId);
    }

    /**
     * Get item from cart
     */
    getItem(productId) {
        return this.cart.find(item => item.id === productId);
    }

    /**
     * Calculate tax (10% PPN)
     */
    calculateTax() {
        return Math.round(this.getCartTotal() * 0.1);
    }

    /**
     * Calculate shipping (free for order > 100k)
     */
    calculateShipping() {
        const total = this.getCartTotal();
        return total > 100000 ? 0 : 25000;
    }

    /**
     * Get checkout summary
     */
    getCheckoutSummary() {
        const subtotal = this.getCartTotal();
        const tax = this.calculateTax();
        const shipping = this.calculateShipping();
        const total = subtotal + tax + shipping;

        return {
            subtotal,
            tax,
            shipping,
            total,
            items: this.cart.length,
            quantity: this.getCartCount()
        };
    }

    /**
     * Listeners for cart changes
     */
    listeners = [];

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this));
    }

    /**
     * Apply coupon (stub)
     */
    applyCoupon(code) {
        const coupons = {
            'PROMO10': { discount: 0.1, description: 'Diskon 10%' },
            'PROMO20': { discount: 0.2, description: 'Diskon 20%' },
            'GRATIS': { discount: 1, description: 'Gratis Ongkir' }
        };

        return coupons[code] || null;
    }

    /**
     * Format price
     */
    formatPrice(price) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    }

    /**
     * Export cart data
     */
    exportCartData() {
        return {
            items: this.cart,
            summary: this.getCheckoutSummary(),
            exportDate: new Date().toISOString()
        };
    }

    /**
     * Import cart data
     */
    importCartData(data) {
        if (data && data.items && Array.isArray(data.items)) {
            this.cart = data.items;
            this.saveCart();
            return true;
        }
        return false;
    }
}

// Create global instance
const cartService = new CartService();
