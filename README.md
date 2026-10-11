# Portfolio - Backend & Embedded Systems Engineer

Portofolio digital modern dan responsif untuk posisi **Backend Developer** dan **Embedded Web Server**. Dibangun menggunakan HTML5 semantik, CSS murni dengan arsitektur modern (dark mode, glassmorphism), dan JavaScript murni.

## 🚀 Fitur Utama

- **Interactive CLI Terminal:** Terminal Bash interaktif di hero section yang mendukung berbagai perintah (`help`, `whoami`, `skills`, `projects`, `cat evoting`, `cat esp32`, `ping esp32`, `security`, `contact`, `clear`) dengan riwayat perintah dan tombol cepat sentuh (*quick chips*).
- **Simulasi Interaktif Sensor IoT:** Simulator sensor ultrasonik dan modul display LED dot matrix 8x8 yang bereaksi menampilkan teks `"OKE BOS!"` ketika jarak objek < 15 cm.
- **Showcase Arsitektur & Keamanan:** Bedah arsitektur *Custom PHP MVC* mandiri, router buatan sendiri, dan komparasi kode *Prepared Statement* vs *Raw SQL*.
- **Desain Responsif:** Tampilan optimal dan adaptif untuk Desktop (PC), Tablet, dan Mobile (HP) dengan mobile drawer navigation.

## 🛠️ Tech Stack Portofolio

- **Frontend:** HTML5, Modern Vanilla CSS, Vanilla JavaScript
- **Tipografi:** Plus Jakarta Sans & JetBrains Mono (Google Fonts)

## 📂 Struktur Direktori

```text
Portofolio/
├── index.html        # Struktur semantik & konten portofolio
├── style.css         # Desain responsif, tema engineering dark mode
├── script.js         # Engine CLI terminal, scroll spy, IoT simulator
└── README.md         # Dokumentasi proyek
```

## 💻 Cara Menjalankan Secara Lokal

Cukup buka berkas `index.html` langsung di browser, atau jalankan menggunakan local server:

```bash
# Menggunakan Python
python -m http.server 8080

# Atau menggunakan PHP built-in server
php -S localhost:8080
```
Lalu buka `http://localhost:8080` pada browser Anda.
