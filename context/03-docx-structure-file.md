# DOCX Structure

Dokumen ini menjelaskan struktur dan isi dari setiap bagian dalam file `.docx`. Pada file `.docx`, harus mengikuti struktur yang telah ditentukan, dengan key utama yang wajib ada dan tidak boleh diubah. Setiap key memiliki fungsi dan isi yang spesifik sesuai dengan kebutuhan dokumen pembelajaran anak usia dini (PAUD/TK).

---

## JUDUL UTAMA

Judul utama selalu berisi "MODUL AJAR PENDIDIKAN ANAK USIA DINI  KURIKULUM MERDEKA PERENCANAAN PEMBELAJARAN MENDALAM" yang dibungkus dengan sebuah table.

Kamu dapat memanfaatkan `TableWrapper` class tersedia pada API, contoh:

```js
new TableWrapper()
  .addTitleRow('MODUL AJAR PENDIDIKAN ANAK USIA DINI  KURIKULUM MERDEKA PERENCANAAN PEMBELAJARAN MENDALAM')
  .build(),
createParagraph('')
```

Kemudian diikuti dengan table yang berisi metadata atau informasi dari modul ajar tersebut, meliputi Penulis, Semester, Asal Sekolah, Minggu Ke-, Fase, Bulan, Jenjang/Kelas, Alokasi Waktu, Model Pembelajaran, Jumlah Anak, dan Topik /Sub Topik.

Kamu harus menggunakan pre-defined variable untuk metadata ini, jangan menggunakan variable lain atau mengubah nama variable yang sudah ada. Variable ini akan digunakan untuk memetakan data secara konsisten di seluruh dokumen.

Kamu dapat memanfaatkan `TableWrapper` class untuk membuat table metadata ini, contoh:

```js
new TableWrapper()
  .setFitContent()
  .addLabelValueRow('Penulis', namaPenulis, 'Semester', convertNumToRoman(semester))
  .addLabelValueRow('Asal Sekolah', asalSekolah, 'Minggu Ke-', mingguKe.toString())
  .addLabelValueRow('Fase', fase, 'Bulan', bulan)
  .addLabelValueRow('Jenjang/Kelas', jenjangKelas, 'Alokasi Waktu', alokasiWaktu)
  .addLabelValueRow('Model Pembelajaran', modelPembelajaran, 'Jumlah Anak', jumlahAnak.toString())
  .addRowObject(
    new Row()
      .addTextCell('Topik / Sub Topik', { bold: true })
      .addTextCell(topikSubtopik, { columnSpan: 3 })
  )
  .build(),
createParagraph('')
```

---

## 1) DOCX Package Keys (Must Be Preserved)

Use this OOXML package skeleton as the baseline:

```text
[Content_Types].xml
_rels/
  .rels
docProps/
  app.xml
  core.xml
  custom.xml
word/
  _rels/
    document.xml.rels
  document.xml
  fontTable.xml
  numbering.xml
  settings.xml
  styles.xml
  theme/
    theme1.xml
```

Rules:
- Keep all top-level keys: `[Content_Types].xml`, `_rels`, `docProps`, and `word`.
- Keep required document files in `word/`: `document.xml`, `styles.xml`, `numbering.xml`, and `settings.xml`.
- Keep `word/_rels/document.xml.rels` and `word/theme/theme1.xml`.

---

## 2) Main Content Keys in `word/document.xml`

### 1. MODUL AJAR FASE FONDASI
Judul utama dokumen. Jangan diubah untuk memastikan kategori jenjang PAUD/TK.

---

### 2. TOPIK/SUB-TOPIK : ...
Isi dengan tema besar dan fokus bahasan yang menarik bagi anak.
Contoh: 
- Topik: Aku Sayang Bumi
- Sub-topik: Mengelola Sampah di Sekolah

---

### 3. MINGGU KE : ...
Isi dengan urutan minggu pelaksanaan dalam satu semester.

---

### 4. A. IDENTITAS MODUL

Berisi data umum administrasi sekolah:

- Nama Sekolah → Nama instansi PAUD/TK
- Nama Penyusun → Guru kelas atau pembuat modul
- NIP → Opsional (untuk guru ASN)
- Fase / Kelompok / Semester → Fase Fondasi / Kelompok A (4-5 thn) atau B (5-6 thn) / Semester berjalan
- Alokasi Waktu → Durasi pelaksanaan (misal: 1 Minggu / 5-6 Pertemuan)
- Tahun Pelajaran → Tahun ajaran berjalan

