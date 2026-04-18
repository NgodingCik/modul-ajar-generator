# API Reference for DOCX Generation

This document provides a comprehensive reference for the API functions used to build structured Word documents (`.docx`) using the `docx` library. It includes function descriptions, parameter details, and usage examples.

## Functions

### `parseHtmlTags(text)`
Parses a string containing basic HTML tags (`<b>`, `<i>`, `<u>`, `<s>`) and converts them into an array of `TextRun` objects. It supports nested tags.
- **Parameters:**
  - `text` (String): The input string to be parsed.
- **Returns:** `TextRun[]`
- **Description:** This function enables the insertion of basic text formatting (bold, italic, underline, and strikethrough) directly within an input string, which is then translated into a format compatible with the `docx` library.

### `createParagraph(content, customSpacing)`
Creates a `Paragraph` with "Normal" styling. It supports HTML tag processing within the `content` and accepts optional spacing configurations.
- **Parameters:**
  - `content` (String | Object): The textual content or a paragraph configuration object.
  - `customSpacing` (Object, optional): Configuration for spacing (e.g., `before`, `after`, `line`). If omitted, default spacing is applied.
- **Returns:** `Paragraph`

### `createTitle(text, center, customSpacing)`
Creates a `Paragraph` styled as a **Document Title**.
- **Parameters:**
  - `text` (String): The title text (supports HTML tags).
  - `center` (Boolean, optional): Whether to center-align the text. Default is `false`.
  - `customSpacing` (Object, optional): Custom spacing overrides.
- **Returns:** `Paragraph`

### `createHeading(text, level, center, customSpacing, indentSize)`
Creates a `Paragraph` styled as a **Heading**. Standard line breaks (`\n`) are preserved.
- **Parameters:**
  - `text` (String): The heading text.
  - `level` (Number, optional): The heading level (1-6). Default is `1`.
  - `center` (Boolean, optional): Whether to center-align the heading. Default is `false`.
  - `customSpacing` (Object, optional): Custom spacing overrides.
  - `indentSize` (Number, optional): Left indentation size in twips. Default is `0`.
- **Returns:** `Paragraph`

### `createHeadingWithChildren(headingText, level, children, indentSize, headingIndent)`
Creates a heading paragraph followed by an array of indented child elements (paragraphs, tables, or strings).
- **Parameters:**
  - `headingText` (String): The heading text.
  - `level` (Number, optional): The heading level (1-3). Default is `1`.
  - `children` (Array, optional): An array of strings, `Paragraph` objects, or `Table` objects.
  - `indentSize` (Number, optional): Left indentation for the child elements. Default is `720` (1/2 inch).
  - `headingIndent` (Number, optional): Left indentation for the heading itself. Default is `0`.
- **Returns:** `Array` (Contains `[headingParagraph, ...childParagraphs]`)

### `bulletPoint(label, textOrChildren, children)`
Creates one or more bullet-pointed paragraphs. Supports bold label prefixes and nested sub-bullets.
- **Parameters:**
  - `label` (String): The bolded label for the primary bullet point (supports HTML tags).
  - `textOrChildren` (String | Array, optional): The text following the label, or an array of sub-bullets if no primary text is required.
  - `children` (Array, optional): An array of sub-bullet objects (e.g., `{ label: '...', text: '...' }`) to nest under the main bullet.
- **Returns:** `Paragraph[]`

### `titleCell(text)`
Creates a `TableCell` for table headers. It spans two columns, features a light gray background, and applies Title styling. Supports multiline text (`\n`).
- **Parameters:**
  - `text` (String): The cell text.
- **Returns:** `TableCell`

### `formField(label)`
Generates an array of two `TableCell` objects designed for a single `TableRow` to function as a form field. The left cell contains a bordered label, while the right cell serves as an empty bordered input area.
- **Parameters:**
  - `label` (String): The label for the form field.
- **Returns:** `[TableCell, TableCell]`

## Helper Functions

### `convertNumToRoman(num)`
Converts an integer to its Roman numeral representation.
- **Parameters:**
  - `num` (Number): The integer to convert.
- **Returns:** `String` (Roman numeral)

Example: `convertNumToRoman(1)` returns `"I"`.

---

## Example Usage

The following example demonstrates how to combine these API functions to structure complete document sections and export them using the `docx` library.

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