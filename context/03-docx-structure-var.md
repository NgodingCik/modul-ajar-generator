# Predefined Variables — Modul Ajar PAUD Fase Fondasi

> **Konteks Kurikulum:** Dokumen ini mengacu pada **Kurikulum Merdeka** dengan pendekatan **Deep Learning** (Pembelajaran Mendalam) untuk **Fase Fondasi (TK/PAUD, usia 3–6 tahun)**. Semua variabel yang didefinisikan di sini akan diimpor ke dalam skrip pembuat dokumen `.docx` dan **tidak boleh menggunakan `import` atau `export`** — tulis sebagai `const` biasa.

---

## ⚠️ Aturan Umum Output

- **Output hanya berisi kode JavaScript** — tidak ada teks penjelasan, tidak ada komentar di luar kode, tidak ada pembungkus ` ```javascript ``` `.
- **Isi setiap variabel harus detail dan informatif** — jangan isi dengan teks terlalu singkat atau placeholder kosong.
- **Validasi semua nama variabel** sebelum dikirim — pastikan tidak ada yang hilang atau salah nama (lihat daftar lengkap di bawah).
- **Daftar lengkap variabel yang wajib ada:**

  ```
  Identifikasi:      identifikasiPesertaDidik, identifikasiMateriPembelajaran,
                     identifikasiDimensiProfilLulusan

  Desain:            desainPembelajaranCapaianPembelajaran, desainPembelajaranLintasDisiplinIlmu,
                     desainPembelajaranTujuanPembelajaran, desainPembelajaranTopikPembelajaran,
                     desainPembelajaranPraktikPedagogis, desainPembelajaranKemitraanPembelajaran,
                     desainPembelajaranLingkunganPembelajaran, desainPembelajaranPemanfaatanDigital

  Pelaksanaan:       rencanaPelaksanaanAwal, rencanaPelaksanaanInti,
                     rencanaPelaksanaanIntiTable, rencanaPelaksanaanPenutup

  Asesmen:           asesmenPembelajaranAwal, asesmenPembelajaranProses, asesmenPembelajaranAkhir
  ```

---

## 📌 Referensi Cepat: Fase Fondasi

**Tiga Elemen Capaian Pembelajaran (CP) Fase Fondasi:**

1. **Nilai Agama dan Budi Pekerti** — Kepercayaan kepada Tuhan YME, menjaga kebersihan/kesehatan/keselamatan, menghargai sesama dan alam.
2. **Jati Diri** — Identitas diri, emosi dan sosial, peran dalam keluarga/sekolah/masyarakat, fungsi gerak motorik.
3. **Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni** — Literasi awal, bilangan, sains, teknologi sederhana, seni.

**Tiga Pilar Deep Learning (Pembelajaran Mendalam):**
| Pilar | Penjelasan |
|---|---|
| **Mindful (Berkesadaran)** | Pembelajaran sadar dan aktif; guru memahami keunikan tiap anak, anak fokus pada proses berpikir. |
| **Meaningful (Bermakna)** | Materi dikaitkan dengan pengalaman nyata anak dan kehidupan sehari-hari. |
| **Joyful (Menggembirakan)** | Suasana belajar menyenangkan sehingga anak termotivasi untuk terus belajar. |

**Tiga Tahap Pengalaman Belajar Deep Learning:**

1. **Memahami (Understanding)** — Mengonstruksi pengetahuan secara aktif (Berkesadaran, Bermakna, Menggembirakan).
2. **Mengaplikasi (Applying)** — Menggunakan pengetahuan untuk membuat karya atau solusi (Berkesadaran, Bermakna).
3. **Merefleksi (Reflecting)** — Mengevaluasi apa yang dipelajari dan dampaknya (Berkesadaran, Bermakna).

**8 Dimensi Profil Lulusan (DPL):**
| Key | Kode | Dimensi |
|---|---|---|
| `dpl1` | DPL1 | Keimanan dan Ketakwaan terhadap Tuhan YME |
| `dpl2` | DPL2 | Kewargaan |
| `dpl3` | DPL3 | Penalaran Kritis |
| `dpl4` | DPL4 | Kreativitas |
| `dpl5` | DPL5 | Kolaborasi |
| `dpl6` | DPL6 | Kemandirian |
| `dpl7` | DPL7 | Kesehatan |
| `dpl8` | DPL8 | Komunikasi |

---

## Identifikasi

### identifikasiPesertaDidik

