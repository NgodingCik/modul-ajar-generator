import { WidthType } from 'docx'
import {
  DocWrapper,
  SectionWrapper,
  TableWrapper,
  Row,
  parseContentAsParagraphs
} from './docx-api.js'
import { properties } from './docx-config.js'
import { coverPage } from './docx-cover-page.js'
import { convertNumToRoman } from './utils.js'
import {
  namaSekolah,
  namaPenyusun,
  temaSubtema,
  fase,
  kelas,
  semester,
  mingguKe,
  bulan,
  alokasiWaktu,
  modelPembelajaran,
  jumlahAnak,
  identifikasiPesertaDidik,
  identifikasiMateriPembelajaran,
  identifikasiDimensiProfilLulusan,
  desainPembelajaranCapaianPembelajaran,
  desainPembelajaranLintasDisiplinIlmu,
  desainPembelajaranTujuanPembelajaran,
  desainPembelajaranTopikPembelajaran,
  desainPembelajaranPraktikPedagogis,
  desainPembelajaranKemitraanPembelajaran,
  desainPembelajaranLingkunganPembelajaran,
  desainPembelajaranPemanfaatanDigital,
  rencanaPelaksanaanAwal,
  rencanaPelaksanaanInti,
  rencanaPelaksanaanIntiTable,
  rencanaPelaksanaanPenutup,
  asesmenPembelajaranAwal,
  asesmenPembelajaranProses,
  asesmenPembelajaranAkhir
} from './docx-predefined-var.js'

const toStringSafe = (value) => {
  if (value === null || value === undefined) return ''
  return String(value)
}

const toOrderedListHtml = (content) => {
  if (Array.isArray(content)) {
    const listItems = content
      .filter((item) => typeof item === 'string' && item.trim())
      .map((item) => `<li>${item}</li>`)
      .join('')

    return listItems ? `<ol>${listItems}</ol>` : ''
  }

  return typeof content === 'string' ? content : ''
}

const toRencanaAwalHtml = (content) => {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''

  const items = content
    .map((item) => {
      if (typeof item === 'string' && item.trim()) {
        return `<li>${item}</li>`
      }

      if (Array.isArray(item)) {
        const [title, subItems] = item
        if (typeof title !== 'string' || !title.trim()) return ''

        const nestedItems = Array.isArray(subItems)
          ? subItems
            .filter((subItem) => typeof subItem === 'string' && subItem.trim())
            .map((subItem) => `<li>${subItem}</li>`)
            .join('')
          : ''

        return `<li>${title}${nestedItems ? `<ol>${nestedItems}</ol>` : ''}</li>`
      }

      return ''
    })
    .join('')

  return items ? `<ol>${items}</ol>` : ''
}

const toBoldCell = (value) => {
  const cellValue = toStringSafe(value)
  if (!cellValue) return ''
  if (/<\/?b>/i.test(cellValue)) return cellValue
  return `<b>${cellValue}</b>`
}

const getDplStatus = (keys, source) => {
  const keyList = Array.isArray(keys) ? keys : [keys]
  return keyList.some((key) => Boolean(source?.[key]))
}

const createDplCell = (keys, code, label, source) => {
  const marker = getDplStatus(keys, source) ? 'x' : ' '
  return `<b>[${marker}] ${code}</b>\n${label}`
}

const appendRencanaIntiTables = (sectionWrapper, tableGroups) => {
  if (!Array.isArray(tableGroups)) return sectionWrapper

  tableGroups.forEach((tableGroup) => {
    if (!tableGroup || typeof tableGroup !== 'object') return

    const table = new TableWrapper()
      .setColumnWidths([500, 5000])
      .addTitleRow(toStringSafe(tableGroup.title))

    const rows = Array.isArray(tableGroup.rows) ? tableGroup.rows : []

    rows.forEach((row) => {
      if (!Array.isArray(row) || row.length < 2) return
      const [left, right] = row
      table.addLabelValuePairRow(toBoldCell(left), toStringSafe(right))
    })

    sectionWrapper.table(table)
  })

  return sectionWrapper
}

