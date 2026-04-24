# Unexpected Output

Dalam beberapa kasus, terutama saat menggunakan AI untuk menghasilkan kode atau dokumen, mungkin ada output yang tidak diinginkan atau tidak relevan yang muncul. Hal ini bisa disebabkan oleh berbagai faktor seperti kesalahan dalam prompt, keterbatasan model AI, atau bahkan bug dalam sistem.

Contoh output yang tidak diinginkan bisa berupa:
---
1. Nama variabel yang tidak sesuai dengan yang diharapkan.
2. Typo atau kesalahan penulisan dalam kode yang dihasilkan.
3. Penambahan teks atau komentar yang tidak relevan.
4. Format kode yang tidak konsisten atau tidak mengikuti format yang ditentukan.
5. Penggunaan fungsi atau metode yang tidak sesuai dengan konteks.
6. Output yang terlalu sederhana atau terlalu kompleks dibandingkan dengan yang diharapkan.
---
```js
const identifikasiPesertaDidik = 'Anak kelompok A (2-3 tahun) memiliki kemampuan bahasa yang sedang berkembang dengan kosakata terbatas namun mulai dapat mengungkapkan kebutuhan dasar. Mereka sangat membutuhkan pengulangan dan bimbingan dalam pengenalan identitas diri, serta masih dalam tahap mengembangkan kepercayaan terhadap lingkungan sekitar. Anak-anak pada usia ini belajar melalui eksplorasi sensori dan memerlukan dukungan emosional yang konsisten.';
const identifikasiMateriPembelajaran = 'Materi pengenalan identitas diri mencakup pengetahuan esensial tentang nama dan bagian tubuh, pengetahuan aplikatif dalam berinteraksi sosial sederhana, serta pengetahuan nilai dan karakter melalui rasa percaya diri dan kemandirian. Materi ini sangat relevan dengan kehidupan sehari-hari anak dan memiliki tingkat kesulitan yang sesuai dengan tahap perkembangan mereka, mengintegrasikan nilai keimanan, kejujuran, dan kemandirian.';
const identifikasiDimensiProfilLulusan = {
  dpl1: true, // Keimanan dan Ketakwaan terhadap Tuhan YME
  dpl2: true, // Kewargaan
  dpl3: true, // Penalaran kritis
  dpl4: false, // Kreativitas
  dpl5: true, // Kolaborasi
  dpl6: true, // Kemandirian
  dpl7: false, // Kesehatan
  dpl8: true // Komunikasi
};
const kegiatanPembelajaran = 'Kegiatan pembelajaran dirancang untuk anak kelompok A (2-3 tahun) dengan pendekatan kolaboratif dan eksperimental. Kegiatan ini melibatkan eksplorasi diri melalui permainan peran, pengenalan bagian tubuh dengan lagu dan gerakan, serta interaksi sosial sederhana untuk membangun kepercayaan diri. Setiap kegiatan disesuaikan dengan kebutuhan perkembangan anak, memberikan dukungan emosional, dan memfasilitasi pembelajaran yang menyenangkan dan bermakna.';
```
---
```js
const rencanaPelaksanaanIntiTable = [
  {
    title: "MEMAHAMI",
    rows: [
      ["<b>Hari</b>", "<b>Uraian Kegiatan</b>"],
      [
        "1",
        "Kegiatan 1: Mengenal Foto Keluarga (Komunikasi, Kolaborasi). Alat dan Bahan: Foto keluarga anak-anak, kertas, lem. Cara Bermain: Guru meminta anak menunjuk foto ayah atau ibu mereka dan menyebutkan namanya. Kemudian guru meminta anak untuk memperlihatkan foto keluarga mereka ke teman-temannya.\n\nKegiatan 2: Boneka Keluarga (Kewargaan, Komunikasi). Alat dan Bahan: Boneka tangan atau boneka jari yang merepresentasikan anggota keluarga. Cara Bermain: Guru menggunakan boneka untuk memperkenalkan anggota keluarga (ayah, ibu, kakak/adik). Anak memegang boneka dan menirukan suara atau gerakan sederhana untuk setiap anggota keluarga.\n\nKegiatan 3: Menyanyikan Lagu \"Sayang Semuanya\" (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu \"Sayang Semuanya\" sambil melakukan gerakan sederhana untuk menunjukkan kasih sayang terhadap anggota keluarga."
      ],
      [
        "2",
        "Kegiatan 1: Menceritakan Foto Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Foto keluarga anak-anak, kertas, spidol. Cara Bermain: Guru meminta anak untuk menceritakan satu hal tentang salah satu anggota keluarga di foto mereka. Guru memberikan contoh pertama, seperti \"Ini ayahku, dia bekerja di toko.\"\n\nKegiatan 2: Peran Boneka Keluarga (Kolaborasi, Kewargaan). Alat dan Bahan: Boneka keluarga. Cara Bermain: Guru mengajak anak bermain peran sebagai anggota keluarga. Misalnya, anak A bertindak sebagai ayah, anak B sebagai ibu, dan anak C sebagai kakak. Mereka melakukan aktivitas sederhana seperti makan malam bersama.\n\nKegiatan 3: Bernyanyi Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga lainnya, seperti \"Keluarga Besar\" atau \"Aku Cinta Keluarga\"."
      ],
      [
        "3",
        "Kegiatan 1: Membuat Pohon Keluarga Sederhana (Kreativitas, Kewargaan). Alat dan Bahan: Kardus bekas, kertas warna-warni, gunting, lem, spidol, foto anggota keluarga. Cara Membuat:\n\n<ol><li>Potong kardus membentuk daun pohon besar.</li><li>Gambar batang pohon di tengah kardus.</li><li>Potong kertas warna-warni membentuk lingkaran untuk mahkota pohon.</li><li>Tempelkan foto anggota keluarga di lingkaran mahkota pohon.</li><li>Tuliskan nama masing-masing anggota keluarga di bawah foto dengan spidol.</li></ol>\n\nKegiatan 2: Menempelkan Foto Keluarga (Kreativitas, Kewargaan). Alat dan Bahan: Foto anak-anak, kertas, lem. Cara Bermain: Guru meminta anak menempelkan foto mereka sendiri di bagian tengah pohon keluarga yang telah dibuat.\n\nKegiatan 3: Menceritakan Pohon Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Pohon keluarga anak-anak. Cara Bermain: Guru meminta setiap anak untuk memperlihatkan pohon keluarga mereka kepada teman-temannya dan menceritakan siapa saja yang ada di pohon keluarga mereka."
      ],
      [
        "4",
        "Kegiatan 1: Gambar Keluarga (Kreativitas, Kewargaan). Alat dan Bahan: Kertas gambar, krayon atau spidol. Cara Bermain: Guru meminta anak-anak menggambar keluarganya. Setelah selesai, setiap anak bisa memperlihatkan dan memperkenalkan siapa saja anggota keluarganya.\n\nKegiatan 2: Permainan Pasang Nama (Komunikasi, Kewargaan). Alat dan Bahan: Kartu nama anggota keluarga, kotak karton. Cara Bermain: Guru meletakkan kartu nama anggota keluarga di lantai. Guru meminta anak mencocokkan nama dengan gambar anggota keluarga yang sesuai.\n\nKegiatan 3: Menyanyikan Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga lainnya."
      ],
      [
        "5",
        "Kegiatan 1: Bermain Peran Sebagai Anggota Keluarga (Kolaborasi, Kewargaan). Alat dan Bahan: Kostum sederhana untuk anggota keluarga (opsional). Cara Bermain: Guru mengajak anak bermain peran sebagai anggota keluarga. Mereka melakukan aktivitas sederhana seperti makan malam bersama, membersihkan rumah, atau bermain bersama.\n\nKegiatan 2: Menceritakan Pengalaman Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak menceritakan satu pengalaman indah bersama keluarga mereka. Guru memberikan contoh pertama, seperti \"Suatu hari, keluarga saya pergi ke pantai.\"\n\nKegiatan 3: Penutupan Aktivitas (Keimanan dan Ketakwaan, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk bersyukur atas keluarga mereka dengan doa singkat atau ucapan syukur."
      ],
      [
        "6",
        "Kegiatan 1: Mencocokkan Nama dan Gambar Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Kartu nama anggota keluarga, kartu gambar anggota keluarga. Cara Bermain: Guru meminta anak mencocokkan nama dengan gambar anggota keluarga yang sesuai.\n\nKegiatan 2: Menyanyikan Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga lainnya untuk mengakhiri hari pembelajaran.\n\nKegiatan 3: Memberi Apresiasi (Kolaborasi, Kewargaan). Alat dan Bahan: Stiker atau kado sertifikasi kecil. Cara Bermain: Guru memberikan apresiasi kepada anak yang telah aktif dalam kegiatan dan mencoba menyebutkan nama anggota keluarga mereka."
      ],
      [
        "7",
        "Kegiatan 1: Refleksi Singkat (Kewargaan, Komunikasi). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk merangkum apa yang telah dipelajari tentang keluarga mereka selama minggu ini. Guru memberikan contoh pertama, seperti \"Pada hari ini, saya belajar nama ayahku.\"\n\nKegiatan 2: Menyanyikan Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga untuk mengakhiri hari pembelajaran.\n\nKegiatan 3: Doa Penutup (Keimanan dan Ketakwaan, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk berdoa sebagai bentuk penutup yang syukur atas keluarga mereka."
      ]
    ]
  },
  {
    title: "MEMAHAMI",
    rows: [
      ["<b>Hari</b>", "<b>Uraian Kegiatan</b>"],
      [
        "3",
        "Kegiatan 1: Membuat Pohon Keluarga Sederhana (Kreativitas, Kewargaan). Alat dan Bahan: Kardus bekas, kertas warna-warni, gunting, lem, spidol, foto anggota keluarga. Cara Membuat:\n\n<ol><li>Potong kardus membentuk daun pohon besar.</li><li>Gambar batang pohon di tengah kardus.</li><li>Potong kertas warna-warni membentuk lingkaran untuk mahkota pohon.</li><li>Tempelkan foto anggota keluarga di lingkaran mahkota pohon.</li><li>Tuliskan nama masing-masing anggota keluarga di bawah foto dengan spidol.</li></ol>\n\nKegiatan 2: Menempelkan Foto Keluarga (Kreativitas, Kewargaan). Alat dan Bahan: Foto anak-anak, kertas, lem. Cara Bermain: Guru meminta anak menempelkan foto mereka sendiri di bagian tengah pohon keluarga yang telah dibuat.\n\nKegiatan 3: Menceritakan Pohon Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Pohon keluarga anak-anak. Cara Bermain: Guru meminta setiap anak untuk memperlihatkan pohon keluarga mereka kepada teman-temannya dan menceritakan siapa saja yang ada di pohon keluarga mereka."
      ],
      [
        "4",
        "Kegiatan 1: Gambar Keluarga (Kreativitas, Kewargaan). Alat dan Bahan: Kertas gambar, krayon atau spidol. Cara Bermain: Guru meminta anak-anak menggambar keluarganya. Setelah selesai, setiap anak bisa memperlihatkan dan memperkenalkan siapa saja anggota keluarganya.\n\nKegiatan 2: Permainan Pasang Nama (Komunikasi, Kewargaan). Alat dan Bahan: Kartu nama anggota keluarga, kotak karton. Cara Bermain: Guru meletakkan kartu nama anggota keluarga di lantai. Guru meminta anak mencocokkan nama dengan gambar anggota keluarga yang sesuai.\n\nKegiatan 3: Menyanyikan Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga lainnya."
      ],
      [
        "5",
        "Kegiatan 1: Bermain Peran Sebagai Anggota Keluarga (Kolaborasi, Kewargaan). Alat dan Bahan: Kostum sederhana untuk anggota keluarga (opsional). Cara Bermain: Guru mengajak anak bermain peran sebagai anggota keluarga. Mereka melakukan aktivitas sederhana seperti makan malam bersama, membersihkan rumah, atau bermain bersama.\n\nKegiatan 2: Menceritakan Pengalaman Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak menceritakan satu pengalaman indah bersama keluarga mereka. Guru memberikan contoh pertama, seperti \"Suatu hari, keluarga saya pergi ke pantai.\"\n\nKegiatan 3: Penutupan Aktivitas (Keimanan dan Ketakwaan, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk bersyukur atas keluarga mereka dengan doa singkat atau ucapan syukur."
      ]
    ]
  },
  {
    title: "MEREFLEKSI",
    rows: [
      ["<b>Hari</b>", "<b>Uraian Kegiatan</b>"],
      [
        "6",
        "Kegiatan 1: Mencocokkan Nama dan Gambar Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Kartu nama anggota keluarga, kartu gambar anggota keluarga. Cara Bermain: Guru meminta anak mencocokkan nama dengan gambar anggota keluarga yang sesuai.\n\nKegiatan 2: Menyanyikan Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga lainnya untuk mengakhiri hari pembelajaran.\n\nKegiatan 3: Memberi Apresiasi (Kolaborasi, Kewargaan). Alat dan Bahan: Stiker atau kado sertifikasi kecil. Cara Bermain: Guru memberikan apresiasi kepada anak yang telah aktif dalam kegiatan dan mencoba menyebutkan nama anggota keluarga mereka."
      ],
      [
        "7",
        "Kegiatan 1: Refleksi Singkat (Kewargaan, Komunikasi). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk merangkum apa yang telah dipelajari tentang keluarga mereka selama minggu ini. Guru memberikan contoh pertama, seperti \"Pada hari ini, saya belajar nama ayahku.\"\n\nKegiatan 2: Menyanyikan Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga untuk mengakhiri hari pembelajaran.\n\nKegiatan 3: Doa Penutup (Keimanan dan Ketakwaan, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk berdoa sebagai bentuk penutup yang syukur atas keluarga mereka."
      ]
    ]
  }
];
```
Kode di atas menunjukkan output yang tidak diinginkan karena terdapat perulangan pada hari dari hari 1 -7 diulang lagi dari 1-7, sehingga total hari menjadi 14 hari. Selain itu, terdapat beberapa kegiatan yang diulang pada hari yang berbeda, sehingga tidak sesuai dengan rencana pembelajaran yang diinginkan. Output ini perlu divalidasi ulang untuk memastikan bahwa variabel yang dihasilkan sesuai dengan kebutuhan dan tidak mengandung informasi yang tidak relevan atau berlebihan.
---
```js
const rencanaPelaksanaanIntiTable = [
  {
    title: 'MEMAHAMI',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '1',
        'Kegiatan 1: Mengenal Foto Keluarga (Komunikasi, Kolaborasi). Alat dan Bahan: Foto keluarga anak-anak, kertas, lem. Cara Bermain: Guru meminta anak menunjuk foto ayah atau ibu mereka dan menyebutkan namanya. Kemudian guru meminta anak untuk memperlihatkan foto keluarga mereka ke teman-temannya.\n\nKegiatan 2: Boneka Keluarga (Kewargaan, Komunikasi). Alat dan Bahan: Boneka tangan atau boneka jari yang merepresentasikan anggota keluarga. Cara Bermain: Guru menggunakan boneka untuk memperkenalkan anggota keluarga (ayah, ibu, kakak/adik). Anak memegang boneka dan menirukan suara atau gerakan sederhana untuk setiap anggota keluarga.\n\nKegiatan 3: Menyanyikan Lagu "Sayang Semuanya" (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu "Sayang Semuanya" sambil melakukan gerakan sederhana untuk menunjukkan kasih sayang terhadap anggota keluarga.'
      ],
      [
        '2',
        'Kegiatan 1: Menceritakan Foto Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Foto keluarga anak-anak, kertas, spidol. Cara Bermain: Guru meminta anak untuk menceritakan satu hal tentang salah satu anggota keluarga di foto mereka. Guru memberikan contoh pertama, seperti "Ini ayahku, dia bekerja di toko."\n\nKegiatan 2: Peran Boneka Keluarga (Kolaborasi, Kewargaan). Alat dan Bahan: Boneka keluarga. Cara Bermain: Guru mengajak anak bermain peran sebagai anggota keluarga. Misalnya, anak A bertindak sebagai ayah, anak B sebagai ibu, dan anak C sebagai kakak. Mereka melakukan aktivitas sederhana seperti makan malam bersama.\n\nKegiatan 3: Bernyanyi Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga lainnya, seperti "Keluarga Besar" atau "Aku Cinta Keluarga".'
      ]
    ]
  },
  {
    title: 'MENGAPLIKASI (BERKESADARAN, BERMAKNA)',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '3',
        'Kegiatan 1 : Membuat Pohon Keluarga Sederhana (Kreativitas, Kewargaan). Alat dan Bahan, Kardus bekas, kertas warna-warni, gunting, lem, spidol, foto anggota keluarga. Cara Membuat:\n' +
        '<ol>' +
        '<li>Potong kardus membentuk daun pohon besar.</li>' +
        '<li>Gambar batang pohon di tengah kardus.</li>' +
        '<li>Potong kertas warna-warni membentuk lingkaran untuk mahkota pohon.</li>' +
        '<li>Tempelkan foto anggota keluarga di lingkaran mahkota pohon.</li>' +
        '<li>Tuliskan nama masing-masing anggota keluarga di bawah foto dengan spidol.</li>' +
        '</ol>\n\n' +
        'Kegiatan 2: Menempelkan Foto Keluarga (Kreativitas, Kewargaan). Alat dan Bahan: Foto anak-anak, kertas, lem. Cara Bermain: Guru meminta anak menempelkan foto mereka sendiri di bagian tengah pohon keluarga yang telah dibuat.\n\nKegiatan 3: Menceritakan Pohon Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Pohon keluarga anak-anak. Cara Bermain: Guru meminta setiap anak untuk memperlihatkan pohon keluarga mereka kepada teman-temannya dan menceritakan siapa saja yang ada di pohon keluarga mereka.'
      ],
      [
        '4',
        'Kegiatan 1: Gambar Keluarga (Kreativitas, Kewargaan). Alat dan Bahan: Kertas gambar, krayon atau spidol. Cara Bermain: Guru meminta anak-anak menggambar keluarganya. Setelah selesai, setiap anak bisa memperlihatkan dan memperkenalkan siapa saja anggota keluarganya.\n\nKegiatan 2: Permainan Pasang Nama (Komunikasi, Kewargaan). Alat dan Bahan: Kartu nama anggota keluarga, kotak karton. Cara Bermain: Guru meletakkan kartu nama anggota keluarga di lantai. Guru meminta anak mencocokkan nama dengan gambar anggota keluarga yang sesuai.\n\nKegiatan 3: Menyanyikan Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga lainnya.'
      ]
    ]
  },
  {
    title: 'MEREFLEKSI',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '5',
        'Kegiatan 1: Bermain Peran Sebagai Anggota Keluarga (Kolaborasi, Kewargaan). Alat dan Bahan: Kostum sederhana untuk anggota keluarga (opsional). Cara Bermain: Guru mengajak anak bermain peran sebagai anggota keluarga. Mereka melakukan aktivitas sederhana seperti makan malam bersama, membersihkan rumah, atau bermain bersama.\n\nKegiatan 2: Menceritakan Pengalaman Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak menceritakan satu pengalaman indah bersama keluarga mereka. Guru memberikan contoh pertama, seperti "Suatu hari, keluarga saya pergi ke pantai."\n\nKegiatan 3: Penutupan Aktivitas (Keimanan dan Ketakwaan, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk bersyukur atas keluarga mereka dengan doa singkat atau ucapan syukur.'
      ]
    ]
  }
]
```

