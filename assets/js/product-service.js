/**
 * Product Service
 * Handles all product-related data and operations
 */

class ProductService {
    constructor() {
        this.products = this.initializeProducts();
    }

    /**
     * Initialize dummy product data
     */
    initializeProducts() {
        return [
            {
                id: 1,
                title: "Laskar Pelangi",
                author: "Andrea Hirata",
                category: "fiksi",
                price: 85000,
                originalPrice: 100000,
                image: "📕",
                description: "Novel tentang perjalanan hidup 10 anak sekolah di pulau Belitung.",
                publisher: "Gramedia",
                year: 2005,
                pages: 529,
                stock: 15,
                rating: 4.8,
                reviews: 245,
                badges: ["new"],
                isbn: "978-979-22-0439-7"
            },
            {
                id: 2,
                title: "Ayat-Ayat Cinta",
                author: "Habiburrahman El Shirazy",
                category: "fiksi",
                price: 75000,
                originalPrice: null,
                image: "📗",
                description: "Kisah cinta dan iman seorang mahasiswa Al-Azhar.",
                publisher: "Gramedia",
                year: 2004,
                pages: 517,
                stock: 22,
                rating: 4.7,
                reviews: 512,
                badges: [],
                isbn: "978-979-22-0356-7"
            },
            {
                id: 3,
                title: "Saya Ingin Mencintai Aku Sendiri",
                author: "Riawan Hanafi",
                category: "nonfiksi",
                price: 99000,
                originalPrice: 149000,
                image: "💛",
                description: "Buku self-improvement yang mengajarkan cinta diri sendiri.",
                publisher: "Mizan",
                year: 2019,
                pages: 272,
                stock: 8,
                rating: 4.9,
                reviews: 389,
                badges: ["discount"],
                isbn: "978-602-239-742-9"
            },
            {
                id: 4,
                title: "The Innovation Stack",
                author: "Jim McKelvey",
                category: "bisnis",
                price: 185000,
                originalPrice: null,
                image: "📙",
                description: "Strategi inovasi untuk membangun bisnis yang berkelanjutan.",
                publisher: "Erlangga",
                year: 2020,
                pages: 256,
                stock: 5,
                rating: 4.6,
                reviews: 134,
                badges: [],
                isbn: "978-602-403-842-1"
            },
            {
                id: 5,
                title: "Filosofi Teras",
                author: "Henry Manampiring",
                category: "nonfiksi",
                price: 88000,
                originalPrice: 110000,
                image: "📕",
                description: "Penjelasan filosofi Stoikisme dalam kehidupan modern.",
                publisher: "Kompas",
                year: 2018,
                pages: 261,
                stock: 12,
                rating: 4.8,
                reviews: 567,
                badges: [],
                isbn: "978-602-444-646-4"
            },
            {
                id: 6,
                title: "Atomic Habits",
                author: "James Clear",
                category: "nonfiksi",
                price: 125000,
                originalPrice: 135000,
                image: "🟠",
                description: "Membangun kebiasaan baik melalui perubahan kecil yang konsisten.",
                publisher: "Gramedia",
                year: 2018,
                pages: 389,
                stock: 18,
                rating: 4.9,
                reviews: 892,
                badges: ["new"],
                isbn: "978-979-22-4768-8"
            },
            {
                id: 7,
                title: "Sang Pemimpi",
                author: "Andrea Hirata",
                category: "fiksi",
                price: 82000,
                originalPrice: null,
                image: "📗",
                description: "Lanjutan dari Laskar Pelangi dengan petualangan di Eropa.",
                publisher: "Gramedia",
                year: 2006,
                pages: 376,
                stock: 10,
                rating: 4.7,
                reviews: 198,
                badges: [],
                isbn: "978-979-22-1147-0"
            },
            {
                id: 8,
                title: "Juara Kelas",
                author: "Andrea Hirata",
                category: "fiksi",
                price: 85000,
                originalPrice: null,
                image: "365",
                description: "Triologi Belitung yang menampilkan kehidupan di kota Jakarta.",
                publisher: "Gramedia",
                year: 2007,
                pages: 297,
                stock: 7,
                rating: 4.6,
                reviews: 145,
                badges: [],
                isbn: "978-979-22-1439-6"
            },
            {
                id: 9,
                title: "Rich Dad Poor Dad",
                author: "Robert T. Kiyosaki",
                category: "bisnis",
                price: 125000,
                originalPrice: null,
                image: "💰",
                description: "Panduan cara berpikir kaya dan membangun kekayaan finansial.",
                publisher: "Erlangga",
                year: 2000,
                pages: 336,
                stock: 20,
                rating: 4.8,
                reviews: 1203,
                badges: [],
                isbn: "978-979-20-1919-9"
            },
            {
                id: 10,
                title: "Buku Pintar Percaya Diri",
                author: "Rhenald Kasali",
                category: "pendidikan",
                price: 95000,
                originalPrice: 120000,
                image: "📚",
                description: "Membangun kepercayaan diri sejak dini untuk menghadapi masa depan.",
                publisher: "Mizan",
                year: 2015,
                pages: 180,
                stock: 14,
                rating: 4.5,
                reviews: 289,
                badges: ["discount"],
                isbn: "978-602-239-214-0"
            },
            {
                id: 11,
                title: "The 7 Habits of Highly Effective People",
                author: "Stephen Covey",
                category: "nonfiksi",
                price: 135000,
                originalPrice: 150000,
                image: "🏆",
                description: "7 kebiasaan orang-orang yang sangat efektif dan sukses.",
                publisher: "Erlangga",
                year: 2004,
                pages: 414,
                stock: 9,
                rating: 4.9,
                reviews: 756,
                badges: [],
                isbn: "978-979-20-3294-4"
            },
            {
                id: 12,
                title: "Anak-Anak Langit",
                author: "Ahmad Fuadi",
                category: "fiksi",
                price: 92000,
                originalPrice: null,
                image: "☁️",
                description: "Cerita inspiratif tentang anak-anak dari berbagai latar belakang.",
                publisher: "Gramedia",
                year: 2016,
                pages: 312,
                stock: 11,
                rating: 4.7,
                reviews: 203,
                badges: ["new"],
                isbn: "978-979-22-3823-3"
            }
        ];
    }