const dimensiProfilLulusan = {
  row1: [
    createDplCell('dpl1', 'DPL1', 'Keimanan dan Ketakwaan terhadap Tuhan YME', identifikasiDimensiProfilLulusan),
    createDplCell('dpl3', 'DPL3', 'Penalaran Kritis', identifikasiDimensiProfilLulusan),
    createDplCell('dpl5', 'DPL5', 'Kolaborasi', identifikasiDimensiProfilLulusan),
    createDplCell('dpl7', 'DPL7', 'Kesehatan', identifikasiDimensiProfilLulusan)
  ],
  row2: [
    createDplCell('dpl2', 'DPL2', 'Kewargaan', identifikasiDimensiProfilLulusan),
    createDplCell('dpl4', 'DPL4', 'Kreativitas', identifikasiDimensiProfilLulusan),
    createDplCell('dpl6', 'DPL6', 'Kemandirian', identifikasiDimensiProfilLulusan),
    createDplCell(['dpl8', 'dlp8'], 'DPL8', 'Komunikasi', identifikasiDimensiProfilLulusan)
  ]
}

const capaianPembelajaranContent = toOrderedListHtml(desainPembelajaranCapaianPembelajaran)
const tujuanPembelajaranContent = toOrderedListHtml(desainPembelajaranTujuanPembelajaran)
const kemitraanPembelajaranContent = toOrderedListHtml(desainPembelajaranKemitraanPembelajaran)
const lingkunganPembelajaranContent = toOrderedListHtml(desainPembelajaranLingkunganPembelajaran)
const pemanfaatanDigitalContent = toOrderedListHtml(desainPembelajaranPemanfaatanDigital)
const rencanaPelaksanaanAwalContent = toRencanaAwalHtml(rencanaPelaksanaanAwal)

