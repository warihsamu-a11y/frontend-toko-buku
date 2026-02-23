@echo off
REM Toko Buku Sam - Frontend Setup Script
REM Windows Batch File

echo ====================================
echo Toko Buku Sam - Frontend Setup
echo ====================================
echo.

echo Pilihan cara membuka aplikasi:
echo.
echo Opsi 1: Python (Recommended jika Python tersedia)
echo   python -m http.server 8000
echo.

echo Opsi 2: Node.js (Jika sudah install Node.js)
echo   npm install -g http-server
echo   http-server -p 8000
echo.

echo Opsi 3: Live Server (VS Code Extension)
echo   Klik kanan pada index.html - Open with Live Server
echo.

echo Opsi 4: Direct Open
echo   Buka file index.html langsung di browser
echo.

echo ====================================
echo Setup selesai!
echo ====================================
echo.
echo Navigasi ke:
echo   Home: http://localhost:8000
echo   Detail: http://localhost:8000/pages/product-detail.html?id=1
echo   Cart: http://localhost:8000/pages/cart.html
echo.
pause
