# Product Requirements Document (PRD)
# Sistem Informasi Administrasi Surat Desa Ujungbatu III

**Versi:** 1.0.0
**Tanggal:** 15 April 2026
**Status:** Draft
**Penulis:** Tim Pengembang
**Pemilik Produk:** Pemerintah Desa Ujungbatu III

---

## 1. Ringkasan Eksekutif

Sistem Informasi Administrasi Surat Desa Ujungbatu III adalah aplikasi berbasis web yang dirancang untuk mempermudah perangkat desa dalam menjalankan fungsi administrasi, khususnya dalam proses pembuatan dan penerbitan surat-menyurat resmi desa. Aplikasi ini memanfaatkan database kependudukan yang telah dimiliki desa untuk menghasilkan surat secara otomatis dalam format PDF yang siap cetak.

---

## 2. Latar Belakang & Masalah

### 2.1 Masalah yang Dihadapi
Saat ini proses administrasi surat di Desa Ujungbatu III masih dilakukan secara manual, yang mengakibatkan:

- **Proses lambat:** Petugas harus mengetik ulang data penduduk setiap kali membuat surat, rawan salah ketik.
- **Inkonsistensi format:** Tidak ada standar format surat yang seragam antar petugas.
- **Arsip tidak terstruktur:** Sulit melacak riwayat surat yang pernah diterbitkan.
- **Pemborosan waktu:** Warga harus menunggu lama untuk mendapatkan surat resmi dari desa.
- **Kesalahan data:** Potensi kesalahan penulisan nama, NIK, dan data kependudukan lainnya.

### 2.2 Peluang
Dengan tersedianya database kependudukan yang sudah ada di desa, proses pembuatan surat dapat diotomatisasi sehingga petugas cukup mencari nama penduduk dan sistem akan mengisi data secara otomatis ke dalam template surat yang sesuai.

---

## 3. Tujuan Produk

### 3.1 Tujuan Utama
- Mempercepat proses pembuatan surat administrasi desa dari rata-rata 15–30 menit menjadi kurang dari 2 menit.
- Memastikan konsistensi format dan data pada setiap surat yang diterbitkan.
- Mengurangi kesalahan penulisan data kependudukan pada surat resmi.

### 3.2 Tujuan Sekunder
- Menyediakan arsip digital surat yang dapat ditelusuri.
- Meningkatkan kepercayaan warga terhadap layanan administrasi desa.
- Menjadi fondasi digitalisasi layanan desa Ujungbatu III.

---

## 4. Target Pengguna

### 4.1 Pengguna Primer
| Peran | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Operator/Staff Desa** | Petugas yang melayani pembuatan surat harian | Input cepat, generate & cetak PDF |
| **Sekretaris Desa** | Bertanggung jawab atas keabsahan surat | Review, tanda tangan digital, arsip |
| **Kepala Desa** | Otoritas tertinggi penandatangan surat | Approval, laporan statistik |

### 4.2 Pengguna Sekunder
- **Warga Desa:** Penerima surat (tidak mengakses sistem langsung).
- **Perangkat Desa Lain:** Kadus (Kepala Dusun) yang memerlukan data warga.

---

## 5. Ruang Lingkup (Scope)

### 5.1 Yang Termasuk (In Scope) — MVP

#### Modul Manajemen Penduduk
- Pencarian penduduk berdasarkan nama, NIK, atau nomor KK.
- Tampilan detail data penduduk hasil pencarian.
- Data yang diambil dari database existing desa.

#### Modul Generate Surat
Jenis surat yang didukung pada versi pertama:
1. **Surat Keterangan Domisili**
2. **Surat Keterangan Tidak Mampu (SKTM)**
3. **Surat Keterangan Usaha**
4. **Surat Keterangan Kelahiran**
5. **Surat Keterangan Kematian**
6. **Surat Keterangan Belum Menikah**
7. **Surat Pengantar KTP/KK**
8. **Surat Keterangan Pindah**

#### Modul PDF & Cetak
- Generate surat dalam format PDF.
- Preview surat sebelum dicetak.
- Opsi cetak langsung dari browser.
- Nomor surat otomatis berurutan.

#### Modul Arsip
- Riwayat surat yang pernah diterbitkan.
- Pencarian arsip berdasarkan nama, tanggal, atau jenis surat.

### 5.2 Yang Tidak Termasuk (Out of Scope) — MVP
- Aplikasi mobile native (Android/iOS).
- Tanda tangan digital/elektronik terintegrasi.
- Integrasi dengan Dukcapil/Sistem Nasional.
- Portal layanan mandiri untuk warga.
- Fitur pembayaran/retribusi.

