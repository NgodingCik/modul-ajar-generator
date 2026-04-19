import {
  Document,
  DocumentDefaults,
  Packer,
  WidthType
} from 'docx'
import { TableWrapper, Row, createParagraph, createNumberedHeading, getNumberingConfig, createHeadingWithChildren } from './docx-api.js'
import { properties, spacing, paragraphStyles } from './docx-config.js'
import { coverPage } from './docx-cover-page.js'
import { convertNumToRoman } from './utils.js'
import fs from 'fs'
import { namaPenulis, semester, asalSekolah, mingguKe, fase, bulan, jenjangKelas, alokasiWaktu, modelPembelajaran, jumlahAnak, topikSubtopik } from './docx-predefined-var.js'

(async () => {
  const doc = new Document({
    numbering: {
      config: getNumberingConfig()
    },
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
            .addLabelValueRow('<b>Penulis</b>', namaPenulis, '<b>Semester</b>', convertNumToRoman(semester))
            .addLabelValueRow('<b>Asal Sekolah</b>', asalSekolah, '<b>Minggu Ke-</b>', mingguKe.toString())
            .addLabelValueRow('<b>Fase</b>', fase, '<b>Bulan</b>', bulan)
            .addLabelValueRow('<b>Jenjang/Kelas</b>', jenjangKelas, '<b>Alokasi Waktu</b>', alokasiWaktu)
            .addLabelValueRow('<b>Model Pembelajaran</b>', modelPembelajaran, '<b>Jumlah Anak</b>', jumlahAnak.toString())
            .addRowObject(
              new Row()
                .addTextCell('<b>Topik / Sub Topik</b>', { bold: true })
                .addTextCell(topikSubtopik, { columnSpan: 3 })
            )
            .build(),
          createParagraph(''),
          createNumberedHeading('IDENTIFIKASI', 1),
          new TableWrapper()
            .setFitContent()
            .addRowObject(
              new Row()
                .addTextCell('<b>Peserta Didik</b>', {
                  bold: true,
                  width: { size: 1800, type: WidthType.DXA }
                })
                .addTextCell('Anak kelompok A (2-3 tahun) memiliki kemampuan bahasa yang sedang berkembang dengan kosakata terbatas namun mulai dapat mengungkapkan kebutuhan dasar. Mereka sangat membutuhkan pengulangan dan bimbingan dalam pengenalan identitas diri, serta masih dalam tahap mengembangkan kepercayaan terhadap lingkungan sekitar. Anak-anak pada usia ini belajar melalui eksplorasi sensori dan memerlukan dukungan emosional yang konsisten.', {
                  columnSpan: 4
                })
            )
            .addRowObject(
              new Row()
                .addTextCell('<b>Materi Pelajaran</b>', {
                  bold: true,
                  width: { size: 1800, type: WidthType.DXA }
                })
                .addTextCell('Materi pengenalan identitas diri mencakup pengetahuan esensial tentang nama dan bagian tubuh, pengetahuan aplikatif dalam berinteraksi sosial sederhana, serta pengetahuan nilai dan karakter melalui rasa percaya diri dan kemandirian. Materi ini sangat relevan dengan kehidupan sehari-hari anak dan memiliki tingkat kesulitan yang sesuai dengan tahap perkembangan mereka, mengintegrasikan nilai keimanan, kejujuran, dan kemandirian.', {
                  columnSpan: 4
                })
            )
            .addRowObject(
              new Row()
                .addTextCell('<b>Dimensi Profil Lulusan</b>', {
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
          createNumberedHeading('DESAIN PEMBELAJARAN', 1),
          new TableWrapper()
            .setFitContent()
            .addLabelValuePairRow('<b>Capaian Pembelajaran</b>', '<ul><li><b>Elemen Jati Diri:</b> Sub Elemen Anak memahami identitas dirinya yang terbentuk oleh ragam minat, kebutuhan, karakteristik gender, agama, dan sosial budaya</li><li><b>Elemen Jati Diri:</b> Sub Elemen Anak menggunakan fungsi gerak (motorik kasar, halus, dan taktil) untuk mengeksplorasi dan memanipulasi berbagai objek dan lingkungan sekitar sebagai bentuk pengembangan diri</li></ul>')
            .addLabelValuePairRow('<b>Lintas Disiplin Ilmu</b>', 'Nilai agama dan moral (mengenal keberadaan Tuhan melalui syukur atas identitas diri), nilai Pancasila (menghargai keberagaman nama dan karakteristik teman), fisik motorik (gerakan menunjuk dan melambai), kognitif (mengingat dan menyebut nama sendiri), bahasa (mengucapkan nama dengan jelas), sosial emosional (membangun kepercayaan diri dan interaksi dengan teman)')
            .addLabelValuePairRow('<b>Tujuan Pembelajaran</b>', '<ul><li>Anak mampu mengenal identitas dirinya sebagai bagian dari keluarga dan menyebutkan namanya sendiri sambil melakukan gerakan sederhana seperti melambai atau bertepuk tangan.</li></ul>')
            .addLabelValuePairRow('<b>Topik Pembelajaran</b>', 'Aku Istimewa: Ayo Kita Berkenalan')
            .addLabelValuePairRow('<b>Praktik Pedagogis</b>', 'Pembelajaran berbasis bermain dengan pendekatan eksplorasi langsung menggunakan metode bercerita interaktif, bernyanyi sambil bergerak, dan permainan cermin. Pendekatan ini mendukung prinsip berkesadaran melalui fokus pada diri sendiri, bermakna karena relevan dengan kehidupan sehari-hari, dan menggembirakan melalui aktivitas yang menyenangkan dan tidak menakutkan.')
            .addLabelValuePairRow('<b>Kemitraan Pembelajaran</b>', '<ul><li>Lingkungan pembelajaran mengintegrasikan ruang kelas yang nyaman dengan cermin besar, area bermain terbuka untuk aktivitas motorik, dan sudut tenang untuk kegiatan refleksi, menciptakan suasana aman yang mendorong eksplorasi identitas diri.</li></ul>')
            .addLabelValuePairRow('<b>Lingkungan Pembelajaran</b>', '<ul><li>Melibatkan guru kelas sebagai fasilitator utama, orang tua sebagai sumber informasi tentang anak di rumah, serta kakak kelas sebagai model positif dalam pengenalan diri dan interaksi sosial.</li></ul>')
            .addLabelValuePairRow('<b>Pemanfaatan Digital</b>', '<ul><li>Perencanaan: Persiapan video cerita dan lagu digital, aplikasi dokumentasi pembelajaran</li><li>Pelaksanaan: Video interaktif "Ayo Berkenalan", musik latar untuk aktivitas, dokumentasi foto dan video proses belajar anak</li><li>Asesmen: Portofolio digital karya anak, rekaman video presentasi sederhana anak</li><li>Dukungan media ajar digital tersedia melalui https://drive.paud.id/download/ayo-berkenalan/</li></ul>')
            .build(),
          createParagraph(''),
          ...createHeadingWithChildren('RENCANA PELAKSANAAN PEMBELAJARAN', 1, [
            ...createHeadingWithChildren('Pendahuluan', 2, [
              createParagraph('Pendahuluan tentang pengalaman belajar.')
            ], 720, 0, { numbering: { level: 1 } }),
            ...createHeadingWithChildren('Inti', 2, [
              createParagraph('Inti dari pengalaman belajar.')
            ], 720, 0, { numbering: { level: 1 } }),
            ...createHeadingWithChildren('Penutup', 2, [
              createParagraph('Penutup dari pengalaman belajar.')
            ], 720, 0, { numbering: { level: 1 } })
          ], 720, 0, { numbering: { level: 0 } })
        ]
      }
    ]
  })

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('Modul_Ajar_Keluarga_TK_Bintang_Kecil.docx', buffer)
    console.log('Dokumen berhasil dibuat!')
  })
})()
