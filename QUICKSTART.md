# Panduan Quick Start - Frontend Toko Buku Sam

## 🚀 Mulai Dengan Cepat

### 1. Buka Aplikasi
```
Buka file: frontend/index.html di browser Anda
```

### 2. Halaman-Halaman Utama

#### Beranda (index.html)
- **Tampil**: Katalog buku dengan grid responsive
- **Fitur**: 
  - Pencarian produk
  - Filter kategori, harga, penerbit, rating
  - Sort berdasarkan harga dan rating
  - Pagination
  - Quick view modal

#### Detail Produk (pages/product-detail.html?id=1)
- **Tampil**: Informasi lengkap satu produk
- **Fitur**:
  - Rating dan ulasan
  - Quantity selector
  - Add to cart
  - Tab: Deskripsi, Detail, Ulasan, FAQ
  - Produk terkait

#### Keranjang (pages/cart.html)
- **Tampil**: Semua item di keranjang
- **Fitur**:
  - Edit quantity
  - Hapus item
  - Kode kupon
  - Ringkasan pembayaran

---

## 🎯 Skenario Penggunaan

### Scenario 1: Cari Produk Tertentu
1. Ketik di search bar ⟶ `Laskar Pelangi`
2. Tekan Enter atau klik "Cari"
3. Hasil pencarian ditampilkan

### Scenario 2: Filter Berdasarkan Kategori
1. Pilih kategori dari dropdown "Semua Kategori" ⟶ `Fiksi`
2. Produk otomatis di-filter
3. Bisa kombinasi dengan filter lain

### Scenario 3: Filter Berdasarkan Harga
**Via Slider:**
1. Geser range slider di header
2. Harga otomatis terupdate

**Via Sidebar:**
1. Input min & max price di sidebar
2. Klik "Terapkan"
3. Filter diterapkan

### Scenario 4: Lihat Detail Produk
1. Klik kartu produk atau tombol preview (👁️)
2. Buka halaman detail produk
3. Baca deskripsi, lihat rating, baca review
4. Tambah ke keranjang

### Scenario 5: Belanja
1. Di halaman detail/katalog ⟶ klik "+ Keranjang"
2. Tentukan jumlah produk
3. Produk masuk ke keranjang
4. Notifikasi muncul "Ditambahkan ke keranjang"

### Scenario 6: Checkout
1. Klik ikon keranjang (🛒) di header
2. Buka `pages/cart.html`
3. Lihat semua item
4. Klik "Lanjut ke Pembayaran"
5. Lihat ringkasan pesanan

---

## 🔍 Fitur Detail

### Pencarian
```
Cari berdasarkan:
- Judul buku
- Nama penulis
- Nama penerbit
- Deskripsi produk
- Kategori
```

### Filter Harga
```
Range: Rp 0 - Rp 500.000
Bisa via:
- Slider di header
- Input form di sidebar
```

### Filter Kategori
```
- Semua Kategori
- Fiksi
- Non-Fiksi
- Pendidikan
- Anak-Anak
- Biografi
```

### Sort/Urutan
```
- Produk Terbaru (default)
- Harga: Rendah ke Tinggi
- Harga: Tinggi ke Rendah
- Rating Tertinggi
```

### Rating System
```
⭐⭐⭐⭐⭐ = Excellent
⭐⭐⭐⭐   = Good
⭐⭐⭐     = Average
⭐⭐      = Poor
⭐       = Very Poor
```

---

## 💾 Data yang Tersimpan

### Keranjang Belanja
- **Lokasi**: Browser localStorage
- **Key**: `tokobukusam_cart`
- **Auto Save**: Setiap kali ada perubahan
- **Persisten**: Data tetap ada sampai dihapus manual

### Format Data
```javascript
[
  {
    id: 1,
    title: "Judul Buku",
    price: 75000,
    quantity: 2,
    author: "Penulis",
    image: "📕"
  }
]
```

---

## 🎨 Warna & Icon

