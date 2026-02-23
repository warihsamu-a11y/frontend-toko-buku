# Frontend API & Integration Guide

## 📚 API Endpoints (Ready for Backend Integration)

Dokumentasi untuk mengintegrasikan frontend dengan backend API.

---

## 1. GET Products

### Endpoint
```
GET /api/products
GET /api/products?page=1&limit=12
GET /api/products?category=fiksi
GET /api/products?search=laskar
GET /api/products?minPrice=50000&maxPrice=150000
GET /api/products?sort=price_asc
```

### Response Format
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Laskar Pelangi",
      "author": "Andrea Hirata",
      "category": "fiksi",
      "price": 85000,
      "originalPrice": 100000,
      "image": "https://...",
      "description": "...",
      "publisher": "Gramedia",
      "year": 2005,
      "pages": 529,
      "stock": 15,
      "rating": 4.8,
      "reviews": 245,
      "isbn": "978-979-22-0439-7",
      "badges": ["new"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 150,
    "pages": 13
  }
}
```

---

## 2. GET Product Detail

### Endpoint
```
GET /api/products/:id
```

### Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "category": "fiksi",
    "price": 85000,
    "originalPrice": 100000,
    "image": "https://...",
    "description": "Novel tentang perjalanan...",
    "publisher": "Gramedia",
    "year": 2005,
    "pages": 529,
    "stock": 15,
    "rating": 4.8,
    "reviews": 245,
    "isbn": "978-979-22-0439-7",
    "badges": ["new"],
    "relatedProducts": [ /* Array of related products */ ]
  }
}
```

---

## 3. GET Search Products

### Endpoint
```
GET /api/products/search
POST /api/products/search
```

### Request
```json
{
  "query": "laskar",
  "category": "fiksi",
  "minPrice": 50000,
  "maxPrice": 150000,
  "publishers": ["gramedia", "mizan"],
  "minRating": 4.0,
  "sort": "rating",
  "page": 1,
  "limit": 12
}
```

### Response
```json
{
  "success": true,
  "data": [ /* Array of products */ ],
  "totalResults": 45
}
```

---

## 4. GET Categories

### Endpoint
```
GET /api/categories
```

### Response
```json
{
  "success": true,
  "data": [
    "fiksi",
    "nonfiksi",
    "pendidikan",
    "anak-anak",
    "biografi"
  ]
}
```

---

## 5. GET Publishers

### Endpoint
```
GET /api/publishers
```

### Response
```json
{
  "success": true,
  "data": [
    "gramedia",
    "erlangga",
    "mizan",
    "kompas"
  ]
}
```

---

## 6. POST Add to Cart

### Endpoint
```
POST /api/cart/add
```

### Request
```json
{
  "productId": 1,
  "quantity": 2,
  "userId": "user123" // Optional
}
```

### Response
```json
{
  "success": true,
  "message": "Produk ditambahkan ke keranjang",
  "cart": {
    "id": "cart_123",
    "items": [ /* Array of cart items */ ],
    "total": 250000,
    "tax": 25000,
    "shipping": 0,
    "grandTotal": 275000
  }
}
```

---

## 7. GET Cart

### Endpoint
```
GET /api/cart
GET /api/cart/:cartId
```

### Response
```json
{
  "success": true,
  "data": {
    "id": "cart_123",
    "items": [
      {
        "id": 1,
        "title": "Laskar Pelangi",
        "price": 85000,
        "quantity": 2,
        "subtotal": 170000
      }
    ],
    "summary": {
      "subtotal": 250000,
      "tax": 25000,
      "shipping": 0,
      "grandTotal": 275000
    }
  }
}
```

---

## 8. PUT Update Cart Item

### Endpoint
```
PUT /api/cart/items/:itemId
```

### Request
```json
{
  "quantity": 3
}
```

### Response
```json
{
  "success": true,
  "data": { /* Updated cart data */ }
}
```

---

## 9. DELETE Remove Cart Item

### Endpoint
```
DELETE /api/cart/items/:itemId
```

### Response
```json
{
  "success": true,
  "message": "Produk dihapus dari keranjang"
}
```

---

## 10. POST Apply Coupon

### Endpoint
```
POST /api/coupons/validate
POST /api/cart/coupon
```

### Request
```json
{
  "code": "PROMO10",
  "cartId": "cart_123"
}
```

### Response
```json
{
  "success": true,
  "coupon": {
    "code": "PROMO10",
    "description": "Diskon 10%",
    "discount": 25000,
    "discountType": "percentage", // atau "fixed"
    "discountValue": 10
  },
  "newTotal": 250000
}
```

---

## 11. POST Create Order

### Endpoint
```
POST /api/orders
```

### Request
```json
{
  "cartId": "cart_123",
  "customerId": "cust_123",
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "081234567890",
    "address": "Jl. Merdeka No. 1",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "postalCode": "12345"
  },
  "shippingMethod": "regular",
  "paymentMethod": "transfer"
}
```