Deskripsi latar belakang, karakteristik perkembangan, dan kemampuan awal peserta didik yang relevan dengan tema pembelajaran. Isi harus mencakup:

- Kemampuan bahasa dan komunikasi sesuai kelompok usia
- Tahap perkembangan kognitif, sosial-emosional, dan motorik
- Kebutuhan khusus atau dukungan yang diperlukan
- Cara belajar yang paling efektif pada usia tersebut

```js
const identifikasiPesertaDidik =
  "Anak kelompok A (2-3 tahun) memiliki kemampuan bahasa yang sedang berkembang dengan kosakata terbatas namun mulai dapat mengungkapkan kebutuhan dasar. Mereka sangat membutuhkan pengulangan dan bimbingan dalam pengenalan identitas diri, serta masih dalam tahap mengembangkan kepercayaan terhadap lingkungan sekitar. Anak-anak pada usia ini belajar melalui eksplorasi sensori dan memerlukan dukungan emosional yang konsisten.";
```

```
identifikasiPesertaDidik: string
```

---

### identifikasiMateriPembelajaran

Deskripsi materi pembelajaran yang dikaitkan dengan tema dan subtema. Harus mencakup:

- Jenis pengetahuan: **esensial** (apa yang perlu diketahui), **aplikatif** (bagaimana menerapkan), **nilai dan karakter** (sikap yang dikembangkan)
- Relevansi dengan kehidupan sehari-hari anak
- Tingkat kesulitan yang sesuai dengan tahap perkembangan Fase Fondasi
- Nilai-nilai yang diintegrasikan (keimanan, kejujuran, kemandirian, dll.)

```js
const identifikasiMateriPembelajaran =
  "Materi pengenalan identitas diri mencakup pengetahuan esensial tentang nama dan bagian tubuh, pengetahuan aplikatif dalam berinteraksi sosial sederhana, serta pengetahuan nilai dan karakter melalui rasa percaya diri dan kemandirian. Materi ini sangat relevan dengan kehidupan sehari-hari anak dan memiliki tingkat kesulitan yang sesuai dengan tahap perkembangan mereka, mengintegrasikan nilai keimanan, kejujuran, dan kemandirian.";
```

```
identifikasiMateriPembelajaran: string
```

---

### identifikasiDimensiProfilLulusan

Menandai dimensi profil lulusan mana saja yang dikembangkan dalam modul ajar ini. Set `true` jika dimensi tersebut relevan dengan tema dan kegiatan pembelajaran, `false` jika tidak.

```js
const identifikasiDimensiProfilLulusan = {
  dpl1: true, // DPL1 — Keimanan dan Ketakwaan terhadap Tuhan YME
  dpl2: true, // DPL2 — Kewargaan
  dpl3: true, // DPL3 — Penalaran Kritis
  dpl4: false, // DPL4 — Kreativitas
  dpl5: true, // DPL5 — Kolaborasi
  dpl6: true, // DPL6 — Kemandirian
  dpl7: false, // DPL7 — Kesehatan
  dpl8: true, // DPL8 — Komunikasi
};
```

```
identifikasiDimensiProfilLulusan: {
  dpl1: boolean, dpl2: boolean, dpl3: boolean, dpl4: boolean,
  dpl5: boolean, dpl6: boolean, dpl7: boolean, dpl8: boolean
}
```

---

## Desain Pembelajaran

### desainPembelajaranCapaianPembelajaran

Daftar Capaian Pembelajaran (CP) dari Fase Fondasi yang dituju dalam modul ini. Setiap item array adalah satu CP, ditulis dalam format:
`'<b>Elemen [Nama Elemen]:</b> Sub Elemen [narasi sub-elemen yang relevan].'`

Pilih dari tiga elemen CP Fase Fondasi:

- **Nilai Agama dan Budi Pekerti**
- **Jati Diri** _(identitas diri, emosi-sosial, motorik)_
- **Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni**

```js
const desainPembelajaranCapaianPembelajaran = [
  "<b>Elemen Jati Diri:</b> Sub Elemen Anak memahami identitas dirinya yang terbentuk oleh ragam minat, kebutuhan, karakteristik gender, agama, dan sosial budaya.",
  "<b>Elemen Jati Diri:</b> Sub Elemen Anak menggunakan fungsi gerak (motorik kasar, halus, dan taktil) untuk mengeksplorasi dan memanipulasi berbagai objek dan lingkungan sekitar sebagai bentuk pengembangan diri.",
];
```

```
desainPembelajaranCapaianPembelajaran: string[]
```

