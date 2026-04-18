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

## Classes

### `Row`
A class for creating table rows with extensive styling and cell management capabilities.

#### Methods

- **`addCell(cell)`**: Adds a cell or array of cells to the row.
  - **Parameters:** `cell` (TableCell|Array<TableCell>)
  - **Returns:** `Row` (for chaining)

- **`addTitleCell(text, columnSpan)`**: Adds a title cell that spans multiple columns with gray background.
  - **Parameters:** `text` (String), `columnSpan` (Number, default: 2)
  - **Returns:** `Row` (for chaining)

- **`addFormField(label)`**: Adds a form field pair (label cell + empty input cell).
  - **Parameters:** `label` (String)
  - **Returns:** `Row` (for chaining)

- **`addTextCell(text, options)`**: Adds a regular text cell with customizable styling.
  - **Parameters:** `text` (String), `options` (Object: alignment, style, bold, italic, columnSpan, margins, borders)
  - **Returns:** `Row` (for chaining)

- **`addLabelValue(label, value, options)`**: Adds a label/value pair inside the same row.
  - **Parameters:** `label` (String), `value` (String), `options` (Object: labelOptions, valueOptions)
  - **Returns:** `Row` (for chaining)

- **`setHeight(height, rule)`**: Sets the row height.
  - **Parameters:** `height` (Number in twips), `rule` (String: 'auto', 'atLeast', 'exact')
  - **Returns:** `Row` (for chaining)

- **`setCantSplit(cantSplit)`**: Prevents the row from splitting across pages.
  - **Parameters:** `cantSplit` (Boolean)
  - **Returns:** `Row` (for chaining)

- **`setAsHeader(isHeader)`**: Sets the row as a table header that repeats on each page.
  - **Parameters:** `isHeader` (Boolean)
  - **Returns:** `Row` (for chaining)

- **`build()`**: Constructs and returns the `TableRow` object.
  - **Returns:** `TableRow`

### `TableWrapper`
Enhanced table builder with Row objects and advanced table styling.

#### Methods

- **`addRow()`**: Creates and returns a new `Row` instance for chaining.
  - **Returns:** `Row`

- **`addTitleRow(text)`**: Convenience method to add a title row (legacy support).
  - **Parameters:** `text` (String)
  - **Returns:** `TableWrapper` (for chaining)

- **`addFormFieldRow(label)`**: Convenience method to add a form field row (legacy support).
  - **Parameters:** `label` (String)
  - **Returns:** `TableWrapper` (for chaining)

- **`addLabelValueRow(label1, value1, label2, value2)`**: Creates a row with two label/value pairs across four cells.
  - **Parameters:** `label1` (String), `value1` (String), `label2` (String), `value2` (String)
  - **Returns:** `TableWrapper` (for chaining)

- **`setAutoWidth(auto)`**: Enables or disables automatic table width based on content. When enabled, the table layout is set to `autofit` so Word adjusts column widths to content.
  - **Parameters:** `auto` (Boolean)
  - **Returns:** `TableWrapper` (for chaining)
  - **Parameters:** `auto` (Boolean)
  - **Returns:** `TableWrapper` (for chaining)

- **`setFitContent()`**: Convenience alias for `setAutoWidth(true)`.
  - **Returns:** `TableWrapper` (for chaining)

- **`addRowObject(row)`**: Adds a pre-built `Row` object to the table.
  - **Parameters:** `row` (Row)
  - **Returns:** `TableWrapper` (for chaining)

- **`setWidth(size, type)`**: Sets the table width.
  - **Parameters:** `size` (Number), `type` (WidthType)
  - **Returns:** `TableWrapper` (for chaining)

- **`setIndent(size, type)`**: Sets the table indentation.
  - **Parameters:** `size` (Number), `type` (WidthType)
  - **Returns:** `TableWrapper` (for chaining)

- **`setBorders(borders)`**: Sets table border styling.
  - **Parameters:** `borders` (Object)
  - **Returns:** `TableWrapper` (for chaining)

- **`setMargins(margins)`**: Sets table margins.
  - **Parameters:** `margins` (Object)
  - **Returns:** `TableWrapper` (for chaining)

- **`build()`**: Constructs and returns the final `Table` object.
  - **Returns:** `Table`

#### Advanced Usage Examples

```javascript
import { TableWrapper, Row, AlignmentType, WidthType, BorderStyle } from './docx-api.js';

// Example 1: Complex table with Row objects and styling
const complexTable = new TableWrapper()
  .setWidth(100, WidthType.PERCENTAGE)
  .addRowObject(
    new Row()
      .addTitleCell('COMPLEX TABLE HEADER\nWith Multiple Lines', 3)
      .setAsHeader(true)
      .setHeight(600, 'exact')
  )
  .addRowObject(
    new Row()
      .addTextCell('Column 1', { 
        bold: true, 
        alignment: AlignmentType.CENTER,
        style: 'Heading4'
      })
      .addTextCell('Column 2', { 
        italic: true,
        alignment: AlignmentType.LEFT 
      })
      .addTextCell('Column 3', { 
        alignment: AlignmentType.RIGHT 
      })
      .setHeight(400, 'atLeast')
      .setCantSplit(true)
  )
  .addRowObject(
    new Row()
      .addFormField('Name')
      .addTextCell('Additional Info', { columnSpan: 1 })
  )
  .setBorders({
    top: { style: BorderStyle.SINGLE, size: 2, color: '000000' },
    bottom: { style: BorderStyle.SINGLE, size: 2, color: '000000' },
    left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }
  })
  .build();

// Example 2: Simple chaining approach (backward compatible)
const simpleTable = new TableWrapper()
  .addTitleRow('Simple Title')
  .addFormFieldRow('Field Label')
  .addFormFieldRow('Another Field')
  .build();

// Example 3: Mixed approach - combining Row objects and convenience methods
const mixedTable = new TableWrapper()
  .addTitleRow('Header Row')
  .addRowObject(
    new Row()
      .addTextCell('Custom Cell 1', { bold: true })
      .addTextCell('Custom Cell 2', { italic: true })
      .setHeight(300, 'exact')
  )
  .addFormFieldRow('Standard Form Field')
  .build();

// Example 4: Advanced Row with multiple cells and styling
const advancedRow = new Row()
  .addTitleCell('Section Header', 2)
  .addTextCell('Data', { alignment: AlignmentType.CENTER })
  .setAsHeader(false)
  .setCantSplit(true)
  .setHeight(500, 'atLeast');

const tableWithAdvancedRow = new TableWrapper()
  .addRowObject(advancedRow)
  .build();
```

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