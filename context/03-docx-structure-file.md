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
createParagraph('')
````

Harus memuat Heading dengan format "A. IDENTIFIKASI" dan level 1, kemudian diikuti dengan table yang memiliki 5 kolom dan beberapa baris sesuai dengan kebutuhan informasi yang harus disampaikan. Setiap cell dalam table harus diisi dengan informasi yang relevan dan sesuai dengan konteks pembelajaran anak usia dini.
