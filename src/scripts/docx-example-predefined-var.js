// Identifikasi ---
const identifikasiPesertaDidik = 'Anak kelompok A (2-3 tahun) memiliki kemampuan bahasa yang sedang berkembang dengan kosakata terbatas namun mulai dapat mengungkapkan kebutuhan dasar. Mereka sangat membutuhkan pengulangan dan bimbingan dalam pengenalan identitas diri, serta masih dalam tahap mengembangkan kepercayaan terhadap lingkungan sekitar. Anak-anak pada usia ini belajar melalui eksplorasi sensori dan memerlukan dukungan emosional yang konsisten.'
const identifikasiMateriPembelajaran = 'Materi pengenalan identitas diri mencakup pengetahuan esensial tentang nama dan bagian tubuh, pengetahuan aplikatif dalam berinteraksi sosial sederhana, serta pengetahuan nilai dan karakter melalui rasa percaya diri dan kemandirian. Materi ini sangat relevan dengan kehidupan sehari-hari anak dan memiliki tingkat kesulitan yang sesuai dengan tahap perkembangan mereka, mengintegrasikan nilai keimanan, kejujuran, dan kemandirian.'
const identifikasiDimensiProfilLulusan = {
  dpl1: true, // Keimanan dan Ketakwaan terhadap Tuhan YME
  dpl2: true, // Kewargaan
  dpl3: true, // Penalaran kritis
  dpl4: false, // Kreativitas
  dpl5: true, // Kolaborasi
  dpl6: true, // Kemandirian
  dpl7: false, // Kesehatan
  dpl8: true // Komunikasi
}
// ---
// Desain Pembelajaran ---
const desainPembelajaranCapaianPembelajaran = [
  '<b>Elemen Jati Diri:</b> Sub Elemen Anak memahami identitas dirinya yang terbentuk oleh ragam minat, kebutuhan, karakteristik gender, agama, dan sosial budaya.',
  '<b>Elemen Jati Diri:</b> Sub Elemen Anak menggunakan fungsi gerak (motorik kasar, halus, dan taktil) untuk mengeksplorasi dan memanipulasi berbagai objek dan lingkungan sekitar sebagai bentuk pengembangan diri.'
]
const desainPembelajaranLintasDisiplinIlmu = 'Nilai agama dan moral (mengenal keberadaan Tuhan melalui syukur atas identitas diri), nilai Pancasila (menghargai keberagaman nama dan karakteristik teman), fisik motorik (gerakan menunjuk dan melambai), kognitif (mengingat dan menyebut nama sendiri), bahasa (mengucapkan nama dengan jelas), sosial emosional (membangun kepercayaan diri dan interaksi dengan teman.)'
const desainPembelajaranTujuanPembelajaran = [
  'Anak mampu mengenal identitas dirinya sebagai bagian dari keluarga dan menyebutkan namanya sendiri sambil melakukan gerakan sederhana seperti melambai atau bertepuk tangan.'
]
const desainPembelajaranTopikPembelajaran = 'Aku Istimewa: Ayo Kita Berkenalan'
const desainPembelajaranPraktikPedagogis = 'Pembelajaran berbasis bermain dengan pendekatan eksplorasi langsung menggunakan metode bercerita interaktif, bernyanyi sambil bergerak, dan permainan cermin. Pendekatan ini mendukung prinsip berkesadaran melalui fokus pada diri sendiri, bermakna karena relevan dengan kehidupan sehari-hari, dan menggembirakan melalui aktivitas yang menyenangkan dan tidak menakutkan.'
const desainPembelajaranKemitraanPembelajaran = [
  'Lingkungan pembelajaran mengintegrasikan ruang kelas yang nyaman dengan cermin besar, area bermain terbuka untuk aktivitas motorik, dan sudut tenang untuk kegiatan refleksi, menciptakan suasana aman yang mendorong eksplorasi identitas diri.'
]
const desainPembelajaranLingkunganPembelajaran = [
  'Melibatkankan guru kelas sebagai fasilitator utama',
  'Melibatkan orang tua sebagai sumber informasi tentang anak di rumah',
  'Serta melibatkan kakak kelas sebagai model positif dalam pengenalan diri dan interaksi sosial.'
]
const desainPembelajaranPemanfaatanDigital = [
  'Perencanaan: Persiapan video cerita dan lagu digital, aplikasi dokumentasi pembelajaran',
  'Pelaksanaan: Video interaktif "Ayo Berkenalan", musik latar untuk aktivitas, dokumentasi foto dan video proses belajar anak',
  'Asesmen: Portofolio digital karya anak, rekaman video presentasi sederhana anak',
  'Dukungan media ajar digital tersedia melalui https://drive.paud.id/download/ayo-berkenalan/'
]
// ---
// Rencana Pelaksanaan Pembelajaran ---
const rencanaPelaksanaanAwal = [
  ['Pembuka dari proses pembelajaran yang bertujuan untuk mempersiapkan peserta didik sebelum memasuki inti pembelajaran.'],
  ['Kegiatan dalam tahap ini meliputi orientasi yang bermakna, apersepsi yang kontekstual, dan motivasi yang menggembirakan:', [
    'Salam dan doa pembuka untuk menciptakan suasana tenang dan fokus.',
    'Menyanyikan lagu "1234 Pergi Sekolah" untuk membangun semangat belajar.'
  ]],
  ['Kegiatan pemantik dengan buku cerita/video "Ayo Berkenalan".'],
  ['Permainan konsentrasi sederhana untuk memusatkan perhatian anak.'],
  ['Pertanyaan pemantik untuk mengembangkan berbagai aspek:', [
    '"Siapa yang menciptakan kita semua?" (Keimanan dan Ketakwaan.)',
    '"Apa yang bisa kamu lakukan sendiri hari ini?" (Kemandirian.)',
    '"Bagaimana perasaanmu ketika menyebutkan namamu?" (Kesehatan.)',
    '"Siapa temanmu yang paling baik?" (Kolaborasi.)',
    '"Apa yang membuat namamu istimewa?" (Kreativitas.)',
    '"Mengapa kita harus mengenal teman-teman kita?" (Kewargaan.)',
    '"Bagaimana caranya agar teman tahu nama kita?" (Komunikasi.)',
    '"Apa yang terjadi jika kita tidak tahu nama sendiri?" (Penalaran Kritis.)'
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
        'Kegiatan 1: Mencocokkan Geometri (Kemandirian, Penalaran Kritis). Alat dan Bahan: Karton, kardus bekas, tutup botol aneka warna, gunting, pensil, lem tembak, pom-pom/mainan lainnya , pencapit/sumpit/ sendok atau lainnya.Cara Membuat :\n\n' +
        '<ol>' +
        '<li>Siapkan kardus bekas, lalu buat pola bentuk geometri, dan letakkan tutup botol sesuai pola, kemudian gambar lingkaran sebesar tutup botol.</li>' +
        '<li>Lubangi atau gunting, pola tutup botol yang sudah di gambar pada kardus berbentuk geometri.</li>' +
        '<li>Selanjutnya, jiplak bentuk geometri yang sudah di gunting di atas kertas karton.</li>' +
        '<li>Rekatkan tutup botol tepat di atas gambar yang sudah dijiplak berdasarkan warna tutup botol.</li>' +
        '<li>Jika sudah jadi, anak-anak dapat memasangkan bentuk geometri sesuai dengan pola tutup botol, dan mengisi dengan pom-pom sesuai warna tutup botol.</li>' +
        '<li>Siapkan karton, kemudian gambar  atau buat pola di atas karton menggunakan pensil dan tutup botol bentuk geometri (lingkaran, persegi, persegi panjang dan segitiga.)</li>' +
        '</ol>\n\n' +
        'Kegiatan 2: Cermin Ajaib (Komunikasi, Kesehatan). Alat dan Bahan: Cermin besar yang aman untuk anak Cara Bermain: Anak diajak berdiri di depan cermin besar. Guru memandu anak untuk menyebutkan namanya sambil menunjuk bayangan dirinya di cermin. Guru juga meminta anak menunjuk bagian-bagian tubuh utama seperti kepala, tangan, dan kaki pada bayangannya di cermin. Kegiatan ini membantu anak mengenal identitas dirinya dan bagian-bagian tubuhnya\n\n' +
        'Kegiatan 3: Nama dan Foto (Kolaborasi, Kreativitas). Alat dan Bahan: Foto anak-anak, kertas, lem, spidol. Cara Bermain: Tempelkan foto anak-anak di selembar kertas dan tuliskan nama mereka di bawahnya. Ajak anak-anak mengenal teman mereka dengan menyebutkan nama teman berdasarkan foto.'
      ],
      [
        '2',
        'Kegiatan 1: Memasukkan mainan ke dalam gelas dengan penjepit (Kemandirian, Penalaran Kritis). Alat dan Bahan: 2 Buah tutup botol, 2 Buah stik es krim, 1 Penjepit baju jemuran, Lem tembak, Pom-pom, Gelas kertas.\nCara Membuat :\n' +
        '<ol>' +
        '<li>Pertama rekatkan tutup botol, pada bagian ujung stik es krim, agar dapat menjepit mainan.</li>' +
        '<li>Selanjutnya siapkan penjepit baju, kemudian rekatkan stik baju pada bagian kanan dan kiri dengan menggunakan lem.</li>' +
        '<li>Jika lem sudah jadi penjepit bisa langsung digunakan untuk bermain anak-anak.</li>' +
        '<li>Anak-anak dapat menggunakan penjepit dengan memasukkan pom-pom ke dalam gelas kertas berdasarkan warna, ukuran dan lainnya.</li>' +
        '</ol>\n\n' +
        'Kegiatan 2: Tepuk Nama Komunikasi, Kolaborasi. Alat dan Bahan: Tidak diperlukan Cara Bermain: Guru mengajak anak-anak duduk melingkar. Guru memulai dengan menyebutkan nama seorang anak sambil bertepuk tangan. Anak yang namanya disebut harus berdiri dan bertepuk tangan. Kegiatan ini diulang untuk semua anak. Permainan ini membantu anak mengenal namanya dan nama teman-temannya, serta melatih motorik dengan gerakan tepuk tangan.\n\n' +
        'Kegiatan 3: Bola Nama Kreativitas, Komunikasi. Alat dan Bahan: Bola ringan. Cara Bermain: Duduk dalam lingkaran, lempar bola satu per satu sambil menyebutkan nama penerima bola. Hal ini memperkenalkan nama dan meningkatkan keterampilan sosial.'
      ]
    ]
  },
  {
    title: 'MEMAHAMI',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '3',
        'Kegiatan 1 : Kotak Pensil Aku dan Teman Kreativitas, Kemandirian. Alat dan Bahan, Kardus bekas, Lem, Gambar anak-anak tanpa gambar wajah, Krayon, Gunting, Cara Membuat:\n' +
        '<ol>' +
        '<li>Siapkan gambar anak-anak tanpa wajah, kemudian warnai dengan menggunakan krayon atau cat warna.</li>' +
        '<li>Selanjutnya, mintalah anak-anak untuk memotong gambar foto wajah mereka sendiri dan menempelkannya pada gambar yang sudah di beri warna sebelumnya.</li>' +
        '<li>Selanjutnya, potong kardus atau bisa di ganti dengan karton membentuk persegi panjang dan gulung membentuk tabung.</li>' +
        '<li>Buat bentuk lingkaran, lalu potong dan tempelkan bentuk tabung diatas bentuk lingkaran jadi satu (seperti tempat pensil).</li>' +
        '<li>Terakhir tempelkan gambar foto yang sudah dibuat pada tempat pensil.</li>' +
        '</ol>\n\n' +
        'Kegiatan 2: Lompat Nama (Kesehatan, Komunikasi). Alat dan Bahan: Kertas warna-warni yang ditempel di lantai membentuk lingkaran Cara Bermain: Guru meletakkan kertas warna-warni di lantai membentuk lingkaran. Anak diminta melompat dari satu kertas ke kertas lain sambil menyebutkan namanya setiap kali mendarat. Kegiatan ini membantu anak mengenal namaya sambil melatih keseimbangan dan koordinasi tubuhnya.\n\n' +
        'Kegiatan 3: Gambar Keluarga (Keimanan dan Ketakwaan). Alat dan Bahan: Kertas gambar, krayon atau spidol. Cara Bermain: Minta anak-anak menggambar keluarganya. Setelah selesai, setiap anak bisa memperlihatkan dan memperkenalkan siapa saja anggota keluarganya.'
      ],
      [
        '4',
        'Kegiatan 1 : Belajar Mencari Pasangan Sepatu (Penalaran Kritis, Kemandirian). Alat dan Bahan: Berbagai jenis model dan warna sepatu.\n' +
        'Cara membuat dan Memainkannya : \n' +
        '<ol>' +
        '<li>Siapkan berbagai macam sepatu dengan model dan warna yang berbeda.</li>' +
        '<li>Selanjutnya, mintalah anak-anak untuk mencari pasangan sepatu yang memiliki warna dan model atau bentuk sama.</li>' +
        '</ol>\n\n' +
        'Kegiatan 2 : Menyusun Huruf Nama (Komunikasi, Kreativitas). Alat dan Bahan: Huruf-huruf magnet. Cara Bermain: Beri anak huruf magnet yang bisa mereka susun menjadi nama mereka sendiri. Setelah selesai, mereka bisa memperkenalkan nama mereka.\n\n' +
        'Kegiatan 3: Stempel Tangan (Kemandirian, Kreativitas). Alat dan Bahan: Cat tangan, kertas besar. Cara Bermain: Anak-anak membuat cetakan tangan mereka di kertas besar dan di bawahnya tuliskan nama mereka. Ini membantu mengenal identitas setiap anak secara visual.'
      ]
    ]
  },
  {
    title: 'MEREFLEKSI',
    rows: [
      ['<b>Hari</b>', '<b>Uraian Kegiatan</b>'],
      [
        '5',
        'Kegiatan 1: Mencocokkan benda dengan gambar (Penalaran Kritis, Kemandirian). Alat dan Bahan : Kancing, stik es krim, mainan, kertas HVS, spidol atau krayon. Cara Membuat dan memainkan :Siapkan 3 lembar kertas HVS, kemudian gambar bentuk stik es krim, kancing dan mainan dan beri warna sesuai dengan warna stik es krim, kancing dan mainan. Mintalah anak-anak untuk mencocokkan stik es krim, kancing dan mainan sesuai dengan gambar, bentuk dan warna.\n\n' +
            'Kegiatn 2: Boneka Keluarga (Kewargaan, Kolaborasi). Alat dan Bahan: Boneka tangan atau boneka jari yang merepresentasikan anggota keluarga Cara Bermain: Guru menggunakan boneka untuk memperkenalkan anggota keluarga (ayah, ibu, kakak/adik). Anak diajak untuk memegang boneka dan menirukan suara atau gerakan sederhana untuk setiap anggota keluarga. Kegiatan ini membantu anak mengenal peran anggota keluarga dan melatih motorik halusnya.\n\n' +
            'Kegiatan 3: Ayo Cari Teman (Komunikasi, Kolaborasi). Alat dan Bahan: Kartu nama anak-anak. Cara Bermain: Sebar kartu nama anak di lantai, minta anak-anak mencari nama mereka sendiri. Setelah ditemukan, mintalah mereka mencari nama teman yang diberi tahu.'
      ]
    ]
  }
]
const rencanaPelaksanaanPenutup = 'Tahap akhir dalam proses pembelajaran yang bertujuan memberikan umpan balik yang konstruktif kepada anak atas pengalaman belajar yang telah dilakukan, menyimpulkan pembelajaran, dan anak terlibat dalam perencanaan pembelajaran selanjutnya:\n' +
    '<ol>' +
    '<li>Recalling kegiatan dengan antusias dan memberikan apresiasi</li>' +
    '<li>Anak bangga menunjukkan hasil karya dan menceritakan pengalaman</li>' +
    '<li>Permainan tepuk tangan bersama sambil menyebut nama masing-masing</li>' +
    '<li>Bernyanyi lagu "Namaku" dengan gerakan sederhana</li>' +
    '<li>Memberikan pelukan atau high-five sebagai bentuk penghargaan</li>' +
    '<li>Doa penutup dan persiapan pulang dengan riang gembira</li>' +
    '</ol>'
