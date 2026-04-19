import {
  Document,
  DocumentDefaults,
  Packer,
  WidthType
} from 'docx'
import { TableWrapper, Row, createParagraph, createHeading } from './docx-api.js'
import { properties, spacing, paragraphStyles } from './docx-config.js'
import { coverPage } from './docx-cover-page.js'
import { convertNumToRoman } from './utils.js'
import fs from 'fs'
import { namaPenulis, semester, asalSekolah, mingguKe, fase, bulan, jenjangKelas, alokasiWaktu, modelPembelajaran, jumlahAnak, topikSubtopik } from './docx-predefined-var.js'

(async () => {
  const doc = new Document({
    styles: {
      default: new DocumentDefaults({
        paragraph: { spacing }
      }),
      paragraphStyles
    },
    sections: [
      coverPage,
      {
        properties,
        children: [
          new TableWrapper()
            .addTitleRow('MODUL AJAR PENDIDIKAN ANAK USIA DINI  KURIKULUM MERDEKA PERENCANAAN PEMBELAJARAN MENDALAM')
            .build(),
          createParagraph(''),
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
          createParagraph(''),
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
          createParagraph(''),
          createHeading('B. DESAIN PEMBELAJARAN', 1),
          new TableWrapper()
            .setFitContent()
            .addLabelValuePairRow('Capaian Pembelajaran', '- Elemen Jati Diri: Sub Elemen Anak memahami identitas dirinya yang terbentuk oleh ragam minat, kebutuhan, karakteristik gender, agama, dan sosial budaya\n- Elemen Jati Diri: Sub Elemen Anak menggunakan fungsi gerak (motorik kasar, halus, dan taktil) untuk mengeksplorasi dan memanipulasi berbagai objek dan lingkungan sekitar sebagai bentuk pengembangan diri')
            .addLabelValuePairRow('Lintas Disiplin Ilmu', 'Nilai agama dan moral (mengenal keberadaan Tuhan melalui syukur atas identitas diri), nilai Pancasila (menghargai keberagaman nama dan karakteristik teman), fisik motorik (gerakan menunjuk dan melambai), kognitif (mengingat dan menyebut nama sendiri), bahasa (mengucapkan nama dengan jelas), sosial emosional (membangun kepercayaan diri dan interaksi dengan teman)')
            .addLabelValuePairRow('Tujuan Pembelajaran', 'Anak mampu mengenal identitas dirinya sebagai bagian dari keluarga dan menyebutkan namanya sendiri sambil melakukan gerakan sederhana seperti melambai atau bertepuk tangan.')
            .addLabelValuePairRow('Topik Pembelajaran', 'Aku Istimewa: Ayo Kita Berkenalan')
            .addLabelValuePairRow('Praktik Pedagogis', 'Pembelajaran berbasis bermain dengan pendekatan eksplorasi langsung menggunakan metode bercerita interaktif, bernyanyi sambil bergerak, dan permainan cermin. Pendekatan ini mendukung prinsip berkesadaran melalui fokus pada diri sendiri, bermakna karena relevan dengan kehidupan sehari-hari, dan menggembirakan melalui aktivitas yang menyenangkan dan tidak menakutkan.')
            .addLabelValuePairRow('Kemitraan Pembelajaran', 'Lingkungan pembelajaran mengintegrasikan ruang kelas yang nyaman dengan cermin besar, area bermain terbuka untuk aktivitas motorik, dan sudut tenang untuk kegiatan refleksi, menciptakan suasana aman yang mendorong eksplorasi identitas diri.')
            .addLabelValuePairRow('Lingkungan Pembelajaran', 'Melibatkan guru kelas sebagai fasilitator utama, orang tua sebagai sumber informasi tentang anak di rumah, serta kakak kelas sebagai model positif dalam pengenalan diri dan interaksi sosial.')
            .addLabelValuePairRow('Pemanfaatan Digital', '- Perencanaan: Persiapan video cerita dan lagu digital, aplikasi dokumentasi pembelajaran\n- Pelaksanaan: Video interaktif "Ayo Berkenalan", musik latar untuk aktivitas, dokumentasi foto dan video proses belajar anak\n- Asesmen: Portofolio digital karya anak, rekaman video presentasi sederhana anak\n- Dukungan media ajar digital tersedia melalui https://drive.paud.id/download/ayo-berkenalan/ ')
            .build()
        ]
      }
    ]
  })

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('Modul_Ajar_Keluarga_TK_Bintang_Kecil.docx', buffer)
    console.log('Dokumen berhasil dibuat!')
  })
})()