> Minimal 1 item. Gunakan tag `<b>` untuk nama elemen. Pilih CP yang benar-benar relevan dengan tema/subtema yang dipilih.

---

### desainPembelajaranLintasDisiplinIlmu

Uraian integrasi lintas bidang pengembangan PAUD dalam satu kalimat ringkas. Sebutkan seluruh bidang yang relevan dengan aktivitas pembelajaran:

| Bidang                | Contoh Keterkaitan                         |
| --------------------- | ------------------------------------------ |
| Nilai agama dan moral | Syukur atas ciptaan Tuhan                  |
| Nilai Pancasila       | Menghargai keberagaman                     |
| Fisik motorik         | Gerakan, koordinasi, motorik halus/kasar   |
| Kognitif              | Mengingat, mencocokkan, memecahkan masalah |
| Bahasa                | Menyebutkan nama, berkomunikasi verbal     |
| Sosial emosional      | Kepercayaan diri, interaksi dengan teman   |

```js
const desainPembelajaranLintasDisiplinIlmu =
  "Nilai agama dan moral (mengenal keberadaan Tuhan melalui syukur atas identitas diri), nilai Pancasila (menghargai keberagaman nama dan karakteristik teman), fisik motorik (gerakan menunjuk dan melambai), kognitif (mengingat dan menyebut nama sendiri), bahasa (mengucapkan nama dengan jelas), sosial emosional (membangun kepercayaan diri dan interaksi dengan teman.)";
```

```
desainPembelajaranLintasDisiplinIlmu: string
```

---

### desainPembelajaranTujuanPembelajaran

Daftar Tujuan Pembelajaran (TP) yang diturunkan dari CP Fase Fondasi. Setiap item menggambarkan kemampuan konkret yang ingin dicapai anak setelah pembelajaran selesai. Gunakan kata kerja operasional yang sesuai perkembangan anak usia dini (mengenal, menyebutkan, menunjukkan, mempraktikkan, dll.).

```js
const desainPembelajaranTujuanPembelajaran = [
  "Anak mampu mengenal identitas dirinya sebagai bagian dari keluarga dan menyebutkan namanya sendiri sambil melakukan gerakan sederhana seperti melambai atau bertepuk tangan.",
];
```

```
desainPembelajaranTujuanPembelajaran: string[]
```

> Minimal 1 item. TP harus dapat diobservasi dan terukur, sesuai kemampuan anak Fase Fondasi.

---

### desainPembelajaranTopikPembelajaran

Judul topik pembelajaran yang spesifik dan menarik untuk anak usia dini. Dapat ditulis dalam format: `'[Subtema Utama]: [Aktivitas atau Fokus Khusus]'`.

> ⚠️ **WAJIB konsisten dengan `temaSubtema`** yang diberikan di credentials. Nilai variabel ini harus mencerminkan atau merupakan turunan langsung dari nilai `temaSubtema`. Jangan buat judul topik yang bertentangan atau tidak berkaitan dengan tema/subtema yang telah ditetapkan.

```js
const desainPembelajaranTopikPembelajaran = "Aku Istimewa: Ayo Kita Berkenalan";
```

```
desainPembelajaranTopikPembelajaran: string
```

---

### desainPembelajaranPraktikPedagogis

Deskripsi pendekatan dan metode pedagogis yang digunakan, dikaitkan secara eksplisit dengan **tiga pilar Deep Learning** (Mindful/Berkesadaran, Meaningful/Bermakna, Joyful/Menggembirakan). Sebutkan metode pembelajaran yang dipilih (bermain peran, bercerita, bernyanyi, eksplorasi, dll.) dan jelaskan mengapa sesuai untuk Fase Fondasi.

```js
const desainPembelajaranPraktikPedagogis =
  "Pembelajaran berbasis bermain dengan pendekatan eksplorasi langsung menggunakan metode bercerita interaktif, bernyanyi sambil bergerak, dan permainan cermin. Pendekatan ini mendukung prinsip berkesadaran (mindful) melalui fokus pada diri sendiri, bermakna (meaningful) karena relevan dengan kehidupan sehari-hari anak, dan menggembirakan (joyful) melalui aktivitas yang menyenangkan dan tidak menakutkan.";
```

```
desainPembelajaranPraktikPedagogis: string
```

---

### desainPembelajaranKemitraanPembelajaran

Daftar pihak-pihak yang bermitra dalam mendukung pembelajaran (guru, orang tua, kakak kelas, komunitas, dll.). Setiap item array menjelaskan satu pihak dan perannya.

