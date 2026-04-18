import {
  Document,
  DocumentDefaults,
  Packer,
  Table,
  TableRow,
  WidthType,
  ImageRun,
  AlignmentType
} from 'docx'
import fs from 'fs'
import path from 'path'


// Main ---------------------------------------------------------

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
          createHeading('MODUL AJAR DEEP LEARNING\nTEMA/SUBTEMA: Keluarga / Anggota Keluarga\nBAB I: MENGENAL ANGGOTA KELUARGA', 1, true),
          createParagraph(''),
          
          ...createHeadingWithChildren(
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
          
          createParagraph(''),
          createHeading('B. IDENTIFIKASI KESIAPAN PESERTA DIDIK', 2, true),
          createParagraph(''),
          
          ...bulletPoint('Pengetahuan Awal: ', 'Peserta didik telah memiliki pengetahuan dasar tentang nama-nama anggota keluarga dalam bahasa Indonesia dan Inggris.'),
          ...bulletPoint('Minat: ', 'Peserta didik menunjukkan minat tinggi terhadap aktivitas seni dan musik, khususnya menggambar dan menyanyi.'),
          ...bulletPoint('Latar Belakang: ', 'Kebanyakan peserta didik tinggal di lingkungan perkotaan dengan struktur keluarga inti atau ekstra.'),
          ...bulletPoint('Kebutuhan Belajar: ', '', [
            { label: 'Visual: ', text: 'Peserta didik belajar lebih baik dengan bantuan gambar, infografis, dan media visual lainnya.' },
            { label: 'Auditori: ', text: 'Peserta didik perlu mendengarkan cerita, dialog, dan penjelasan secara langsung.' },
            { label: 'Kinestetik: ', text: 'Peserta didik memerlukan aktivitas bergerak seperti permainan dan praktik langsung untuk memahami konsep.' }
          ]),
          
          createParagraph(''),
          createHeading('C. KARAKTERISTIK KEGIATAN BERMAIN', 2, true),
          createParagraph(''),
          
          ...bulletPoint('Peta Konsep: ', 'Topik pembelajaran ini berfokus pada pengenalan dan pemahaman anggota keluarga melalui kegiatan seni (menggambar, kolase) dan musik (menyanyikan lagu).'),
          ...bulletPoint('Relevansi Kontekstual: ', 'Memahami struktur keluarga penting bagi anak untuk mengembangkan rasa percaya diri dan hubungan sosial yang sehat.'),
          ...bulletPoint('Nilai Karakter: ', 'Kemandirian, Rasa Hormat, dan Kerja Sama'),
          ...bulletPoint('Tingkat Stimulasi: ', 'Bahasa, Kognitif, Fisik'),
          
          createParagraph(''),
          createHeading('D. DIMENSI PROFIL PELAJAR PANCASILA', 2, true),
          createParagraph(''),
          
          ...bulletPoint('Mandiri', 'Anak dapat memilih media seni untuk menggambar anggota keluarga tanpa bimbingan langsung dari guru.'),
          ...bulletPoint('Gotong Royong', 'Anak bekerja sama dalam membuat kolase keluarga bersama teman sebaya.'),
          ...bulletPoint('Kreatif', 'Anak menghasilkan karya seni orisinal berupa gambar atau kolase anggota keluarga.'),
          ...bulletPoint('Bernalar Kritis', 'Anak dapat menyebutkan perbedaan antara keluarga inti dan ekstra berdasarkan pengamatan.'),
          ...bulletPoint('Berkebinekaan Global', 'Anak mengenal berbagai struktur keluarga di dunia melalui cerita dan gambar.'),
          
          createParagraph(''),
          createHeading('DESIGN PEMBELAJARAN', 2, true),
          createParagraph(''),
          createParagraph(''),
          
          ...createHeadingWithChildren(
            'A. CAPAIAN PEMBELAJARAN (CP)',
            3,
            [
              ...bulletPoint('Jati Diri', 'Anak dapat mengenali dan menyebutkan anggota keluarga inti dan ekstra.')
            ]
          ),
          
          ...createHeadingWithChildren(
            'B. PERTANYAAN PEMANTIK',
            3,
            [
              ...bulletPoint('Pertanyaan: ', '"Siapa sajakah yang termasuk dalam keluargamu?"')
            ]
          ),
          
          ...createHeadingWithChildren(
            'C. TUJUAN PEMBELAJARAN',
            3,
            [
              ...bulletPoint('TP1: ', 'Anak dapat menyebutkan anggota keluarga inti (ayah, ibu, saudara).'),
              ...bulletPoint('TP2: ', 'Anak dapat menggambar anggota keluarga menggunakan bentuk sederhana.'),
              ...bulletPoint('TP3: ', 'Anak dapat menyanyikan lagu tentang keluarga.')
            ]
          ),
          
          ...createHeadingWithChildren(
            'D. SARANA DAN PRASARANA',
            3,
            [
              ...bulletPoint('Alat Main: ', 'Bahan alam seperti daun, batu kecil, kertas warna, pensil warna, spidol, dan karton.'),
              ...bulletPoint('Media: ', 'Buku cerita tentang keluarga, video animasi singkat, dan speaker untuk menyanyikan lagu.')
            ]
          ),
          
          ...createHeadingWithChildren(
            'E. KERANGKA PEMBELAJARAN',
            3,
            [
              ...createHeadingWithChildren(
                'PRAKTIK PEDAGOGIK',
                4,
                [
                  ...bulletPoint('Model Pembelajaran: ', 'Area Play dan Project-Based Learning'),
                  ...bulletPoint('Metode: ', 'Eksplorasi, Tanya Jawab, Demonstrasi')
                ]
              ),
              
              ...createHeadingWithChildren(
                'KEMITRAAN PEMBELAJARAN',
                4,
                [
                  ...bulletPoint('Pihak Terlibat: ', 'Orang tua sebagai narasumber untuk berbagi cerita tentang keluarga mereka.')
                ]
              ),
              
              ...createHeadingWithChildren(
                'LINGKUNGAN BELAJAR',
                4,
                [
                  ...bulletPoint('Penataan: ', 'Lingkungan main dibagi menjadi area seni (menggambar, kolase) dan area musik (menyanyikan lagu). Lingkungan disediakan dengan perlengkapan yang aman, nyaman, dan kaya akan bahan untuk eksplorasi.')
                ]
              ),
              
              ...createHeadingWithChildren(
                'PEMANFAATAN DIGITAL',
                4,
                [
                  ...bulletPoint('Alat Digital: ', 'Tablet digunakan untuk menampilkan video animasi tentang keluarga, dan speaker digunakan untuk menyanyikan lagu bersama.')
                ]
              )
            ]
          ),
          
          ...createHeadingWithChildren(
            'F. LANGKAH-LANGKAH KEGIATAN BERMAIN (BERDIFERENSIASI)',
            3,
            [
              ...createHeadingWithChildren(
                'PERTEMUAN 1',
                4,
                [
                  ...bulletPoint('KEGIATAN PEMBUKA: ', 'Menyapa anak dan memperkenalkan tema keluarga dengan gambar dan cerita singkat. Guru membacakan buku cerita tentang keluarga.'),
                  ...bulletPoint('KEGIATAN INTI: ', 'Mengajak anak menyebutkan anggota keluarga inti dan menggambar anggota keluarga menggunakan bentuk sederhana. Peserta didik bebas memilih media untuk menggambar (spidol, pensil warna, atau cat air).'),
                  ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.')
                ]
              ),
              
              ...createHeadingWithChildren(
                'PERTEMUAN 2',
                4,
                [
                  ...bulletPoint('KEGIATAN PEMBUKA: ', 'Guru mengulang kembali anggota keluarga inti dengan gambar dan cerita singkat.'),
                  ...bulletPoint('KEGIATAN INTI: ', 'Bermain peran dengan boneka untuk mengenal peran setiap anggota keluarga. Peserta didik dibagi menjadi beberapa kelompok untuk memainkan skenario sederhana tentang kehidupan keluarga.'),
                  ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.')
                ]
              ),
              
              ...createHeadingWithChildren(
                'PERTEMUAN 3',
                4,
                [
                  ...bulletPoint('KEGIATAN PEMBUKA: ', 'Guru mengulang kembali anggota keluarga inti dengan gambar dan cerita singkat.'),
                  ...bulletPoint('KEGIATAN INTI: ', 'Membuat kolase anggota keluarga menggunakan potongan kertas warna-warni. Peserta didik bebas memilih warna dan bentuk untuk merepresentasikan anggota keluarga mereka.'),
                  ...bulletPoint('KEGIATAN PENUTUP: ', 'Menyanyikan lagu tentang keluarga bersama-sama.')
                ]
              )
            ]
          ),
          
          ...createHeadingWithChildren(
            'G. ASESMEN PEMBELAJARAN',
            3,
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
    fs.writeFileSync('Modul_Ajar_Keluarga_TK_Bintang_Kecil.docx', buffer);
    console.log('Dokumen berhasil dibuat!');
  });
})()

// --------------------------------------------------------------
