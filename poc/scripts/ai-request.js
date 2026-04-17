import OpenAIWrapper from '../../src/lib/openai.js'
import fs from 'fs'
import generateDocxInVM from '../../src/lib/vm-generate-docx.js'

async function main () {
  try {
    const openAI = new OpenAIWrapper()

    const prompt = `
    Buatlah IIFE (Immediately Invoked Function Expression) dalam JavaScript untuk menggenerate document dengan docx.js.

    Nama Satuan Pendidikan: TK Bintang Kecil
    Nama Penyusun: Siti Aminah
    NIP: 123456789
    Tema / Subtema: Keluarga / Anggota Keluarga
    Fase / Kelas / Semester: Fase Fondasi / TK A / Semester 1
    Alokasi Waktu: 6JP (3 Pertemuan)
    Tahun Pelajaran: 2026/2027

    Tujuan Pembelajaran:
    1. Anak dapat menyebutkan anggota keluarga inti (ayah, ibu, saudara).
    2. Anak dapat menggambar anggota keluarga menggunakan bentuk sederhana.
    3. Anak dapat menyanyikan lagu tentang keluarga.

    Kegiatan Pembelajaran:

    Pertemuan 1:
    - Pendahuluan: Menyapa anak dan memperkenalkan tema keluarga dengan gambar dan cerita singkat.
    - Inti: Mengajak anak menyebutkan anggota keluarga inti dan menggambar anggota keluarganya sendiri.
    - Penutup: Menyanyikan lagu tentang keluarga bersama-sama.

    Pertemuan 2:
    - Pendahuluan: Mengulang kembali anggota keluarga inti dengan gambar dan cerita.
    - Inti: Bermain peran dengan boneka untuk mengenal peran setiap anggota keluarga.
    - Penutup: Menyanyikan lagu tentang keluarga bersama-sama.

    Pertemuan 3:
    - Pendahuluan: Mengulang kembali anggota keluarga inti dengan gambar dan cerita.
    - Inti: Membuat kolase anggota keluarga menggunakan potongan kertas warna-warni.
    - Penutup: Menyanyikan lagu tentang keluarga bersama-sama.
    `

    const response = await openAI.chat(prompt)
    console.log('AI Response:\n', response)
    fs.writeFileSync('ai_response.txt', response)

    // Execute the code
    const docxBuffer = await generateDocxInVM(response)
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