```js
const desainPembelajaranKemitraanPembelajaran = [
  "Melibatkan guru kelas sebagai fasilitator utama dalam setiap kegiatan pembelajaran",
  "Melibatkan orang tua sebagai sumber informasi tentang kebiasaan dan kemampuan anak di rumah, serta pendukung kegiatan tindak lanjut di rumah",
  "Melibatkan kakak kelas sebagai model positif dalam pengenalan diri dan interaksi sosial",
];
```

```
desainPembelajaranKemitraanPembelajaran: string[]
```

---

### desainPembelajaranLingkunganPembelajaran

Deskripsi lingkungan fisik dan suasana belajar yang dirancang untuk mendukung pembelajaran. Jelaskan tata ruang, area bermain, dan elemen lingkungan yang relevan dengan tema.

```js
const desainPembelajaranLingkunganPembelajaran = [
  "Ruang kelas yang nyaman dengan cermin besar yang aman untuk anak, mendukung eksplorasi identitas diri secara visual",
  "Area bermain terbuka untuk aktivitas motorik kasar seperti melompat dan berlari",
  "Sudut tenang dengan bantal dan boneka untuk kegiatan refleksi dan bermain peran secara mandiri",
];
```

```
desainPembelajaranLingkunganPembelajaran: string[]
```

---

### desainPembelajaranPemanfaatanDigital

Daftar rencana pemanfaatan teknologi digital yang dibagi ke dalam tiga tahap: **Perencanaan**, **Pelaksanaan**, dan **Asesmen**. Setiap item array mencakup satu tahap atau satu jenis media digital.

```js
const desainPembelajaranPemanfaatanDigital = [
  "Perencanaan: Persiapan video cerita dan lagu digital tentang identitas diri, serta aplikasi dokumentasi perkembangan anak",
  'Pelaksanaan: Pemutaran video interaktif "Ayo Berkenalan", musik latar untuk aktivitas gerak dan lagu, dokumentasi foto dan video proses belajar anak',
  "Asesmen: Portofolio digital berupa karya anak (foto hasil kreasi), rekaman video perkenalan diri sederhana sebagai bukti perkembangan",
  "Dukungan media ajar digital tersedia melalui https://drive.paud.id/download/ayo-berkenalan/",
];
```

```
desainPembelajaranPemanfaatanDigital: string[]
```

---

## Rencana Pelaksanaan Pembelajaran

### rencanaPelaksanaanAwal

Rencana kegiatan **pembuka** pembelajaran. Harus bersifat **Berkesadaran, Bermakna, dan Menggembirakan** sesuai pilar Deep Learning. Struktur array:

- Item berupa `string` → poin narasi tunggal (ditulis sebagai `<li>` biasa)
- Item berupa `[string, string[]]` → poin dengan sub-poin bersarang (judul + daftar sub-item)

Isi yang wajib ada: orientasi (salam/doa), apersepsi (kaitan dengan pengalaman anak), motivasi/pemantik, dan pertanyaan pemantik yang mencakup semua 8 DPL.

```js
const rencanaPelaksanaanAwal = [
  [
    "Pembuka dari proses pembelajaran yang bertujuan untuk mempersiapkan peserta didik sebelum memasuki inti pembelajaran.",
  ],
  [
    "Kegiatan dalam tahap ini meliputi orientasi yang bermakna, apersepsi yang kontekstual, dan motivasi yang menggembirakan:",
    [
      "Salam dan doa pembuka untuk menciptakan suasana tenang dan fokus.",
      'Menyanyikan lagu "1234 Pergi Sekolah" untuk membangun semangat belajar.',
    ],
  ],
  ['Kegiatan pemantik dengan buku cerita/video "Ayo Berkenalan".'],
  ["Permainan konsentrasi sederhana untuk memusatkan perhatian anak."],
  [
    "Pertanyaan pemantik untuk mengembangkan berbagai aspek:",
    [
      '"Siapa yang menciptakan kita semua?" (Keimanan dan Ketakwaan.)',
      '"Apa yang bisa kamu lakukan sendiri hari ini?" (Kemandirian.)',
      '"Bagaimana perasaanmu ketika menyebutkan namamu?" (Kesehatan.)',
      '"Siapa temanmu yang paling baik?" (Kolaborasi.)',
      '"Apa yang membuat namamu istimewa?" (Kreativitas.)',
      '"Mengapa kita harus mengenal teman-teman kita?" (Kewargaan.)',
      '"Bagaimana caranya agar teman tahu nama kita?" (Komunikasi.)',
      '"Apa yang terjadi jika kita tidak tahu nama sendiri?" (Penalaran Kritis.)',
    ],
  ],
];
```