### Color Scheme
```
Header/Footer:  #2c3e50 (Gelap)
Primary:        #3498db (Biru)
Accent:         #e74c3c (Merah)
Success:        #27ae60 (Hijau)
Background:     #f5f7fa (Abu terang)
```

### Icons Used
```
📚 Toko
📕 Buku merah
📗 Buku hijau
📙 Buku coklat
🛒 Keranjang
⭐ Rating
🔍 Search
❤️ Wishlist (future)
💳 Checkout
```

---

## ⚙️ Customization

### Tambah Produk Baru
Edit `assets/js/product-service.js`:
```javascript
{
    id: 13,                    // ID unik
    title: "Judul Buku",      // Nama produk
    author: "Penulis",        // Pengarang
    category: "fiksi",        // Kategori
    price: 85000,             // Harga rupiah
    originalPrice: 100000,    // Harga original (untuk diskon)
    image: "📕",              // Emoji atau gambar
    description: "Deskripsi", // Penjelasan produk
    publisher: "Penerbit",    // Penerbit
    year: 2024,               // Tahun terbit
    pages: 300,               // Jumlah halaman
    stock: 15,                // Stok tersedia
    rating: 4.8,              // Rating 0-5
    reviews: 245,             // Jumlah review
    badges: ["new"],          // ["new"] atau ["discount"]
    isbn: "978-xxx-xxx-xxx"   // Kode ISBN
}
```

### Ubah Warna Tema
Edit `assets/css/styles.css` (section `:root`):
```css
:root {
    --primary-color: #2c3e50;      /* Ubah sini */
    --secondary-color: #3498db;    /* Ubah sini */
    /* dst... */
}
```

### Tambah Filter Baru
Edit `index.html`:
1. Tambah `<input>` atau `<select>` di filter section
2. Edit `app.js` tambah event listener
3. Modifikasi `filterProducts()` di `product-service.js`

---

## 🧪 Test Cases

### Test 1: Basic Search
✓ Search "Laskar" → Tampil Laskar Pelangi
✓ Search "xxx" → No results

### Test 2: Filter Category
✓ Select "Fiksi" → Hanya fiksi
✓ Select "Non-Fiksi" → Hanya non-fiksi

### Test 3: Filter Price
✓ Rp 0 - Rp 100.000 → Produk dalam range
✓ Rp 100.000 - Rp 500.000 → Produk dalam range

### Test 4: Add to Cart
✓ Add 1 item → Count = 1
✓ Add 2 items → Count = 3
✓ Add 1 item quantity 5 → Total 8

### Test 5: Cart Persistence
✓ Add to cart → Close browser
✓ Open browser → Keranjang masih ada

### Test 6: Responsive
✓ Desktop (1200px) → Full layout
✓ Tablet (768px) → 2 column grid
✓ Mobile (480px) → 1 column grid

---

## 📱 Browser Support

✓ Chrome (latest)
✓ Firefox (latest)
✓ Safari (latest)
✓ Edge (latest)
✓ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🐛 FAQ

### Q: Keranjang tidak tersimpan?
**A:** Cek setting privacy di browser. Pastikan localStorage enabled.

### Q: Produk tidak tampil?
**A:** Clear browser cache atau buka di private/incognito mode.

### Q: Pencarian tidak bekerja?
**A:** Cek console (F12) untuk error. Refresh halaman.

### Q: Harga salah?
**A:** Edit data di `product-service.js` dan refresh browser.

### Q: Ingin ubah tampilan?
**A:** Edit CSS di `assets/css/`. Clear cache setelah edit.

---

## 📞 Tips & Tricks

1. **Shortcut**: Press `Escape` untuk close modal
2. **Quick Add**: Click "+ Keranjang" untuk langsung add
3. **Filter Combo**: Kombinasikan multiple filters untuk hasil spesifik
4. **Responsive**: Test di mobile untuk UX yang lebih baik
5. **Dev Tools**: Use browser console (F12) untuk debug

---

**Created**: Toko Buku Sam | **Version**: 1.0 | **Last Updated**: Feb 2024
