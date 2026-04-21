import fs from 'fs'
import path from 'path'
import generateDocxInVM from '../src/lib/vm-generate-docx.js'

const __dirname = import.meta.dirname

const predefinedVar = fs.readFileSync(path.join(__dirname, '../src/scripts/docx-example-predefined-var.js'), 'utf-8')

try {
  const result = generateDocxInVM({
    namaSekolah: 'TK Negeri Pembina Bangsa',
    namaPenyusun: 'Zert S.Pd.',
    nip: '198001012010121001',
    temaSubtema: 'Identitas / Diriku (Aku Istimewa; Ayo Kita Berkenalan)',
    fase: 'Fondasi',
    kelas: 'Kelompok A (2-3 tahun)',
    semester: 1,
    mingguKe: 1,
    bulan: 'Januari',
    alokasiWaktu: '5 x 3 JP',
    modelPembelajaran: 'Kolabortif, Eksperimental',
    jumlahAnak: 10
  }, predefinedVar)
  if (result && typeof result.then === 'function') {
    result
      .then(() => {
        console.log('VM code executed successfully.')
      })
      .catch((err) => {
        console.error('Error in async code within VM:', err)
      })
  } else {
    console.log('VM code executed synchronously.')
  }
} catch (err) {
  console.error('Error executing VM code:', err)
} finally {
  console.log('Finished executing VM code.')
}