```
rencanaPelaksanaanAwal: (string | [string, string[]])[]
```

> Setiap item poin utama harus dalam array sendiri `['teks poin']`. Sub-poin ditulis sebagai `['judul', ['sub1', 'sub2', ...]]`. Jangan gunakan string kosong.

---

### rencanaPelaksanaanInti

Narasi pengantar untuk kegiatan **inti** pembelajaran. Jelaskan secara singkat bahwa anak akan melalui tiga tahap Deep Learning (Memahami, Mengaplikasi, Merefleksi) dengan tiga pilar (Berkesadaran, Bermakna, Menggembirakan).

```js
const rencanaPelaksanaanInti =
  "Pada tahap ini, anak aktif terlibat dalam pengalaman belajar memahami, mengaplikasi, dan merefleksi. Guru menerapkan prinsip pembelajaran berkesadaran (mindful), bermakna (meaningful), dan menggembirakan (joyful) untuk mendukung pencapaian tujuan pembelajaran secara mendalam.";
```

```
rencanaPelaksanaanInti: string
```

---

### rencanaPelaksanaanIntiTable

Array yang berisi **3 tabel kegiatan inti** sesuai tiga tahap Deep Learning. Setiap tabel memiliki struktur `{ title, rows }`:

- `title` → nama tahap belajar (lihat format baku di bawah)
- `rows` → array of `[string, string]` — kolom pertama nomor hari, kolom kedua uraian kegiatan (boleh mengandung HTML `<ol>` / `<li>`)
- Baris pertama setiap tabel **wajib** berupa header: `['<b>Hari</b>', '<b>Uraian Kegiatan</b>']`

> ⚠️ **Wajib mencerminkan `alokasiWaktu`** — Struktur tabel ini adalah representasi langsung dari nilai credential `alokasiWaktu` dengan format `N x M JP`:
> - **N** = total hari pembelajaran → jumlah baris data (di luar header) di ketiga tabel harus berjumlah **N**
> - **M** = kegiatan per hari → setiap baris harus berisi tepat **M kegiatan** (Kegiatan 1, Kegiatan 2, ... Kegiatan M)
>
> Contoh: `alokasiWaktu = '5 x 3 JP'` → 5 hari total, 3 kegiatan per hari.

**Format title yang baku (jangan diubah):**

```
'MEMAHAMI'                   → Hari 1–2
'MENGAPLIKASI'               → Hari 3–4
'MEREFLEKSI'                 → Hari 5
```

**Format uraian kegiatan per hari:**
Setiap hari harus memiliki tepat **M kegiatan** (sesuai `alokasiWaktu`) yang menyasar DPL yang bervariasi. Tulis dalam format:

```
'Kegiatan [N]: [Nama Kegiatan] ([DPL yang disasar]). Alat dan Bahan: [...]. Cara Bermain/Membuat: [...]\n\n'
```

Jika ada langkah-langkah pembuatan, gunakan `<ol><li>...</li></ol>`.