### 5.3 Rencana Fase Berikutnya (Future Scope)
- Tanda tangan digital Kepala Desa.
- Notifikasi WhatsApp/SMS ke warga.
- Integrasi API Dukcapil.
- Dashboard statistik kependudukan.
- QR Code verifikasi keaslian surat.

---

## 6. Fitur & Persyaratan Fungsional

### 6.1 Autentikasi & Otorisasi
| ID | Fitur | Prioritas |
|---|---|---|
| F-01 | Login dengan username dan password | Wajib |
| F-02 | Role-based access: Admin, Operator, Kepala Desa | Wajib |
| F-03 | Session timeout otomatis setelah tidak aktif | Wajib |
| F-04 | Log aktivitas pengguna (audit trail) | Penting |

### 6.2 Manajemen Data Penduduk
| ID | Fitur | Prioritas |
|---|---|---|
| F-05 | Pencarian penduduk by nama (autocomplete) | Wajib |
| F-06 | Pencarian penduduk by NIK | Wajib |
| F-07 | Tampil detail data penduduk: Nama, NIK, TTL, Alamat, Status, dll. | Wajib |
| F-08 | Admin dapat tambah/edit/hapus data penduduk | Penting |
| F-09 | Import data penduduk dari file Excel/CSV | Penting |

### 6.3 Generate Surat
| ID | Fitur | Prioritas |
|---|---|---|
| F-10 | Pilih jenis surat dari daftar yang tersedia | Wajib |
| F-11 | Data penduduk otomatis terisi ke template surat | Wajib |
| F-12 | Input tambahan untuk data yang tidak ada di database (misal: keperluan surat) | Wajib |
| F-13 | Preview surat sebelum digenerate | Wajib |
| F-14 | Generate surat ke format PDF | Wajib |
| F-15 | Nomor surat otomatis sesuai format desa | Wajib |
| F-16 | Tanggal surat otomatis (dapat diubah manual) | Wajib |
| F-17 | Nama & jabatan penandatangan otomatis terisi | Wajib |

### 6.4 Manajemen Template Surat
| ID | Fitur | Prioritas |
|---|---|---|
| F-18 | Admin dapat tambah template surat baru | Penting |
| F-19 | Admin dapat edit template yang sudah ada | Penting |
| F-20 | Support variabel dinamis di template (misal: {{nama}}, {{nik}}) | Wajib |

### 6.5 Arsip Surat
| ID | Fitur | Prioritas |
|---|---|---|
| F-21 | Setiap surat yang digenerate tersimpan otomatis di arsip | Wajib |
| F-22 | Cari arsip berdasarkan nama warga | Wajib |
| F-23 | Cari arsip berdasarkan rentang tanggal | Penting |
| F-24 | Cari arsip berdasarkan jenis surat | Penting |
| F-25 | Download ulang PDF surat dari arsip | Wajib |

---

## 7. Persyaratan Non-Fungsional

### 7.1 Performa
- Waktu pencarian penduduk: < 1 detik untuk database hingga 10.000 penduduk.
- Waktu generate PDF: < 5 detik.
- Aplikasi mendukung penggunaan simultan oleh 10 pengguna tanpa degradasi performa.

### 7.2 Keamanan
- Semua komunikasi menggunakan HTTPS/TLS.
- Password disimpan dalam bentuk hash (bcrypt).
- Data kependudukan tidak boleh dapat diakses tanpa autentikasi.
- Backup database otomatis setiap hari.

### 7.3 Ketersediaan & Reliabilitas
- Target uptime: 99% (dapat down maksimal ~7 jam/bulan).
- Dapat berjalan di jaringan lokal (intranet) jika koneksi internet tidak stabil.
- Kompatibel dengan browser: Chrome, Firefox, Edge (versi terbaru).

### 7.4 Usability
- Antarmuka dalam Bahasa Indonesia.
- Proses dari pencarian penduduk hingga cetak surat tidak lebih dari 5 langkah.
- Responsif untuk layar desktop dan laptop (minimal 1024px).
- Tidak memerlukan pelatihan teknis khusus untuk operator.

### 7.5 Kompatibilitas
- Berjalan di browser modern tanpa plugin tambahan.
- PDF dapat dicetak di printer standar ukuran A4.

---

## 8. Alur Pengguna (User Flow)