;(async () => {
  const buffer = await new DocWrapper()
    .withDefaultStyles()

    // ── Section 1: Cover page ─────────────────────────────────────────────────
    .addSection(coverPage)

    // ── Section 2: Document content ───────────────────────────────────────────
    .addSection(
      new SectionWrapper(properties)

        // Document title table
        .table(
          new TableWrapper()
            .addTitleRow('MODUL AJAR PENDIDIKAN ANAK USIA DINI  KURIKULUM MERDEKA PERENCANAAN PEMBELAJARAN MENDALAM')
        )
        .sp()

        // Author / meta info table
        .table(
          new TableWrapper()
            .setFitContent()
            .addLabelValueRow('<b>Penulis</b>', namaPenyusun || '', '<b>Semester</b>', convertNumToRoman(semester || 0))
            .addLabelValueRow('<b>Asal Sekolah</b>', namaSekolah || '', '<b>Minggu Ke-</b>', toStringSafe(mingguKe))
            .addLabelValueRow('<b>Fase</b>', fase || '', '<b>Bulan</b>', bulan || '')
            .addLabelValueRow('<b>Jenjang/Kelas</b>', kelas || '', '<b>Alokasi Waktu</b>', alokasiWaktu || '')
            .addLabelValueRow('<b>Model Pembelajaran</b>', modelPembelajaran || '', '<b>Jumlah Anak</b>', toStringSafe(jumlahAnak))
            .addRowObject(
              new Row()
                .addTextCell('<b>Topik / Sub Topik</b>', { bold: true })
                .addTextCell(temaSubtema || '', { columnSpan: 3 })
            )
        )
        .sp(2)

        // ── A. IDENTIFIKASI ───────────────────────────────────────────────────
        .heading('IDENTIFIKASI', 1, { numbering: { level: 0 } })
        .sp()
        .table(
          new TableWrapper()
            .setFitContent()
            .addRowObject(
              new Row()
                .addTextCell('<b>Peserta Didik</b>', {
                  bold: true,
                  width: { size: 1800, type: WidthType.DXA }
                })
                .addTextCell(
                  identifikasiPesertaDidik || '',
                  { columnSpan: 4 }
                )
            )
            .addRowObject(
              new Row()
                .addTextCell('<b>Materi Pelajaran</b>', {
                  bold: true,
                  width: { size: 1800, type: WidthType.DXA }
                })
                .addTextCell(
                  identifikasiMateriPembelajaran || '',
                  { columnSpan: 4 }
                )
            )
            .addRowObject(
              new Row()
                .addTextCell('<b>Dimensi Profil Lulusan</b>', {
                  bold: true,
                  rowSpan: 2,
                  width: { size: 1800, type: WidthType.DXA }
                })
                .addTextCell(dimensiProfilLulusan.row1[0])
                .addTextCell(dimensiProfilLulusan.row1[1])
                .addTextCell(dimensiProfilLulusan.row1[2])
                .addTextCell(dimensiProfilLulusan.row1[3])
            )
            .addRowObject(
              new Row()
                .addTextCell(dimensiProfilLulusan.row2[0])
                .addTextCell(dimensiProfilLulusan.row2[1])
                .addTextCell(dimensiProfilLulusan.row2[2])
                .addTextCell(dimensiProfilLulusan.row2[3])
            )
        )
        .sp(4)

        // ── B. DESAIN PEMBELAJARAN ────────────────────────────────────────────
        .heading('DESAIN PEMBELAJARAN', 1, { numbering: { level: 0 } })
        .sp()
        .table(
          new TableWrapper()
            .setColumnWidths([2000, 5000])
            .addLabelValuePairRow('<b>Capaian Pembelajaran</b>',
              capaianPembelajaranContent)
            .addLabelValuePairRow('<b>Lintas Disiplin Ilmu</b>',
              desainPembelajaranLintasDisiplinIlmu || '')
            .addLabelValuePairRow('<b>Tujuan Pembelajaran</b>',
              tujuanPembelajaranContent)
            .addLabelValuePairRow('<b>Topik Pembelajaran</b>',
              desainPembelajaranTopikPembelajaran || '')
            .addLabelValuePairRow('<b>Praktik Pedagogis</b>',
              desainPembelajaranPraktikPedagogis || '')
            .addLabelValuePairRow('<b>Kemitraan Pembelajaran</b>',
              kemitraanPembelajaranContent)
            .addLabelValuePairRow('<b>Lingkungan Pembelajaran</b>',
              lingkunganPembelajaranContent)
            .addLabelValuePairRow('<b>Pemanfaatan Digital</b>',
              pemanfaatanDigitalContent)
        )
        .sp(2)

        // ── C. RENCANA PELAKSANAAN PEMBELAJARAN ──────────────────────────────
        .section('RENCANA PELAKSANAAN PEMBELAJARAN', 1,
          new SectionWrapper()
            .sp()

            // C.1 AWAL
            .section('AWAL (BERKESADARAN, BERMAKNA, MENGGEMBIRAKAN)', 2,
              new SectionWrapper()
                .sp()
                .add(parseContentAsParagraphs(rencanaPelaksanaanAwalContent)),
              { numbering: { level: 1 } }
            )
            .sp()

            // C.2 INTI
            .section('INTI', 2,
              appendRencanaIntiTables(
                new SectionWrapper()
                  .sp()
                  .para(rencanaPelaksanaanInti || '')
                  .sp(),
                rencanaPelaksanaanIntiTable
              ),
              { numbering: { level: 1 } }
            )
            .sp()

            // C.3 PENUTUP
            .section('PENUTUP (BEKESADARAN, MENGGEMBIRAKAN)', 2,
              new SectionWrapper()
                .sp()
                .add(parseContentAsParagraphs(rencanaPelaksanaanPenutup || '')),
              { numbering: { level: 1 } }
            )
            .sp()

            // C.4 ASESMEN PEMBELAJARAN
            .section('ASESMEN PEMBELAJARAN', 2,
              new SectionWrapper()
                .sp()
                .para('Asesmen pada Awal Pembelajaran:')
                .add(parseContentAsParagraphs(asesmenPembelajaranAwal || ''))
                .sp()
                .para('Asesmen pada Proses Pembelajaran:')
                .add(parseContentAsParagraphs(asesmenPembelajaranProses || ''))
                .sp()
                .para('Asesmen pada Akhir Pembelajaran:')
                .add(parseContentAsParagraphs(asesmenPembelajaranAkhir || '')),
              { numbering: { level: 1 } }
            ),

          { numbering: { level: 0 } }
        )
    )
    .save('Modul_Ajar_Keluarga_TK_Bintang_Kecil.docx')

  shared.buffer = buffer // eslint-disable-line no-undef
  console.log('Dokumen berhasil dibuat!')
})()