// ---
// Asesmen Pembelajaran ---
const asesmenPembelajaranAwal = 'Asesmen awal dilakukan untuk mengidentifikasi kemampuan dasar anak dalam mengenal identitas diri dan kesiapan mengikuti pembelajaran. Observasi difokuskan pada respon verbal, non-verbal, dan interaksi sosial anak.' +
    '<ol>' +
    '<li>Tanyakan langsung "Siapa namamu?" dan catat apakah anak menjawab, diam, atau menunjuk diri</li>' +
    '<li>Panggil nama anak satu per satu dan observasi respon (menoleh, tersenyum, atau mengabaikan)</li>' +
    '<li>Minta anak menunjuk bagian tubuh (kepala, tangan, kaki) dan catat keakuratan responnya</li>' +
    '</li>Amati tingkat kepercayaan diri anak saat berinteraksi dengan guru dan teman baru</li>' +
    '<li>Dokumentasikan kemampuan motorik awal melalui permainan sederhana seperti tepuk tangan</li>' +
    '</ol>'
const asesmenPembelajaranProses = 'Asesmen proses dilakukan berkelanjutan selama kegiatan berlangsung untuk memantau perkembangan dan memberikan dukungan tepat waktu. Focus pada partisipasi aktif dan kemajuan keterampilan.' +
    '<ol>' +
    '<li>Catat frekuensi anak menyebutkan nama sendiri selama aktivitas dan tingkat kejelasan ucapan</li>' +
    '<li>Observasi keaktifan anak dalam setiap permainan dan beri tanda centang pada lembar checklist</li>' +
    '<li>Dokumentasikan interaksi sosial positif seperti berbagi, membantu, atau bermain bersama teman</li>' +
    '<li>Amati kemampuan mengikuti instruksi sederhana dan beri bantuan jika diperlukan</li>' +
    '<li>Berikan pujian langsung saat anak menunjukkan progress dan catat momen keberhasilannya</li>' +
    '</ol>'
const asesmenPembelajaranAkhir = 'Asesmen akhir mengevaluasi pencapaian tujuan pembelajaran dan memberikan gambaran kemajuan anak secara keseluruhan. Fokus pada demonstrasi kemampuan yang telah dipelajari.' +
    '<ol>' +
    '<li>Minta setiap anak memperkenalkan diri di depan teman dan catat kelancaran serta kepercayaan dirinya</li>' +
    '<li>Tes kemampuan menunjuk foto diri sendiri dari kumpulan foto anak-anak di kelas</li>' +
    '<li>Observasi kemampuan motorik melalui gerakan melambai dan bertepuk tangan saat menyebut nama</li>' +
    '<li>Dokumentasikan ekspresi kegembiraan dan antusiasme anak melalui foto atau video singkat</li>' +
    '<li>Berikan reward berupa stiker atau pujian khusus dan catat reaksi positif anak terhadap penghargaan</li>' +
    '</ol>'
// ---