```js
const rencanaPelaksanaanIntiTable = [
  {
    title: "MEMAHAMI",
    rows: [
      ["<b>Hari</b>", "<b>Uraian Kegiatan</b>"],
      [
        "1",
        "Kegiatan 1: Mencocokkan Geometri (Kemandirian, Penalaran Kritis). Alat dan Bahan: Karton, kardus bekas, tutup botol aneka warna, gunting, pensil, lem tembak, pom-pom. Cara Membuat:\n\n" +
          "<ol>" +
          "<li>Siapkan kardus bekas, buat pola bentuk geometri, dan gambar lingkaran sebesar tutup botol.</li>" +
          "<li>Lubangi atau gunting pola tutup botol pada kardus berbentuk geometri.</li>" +
          "<li>Jiplak bentuk geometri yang sudah digunting di atas kertas karton.</li>" +
          "<li>Rekatkan tutup botol tepat di atas gambar yang sudah dijiplak berdasarkan warna tutup botol.</li>" +
          "<li>Anak-anak memasangkan bentuk geometri sesuai pola dan mengisi dengan pom-pom sesuai warna.</li>" +
          "</ol>\n\n" +
          "Kegiatan 2: Cermin Ajaib (Komunikasi, Kesehatan). Alat dan Bahan: Cermin besar yang aman untuk anak. Cara Bermain: Anak berdiri di depan cermin besar. Guru memandu anak menyebutkan namanya sambil menunjuk bayangan dirinya. Anak juga diminta menunjuk bagian tubuh utama (kepala, tangan, kaki) pada bayangannya di cermin.\n\n" +
          "Kegiatan 3: Nama dan Foto (Kolaborasi, Kreativitas). Alat dan Bahan: Foto anak-anak, kertas, lem, spidol. Cara Bermain: Tempelkan foto anak di kertas dan tuliskan nama mereka di bawahnya. Ajak anak mengenal teman dengan menyebutkan nama berdasarkan foto.",
      ],
      [
        "2",
        "Kegiatan 1: Memasukkan Mainan ke Gelas dengan Penjepit (Kemandirian, Penalaran Kritis). Alat dan Bahan: 2 tutup botol, 2 stik es krim, 1 penjepit baju, lem tembak, pom-pom, gelas kertas. Cara Membuat:\n\n" +
          "<ol>" +
          "<li>Rekatkan tutup botol pada ujung stik es krim agar dapat menjepit mainan.</li>" +
          "<li>Siapkan penjepit baju, rekatkan stik pada bagian kanan dan kiri dengan lem.</li>" +
          "<li>Gunakan penjepit untuk memasukkan pom-pom ke dalam gelas kertas berdasarkan warna.</li>" +
          "</ol>\n\n" +
          "Kegiatan 2: Tepuk Nama (Komunikasi, Kolaborasi). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak duduk melingkar. Guru menyebutkan nama seorang anak sambil bertepuk tangan; anak yang namanya disebut berdiri dan bertepuk tangan. Diulang untuk semua anak.\n\n" +
          "Kegiatan 3: Bola Nama (Kreativitas, Komunikasi). Alat dan Bahan: Bola ringan. Cara Bermain: Duduk melingkar, lempar bola satu per satu sambil menyebutkan nama penerima bola. Kegiatan ini memperkenalkan nama dan meningkatkan keterampilan sosial.",
      ],
    ],
  },
  {
    title: "MENGAPLIKASI (BERKESADARAN, BERMAKNA)",
    rows: [
      ["<b>Hari</b>", "<b>Uraian Kegiatan</b>"],
      [
        "3",
        "Kegiatan 1: Kotak Pensil Aku dan Teman (Kreativitas, Kemandirian). Alat dan Bahan: Kardus bekas, lem, gambar anak tanpa wajah, krayon, gunting. Cara Membuat:\n\n" +
          "<ol>" +
          "<li>Siapkan gambar anak tanpa wajah, warnai dengan krayon atau cat.</li>" +
          "<li>Minta anak memotong foto wajah mereka dan menempelkannya pada gambar.</li>" +
          "<li>Potong kardus membentuk persegi panjang dan gulung menjadi tabung.</li>" +
          "<li>Buat lingkaran, potong, dan tempelkan tabung di atasnya (seperti tempat pensil).</li>" +
          "<li>Tempelkan gambar foto yang sudah dibuat pada tempat pensil.</li>" +
          "</ol>\n\n" +
          "Kegiatan 2: Lompat Nama (Kesehatan, Komunikasi). Alat dan Bahan: Kertas warna-warni ditempel di lantai membentuk lingkaran. Cara Bermain: Anak melompat dari satu kertas ke kertas lain sambil menyebutkan namanya setiap kali mendarat. Melatih keseimbangan dan koordinasi.\n\n" +
          "Kegiatan 3: Gambar Keluarga (Keimanan dan Ketakwaan, Kewargaan). Alat dan Bahan: Kertas gambar, krayon atau spidol. Cara Bermain: Anak menggambar anggota keluarganya, lalu memperlihatkan dan memperkenalkan siapa saja anggota keluarganya.",
      ],
      [
        "4",
        "Kegiatan 1: Mencari Pasangan Sepatu (Penalaran Kritis, Kemandirian). Alat dan Bahan: Berbagai model dan warna sepatu. Cara Bermain:\n\n" +
          "<ol>" +
          "<li>Siapkan berbagai macam sepatu dengan model dan warna berbeda.</li>" +
          "<li>Minta anak mencari pasangan sepatu yang memiliki warna dan model yang sama.</li>" +
          "</ol>\n\n" +
          "Kegiatan 2: Menyusun Huruf Nama (Komunikasi, Kreativitas). Alat dan Bahan: Huruf-huruf magnet. Cara Bermain: Berikan huruf magnet untuk disusun menjadi nama sendiri. Setelah selesai, anak memperkenalkan nama mereka kepada teman.\n\n" +
          "Kegiatan 3: Stempel Tangan (Kemandirian, Kreativitas). Alat dan Bahan: Cat tangan, kertas besar. Cara Bermain: Anak-anak membuat cetakan tangan di kertas besar dan di bawahnya dituliskan nama mereka. Membantu mengenal identitas setiap anak secara visual.",
      ],
    ],
  },
  {
    title: "MEREFLEKSI",
    rows: [
      ["<b>Hari</b>", "<b>Uraian Kegiatan</b>"],
      [
        "5",
        "Kegiatan 1: Mencocokkan Benda dengan Gambar (Penalaran Kritis, Kemandirian). Alat dan Bahan: Kancing, stik es krim, mainan, kertas HVS, spidol atau krayon. Cara Bermain: Siapkan 3 lembar kertas HVS dengan gambar stik es krim, kancing, dan mainan yang sudah diberi warna. Minta anak mencocokkan benda nyata dengan gambarnya sesuai bentuk dan warna.\n\n" +
          "Kegiatan 2: Boneka Keluarga (Kewargaan, Kolaborasi). Alat dan Bahan: Boneka tangan atau boneka jari yang merepresentasikan anggota keluarga. Cara Bermain: Guru menggunakan boneka untuk memperkenalkan peran anggota keluarga (ayah, ibu, kakak/adik). Anak memegang boneka dan menirukan suara atau gerakan sederhana setiap anggota keluarga.\n\n" +
          "Kegiatan 3: Ayo Cari Teman (Komunikasi, Kolaborasi). Alat dan Bahan: Kartu nama anak-anak. Cara Bermain: Sebar kartu nama di lantai. Minta anak mencari kartu namanya sendiri, lalu mencari nama teman yang disebutkan guru.",
      ],
    ],
  },
];
```

