import OpenAIWrapper from '../src/lib/openai.js'
import fs from 'fs'
import generateDocxInVM from '../src/lib/vm-generate-docx.js'
import { extractCodeFromMarkdownFence } from '../src/utils/utils.js'

/**
 * Parse alokasiWaktu string into days and activities per day.
 * Format: 'N x M JP' → { totalHari: N, kegiatanPerHari: M }
 * Example: '5 x 3 JP' → { totalHari: 5, kegiatanPerHari: 3 }
 */
function parseAlokasiWaktu (alokasiWaktu) {
  const match = String(alokasiWaktu).match(/(\d+)\s*x\s*(\d+)/i)
  if (!match) return { totalHari: 5, kegiatanPerHari: 3 }
  return {
    totalHari: parseInt(match[1], 10),
    kegiatanPerHari: parseInt(match[2], 10)
  }
}

async function main () {
  try {
    const credentialVars = {
      namaSekolah: 'TK Negeri Pembina Bangsa',
      namaPenyusun: 'Zert S.Pd.',
      nip: '198001012010121001',
      temaSubtema: 'Keluarga / Keluargaku Sayang (Ayo Kenali Anggota Keluargaku)',
      fase: 'Fondasi',
      kelas: 'Kelompok A (2-3 tahun)',
      semester: 1,
      mingguKe: 1,
      bulan: 'Januari',
      alokasiWaktu: '7 x 3 JP',
      modelPembelajaran: 'Kolaboratif, Eksperimental',
      jumlahAnak: 10
    }

    const { totalHari, kegiatanPerHari } = parseAlokasiWaktu(credentialVars.alokasiWaktu)

    const openAI = new OpenAIWrapper()

    const prompt = `
Buatkan predefined variable JavaScript berdasarkan data guru di bawah ini.
Hasilkan konten yang sepenuhnya baru dan relevan berdasarkan input guru — jangan gunakan atau meniru nilai contoh dari dokumentasi schema.
Output hanya kode JavaScript murni, tanpa penjelasan, tanpa pembungkus backtick.

---

# Credentials (Ditetapkan oleh sistem — jangan ubah nilai ini)

- Tema/Subtema  : ${credentialVars.temaSubtema}
- Kelas         : ${credentialVars.kelas}
- Alokasi Waktu : ${credentialVars.alokasiWaktu} → ${totalHari} hari pembelajaran, ${kegiatanPerHari} kegiatan per hari
- Model Pembelajaran: ${credentialVars.modelPembelajaran}

⚠️  PENTING — Konsistensi Credentials:
- Variabel \`desainPembelajaranTopikPembelajaran\` HARUS konsisten dengan Tema/Subtema di atas.
- Variabel \`rencanaPelaksanaanIntiTable\` HARUS mencerminkan alokasi waktu ${credentialVars.alokasiWaktu}:
  * Total hari dalam tabel = ${totalHari} hari (tersebar di 3 tabel: MEMAHAMI, MENGAPLIKASI, MEREFLEKSI)
  * Setiap hari memiliki TEPAT ${kegiatanPerHari} kegiatan pembelajaran
  * Distribusi hari yang direkomendasikan: MEMAHAMI = Hari 1-2, MENGAPLIKASI = Hari 3-4, MEREFLEKSI = Hari 5 untuk alokasi waktu 5 x 3 JP. Sesuaikan distribusi untuk alokasi waktu yang berbeda, tetapi pastikan total hari dan kegiatan per hari tetap konsisten.

---

# Identifikasi

## Peserta Didik
Anak kelompok A (2-3 tahun) memiliki kemampuan bahasa yang sedang berkembang dengan kosakata terbatas namun mulai dapat mengungkapkan kebutuhan dasar. Mereka sangat membutuhkan pengulangan dan bimbingan dalam pengenalan identitas diri.

## Materi Pembelajaran
Materi pengenalan anggota keluarga mencakup nama ayah, ibu, kakak, dan adik, serta peran masing-masing dalam keluarga. Relevan dengan kehidupan sehari-hari anak dan mendukung rasa syukur kepada Tuhan.

## Dimensi Profil Lulusan
- DPL1 Keimanan dan Ketakwaan: true
- DPL2 Kewargaan: true
- DPL3 Penalaran Kritis: false
- DPL4 Kreativitas: true
- DPL5 Kolaborasi: true
- DPL6 Kemandirian: false
- DPL7 Kesehatan: false
- DPL8 Komunikasi: true

## Elemen Capaian Pembelajaran
- Nilai Agama dan Budi Pekerti
- Jati Diri

## Tujuan Pembelajaran
Anak mampu menyebutkan nama anggota keluarga inti dan menggambarkan peran sederhana masing-masing anggota keluarga melalui kegiatan bermain peran dan bercerita.

## Topik Pembelajaran
Keluargaku Sayang: Ayo Kenali Anggota Keluargaku

# Rencana Kegiatan

## Hari 1 & 2 — Memahami
Anak diajak mengenal foto keluarga masing-masing, menyebutkan nama ayah dan ibu, bermain boneka keluarga, dan menyanyikan lagu "Sayang Semuanya".

## Hari 3 & 4 — Mengaplikasi
Anak membuat pohon keluarga sederhana dari karton, menempelkan foto atau gambar anggota keluarga, lalu menceritakannya kepada teman.

## Hari 5 — Merefleksi
Anak melakukan bermain peran menjadi anggota keluarga, kemudian menceritakan kembali apa yang mereka pelajari tentang keluarga mereka.
`

    const response = await openAI.chat(prompt)
    console.log('AI Response:\n', response)
    fs.writeFileSync('ai_response.txt', response)

    // Remove code blocks from the response
    const cleanResponse = extractCodeFromMarkdownFence(response)

    // Execute the code — credentialVars is passed directly from above
    const docxBuffer = await generateDocxInVM(credentialVars, cleanResponse)
    if (docxBuffer) {
      fs.writeFileSync('generated_document.docx', docxBuffer)
      console.log('Document generated successfully: generated_document.docx')
    } else {
      console.error('Failed to generate document: No buffer returned from VM')
    }
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
