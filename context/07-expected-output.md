# Expected Output

Kamu akan membuat kode js IIFE (Immediately Invoked Function Expression) yang akan membuat script untuk mengenerate document dengan docx.js

Saya sudah menyiapkan variable:
- `poperties` untuk default page size dan margin
- `spacing` untuk default paragraph spacing
- `paragraphStyles` untuk default paragraph styles (Title, Normal, Heading 1-3)
- `coverPage` untuk section cover page

Saya juga sudah menyertakan API func helper yang dapat kamu gunakan untuk membuat elemen-elemen dokumen seperti `createParagraph`, `createHeading`, `createTextRun`, dll.

Contoh output yang diharapkan adalah seperti ini:

```
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
          createHeading('MODUL AJAR FASE FONDASI', 'Title'),
          createParagraph('TOPIK/SUB-TOPIK : Aku Sayang Bumi / Mengelola Sampah di Sekolah', 'Normal'),
          createParagraph('MINGGU KE : 1', 'Normal'),
          createHeading('A. IDENTITAS MODUL', 'Heading1'),
          createParagraph('Nama Sekolah : TK ABC', 'Normal'),
          createParagraph('Alamat : Jl. Merdeka No. 123, Jakarta', 'Normal'),
          createParagraph('Kepala Sekolah : Ibu Siti', 'Normal'),
          createParagraph('Guru Pengajar : Pak Budi', 'Normal')
        ]
      }
    ]
  })
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('Modul_Ajar_Paud_TK_Fase_Fondasi.docx', buffer)
  })
})()
```

Pastikan untuk menggunakan variabel yang sudah disediakan untuk menjaga konsistensi styling dan format dokumen.
OUTPUT KAMU HANYA BENAR-BENAR KODE JAVASCRIPT IIFE YANG MENGGENERATE DOCUMENT DENGAN DOCX.JS, JANGAN MENAMBAHKAN PENJELASAN ATAU TEKS LAIN DI LUAR KODE.
JANGAN BUNGKUS OUTPUT DENGAN TANDA ```javascript``` ATAU SEMACAMNYA, KARENA SAYA INGIN MENGGUNAKAN OUTPUT INI SEBAGAI TEMPLATE LANGSUNG.
ISI KONTENT DARI KEY JANGAN TERLALU SEDRHANA, JELASKAN DENGAN BAIK DAN DETAIL, SEPERTI CONTOH YANG SAYA BERIKAN SEBELUMNYA.