Variabel diatas hanya membuat sebanyak 5 Hari kegiatan padahal user meminta alokasi waktu sebanyak `7 x 3 JP` yang berarti harus ada 7 hari dengan masing-masing 3 kegiatan. Output diatas tidak membuat variable secara lengkap, pastikan divalidasi ulang sebelum dikirim ke user.
---
```js
      [
        "7",
        "Kegiatan 1: Refleksi Singkat (Kewargaan, Komunikasi). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk merangkum apa yang telah dipelajari tentang keluarga mereka selama minggu ini. Guru memberikan contoh pertama, seperti \"Pada hari ini, saya belajar nama ayahku.\"\n\nKegiatan 2: Menyanyikan Lagu Keluarga (Keimanan dan Ketakwaan, Komunikasi). Alat dan Bahan: Musik latar. Cara Bermain: Guru mengajak anak menyanyikan lagu keluarga untuk mengakhiri hari pembelajaran.\n\nKegiatan 3: Doa Penutup (Keimanan dan Ketakwaan, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk berdoa sebagai bentuk penutup yang syukur atas keluarga mereka."
      ]
    ]
  },
  {
    title: "MEREFLEKSI",
    rows: [
      ["<b>Hari</b>", "<b>Uraian Kegiatan</b>"],
      [
        "5",
        "Kegiatan 1: Bermain Peran Sebagai Anggota Keluarga (Kolaborasi, Kewargaan). Alat dan Bahan: Kostum sederhana untuk anggota keluarga (opsional). Cara Bermain: Guru mengajak anak bermain peran sebagai anggota keluarga. Mereka melakukan aktivitas sederhana seperti makan malam bersama, membersihkan rumah, atau bermain bersama.\n\nKegiatan 2: Menceritakan Pengalaman Keluarga (Komunikasi, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak menceritakan satu pengalaman indah bersama keluarga mereka. Guru memberikan contoh pertama, seperti \"Suatu hari, keluarga saya pergi ke pantai.\"\n\nKegiatan 3: Penutupan Aktivitas (Keimanan dan Ketakwaan, Kewargaan). Alat dan Bahan: Tidak diperlukan. Cara Bermain: Guru mengajak anak untuk bersyukur atas keluarga mereka dengan doa singkat atau ucapan syukur."
      ]
    ]
  }
```
Potongan kode diatas, aneh, karenah setelah hari ke 7, kembali lagi ke hari ke-5, padahal pemintaan user adalah alokasi waktu sebanyak `7 x 3 JP` yang berarti harus ada 7 hari dengan masing-masing 3 kegiatan. Output diatas tidak membuat variable secara lengkap, pastikan divalidasi ulang sebelum dikirim ke user.
---