### Response
```json
{
  "success": true,
  "order": {
    "id": "ORD-2024-001",
    "items": [ /* Array of ordered items */ ],
    "total": 275000,
    "status": "pending_payment",
    "createdAt": "2024-02-22T10:30:00Z"
  },
  "paymentUrl": "https://..."
}
```

---

## 12. GET Order History

### Endpoint
```
GET /api/orders
GET /api/orders/:orderId
```

### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "ORD-2024-001",
      "items": [ /* Array of items */ ],
      "total": 275000,
      "status": "completed",
      "createdAt": "2024-02-22T10:30:00Z",
      "updatedAt": "2024-02-22T15:45:00Z"
    }
  ]
}
```

---

## 13. GET Reviews/Ratings

### Endpoint
```
GET /api/products/:productId/reviews
GET /api/reviews?productId=1
```

### Response
```json
{
  "success": true,
  "data": {
    "averageRating": 4.8,
    "totalReviews": 245,
    "ratingDistribution": {
      "5": 147,
      "4": 61,
      "3": 24,
      "2": 7,
      "1": 6
    },
    "reviews": [
      {
        "id": "rev_001",
        "rating": 5,
        "title": "Sangat bagus!",
        "text": "Buku ini luar biasa...",
        "author": "Budi S.",
        "verified": true,
        "helpful": 45,
        "unhelpful": 2,
        "date": "2024-02-10"
      }
    ]
  }
}
```

---

## 14. POST Create Review

### Endpoint
```
POST /api/products/:productId/reviews
```

### Request
```json
{
  "rating": 5,
  "title": "Sangat Direkomendasikan",
  "text": "Buku ini adalah masterpiece...",
  "verifiedPurchase": true
}
```

### Response
```json
{
  "success": true,
  "review": {
    "id": "rev_002",
    "productId": 1,
    "rating": 5,
    "text": "...",
    "createdAt": "2024-02-22T10:30:00Z"
  }
}
```

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Produk tidak ditemukan",
    "details": "Product with id 999 does not exist"
  }
}
```

### Common Error Codes
```
400 - BAD_REQUEST: Invalid request parameters
401 - UNAUTHORIZED: User not authenticated
403 - FORBIDDEN: User not authorized
404 - NOT_FOUND: Resource not found
409 - CONFLICT: Resource conflict
422 - UNPROCESSABLE_ENTITY: Data validation failed
500 - INTERNAL_SERVER_ERROR: Server error
```

---

## Authentication

### Header Requirements
```
Authorization: Bearer <token>
Content-Type: application/json
X-API-Key: <api_key> (if required)
```

### JWT Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Rate Limiting

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1708592400
```

---

## Pagination

### Query Parameters
```
?page=1          // Page number (default: 1)
?limit=12        // Items per page (default: 12, max: 100)
?offset=0        // Alternative to page-based pagination
```

### Response
```json
{
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 150,
    "pages": 13,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Sorting

### Query Parameter
```
?sort=field      // Sort ascending
?sort=-field     // Sort descending
?sort=price_asc,rating_desc
```

### Available Sort Fields
```
price, rating, date, popularity, title
```

---

## CORS Headers

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 3600
```

---

## Implementation Notes

1. **Frontend Services** sudah siap menggunakan API
   - `ProductService` untuk fetch produk
   - `CartService` untuk manage keranjang
   
2. **Modify Service untuk Connect ke API**:
   ```javascript
   // Di product-service.js
   async getAllProducts() {
     const response = await fetch('/api/products');
     return response.json();
   }
   ```

3. **Error Handling** sudah built-in
   - Try-catch blocks
   - User notifications
   
4. **Data Validation** di frontend
   - Client-side validation
   - Server-side validation recommended

---

## Testing API Endpoints

### Using cURL
```bash
# Get all products
curl -X GET "http://localhost:3000/api/products"

# Search products
curl -X GET "http://localhost:3000/api/products/search?query=laskar"

# Add to cart
curl -X POST "http://localhost:3000/api/cart/add" \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'
```

### Using Postman
1. Import collection dari `/postman/collection.json`
2. Set environment variables (base_url, token)
3. Run requests

---

## Database Schema Reference

### Products Table
```sql
id, title, author, category, price, originalPrice, 
image, description, publisher, year, pages, stock, 
rating, reviews, isbn, badges, created_at, updated_at
```

### Cart Items Table
```sql
id, cartId, productId, quantity, price, created_at, updated_at
```

### Orders Table
```sql
id, customerId, total, tax, shipping, status, 
paymentMethod, shippingAddress, created_at, updated_at
```

### Reviews Table
```sql
id, productId, userId, rating, title, text, 
verified, helpful, created_at, updated_at
```

---

## Version History

- **v1.0** (Feb 2024) - Initial release with basic endpoints
- **v1.1** (Planned) - Add pagination, filtering
- **v2.0** (Planned) - Add authentication, user accounts

---

**Last Updated**: February 2024
**API Version**: 1.0
