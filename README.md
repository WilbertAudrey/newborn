download terlebih dahulu file dengan format zip, kemudian lakukan extract file

UNTUK MENJALANKAN SERVER
backend - Laravel Lumen 

1. cd newborn
2. cd backend
3. composer install && composer update
4. buat database kosong di mysql dan sesuaikan database yang dibuat dengan nama database yang diatur di file .env(database di .env = backends)
5. php artisan migrate
6. php -S localhost:8000 -t public

frontend - React Js MUI
1. cd newborn
2. cd frontend
3. npm install(untuk membangun node_modules yang diperlukan)
4. npm start

running terlebih dahulu backend lumen baru setelah itu frontend react js
untuk backend dan frontend running di 2 terminal yang terpisah.

aplikasi dibangun menggunakan xampp versi 8.1.17, untuk database menggunakan MySQL Yog
port lumen berjalan di port 8000, sedangkan port react js berjalan di port 3000