---

### 5. B. IDENTIFIKASI KESIAPAN PESERTA DIDIK

Isi dengan pemetaan awal kondisi anak:

- Pengetahuan Awal → Apa yang sudah diketahui anak tentang topik terkait
- Minat → Hal spesifik yang disukai anak (misal: suka menggambar, suka bermain air)
- Latar Belakang → Kondisi lingkungan atau kebiasaan di rumah
- Kebutuhan Belajar → Fokus perkembangan (Motorik, Sensorik, atau Sosial-Emosional)

---

### 6. C. KARAKTERISTIK KEGIATAN BERMAIN

Isi dengan deskripsi teknis kegiatan:

- Peta Konsep → Gambaran hubungan antar ide dalam topik pembelajaran
- Relevansi Kontekstual → Mengapa topik ini penting bagi kehidupan sehari-hari anak
- Nilai Karakter → Pembiasaan profil pelajar yang ingin dibentuk (misal: kemandirian)
- Tingkat Stimulasi → Fokus perkembangan (Bahasa, Kognitif, Fisik)

---

### 7. D. DIMENSI PROFIL PELAJAR PANCASILA

Pilih elemen kompetensi yang ingin dicapai melalui kegiatan bermain:

- Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia
- Mandiri
- Gotong Royong
- Kreatif
- Bernalar Kritis
- Kebinekaan Global

---

## DESAIN PEMBELAJARAN

---

### 8. A. CAPAIAN PEMBELAJARAN (CP)

Isi dengan elemen CP Fase Fondasi yang disasar:

- Nilai Agama dan Budi Pekerti
- Jati Diri
- Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni (STEAM)

---

### 9. B. PERTANYAAN PEMANTIK

Isi dengan kalimat tanya terbuka untuk memicu rasa ingin tahu anak.
Contoh: "Bagaimana ya kalau di dunia ini tidak ada air?"

---

### 10. C. TUJUAN PEMBELAJARAN

Isi dengan target perkembangan yang ingin dicapai setiap hari/minggu:

- Apa yang diharapkan dapat dilakukan atau dipahami anak
- Disusun berdasarkan elemen CP

---

### 11. D. SARANA DAN PRASARANA

Isi dengan alat dan bahan yang dibutuhkan:

- Alat main (Loose parts, bahan alam, alat tulis)
- Media (Buku cerita, video, gambar)

---

### 12. E. KERANGKA PEMBELAJARAN

#### PRAKTIK PEDAGOGIK
Isi dengan:
- Model Pembelajaran (Sentra, Kelompok, Area, atau Proyek)
- Metode (Eksplorasi, Tanya Jawab, Demonstrasi)

#### KEMITRAAN PEMBELAJARAN
Isi dengan:
- Pihak terlibat (Orang tua sebagai narasumber, kunjungan ke lingkungan sekitar)

#### LINGKUNGAN BELAJAR
Isi dengan:
- Penataan lingkungan main (Lingkungan aman, nyaman, dan kaya literasi)

#### PEMANFAATAN DIGITAL
Isi dengan:
- Penggunaan alat digital sederhana (Tablet untuk melihat gambar, Speaker untuk musik)

---

### 13. F. LANGKAH-LANGKAH KEGIATAN BERMAIN (BERDIFERENSIASI)

Wajib disusun per pertemuan (misal Hari 1 s.d Hari 6):

- KEGIATAN PEMBUKA → Lingkaran pagi, bernyanyi, diskusi pemantik
- KEGIATAN INTI → Pilihan kegiatan main (Invitasi) yang bisa dipilih anak
- KEGIATAN PENUTUP → Recalling (diskusi perasaan), penguatan, doa

---

### 14. G. ASESMEN PEMBELAJARAN

*(Catatan: PAUD tidak menggunakan tes tertulis/angka)*

#### CEKLIS
Untuk memantau perkembangan rutin harian

#### CATATAN ANEKDOT
Untuk mencatat peristiwa unik atau signifikan pada anak

#### HASIL KARYA
Analisis terhadap produk yang dihasilkan anak (gambar, bangunan, dll)

#### FOTO BERSERI
Dokumentasi proses aktivitas anak dari awal hingga akhir

---

## 3) Aturan Penting

- Struktur dan urutan **tidak boleh diubah**.
- Semua key **wajib ada** untuk menjaga konsistensi data.
- Isi materi harus menggunakan bahasa yang mudah dipahami guru PAUD.
- Jika data belum tersedia, gunakan placeholder **(.....)**.
```