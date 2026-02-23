# Frontend Toko Buku Sam 📚

Frontend aplikasi toko buku online yang lengkap dan responsif dengan fungsionalitas lengkap untuk e-commerce buku.

## 📋 Fitur Utama

### ✅ Katalog & Browsing Produk
- **Tampilan Grid Produk**: Menampilkan buku dalam format grid yang responsif
- **Pencarian Produk**: Cari buku berdasarkan judul, penulis, atau kategori
- **Filter & Sorting**:
  - Filter berdasarkan kategori
  - Filter berdasarkan harga (range slider)
  - Filter berdasarkan penerbit
  - Filter berdasarkan rating
  - Sort: Terbaru, Harga (rendah-tinggi, tinggi-rendah), Rating tertinggi

### 🛍️ Halaman Detail Produk
- **Informasi Lengkap**: Judul, penulis, penerbit, tahun terbit, halaman, ISBN
- **Sistem Rating**: Lihat rating produk dan ulasan dari pembeli
- **Harga & Diskon**: Tampilan harga original dan diskon jika ada
- **Tab Informasi**:
  - Deskripsi Produk
  - Detail Produk (Spesifikasi)
  - Ulasan Pembeli dengan statistik rating
  - FAQ (Pertanyaan Umum)
- **Produk Terkait**: Rekomendasi produk dengan kategori yang sama
- **Quick Add to Cart**: Tambah langsung ke keranjang dengan quantity selector

### 🛒 Keranjang Belanja
- **Manajemen Item**: Tambah, hapus, atau ubah jumlah item
- **Perhitungan Otomatis**: 
  - Subtotal per item
  - Total harga semua item
  - Pajak (10% dari subtotal)
  - Ongkos kirim (gratis untuk pembelian >Rp 100.000)
- **Kode Kupon**: Terapkan kode promosi
- **Ringkasan Pesanan**: Lihat detail pesanan sebelum checkout
- **State Persistence**: Keranjang tersimpan di localStorage

### ⭐ Sistem Rating & Review
- **Tampilan Rating**: Lihat rating produk berdasarkan jumlah bintang
- **Review Statistics**: Grafik distribusi rating (5★, 4★, 3★, dst)
- **Sample Reviews**: Ulasan pembeli dengan rating dan tanggal
- **Helpful Button**: Mark review sebagai helpful atau tidak

### 📱 User Interface
- **Responsif**: Optimal untuk desktop, tablet, dan mobile
- **Modern Design**: UI yang clean dan user-friendly
- **Loading States**: Skeleton loading untuk UX yang lebih baik
- **Notification System**: Toast notification untuk user feedback
- **Modal Quick View**: Preview produk tanpa keluar dari halaman

## 📁 Struktur Folder

```
frontend/
├── index.html                      # Halaman utama (katalog)
├── assets/
│   ├── css/
│   │   ├── styles.css             # CSS global & utilities
│   │   ├── header.css             # Header & footer styles
│   │   ├── product-catalog.css    # Product grid & filters
│   │   ├── product-detail.css     # Product detail page
│   │   └── cart.css               # Shopping cart page
│   ├── js/
│   │   ├── product-service.js     # Business logic - Produk
│   │   ├── cart-service.js        # Business logic - Keranjang
│   │   ├── app.js                 # Main app logic
│   │   ├── product-detail.js      # Product detail page logic
│   │   └── cart.js                # Cart page logic
│   └── images/                     # Folder untuk gambar
├── pages/
│   ├── product-detail.html         # Detail produk
│   └── cart.html                   # Keranjang belanja
└── README.md                       # File dokumentasi

```

## 🚀 Cara Menggunakan

### 1. Opening the Application
- Buka file `index.html` di browser
- Atau gunakan live server untuk development

### 2. Navigasi Halaman
- **Beranda (Index)**: Tampilan katalog produk dengan filter lengkap
- **Detail Produk**: Klik produk atau tombol preview untuk lihat detail
- **Keranjang**: Klik icon keranjang atau buka `pages/cart.html`

### 3. Fitur Pencarian & Filter
- **Search Bar**: Cari produk di header
- **Category Filter**: Pilih kategori dari dropdown
- **Price Range**: Geser slider atau input manual di sidebar
- **Sort**: Urutkan sesuai preferensi
- **Publisher Filter**: Pilih penerbit dari checkbox
- **Rating Filter**: Filter berdasarkan rating minimum