### 8.1 Alur Utama: Membuat Surat
```
[Operator Login]
       ↓
[Dashboard Utama]
       ↓
[Pilih "Buat Surat Baru"]
       ↓
[Pilih Jenis Surat (misal: Surat Keterangan Domisili)]
       ↓
[Cari Nama Penduduk / Input NIK]
       ↓
[Sistem menampilkan data penduduk yang cocok]
       ↓
[Operator konfirmasi & lengkapi data tambahan (jika ada)]
       ↓
[Preview Surat]
       ↓
[Generate PDF]
       ↓
[Cetak / Download PDF]
       ↓
[Surat tersimpan otomatis di Arsip]
```

### 8.2 Alur Pencarian Arsip
```
[Masuk Menu Arsip]
       ↓
[Input kriteria pencarian: nama / tanggal / jenis surat]
       ↓
[Tampil daftar surat sesuai kriteria]
       ↓
[Pilih surat → Download PDF / Lihat Detail]
```

---

## 9. Struktur Data

### 9.1 Tabel Penduduk (Existing Database)
| Field | Tipe | Keterangan |
|---|---|---|
| id | INT (PK) | ID unik penduduk |
| nik | VARCHAR(16) | Nomor Induk Kependudukan |
| no_kk | VARCHAR(16) | Nomor Kartu Keluarga |
| nama_lengkap | VARCHAR(100) | Nama lengkap |
| tempat_lahir | VARCHAR(50) | Tempat lahir |
| tanggal_lahir | DATE | Tanggal lahir |
| jenis_kelamin | ENUM | L / P |
| agama | VARCHAR(20) | Agama |
| status_perkawinan | VARCHAR(20) | Belum Kawin / Kawin / dst. |
| pekerjaan | VARCHAR(50) | Pekerjaan |
| alamat | TEXT | Alamat lengkap |
| rt | VARCHAR(5) | RT |
| rw | VARCHAR(5) | RW |
| dusun | VARCHAR(50) | Nama dusun |
| status_hidup | ENUM | Hidup / Meninggal |

### 9.2 Tabel Surat (Baru)
| Field | Tipe | Keterangan |
|---|---|---|
| id | INT (PK) | ID surat |
| nomor_surat | VARCHAR(50) | Nomor surat resmi |
| jenis_surat | VARCHAR(100) | Jenis/nama surat |
| nik_pemohon | VARCHAR(16) | NIK warga pemohon |
| tanggal_terbit | DATE | Tanggal surat diterbitkan |
| keperluan | TEXT | Keperluan/tujuan surat |
| dibuat_oleh | INT (FK) | ID user yang membuat |
| file_pdf | VARCHAR(255) | Path file PDF tersimpan |
| created_at | TIMESTAMP | Waktu pembuatan |

### 9.3 Tabel Pengguna (Baru)
| Field | Tipe | Keterangan |
|---|---|---|
| id | INT (PK) | ID user |
| username | VARCHAR(50) | Username login |
| password_hash | VARCHAR(255) | Password terenkripsi |
| nama | VARCHAR(100) | Nama lengkap petugas |
| jabatan | VARCHAR(100) | Jabatan di desa |
| role | ENUM | admin / operator / kepala_desa |
| is_active | BOOLEAN | Status aktif akun |

---

## 10. Desain Antarmuka (UI/UX Guidelines)

### 10.1 Prinsip Desain
- **Sederhana:** Tampilan bersih, tidak membingungkan operator yang awam teknologi.
- **Cepat:** Fitur utama (buat surat) dapat diakses dalam 1–2 klik dari halaman utama.
- **Identitas Desa:** Menggunakan warna dan logo resmi Desa Ujungbatu III.

### 10.2 Halaman Utama yang Diperlukan
1. **Halaman Login**
2. **Dashboard** — Statistik singkat (surat hari ini, bulan ini, total warga)
3. **Halaman Buat Surat** — Pencarian penduduk + pilih jenis surat
4. **Halaman Preview Surat** — Preview PDF + tombol cetak
5. **Halaman Arsip Surat** — Tabel + filter + download
6. **Halaman Manajemen Penduduk** — CRUD data penduduk (Admin only)
7. **Halaman Pengaturan** — Template surat, data desa, manajemen user

### 10.3 Template PDF Surat
- Kop surat resmi dengan logo Garuda, nama desa, kecamatan, kabupaten.
- Format dan layout mengikuti standar administrasi pemerintahan desa.
- Ukuran kertas: A4.
- Nomor surat sesuai format: `[Kode]/[Kode-Desa]/[Bulan-Romawi]/[Tahun]`.

