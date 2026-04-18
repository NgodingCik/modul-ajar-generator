# Unexpected Output

Dalam beberapa kasus, terutama saat menggunakan AI untuk menghasilkan kode atau dokumen, mungkin ada output yang tidak diinginkan atau tidak relevan yang muncul. Hal ini bisa disebabkan oleh berbagai faktor seperti kesalahan dalam prompt, keterbatasan model AI, atau bahkan bug dalam sistem.

Contoh output yang tidak diinginkan bisa berupa:
---
```javascript
(async () => {
  const doc = new Document({
    styles: {
      default: new DocumentDefaults({
        paragraph: { spacing }
      }),
      paragraphStyles: paragraphStyles
    },
    sections: [
      coverPage,
      {
        properties,
        children: [
          createHeading('MODUL AJAR FASE FONDASI', 'Title'),
          createParagraph('TOPIK/SUB-TOPIK : Keluarga / Anggota Keluarga', 'Normal'),
          createParagraph('MINGGU KE : 1', 'Normal'),
          createHeadingWithChildren(
            'A. IDENTITAS MODUL',
            2,
            [
              new Table({
                rows: [
                  new TableRow({ children: formField('Nama Sekolah') }),
                  new TableRow({ children: formField('Nama Penyusun') }),
                  new TableRow({ children: formField('NIP') }),
                  new TableRow({ children: formField('Tema / Subtema') }),
                  new TableRow({ children: formField('Fase / Kelas / Semester') }),
                  new TableRow({ children: formField('Alokasi Waktu') }),
                  new TableRow({ children: formField('Tahun Pelajaran') })
                ],
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE
                }
              })
            ]
          ),
          createHeadingWithChildren(
            'B. IDENTIFIKASI KESIAPAN PESERTA DIDIK',
            2,
            [
              ...bulletPoint('Pengetahuan Awal: ', 'Peserta didik telah memiliki pengetahuan dasar tentang nama-nama anggota keluarga dalam bahasa Indonesia dan Inggris.'),
              ...bulletPoint('Minat: ', 'Peserta didik menunjukkan minat tinggi terhadap aktivitas seni dan musik, khususnya menggambar dan menyanyi.'),
              ...bulletPoint('Latar Belakang: ', 'Kebanyakan peserta didik tinggal di lingkungan perkotaan dengan struktur keluarga inti atau ekstra.'),
              ...bulletPoint('Kebutuhan Belajar: ', '', [
                { label: 'Visual: ', text: 'Peserta didik belajar lebih baik dengan bantuan gambar, infografis, dan media visual lainnya.' },
                { label: 'Auditori: ', text: 'Peserta didik perlu mendengarkan cerita, dialog, dan penjelasan secara langsung.' },
                { label: 'Kinestetik: ', text: 'Peserta didik memerlukan aktivitas bergerak seperti permainan dan praktik langsung untuk memahami konsep.' }
              ])
            ]
          ),
          createHeadingWithChildren(
            'C. KARAKTERISTIK KEGIATAN BERMAIN',
            2,
            [
              ...bulletPoint('Peta Konsep: ', 'Topik pembelajaran ini berfokus pada pengenalan dan pemahaman anggota keluarga melalui kegiatan seni (menggambar, kolase) dan musik (menyanyikan lagu).'),
              ...bulletPoint('Relevansi Kontekstual: ', 'Memahami struktur keluarga penting bagi anak untuk mengembangkan rasa percaya diri dan hubungan sosial yang sehat.'),
              ...bulletPoint('Nilai Karakter: ', 'Kemandirian, Rasa Hormat, dan Kerja Sama'),
              ...bulletPoint('Tingkat Stimulasi: ', 'Bahasa, Kognitif, Fisik')
            ]
          ),
          createHeadingWithChildren(
            'D. DIMENSI PROFIL PELAJAR PANCASILA',
            2,
            [
              ...bulletPoint('Mandiri', 'Anak dapat memilih media seni untuk menggambar anggota keluarga tanpa bimbingan langsung dari guru.'),
              ...bulletPoint('Gotong Royong', 'Anak bekerja sama dalam membuat kolase keluarga bersama teman sebaya.'),
              ...bulletPoint('Kreatif', 'Anak menghasilkan karya seni orisinal berupa gambar atau kolase anggota keluarga.'),
              ...bulletPoint('Bernalar Kritis', 'Anak dapat menyebutkan perbedaan antara keluarga inti dan ekstra berdasarkan pengamatan.'),
              ...bulletPoint('Berkebinekaan Global', 'Anak mengenal berbagai struktur keluarga di dunia melalui cerita dan gambar.')
            ]
          ),
          createHeading('DESIGN PEMBELAJARAN', 'Heading1'),
          createHeadingWithChildren(
            'A. CAPAIAN PEMBELAJARAN (CP)',
            2,
            [
              ...bulletPoint('Jati Diri', 'Anak dapat mengenali dan menyebutkan anggota keluarga inti dan ekstra.')
            ]
          ),
          createHeadingWithChildren(
            'B. PERTANYAAN PEMANTIK',
            2,
            [
              ...bulletPoint('Pertanyaan: ', '"Siapa sajakah yang termasuk dalam keluargamu?"')
            ]
          ),
          createHeadingWithChildren(
            'C. TUJUAN PEMBELAJARAN',
            2,
            [
              ...bulletPoint('TP1: ', 'Anak dapat menyebutkan anggota keluarga inti (ayah, ibu, saudara).'),
              ...bulletPoint('TP2: ', 'Anak dapat menggambar anggota keluarga menggunakan bentuk sederhana.'),
              ...bulletPoint('TP3: ', 'Anak dapat menyanyikan lagu tentang keluarga.')
            ]
          ),
          createHeadingWithChildren(
            'D. SARANA DAN PRASARANA',
            2,
            [
              ...bulletPoint('Alat Main: ', 'Bahan alam seperti daun, batu kecil, kertas warna, pensil warna, spidol, dan karton.'),
              ...bulletPoint('Media: ', 'Buku cerita tentang keluarga, video animasi singkat, dan speaker untuk menyanyikan lagu.')
            ]
          ),
          createHeadingWithChildren(
            'E. KERANGKA PEMBELAJARAN',
            2,
            [
              createHeadingWithChildren(
                'PRAKTIK PEDAGOGIK',
                3,
                [
                  ...bulletPoint('Model Pembelajaran: ', 'Area Play dan Project-Based Learning'),
                  ...bulletPoint('Metode: ', 'Eksplorasi, Tanya Jawab, Demonstrasi')
                ]
              ),
              createHeadingWithChildren(
                'KEMITRAAN PEMBELAJARAN',
                3,
                [
                  ...bulletPoint('Pihak Terlibat: ', 'Orang tua sebagai narasumber untuk berbagi cerita tentang keluarga mereka.')
                ]
              ),
              createHeadingWithChildren(
                'LINGKUNGAN BELAJAR',
                3,
                [
                  ...bulletPoint('Penataan: ', 'Lingkungan main dibagi menjadi area seni (menggambar, kolase) dan area musik (menyanyikan lagu). Lingkungan disediakan dengan perlengkapan yang aman, nyaman, dan kaya akan bahan untuk eksplorasi.')
                ]
              ),
              createHeadingWithChildren(
                'PEMANFAATAN DIGITAL',
                3,
                [
                  ...bulletPoint('Alat Digital: ', 'Tablet digunakan untuk menampilkan video animasi tentang keluarga, dan speaker digunakan untuk menyanyikan lagu bersama.')
                ]
              )
            ]
          ),
          createHeadingWithChildren(
            'F. LANGKAH-LANGKAH KEGIATAN BERMAIN (BERDIFERENSIASI)',
            2,
            [
              createHeadingWithChildren(
                'PERTEMUAN 1',
                3,
                [
                  ...bulletPoint('KEGIATAN PEMBUKA: ', 'Menyapa anak dan memperkenalkan tema keluarga dengan gambar dan cerita singkat. Guru membacakan buku cerita tentang keluarga.'),
                  ...bulletPoint('KEGIATAN INTI: ', 'Mengajak anak menyebutkan anggota keluarga inti dan menggambar anggota keluarga menggunakan bentuk sederhana. Peserta didik bebas memilih media untuk menggambar (spidol, pensil warna, atau cat air).'),
                  ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.')
                ]
              ),
              createHeadingWithChildren(
                'PERTEMUAN 2',
                3,
                [
                  ...bulletPoint('KEGIATAN PEMBUKA: ', 'Guru mengulang kembali anggota keluarga inti dengan gambar dan cerita singkat.'),
                  ...bulletPoint('KEGIATAN INTI: ', 'Bermain peran dengan boneka untuk mengenal peran setiap anggota keluarga. Peserta didik dibagi menjadi beberapa kelompok untuk memainkan skenario sederhana tentang kehidupan keluarga.'),
                  ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.')
                ]
              ),
              createHeadingWithChildren(
                'PERTEMUAN 3',
                3,
                [
                  ...bulletPoint('KEGIATAN PEMBUKA: ', 'Guru mengulang kembali anggota keluarga inti dengan gambar dan cerita singkat.'),
                  ...bulletPoint('KEGIATAN INTI: ', 'Membuat kolase anggota keluarga menggunakan potongan kertas warna-warni. Peserta didik bebas memilih warna dan bentuk untuk merepresentasikan anggota keluarga mereka.'),
                  ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.')
                ]
              )
            ]
          ),
          createHeadingWithChildren(
            'G. ASESMEN PEMBELAJARAN',
            2,
            [
              ...bulletPoint('CEKLIS', 'Memantau keterlibatan anak dalam kegiatan seni dan musik.'),
              ...bulletPoint('CATATAN ANEKDOT', 'Mencatat perkembangan kemampuan sosial dan emosional anak selama kegiatan kelompok.'),
              ...bulletPoint('HASIL KARYA', 'Menganalisis karya seni anak untuk menilai pemahaman tentang anggota keluarga.'),
              ...bulletPoint('FOTO BERSERI', 'Mendokumentasikan proses dan hasil kegiatan anak dari awal hingga akhir.')
            ]
          )
        ]
      }
    ]
  });
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('Modul_Ajar_Keluarga_TK_Bintang_Ke.docx', buffer);
  });
})();
```