Output diatas tidak membuat variable secara lengkap, pastikan divalidasi ulang sebelum dikirim ke user.
Tolong diingat bahwa alokasi waktu itu berbeda setiap request, jadi diatas hanyalah contoh output yang tidak diinginkan, pastikan untuk memvalidasi ulang setiap output yang dihasilkan oleh AI untuk memastikan bahwa variabel yang dihasilkan sesuai dengan kebutuhan dan tidak mengandung informasi yang tidak relevan atau berlebihan.
---
```js
const rencanaPelaksanaanAwal = [
  ['Pembuka dari proses pembelajaran yang bertujuan untuk mempersiapkan peserta didik sebelum memasuki inti pembelajaran.'],
  ['Kegiatan dalam tahap ini meliputi orientasi yang bermakna, apersepsi yang kontekstual, dan motivasi yang menggembirakan:', [
    'Salam dan doa pembuka untuk menciptakan suasana tenang dan fokus.',
    'Menyanyikan lagu "Hari Merdeka" untuk membangun semangat nasionalisme.'
  ]],
  ['Kegiatan pemantik dengan tayangan gambar bendera merah putih dan berbagai jenis tumbuhan di Indonesia.'],
  ['Permainan konsentrasi sederhana "Cari Pasangan Warna" untuk memusatkan perhatian anak.'],
  ['Pertanyaan pemantik untuk mengembangkan berbagai aspek:', [
    '"Mengapa kita harus bersyukur atas tumbuhan yang Tuhan ciptakan?" (Keimanan dan Ketakwaan.)',
    '"Apa yang bisa kita lakukan untuk menjaga lingkungan sekolah?" (Kewargaan.)',
    '"Bagaimana perasaanmu saat melihat bendera merah putih?" (Kesehatan.)',
    '"Siapa yang pernah merayakan hari kemerdekaan di rumah?" (Kolaborasi.)',
    '"Apa karyamu yang bisa mewakili semangat merdeka?" (Kreativitas.)',
    '"Bagaimana cara kita menjaga persatuan seperti ranting pohon yang saling menopang?" (Kewargaan.)',
    '"Bagaimana cara menjelaskan ke teman tentang pentingnya merawat tumbuhan?" (Komunikasi.)',
    '"Mengapa kita harus mandiri dalam merawat lingkungan?" (Kemandirian.)'
  ]]
]
const rencanaPelaksanaanInti = 'Pada tahap ini, anak aktif terlibat dalam pengalaman belajar memahami, mengaplikasi, dan merefleksi. Guru menerapkan prinsip pembelajaran berkesadaran, bermakna, menggembirakan untuk mencapai tujuan pembelajaran.'
const rencanaPelaksanaanIntiTable = [
  {
    title: 'MEMAHAMI',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '1',
        'Kegiatan 1: Merah Putih Bersama Tumbuhan (Keimanan dan Ketakwaan, Kewargaan, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi). Alat dan Bahan: Pohon atau tanaman kecil di pot, cat air merah dan putih, kuas, kertas karton besar, foto bendera merah putih, stiker bintang, musik kebangsaan. Cara Bermain: Anak-anak diajak berdiri mengelilingi tanaman. Guru memulai dengan menyanyikan lagu kebangsaan, lalu menjelaskan bahwa merah putih adalah warna bendera Indonesia yang melambangkan keberanian dan kemurnian. Anak-anak kemudian menghias pot tanaman dengan cat merah putih, membuat pola seperti bendera atau bintang. Selanjutnya, mereka menyiram tanaman bersama-sama sambil menyanyikan lagu "Maju Tak Gentar". Kegiatan diakhiri dengan anak menempelkan stiker bintang di kertas karton besar sebagai simbol harapan untuk Indonesia.'
      ]
    ]
  },
  {
    title: 'MENGAPLIKASI (BERKESADARAN, BERMAKNA)',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '1',
        'Kegiatan 1: Merah Putih Bersama Tumbuhan (Keimanan dan Ketakwaan, Kewargaan, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi). Alat dan Bahan: Pohon atau tanaman kecil di pot, cat air merah dan putih, kuas, kertas karton besar, foto bendera merah putih, stiker bintang, musik kebangsaan. Cara Bermain: Anak-anak diajak berdiri mengelilingi tanaman. Guru memulai dengan menyanyikan lagu kebangsaan, lalu menjelaskan bahwa merah putih adalah warna bendera Indonesia yang melambangkan keberanian dan kemurnian. Anak-anak kemudian menghias pot tanaman dengan cat merah putih, membuat pola seperti bendera atau bintang. Selanjutnya, mereka menyiram tanaman bersama-sama sambil menyanyikan lagu "Maju Tak Gentar". Kegiatan diakhiri dengan anak menempelkan stiker bintang di kertas karton besar sebagai simbol harapan untuk Indonesia.'
      ]
    ]
  },
  {
    title: 'MEREFLEKSI',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '1',
        'Kegiatan 1: Merah Putih Bersama Tumbuhan (Keimanan dan Ketakwaan, Kewargaan, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi). Alat dan Bahan: Pohon atau tanaman kecil di pot, cat air merah dan putih, kuas, kertas karton besar, foto bendera merah putih, stiker bintang, musik kebangsaan. Cara Bermain: Anak-anak diajak berdiri mengelilingi tanaman. Guru memulai dengan menyanyikan lagu kebangsaan, lalu menjelaskan bahwa merah putih adalah warna bendera Indonesia yang melambangkan keberanian dan kemurnian. Anak-anak kemudian menghias pot tanaman dengan cat merah putih, membuat pola seperti bendera atau bintang. Selanjutnya, mereka menyiram tanaman bersama-sama sambil menyanyikan lagu "Maju Tak Gentar". Kegiatan diakhiri dengan anak menempelkan stiker bintang di kertas karton besar sebagai simbol harapan untuk Indonesia.'
      ]
    ]
  }
]
```