```
rencanaPelaksanaanIntiTable: { title: string, rows: string[][] }[]
```

> ⚠️ **Wajib ada 3 objek tabel**: `MEMAHAMI`, `MENGAPLIKASI`, dan `MEREFLEKSI`. Setiap tabel harus dimulai dengan baris header `['<b>Hari</b>', '<b>Uraian Kegiatan</b>']`. Total 5 hari kegiatan tersebar di tiga tabel.

---

### rencanaPelaksanaanPenutup

Rencana kegiatan **penutup** pembelajaran. Harus bersifat **Berkesadaran dan Menggembirakan**. Diawali dengan narasi singkat tujuan penutup, lalu diikuti ordered list `<ol>` berisi langkah-langkah kegiatan penutup.

```js
const rencanaPelaksanaanPenutup =
  "Tahap akhir dalam proses pembelajaran yang bertujuan memberikan umpan balik konstruktif kepada anak atas pengalaman belajar yang telah dilakukan, menyimpulkan pembelajaran, dan melibatkan anak dalam perencanaan pembelajaran selanjutnya:\n" +
  "<ol>" +
  "<li>Recalling kegiatan hari ini dengan antusias dan memberikan apresiasi atas partisipasi anak</li>" +
  "<li>Anak bangga menunjukkan hasil karya dan menceritakan pengalaman belajar hari ini</li>" +
  "<li>Permainan tepuk tangan bersama sambil menyebut nama masing-masing</li>" +
  '<li>Bernyanyi lagu "Namaku" dengan gerakan sederhana sebagai penutup yang menyenangkan</li>' +
  "<li>Memberikan pelukan atau high-five sebagai bentuk penghargaan atas usaha anak hari ini</li>" +
  "<li>Doa penutup dan persiapan pulang dengan suasana riang gembira</li>" +
  "</ol>";
```

```
rencanaPelaksanaanPenutup: string
```

> Wajib ada tag `<ol>` dengan minimal 4 item `<li>`. Setiap item singkat dan jelas. Akhiri dengan suasana menyenangkan (joyful).

---

## Asesmen Pembelajaran

> **Catatan:** Asesmen di PAUD bersifat **autentik** — mengamati perilaku dan kemampuan anak secara alami, bukan tes formal. Setiap jenis asesmen diawali dengan narasi singkat tujuan, lalu diikuti `<ol>` berisi teknik asesmen yang konkret dan operasional.

### asesmenPembelajaranAwal