Pada contoh diatas masih terdapat '````javascript' dan '```' yang merupakan bagian dari format Markdown untuk menandai blok kode. Tolong hapus bagian tersebut agar output hanya berupa kode JavaScript IIFE yang dapat langsung digunakan untuk menghasilkan dokumen dengan docx.js tanpa adanya teks atau format lain yang tidak diinginkan.

Dan konten dari key 'children' pada section kedua masih terlalu sederhana, tolong jelaskan dengan baik dan detail seperti contoh yang saya berikan sebelumnya, jangan hanya menuliskan satu kalimat saja.
---
Pada output terdapat simbol atau emoji seperti '—', '•', atau '📚' yang dimana itu tidak terdapat pada keyboard laptop/komputer EN QWERTY pada umumnya
---
```
(async () => {
  const doc = new Document({
    styles: {
      default: new DocumentDefaults({
        paragraph: { spacing }
      }),
      paragraphStyles: paragraphStyles
    },
    sections: [
      coverPage,
      {
        properties,
        children: [
          createHeading('MODUL AJAR FASE FONDASI', 'Title'),
          createParagraph('TOPIK/SUB-TOPIK : Keluarga / Anggota Keluarga', 'Normal'),
          createParagraph('MINGGU KE : 1', 'Normal'),
          
          createHeading('A. IDENTITAS MODUL', 'Heading1'),
          new Table({
            rows: [
              new TableRow({ children: formField('Nama Sekolah') }),
              new TableRow({ children: formField('Nama Penyusun') }),
              new TableRow({ children: formField('NIP') }),
              new TableRow({ children: formField('Tema / Subtema') }),
              new TableRow({ children: formField('Fase / Kelas / Semester') }),
              new TableRow({ children: formField('Alokasi Waktu') }),
              new TableRow({ children: formField('Tahun Pelajaran') })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            }
          }),
          
          createHeading('B. IDENTIFIKASI KESIAPAN PESERTA DIDIK', 'Heading1'),
          ...bulletPoint('Pengetahuan Awal: ', 'Peserta didik telah memiliki pengetahuan dasar tentang nama-nama anggota keluarga dalam bahasa Indonesia dan Inggris.'),
          ...bulletPoint('Minat: ', 'Peserta didik menunjukkan minat tinggi terhadap aktivitas seni dan musik, khususnya menggambar dan menyanyi.'),
          ...bulletPoint('Latar Belakang: ', 'Kebanyakan peserta didik tinggal di lingkungan perkotaan dengan struktur keluarga inti atau ekstra.'),
          ...bulletPoint('Kebutuhan Belajar: ', '', [
            { label: 'Visual: ', text: 'Peserta didik belajar lebih baik dengan bantuan gambar, infografis, dan media visual lainnya.' },
            { label: 'Auditori: ', text: 'Peserta didik perlu mendengarkan cerita, dialog, dan penjelasan secara langsung.' },
            { label: 'Kinestetik: ', text: 'Peserta didik memerlukan aktivitas bergerak seperti permainan dan praktik langsung untuk memahami konsep.' }
          ]),
          
          createHeading('C. KARAKTERISTIK KEGIATAN BERMAIN', 'Heading1'),
          ...bulletPoint('Peta Konsep: ', 'Topik pembelajaran ini berfokus pada pengenalan dan pemahaman anggota keluarga melalui kegiatan seni (menggambar, kolase) dan musik (menyanyikan lagu).'),
          ...bulletPoint('Relevansi Kontekstual: ', 'Memahami struktur keluarga penting bagi anak untuk mengembangkan rasa percaya diri dan hubungan sosial yang sehat.'),
          ...bulletPoint('Nilai Karakter: ', 'Kemandirian, Rasa Hormat, dan Kerja Sama'),
          ...bulletPoint('Tingkat Stimulasi: ', 'Bahasa, Kognitif, Fisik'),
          
          createHeading('D. DIMENSI PROFIL PELAJAR PANCASILA', 'Heading1'),
          ...bulletPoint('Mandiri', 'Anak dapat memilih media seni untuk menggambar anggota keluarga tanpa bimbingan langsung dari guru.'),
          ...bulletPoint('Gotong Royong', 'Anak bekerja sama dalam membuat kolase keluarga bersama teman sebaya.'),
          ...bulletPoint('Kreatif', 'Anak menghasilkan karya seni orisinal berupa gambar atau kolase anggota keluarga.'),
          ...bulletPoint('Bernalar Kritis', 'Anak dapat menyebutkan perbedaan antara keluarga inti dan ekstra berdasarkan pengamatan.'),
          ...bulletPoint('Berkebinekaan Global', 'Anak mengenal berbagai struktur keluarga di dunia melalui cerita dan gambar.'),
          
          createHeading('DESIGN PEMBELAJARAN', 'Heading1'),
          createHeading('A. CAPAIAN PEMBELAJARAN (CP)', 'Heading2'),
          ...bulletPoint('Jati Diri', 'Anak dapat mengenali dan menyebutkan anggota keluarga inti dan ekstra.'),
          
          createHeading('B. PERTANYAAN PEMANTIK', 'Heading2'),
          ...bulletPoint('Pertanyaan: ', '"Siapa sajakah yang termasuk dalam keluargamu?"'),
          
          createHeading('C. TUJUAN PEMBELAJARAN', 'Heading2'),
          ...bulletPoint('TP1: ', 'Anak dapat menyebutkan anggota keluarga inti (ayah, ibu, saudara).'),
          ...bulletPoint('TP2: ', 'Anak dapat menggambar anggota keluarga menggunakan bentuk sederhana.'),
          ...bulletPoint('TP3: ', 'Anak dapat menyanyikan lagu tentang keluarga.'),
          
          createHeading('D. SARANA DAN PRASARANA', 'Heading2'),
          ...bulletPoint('Alat Main: ', 'Bahan alam seperti daun, batu kecil, kertas warna, pensil warna, spidol, dan karton.'),
          ...bulletPoint('Media: ', 'Buku cerita tentang keluarga, video animasi singkat, dan speaker untuk menyanyikan lagu.'),
          
          createHeading('E. KERANGKA PEMBELAJARAN', 'Heading2'),
          createHeading('PRAKTIK PEDAGOGIK', 'Heading3'),
          ...bulletPoint('Model Pembelajaran: ', 'Area Play dan Project-Based Learning'),
          ...bulletPoint('Metode: ', 'Eksplorasi, Tanya Jawab, Demonstrasi'),
          
          createHeading('KEMITRAAN PEMBELAJARAN', 'Heading3'),
          ...bulletPoint('Pihak Terlibat: ', 'Orang tua sebagai narasumber untuk berbagi cerita tentang keluarga mereka.'),
          
          createHeading('LINGKUNGAN BELAJAR', 'Heading3'),
          ...bulletPoint('Penataan: ', 'Lingkungan main dibagi menjadi area seni (menggambar, kolase) dan area musik (menyanyikan lagu). Lingkungan disediakan dengan perlengkapan yang aman, nyaman, dan kaya akan bahan untuk eksplorasi.'),
          
          createHeading('PEMANFAATAN DIGITAL', 'Heading3'),
          ...bulletPoint('Alat Digital: ', 'Tablet digunakan untuk menampilkan video animasi tentang keluarga, dan speaker digunakan untuk menyanyikan lagu bersama.'),
          
          createHeading('F. LANGKAH-LANGKAH KEGIATAN BERMAIN (BERDIFERENSIASI)', 'Heading2'),
          createHeading('PERTEMUAN 1', 'Heading3'),
          ...bulletPoint('KEGIATAN PEMBUKA: ', 'Menyapa anak dan memperkenalkan tema keluarga dengan gambar dan cerita singkat. Guru membacakan buku cerita tentang keluarga.'),
          ...bulletPoint('KEGIATAN INTI: ', 'Mengajak anak menyebutkan anggota keluarga inti dan menggambar anggota keluarga menggunakan bentuk sederhana. Peserta didik bebas memilih media untuk menggambar (spidol, pensil warna, atau cat air).'),
          ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.'),
          
          createHeading('PERTEMUAN 2', 'Heading3'),
          ...bulletPoint('KEGIATAN PEMBUKA: ', 'Guru mengulang kembali anggota keluarga inti dengan gambar dan cerita singkat.'),
          ...bulletPoint('KEGIATAN INTI: ', 'Bermain peran dengan boneka untuk mengenal peran setiap anggota keluarga. Peserta didik dibagi menjadi beberapa kelompok untuk memainkan skenario sederhana tentang kehidupan keluarga.'),
          ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.'),
          
          createHeading('PERTEMUAN 3', 'Heading3'),
          ...bulletPoint('KEGIATAN PEMBUKA: ', 'Guru mengulang kembali anggota keluarga inti dengan gambar dan cerita singkat.'),
          ...bulletPoint('KEGIATAN INTI: ', 'Membuat kolase anggota keluarga menggunakan potongan kertas warna-warni. Peserta didik bebas memilih warna dan bentuk untuk merepresentasikan anggota keluarga mereka.'),
          ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.'),
          
          createHeading('G. ASESMEN PEMBELAJARAN', 'Heading2'),
          ...bulletPoint('CEKLIS', 'Memantau keterlibatan anak dalam kegiatan seni dan musik.'),
          ...bulletPoint('CATATAN ANEKDOT', 'Mencatat perkembangan kemampuan sosial dan emosional anak selama kegiatan kelompok.'),
          ...bulletPoint('HASIL KARYA', 'Menganalisis karya seni anak untuk menilai pemahaman tentang anggota keluarga.'),
          ...bulletPoint('FOTO BERSERI', 'Mendokumentasikan proses dan hasil kegiatan anak dari awal hingga akhir.')
        ]
      }
    ]
  });
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('Modul_Ajar_Keluarga_TK_Bintang_Kecil.docx', buffer);
  });
})();
```