---

## 11. Teknologi yang Direkomendasikan

### 11.1 Frontend
- **Framework:** React.js atau Next.js
- **Styling:** Tailwind CSS
- **PDF Preview:** react-pdf / pdfjs-dist

### 11.2 Backend
- **Runtime:** Node.js (Express.js) atau Python (FastAPI)
- **Database:** PostgreSQL (neon/supabase)
- **PDF Generation:** Puppeteer atau PDFKit

### 11.3 Infrastruktur
- **Server:** Dapat di-host lokal (on-premise) di kantor desa atau VPS murah

---

## 12. Rencana Pengembangan (Roadmap)

### Fase 1 — MVP (Bulan 1–2)
- [ ] Setup infrastruktur & database
- [ ] Autentikasi & manajemen user
- [ ] Integrasi database penduduk existing
- [ ] Fitur pencarian penduduk
- [ ] Template 8 jenis surat utama
- [ ] Generate & cetak PDF
- [ ] Arsip surat dasar

### Fase 2 — Peningkatan (Bulan 3–4)
- [ ] Dashboard statistik
- [ ] Import data penduduk dari Excel
- [ ] Editor template surat (Admin)
- [ ] Penomoran surat otomatis yang persisten
- [ ] Log aktivitas & audit trail

### Fase 3 — Ekspansi (Bulan 5–6)
- [ ] QR Code verifikasi surat
- [ ] Tanda tangan digital
- [ ] Notifikasi WhatsApp
- [ ] Laporan bulanan/tahunan (export Excel)
- [ ] Backup & restore database

---

## 13. Kriteria Penerimaan (Acceptance Criteria)

Aplikasi dinyatakan siap rilis jika memenuhi seluruh kriteria berikut:

- [ ] Operator dapat login dan logout dengan aman.
- [ ] Pencarian nama penduduk menampilkan hasil dalam < 1 detik.
- [ ] Seluruh 8 jenis surat dapat digenerate menjadi PDF dengan data yang benar.
- [ ] Nomor surat terotomasi dan tidak duplikat.
- [ ] PDF dapat dicetak dengan layout A4 yang rapi.
- [ ] Setiap surat yang diterbitkan tersimpan di arsip.
- [ ] Arsip dapat dicari dan PDF dapat diunduh ulang.
- [ ] Tidak ada data penduduk yang bisa diakses tanpa login.
- [ ] Aplikasi berjalan normal di Chrome, Firefox, dan Edge versi terbaru.

---

## 14. Risiko & Mitigasi

| Risiko | Kemungkinan | Dampak | Mitigasi |
|---|---|---|---|
| Data penduduk existing tidak terstruktur/bersih | Sedang | Tinggi | Lakukan data cleansing sebelum migrasi |
| Koneksi internet tidak stabil di kantor desa | Tinggi | Sedang | Aplikasi dapat berjalan offline di jaringan lokal |
| Perangkat desa kurang familiar dengan teknologi | Sedang | Sedang | Sediakan panduan penggunaan & pelatihan singkat |
| Perubahan format surat yang diminta mendadak | Rendah | Rendah | Sediakan fitur edit template oleh Admin |
| Kehilangan data akibat kerusakan server | Rendah | Tinggi | Backup otomatis harian ke storage eksternal |

---

## 15. Glossary

| Istilah | Definisi |
|---|---|
| **NIK** | Nomor Induk Kependudukan — identitas unik setiap warga negara Indonesia (16 digit) |
| **KK** | Kartu Keluarga — dokumen resmi yang memuat data satu keluarga |
| **SKTM** | Surat Keterangan Tidak Mampu |
| **Kades** | Kepala Desa |
| **Kadus** | Kepala Dusun |
| **Perangkat Desa** | Seluruh aparatur yang bekerja di pemerintahan desa |
| **PDF** | Portable Document Format — format file dokumen yang dapat dicetak |
| **Template** | Kerangka surat yang sudah jadi dengan variabel dinamis yang dapat diisi otomatis |

---

*Dokumen ini adalah living document dan akan diperbarui seiring perkembangan proyek.*

**Disetujui oleh:**

| Nama | Jabatan | Tanda Tangan | Tanggal |
|---|---|---|---|
| | Kepala Desa Ujungbatu III | | |
| | Sekretaris Desa | | |
| | Product Manager / Koordinator Pengembang | | |