User hanya meminta 1 hari dengan 1 kegiatan (1 x 1 JP.) namun output diatas membuat 3 hari (1 hari diulang sebanyak 3 kali) dengan 1 kegiatan yang sama, sehingga total kegiatan menjadi 3 kegiatan. Output ini perlu divalidasi ulang untuk memastikan bahwa variabel yang dihasilkan sesuai dengan kebutuhan dan tidak mengandung informasi yang tidak relevan atau berlebihan.

Seharusnya output yang dihasilkan adalah seperti berikut:
```js
const rencanaPelaksanaanIntiTable = [
  {
    title: 'MEMAHAMI - MENGAPLIKASI - MEREFLEKSI',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '1',
        'Kegiatan 1: Merah Putih Bersama Tumbuhan (Keimanan dan Ketakwaan, Kewargaan, Kreativitas, Kolaborasi, Kemandirian, Kesehatan, Komunikasi). Alat dan Bahan: Pohon atau tanaman kecil di pot, cat air merah dan putih, kuas, kertas karton besar, foto bendera merah putih, stiker bintang, musik kebangsaan. Cara Bermain: Anak-anak diajak berdiri mengelilingi tanaman. Guru memulai dengan menyanyikan lagu kebangsaan, lalu menjelaskan bahwa merah putih adalah warna bendera Indonesia yang melambangkan keberanian dan kemurnian. Anak-anak kemudian menghias pot tanaman dengan cat merah putih, membuat pola seperti bendera atau bintang. Selanjutnya, mereka menyiram tanaman bersama-sama sambil menyanyikan lagu "Maju Tak Gentar". Kegiatan diakhiri dengan anak menempelkan stiker bintang di kertas karton besar sebagai simbol harapan untuk Indonesia.'
      ]
    ]
  }
]
