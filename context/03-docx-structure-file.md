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

## A. IDENTIFIKASI

Bagian ini berisi sebuah table yang memuat informasi tentang identifikasi latar belakang maupun karakter dari perserta didik, materi pelajaran, dimensi profil lulusan.

Kamu dapat memanfaatkan `createHeading`, `TableWrapper`, dan `Row` untuk membangus struktur bagian ini, contoh:

```js
createHeading('A. IDENTIFIKASI', 1),
new TableWrapper()
  .setFitContent()
  .addRowObject(
    new Row()
      .addTextCell('Peserta Didik', {
        bold: true,
        width: { size: 1800, type: WidthType.DXA }
      })
      .addTextCell('Anak kelompok A (2-3 tahun) memiliki kemampuan bahasa yang sedang berkembang dengan kosakata terbatas namun mulai dapat mengungkapkan kebutuhan dasar. Mereka sangat membutuhkan pengulangan dan bimbingan dalam pengenalan identitas diri, serta masih dalam tahap mengembangkan kepercayaan terhadap lingkungan sekitar. Anak-anak pada usia ini belajar melalui eksplorasi sensori dan memerlukan dukungan emosional yang konsisten.', {
        columnSpan: 4
      })
  )
  .addRowObject(
    new Row()
      .addTextCell('Materi Pelajaran', {
        bold: true,
        width: { size: 1800, type: WidthType.DXA }
      })
      .addTextCell('Materi pengenalan identitas diri mencakup pengetahuan esensial tentang nama dan bagian tubuh, pengetahuan aplikatif dalam berinteraksi sosial sederhana, serta pengetahuan nilai dan karakter melalui rasa percaya diri dan kemandirian. Materi ini sangat relevan dengan kehidupan sehari-hari anak dan memiliki tingkat kesulitan yang sesuai dengan tahap perkembangan mereka, mengintegrasikan nilai keimanan, kejujuran, dan kemandirian.', {
        columnSpan: 4
      })
  )
  .addRowObject(
    new Row()
      .addTextCell('Dimensi Profil Lulusan', {
        bold: true,
        rowSpan: 2,
        width: { size: 1800, type: WidthType.DXA }
      })
      .addTextCell('<b>[x] DPL1</b>\nKeimanan dan Ketakwaan terhadap Tuhan YME')
      .addTextCell('<b>[ ] DPL3</b>\nPenalaran Kritis')
      .addTextCell('<b>[x] DPL5</b>\nKolaborasi')
      .addTextCell('<b>[ ] DPL7</b>\nKesehatan')
  )
  .addRowObject(
    new Row()
      .addTextCell('<b>[x] DPL2</b>\nKewargaan')
      .addTextCell('<b>[ ] DPL4</b>\nKreativitas')
      .addTextCell('<b>[x] DPL6</b>\nKemandirian')
      .addTextCell('<b>[x] DPL8</b>\nKomunikasi')
  )
  .build(),
createParagraph(''),
createParagraph(''),
createParagraph(''),
createParagraph('')
````

Harus memuat Heading dengan format "A. IDENTIFIKASI" dan level 1, kemudian diikuti dengan table yang memiliki 5 kolom dan beberapa baris sesuai dengan kebutuhan informasi yang harus disampaikan. Setiap cell dalam table harus diisi dengan informasi yang relevan dan sesuai dengan konteks pembelajaran anak usia dini.

HARUS MENGIKUTI FORMAT TABLE YANG ADA DALAM CONTOH, JANGAN MENGUBAH STRUKTUR TABLE ATAU FORMAT PENULISAN INFORMASI DI DALAM CELL.

# B. DESAIN PEMBELAJARAN

Bagian ini berisi sebuah table yang memuat informasi tentang desain pembelajaran yang mencakup Capaian Pembelajaran, Lintas Disiplin Ilmu, Tujuan Pembelajaran, Topik Pembelajaran, Praktik Pedagogis, Kemitraan Pembelajaran, Lingkungan Pembelajaran, dan Pemanfaatan Digital.

Kamu dapat memanfaatkan `createHeading`, `TableWrapper`, dan `Row` untuk membangun struktur bagian ini, contoh:

```js
createHeading('B. DESAIN PEMBELAJARAN', 1),
new TableWrapper()
  .setFitContent()
  .addLabelValuePairRow('Capaian Pembelajaran', '<ul><li><b>Elemen Jati Diri:</b> Sub Elemen Anak memahami identitas dirinya yang terbentuk oleh ragam minat, kebutuhan, karakteristik gender, agama, dan sosial budaya</li><li><b>Elemen Jati Diri:</b> Sub Elemen Anak menggunakan fungsi gerak (motorik kasar, halus, dan taktil) untuk mengeksplorasi dan memanipulasi berbagai objek dan lingkungan sekitar sebagai bentuk pengembangan diri</li></ul>')
  .addLabelValuePairRow('Lintas Disiplin Ilmu', 'Nilai agama dan moral (mengenal keberadaan Tuhan melalui syukur atas identitas diri), nilai Pancasila (menghargai keberagaman nama dan karakteristik teman), fisik motorik (gerakan menunjuk dan melambai), kognitif (mengingat dan menyebut nama sendiri), bahasa (mengucapkan nama dengan jelas), sosial emosional (membangun kepercayaan diri dan interaksi dengan teman)')
  .addLabelValuePairRow('Tujuan Pembelajaran', '<ul><li>Anak mampu mengenal identitas dirinya sebagai bagian dari keluarga dan menyebutkan namanya sendiri sambil melakukan gerakan sederhana seperti melambai atau bertepuk tangan.</li></ul>')
  .addLabelValuePairRow('Topik Pembelajaran', 'Aku Istimewa: Ayo Kita Berkenalan')
  .addLabelValuePairRow('Praktik Pedagogis', 'Pembelajaran berbasis bermain dengan pendekatan eksplorasi langsung menggunakan metode bercerita interaktif, bernyanyi sambil bergerak, dan permainan cermin. Pendekatan ini mendukung prinsip berkesadaran melalui fokus pada diri sendiri, bermakna karena relevan dengan kehidupan sehari-hari, dan menggembirakan melalui aktivitas yang menyenangkan dan tidak menakutkan.')
  .addLabelValuePairRow('Kemitraan Pembelajaran', '<ul><li>Lingkungan pembelajaran mengintegrasikan ruang kelas yang nyaman dengan cermin besar, area bermain terbuka untuk aktivitas motorik, dan sudut tenang untuk kegiatan refleksi, menciptakan suasana aman yang mendorong eksplorasi identitas diri.</li></ul>')
  .addLabelValuePairRow('Lingkungan Pembelajaran', '<ul><li>Melibatkan guru kelas sebagai fasilitator utama, orang tua sebagai sumber informasi tentang anak di rumah, serta kakak kelas sebagai model positif dalam pengenalan diri dan interaksi sosial.</li></ul>')
  .addLabelValuePairRow('Pemanfaatan Digital', '<ul><li>Perencanaan: Persiapan video cerita dan lagu digital, aplikasi dokumentasi pembelajaran</li><li>Pelaksanaan: Video interaktif "Ayo Berkenalan", musik latar untuk aktivitas, dokumentasi foto dan video proses belajar anak</li><li>Asesmen: Portofolio digital karya anak, rekaman video presentasi sederhana anak</li><li>Dukungan media ajar digital tersedia melalui https://drive.paud.id/download/ayo-berkenalan/</li></ul>')
  .build(),
createParagraph('')
```

Harus memuat Heading dengan format "B. DESAIN PEMBELAJARAN" dan level 1, kemudian diikuti dengan table yang memiliki 2 kolom (label dan nilai) sesuai dengan kebutuhan informasi yang harus disampaikan. Setiap cell dalam table harus diisi dengan informasi yang relevan dan sesuai dengan konteks pembelajaran anak usia dini.

Pada bagian Pemanfaatan Digital, harus menyertakan informasi tentang ketersediaan media ajar digital yang dapat diakses melalui tautan yang sesuai (misalnya: https://drive.paud.id/download/ayo-berkenalan/).

HARUS MENGIKUTI FORMAT TABLE YANG ADA DALAM CONTOH, JANGAN MENGUBAH STRUKTUR TABLE ATAU FORMAT PENULISAN INFORMASI DI DALAM CELL.