Asesmen sebelum pembelajaran dimulai untuk mengetahui kemampuan awal, kesiapan belajar, dan titik mulai setiap anak. Fokus pada observasi informal, bukan tes.

```js
const asesmenPembelajaranAwal =
  "Asesmen awal dilakukan untuk mengidentifikasi kemampuan dasar anak dalam mengenal identitas diri dan kesiapan mengikuti pembelajaran. Observasi difokuskan pada respon verbal, non-verbal, dan interaksi sosial anak." +
  "<ol>" +
  '<li>Tanyakan langsung "Siapa namamu?" dan catat apakah anak menjawab secara verbal, diam, atau menunjuk diri sendiri</li>' +
  "<li>Panggil nama anak satu per satu dan observasi respon (menoleh, tersenyum, atau mengabaikan)</li>" +
  "<li>Minta anak menunjuk bagian tubuh (kepala, tangan, kaki) dan catat keakuratan responnya</li>" +
  "<li>Amati tingkat kepercayaan diri anak saat berinteraksi dengan guru dan teman baru</li>" +
  "<li>Dokumentasikan kemampuan motorik awal melalui permainan sederhana seperti tepuk tangan bersama</li>" +
  "</ol>";
```

```
asesmenPembelajaranAwal: string
```

> Wajib ada `<ol>` dengan minimal 4 item `<li>`. Teknik asesmen harus operasional dan sesuai konteks anak PAUD (observasi, tanya jawab sederhana, catatan anekdotal).

---

### asesmenPembelajaranProses

Asesmen berkelanjutan selama kegiatan inti berlangsung untuk memantau perkembangan dan memberikan dukungan tepat waktu. Dilakukan sambil anak bermain dan beraktivitas.

```js
const asesmenPembelajaranProses =
  "Asesmen proses dilakukan secara berkelanjutan selama kegiatan berlangsung untuk memantau perkembangan dan memberikan dukungan tepat waktu. Fokus pada partisipasi aktif, kemajuan keterampilan, dan interaksi sosial anak." +
  "<ol>" +
  "<li>Catat frekuensi dan kejelasan anak menyebutkan nama sendiri selama berbagai aktivitas</li>" +
  "<li>Observasi keaktifan anak dalam setiap permainan dan tandai pada lembar checklist perkembangan</li>" +
  "<li>Dokumentasikan interaksi sosial positif: berbagi, membantu teman, atau bermain bersama secara kooperatif</li>" +
  "<li>Amati kemampuan mengikuti instruksi sederhana dua tahap dan berikan scaffolding jika diperlukan</li>" +
  "<li>Berikan pujian langsung saat anak menunjukkan kemajuan dan catat momen keberhasilan dalam catatan anekdotal</li>" +
  "</ol>";
```

```
asesmenPembelajaranProses: string
```

> Wajib ada `<ol>` dengan minimal 4 item `<li>`. Gunakan teknik asesmen autentik yang tidak mengganggu kegiatan bermain anak.

---

### asesmenPembelajaranAkhir

Asesmen di akhir pembelajaran untuk mengevaluasi pencapaian Tujuan Pembelajaran dan memberikan gambaran kemajuan anak secara keseluruhan.

```js
const asesmenPembelajaranAkhir =
  "Asesmen akhir mengevaluasi pencapaian tujuan pembelajaran dan memberikan gambaran kemajuan anak secara keseluruhan. Fokus pada demonstrasi kemampuan yang telah dipelajari selama satu minggu kegiatan." +
  "<ol>" +
  "<li>Minta setiap anak memperkenalkan diri di depan teman-teman; catat kelancaran dan kepercayaan dirinya</li>" +
  "<li>Uji kemampuan anak menunjuk foto diri sendiri dari kumpulan foto seluruh anak di kelas</li>" +
  "<li>Observasi kemampuan motorik melalui gerakan melambai dan bertepuk tangan saat menyebut nama sendiri</li>" +
  "<li>Dokumentasikan ekspresi kegembiraan dan antusiasme anak melalui foto atau video singkat sebagai portofolio</li>" +
  "<li>Berikan reward berupa stiker bintang atau pujian khusus dan catat reaksi positif anak terhadap penghargaan</li>" +
  "</ol>";
```

```
asesmenPembelajaranAkhir: string
```

> Wajib ada `<ol>` dengan minimal 4 item `<li>`. Asesmen akhir di PAUD harus tetap menyenangkan dan tidak menimbulkan kecemasan pada anak.