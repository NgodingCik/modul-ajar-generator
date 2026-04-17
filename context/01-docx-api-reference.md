# API Documentation

This document describes the utility functions for easily building structured Word (`.docx`) documents using the `docx` library. It also provides a comprehensive usage example.

## Functions

### `parseHtmlTags(text)`
Parses a string containing basic HTML-like tags (`<b>`, `<i>`, `<u>`, `<s>`) and converts it into an array of `TextRun` objects. Supports nested tags.
- **Parameters:**
  - `text` (String): The text to parse.
- **Returns:** `TextRun[]`

### `createParagraph(content, customSpacing)`
Creates a `docx` `Paragraph` object. Automatically parses HTML tags if the content contains a string with tags.
- **Parameters:**
  - `content` (String | Object): The textual content or paragraph configuration object.
  - `customSpacing` (Object, optional): Custom spacing configuration (e.g., `before`, `after`, `line`).
- **Returns:** `Paragraph`

### `createTitle(text, center, customSpacing)`
Creates a `Paragraph` styled as a Document Title.
- **Parameters:**
  - `text` (String): The title text. Supports HTML tags.
  - `center` (Boolean, optional): Whether to center-align the text. Default is `false`.
  - `customSpacing` (Object, optional): Custom spacing overrides.
- **Returns:** `Paragraph`

### `createHeading(text, level, center, customSpacing, indentSize)`
Creates a `Paragraph` styled as a Heading. Multiple lines (separated by `\n`) are preserved.
- **Parameters:**
  - `text` (String): The heading text.
  - `level` (Number, optional): The heading level (1-6). Default is `1`.
  - `center` (Boolean, optional): Whether to center-align the heading. Default is `false`.
  - `customSpacing` (Object, optional): Custom spacing overrides.
  - `indentSize` (Number, optional): Left indentation size in twips. Default is `0`.
- **Returns:** `Paragraph`

### `createHeadingWithChildren(headingText, level, children, indentSize, headingIndent)`
Creates a heading paragraph followed by an array of child elements (paragraphs, tables, or strings) with an applied indentation.
- **Parameters:**
  - `headingText` (String): The heading text.
  - `level` (Number, optional): The heading level. Default is `1`.
  - `children` (Array, optional): An array of strings, `Paragraph` objects, or `Table` objects.
  - `indentSize` (Number, optional): Left indentation size for the children. Default is `720` (1/2 inch).
  - `headingIndent` (Number, optional): Left indentation size for the heading itself. Default is `0`.
- **Returns:** `Array` (contains `[headingParagraph, ...childParagraphs]`)

### `bulletPoint(label, textOrChildren, children)`
Creates one or more bullet-pointed paragraphs. Supports a bold label prefix and nested sub-bullets.
- **Parameters:**
  - `label` (String): The bolded label for the main bullet point. Supports HTML tags.
  - `textOrChildren` (String | Array, optional): The text following the label, or an array of sub-bullets if no primary text is needed. Supports HTML tags.
  - `children` (Array, optional): An array of sub-bullet objects (e.g., `{ label: '...', text: '...' }` or strings) to nest under the main bullet point.
- **Returns:** `Paragraph[]`

### `titleCell(text)`
Creates a `TableCell` for a table header/title. It spans 2 columns, has a light gray shading, and uses the Title style. Supports multiline text (`\n`).
- **Parameters:**
  - `text` (String): The cell text.
- **Returns:** `TableCell`

### `formField(label)`
Creates an array of two `TableCell` objects intended to be used within a single `TableRow` to act as a form field. The left cell contains the label bordered in black, and the right cell is an empty bordered input area.
- **Parameters:**
  - `label` (String): The label for the form field.
- **Returns:** `[TableCell, TableCell]`

---

## Example Usage

Below is a demonstration of how to combine these API functions to structure complete document sections (e.g., Cover Pages and Content Pages) and export them using the `docx` library.

```javascript
import fs from 'fs';
import path from 'path';
import { Document, Packer, Table, TableRow, WidthType, AlignmentType, ImageRun } from 'docx';

(async () => {
  const coverPage = {
    properties: { /* your custom page properties */ },
    children: [
      // Blank space
      createParagraph('', {
        before: 3000,
        line: 240,
        lineRule: 'AUTO'
      }),
      // Image header
      createParagraph(
        {
          children: [
            new ImageRun({
              data: fs.readFileSync(
                path.join(__dirname, '../assets/tut-wuri-handayani.png')
              ),
              transformation: {
                width: 200,
                height: 200
              }
            })
          ],
          alignment: AlignmentType.CENTER
        },
        {
          after: 400,
          lineRule: 'AUTO'
        }
      ),
      new Table({
        rows: [
          // Title row (supports \n for multiple lines)
          new TableRow({
            children: [
              titleCell('MODUL AJAR\nKURIKULUM MERDEKA (Deep Learning)')
            ]
          }),
          // Form fields mapping using the helper
          new TableRow({ children: formField('Nama Sekolah') }),
          new TableRow({ children: formField('Nama Penyusun') }),
          new TableRow({ children: formField('NIP') }),
          new TableRow({ children: formField('Tema / Subtema') }),
          new TableRow({ children: formField('Fase / Kelas / Semester') })
        ],
        width: {
          size: 100,
          type: WidthType.PERCENTAGE
        },
        indent: {
          size: 0,
          type: WidthType.AUTO
        }
      })
    ]
  }

  const contentPage = {
    properties: { /* your page properties */ },
    children: [
      createHeading('MODUL AJAR DEEP LEARNING\nTEMA/SUBTEMA: Diriku/Tubuhku\nBAB I: MENGENAL BAGIAN TUBUH', 1, true),
      createParagraph(''),
      
      // Creating sections with nested sub-content (like tables or text)
      ...createHeadingWithChildren(
        'A. IDENTITAS MODUL',
        2,
        [
          new Table({
            rows: [
              new TableRow({ children: formField('Nama Sekolah') }),
              new TableRow({ children: formField('Nama Penyusun') }),
              new TableRow({ children: formField('NIP') }),
              new TableRow({ children: formField('Tema / Subtema') }),
              new TableRow({ children: formField('Fase / Kelas / Semester') }),
              new TableRow({ children: formField('Alokasi Waktu') }),
              new TableRow({ children: formField('Tahun Ajaran') })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            }
          })
        ],
        720 // Indentation indentSize for level 2 children
      ),
      createParagraph(''),
      
      // Using bullet point utilities with nested bullets
      ...createHeadingWithChildren(
        'B. IDENTIFIKASI KESIAPAN PESERTA DIDIK',
        2,
        [
          ...bulletPoint('Pengetahuan Awal: ', 'Peserta didik telah memiliki pengetahuan dasar tentang nama-nama hewan dalam bahasa Inggris.'),
          ...bulletPoint('Kebutuhan Belajar: ', '', [
            { label: 'Visual: ', text: 'Peserta didik belajar lebih baik dengan bantuan gambar, video, dan infografis.' },
            { label: 'Auditori: ', text: 'Peserta didik perlu mendengarkan audio dialog, monolog, dan penjelasan.' },
            { label: 'Kinestetik: ', text: 'Peserta didik memerlukan aktivitas bergerak seperti permainan dan presentasi.' }
          ])
        ],
        720
      )
    ]
  }

  const doc = new Document({
    styles: { /* default paragraphStyles mapping */ },
    sections: [
      coverPage,
      contentPage
    ]
  })

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('My Document.docx', buffer);
})();
``` 