Tidak ada penggunaan `createParagraph(" ")` untuk membuat jarak antar elemen, gunakan `createParagraph('')` untuk membuat efek spacing atau jarak antar elemen, atau lebih baik lagi gunakan fitur spacing yang sudah disediakan oleh docx.js untuk mengatur jarak antar elemen secara konsisten.

---

```
createHeading('MODUL AJAR FASE FONDASI', 'Title'),
createParagraph('TOPIK/SUB-TOPIK : Keluarga / Anggota Keluarga', 'Normal'),
createParagraph('MINGGU KE : 1', 'Normal'),
```

Implementasi diatas salah, seharusnya cukup seperti ini
```
createHeading('MODUL AJAR DEEP LEARNING\nTEMA/SUBTEMA: Diriku/Tubuhku\nBAB I: MENGENAL BAGIAN TUBUH', 1, true),
```

---

```
createParagraph(''),

createHeading('DESIGN PEMBELAJARAN', 2, false),
createParagraph(''),
```

Diatas memang seperti tidak ada yang salah, cuman lebih bagus lagi jika kamu menambahkan space enter lagi untuk heading besar dengan level 1-2, hasilnya seperti ini:

```
createParagraph(''),

createHeading('DESIGN PEMBELAJARAN', 2, false),
createParagraph(''),
createParagraph(''),
```

Dan seharusnya Heading2 text alignya itu center, bukan left, karena itu adalah heading besar yang memisahkan antara bagian pertama dengan bagian kedua, jadi lebih baik jika heading tersebut dibuat center agar terlihat lebih menonjol sebagai pembuka bagian kedua.

Contoh yang benar seperti ini:
```
createParagraph(''),

createHeading('DESIGN PEMBELAJARAN', 2, true),
createParagraph(''),
createParagraph(''),
```