### 4. Belanja Produk
1. Pilih produk yang diinginkan
2. Klik "+ Keranjang" atau gunakan Quick View
3. Tentukan jumlah yang ingin dibeli
4. Lihat ringkasan di keranjang
5. Lanjut ke checkout

### 5. Manajemen Keranjang
- Lihat semua item di `pages/cart.html`
- Ubah jumlah setiap item
- Hapus item jika tidak perlu
- Terapkan kode kupon (jika ada)
- Lihat ringkasan pembayaran

## 🎨 Warna & Tema

```
Primary Color:    #2c3e50 (Dark Blue)
Secondary Color:  #3498db (Light Blue)
Accent Color:     #e74c3c (Red)
Success Color:    #27ae60 (Green)
Light BG:         #ecf0f1 (Light Gray)
Border Color:     #bdc3c7 (Gray)
```

## 📊 Data Produk

File `product-service.js` berisi 12 sampel produk buku dengan data lengkap:
- Laskar Pelangi, Ayat-Ayat Cinta, Saya Ingin Mencintai Aku Sendiri
- The Innovation Stack, Filosofi Teras, Atomic Habits
- Sang Pemimpi, Juara Kelas, Rich Dad Poor Dad
- Buku Pintar Percaya Diri, The 7 Habits, Anak-Anak Langit

Setiap produk memiliki:
- ID, Judul, Penulis, Kategori, Harga
- Deskripsi, Penerbit, Tahun, Halaman, Stock
- Rating, Reviews, ISBN, Badges

## 🔧 Cara Menambah Data Produk

Edit file `assets/js/product-service.js` dan tambahkan data ke array `initializeProducts()`:

```javascript
{
    id: 13,
    title: "Judul Buku",
    author: "Nama Penulis",
    category: "fiksi",
    price: 75000,
    originalPrice: null,
    image: "📕",
    description: "Deskripsi buku...",
    publisher: "Penerbit",
    year: 2024,
    pages: 300,
    stock: 10,
    rating: 4.8,
    reviews: 150,
    badges: [],
    isbn: "978-xxx-xxx-xxx"
}
```

## 🎯 Fitur Lanjutan

### localStorage Integration
- Keranjang belanja otomatis tersimpan
- Data persisten antar session

### Responsive Design
- Mobile-first approach
- Breakpoint: 480px, 768px, 1200px
- Touch-friendly buttons dan controls

### Notifikasi
- Toast notifications untuk user feedback
- Auto-hide setelah 3 detik
- Berbagai tipe: success, error, info

### Search & Filter
- Real-time search filtering
- Multi-select filters
- Dynamic pagination

## 📋 Kategori Produk

1. **Fiksi**: Novel, cerita pendek
2. **Non-Fiksi**: Buku pengetahuan umum
3. **Pendidikan**: Buku pelajaran, referensi
4. **Anak-Anak**: Buku bergambar, cerita anak
5. **Biografi**: Buku kehidupan tokoh
6. **Bisnis**: Buku entrepreneur, management

## 💳 Sistem Pembayaran

Modul pembayaran (checkout) bisa diintegrasikan dengan:
- Midtrans
- GoPay
- OVO
- Dana
- Transfer Bank
- Kartu Kredit

## 🐛 Troubleshooting

### Produk tidak tampil?
- Pastikan `product-service.js` sudah dimuat
- Cek browser console untuk error

### Keranjang tidak tersimpan?
- Enable localStorage di browser
- Cek setting privacy/incognito mode

### Filter tidak bekerja?
- Refresh halaman
- Cek kategori atau filter sudah benar

## 📝 License

Toko Buku Sam © 2024

## 👨‍💻 Development

### Untuk menambah fitur baru:

1. **Tambah CSS**: Buat file baru di `assets/css/`
2. **Tambah JS Logic**: Buat file baru di `assets/js/`
3. **Tambah HTML**: Edit file yang sesuai atau buat halaman baru di `pages/`
4. **Import ke file utama**: Link di `<link>` dan `<script>` tag

### Best Practices:
- Gunakan class untuk komponen besar
- Gunakan ID untuk unique elements
- Gunakan data attributes untuk storage
- Maintain responsive design
- Test di berbagai ukuran layar

## 📞 Support

Untuk pertanyaan atau saran, hubungi tim Toko Buku Sam.

---

**Last Updated**: February 2024
**Version**: 1.0.0