    /**
     * Get all products
     */
    getAllProducts() {
        return this.products;
    }

    /**
     * Get product by ID
     */
    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    /**
     * Filter products based on criteria
     */
    filterProducts(filters = {}) {
        let filtered = [...this.products];

        // Filter by category
        if (filters.category && filters.category.length > 0) {
            filtered = filtered.filter(p => filters.category.includes(p.category));
        }

        // Filter by price range
        if (filters.minPrice !== undefined) {
            filtered = filtered.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            filtered = filtered.filter(p => p.price <= filters.maxPrice);
        }

        // Filter by publisher
        if (filters.publishers && filters.publishers.length > 0) {
            filtered = filtered.filter(p => filters.publishers.includes(p.publisher.toLowerCase()));
        }

        // Filter by rating
        if (filters.minRating !== undefined) {
            filtered = filtered.filter(p => p.rating >= filters.minRating);
        }

        // Search by text
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchTerm) ||
                p.author.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.publisher.toLowerCase().includes(searchTerm)
            );
        }

        return filtered;
    }

    /**
     * Sort products
     */
    sortProducts(products, sortType) {
        const result = [...products];

        switch (sortType) {
            case 'harga-rendah':
                return result.sort((a, b) => a.price - b.price);
            case 'harga-tinggi':
                return result.sort((a, b) => b.price - a.price);
            case 'rating':
                return result.sort((a, b) => b.rating - a.rating);
            case 'terbaru':
            default:
                return result.sort((a, b) => b.year - a.year);
        }
    }

    /**
     * Search products
     */
    searchProducts(query) {
        if (!query || query.trim() === '') {
            return this.products;
        }

        return this.filterProducts({ search: query });
    }

    /**
     * Get categories
     */
    getCategories() {
        const categories = new Set(this.products.map(p => p.category));
        return Array.from(categories);
    }

    /**
     * Get publishers
     */
    getPublishers() {
        const publishers = new Set(this.products.map(p => p.publisher));
        return Array.from(publishers);
    }

    /**
     * Get related products
     */
    getRelatedProducts(productId, limit = 4) {
        const product = this.getProductById(productId);
        if (!product) return [];

        return this.products
            .filter(p => p.id !== productId && p.category === product.category)
            .slice(0, limit);
    }

    /**
     * Get best-selling products
     */
    getBestSellingProducts(limit = 8) {
        return this.products.slice(0, limit);
    }

    /**
     * Get featured products
     */
    getFeaturedProducts(limit = 8) {
        return this.products
            .filter(p => p.badges.length > 0 || p.rating >= 4.7)
            .slice(0, limit);
    }

    /**
     * Format price in Rupiah
     */
    formatPrice(price) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    }

    /**
     * Get discount percentage
     */
    getDiscount(originalPrice, currentPrice) {
        if (!originalPrice) return 0;
        return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    }

    /**
     * Get star rating HTML
     */
    getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '⭐'.repeat(fullStars);
        if (hasHalfStar) stars += '✨';
        return stars;
    }
}

// Create global instance
const productService = new ProductService();
