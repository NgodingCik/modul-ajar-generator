# DocWrapper API Reference

A fluent, scalable API for building `.docx` files with consistent style, indentation, and spacing.
Built on top of the `docx` npm library.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [DocWrapper](#docwrapper)
3. [SectionWrapper](#sectionwrapper)
4. [TableWrapper](#tablewrapper)
5. [Row](#row)
6. [Paragraph & Heading Creators](#paragraph--heading-creators)
7. [List Helpers](#list-helpers)
8. [HTML / Markdown Parsing](#html--markdown-parsing)
9. [Configuration Constants](#configuration-constants)
10. [Migration Guide](#migration-guide)
11. [Full Example](#full-example)

---

## Architecture Overview

```
DocWrapper                       ← builds the Document
  └── addSection(SectionWrapper) ← one section = one "page" (own margins/properties)
        ├── .heading()           ← heading paragraph
        ├── .sp(n)               ← n empty spacing paragraphs
        ├── .para()              ← normal paragraph
        ├── .table(TableWrapper) ← table
        └── .section()          ← heading + indented children (nests SectionWrapper)
              └── SectionWrapper (nested, same API)

TableWrapper                     ← builds a Table
  └── addRowObject(Row)          ← one row
        └── .addTextCell()       ← one cell
```

The main improvement over the previous API:

| Old pattern                                                 | New pattern                                 |
| ----------------------------------------------------------- | ------------------------------------------- |
| `...createHeadingWithChildren('X', 1, [...])`               | `.section('X', 1, new SectionWrapper()...)` |
| `createParagraph('')` × 4                                   | `.sp(4)`                                    |
| Manual `sections: [...]` in Document                        | `.addSection(sectionWrapper)`               |
| Boilerplate `new Document({ numbering, styles, sections })` | `new DocWrapper().withDefaultStyles()`      |

---

## DocWrapper

Top-level Document builder. Handles all Document-level boilerplate.

```javascript
import { DocWrapper } from "./docx-api.js";

const buffer = await new DocWrapper()
  .withDefaultStyles() // apply Times New Roman styles from docx-config
  .addSection(coverPage) // raw section object or SectionWrapper
  .addSection(contentSection)
  .toBuffer();
```

### Methods

#### `withDefaultStyles()` → `DocWrapper`

Applies `DocumentDefaults` paragraph spacing and `paragraphStyles` from `docx-config.js`.
**Call this on every document** unless you have a custom style override.

#### `withStyles(stylesObj)` → `DocWrapper`

Inject a custom styles object (same shape as `Document` → `styles`).

```javascript
.withStyles({
  default: new DocumentDefaults({ paragraph: { spacing } }),
  paragraphStyles: [...]
})
```

#### `withNumbering(config)` → `DocWrapper`

Replace the default numbering config. By default, `getNumberingConfig()` is pre-registered,
providing `html-ordered-list`, `html-unordered-list`, and `section-heading-numbering`.

#### `addSection(section)` → `DocWrapper`

Add a section. Accepts:

- A `SectionWrapper` instance (auto-calls `.build()`)
- A raw section descriptor `{ properties?, children }` (backward compatible)

#### `build()` → `Document`

Returns the raw `docx` Document object. Use when you need direct access.

#### `toBuffer()` → `Promise<Buffer>`

Builds and returns a `Buffer`.

```javascript
const buffer = await docWrapper.toBuffer();
fs.writeFileSync("output.docx", buffer);
```

#### `save(filepath)` → `Promise<Buffer>`

Builds, writes the file to disk, and returns the `Buffer`.

```javascript
await new DocWrapper()
  .withDefaultStyles()
  .addSection(mySection)
  .save("output/MyDocument.docx");
```

---

## SectionWrapper

Fluent builder for a single Document section. Replaces raw children arrays entirely.

```javascript
import { SectionWrapper } from './docx-api.js'
import { properties } from './docx-config.js'

const mySection = new SectionWrapper(properties)
  .heading('DOCUMENT TITLE', 1, { center: true })
  .sp()
  .table(new TableWrapper()...)
  .sp(2)
  .section('SECTION A', 1,
    new SectionWrapper()
      .sp()
      .para('Content goes here.'),
    { numbering: { level: 0 } }
  )
  .build()
```

### Constructor

```javascript
new SectionWrapper(sectionProperties?)
```

- `sectionProperties` — page size / margin config from `docx-config.js → properties`.
  Pass `null` or omit to inherit the Document default.

### Methods

#### `.add(...items)` → `SectionWrapper`

Add any docx content. Arrays are flattened automatically — no more `...spread`.

```javascript
// Old
children: [
  ...createHeadingWithChildren(...),
  ...parseContentAsParagraphs(html)
]

// New
.add(parseContentAsParagraphs(html))  // array auto-flattened
```

#### `.sp(n = 1)` → `SectionWrapper`

Add `n` empty paragraphs for vertical spacing.

```javascript
// Old
createParagraph("");
createParagraph("");
createParagraph("")
  // New
  .sp(3);
```

#### `.para(content = '', customSpacing?)` → `SectionWrapper`

Add a paragraph. `content` may be a string (supports HTML tags) or a paragraph config object.

```javascript
.para('Regular text.')
.para('<b>Bold</b> and <i>italic</i>.')
.para({ children: [imageRun], alignment: AlignmentType.CENTER }, { after: 400 })
.para('', { before: 3000, line: 240, lineRule: 'AUTO' })  // spacer with custom height
```

#### `.heading(text, level = 1, options?)` → `SectionWrapper`

Add a heading paragraph without children.

```javascript
.heading('IDENTIFIKASI', 1)
.heading('Sub Section', 2, { numbering: { level: 1 } })
.heading('Centred Title', 1, { center: true })
```

**Options:**

| Key             | Type    | Default | Description                        |
| --------------- | ------- | ------- | ---------------------------------- |
| `center`        | boolean | `false` | Center-align the heading           |
| `indent`        | number  | `0`     | Left indent in twips               |
| `customSpacing` | Object  | `{}`    | Spacing overrides                  |
| `numbering`     | Object  | `null`  | `{ level, instance?, reference? }` |

#### `.section(text, level, children, options?)` → `SectionWrapper`

Add a heading followed by indented children. This is the primary nesting mechanism.

`children` may be:

- A `SectionWrapper` instance — its content is extracted automatically
- A raw `Array` of docx objects
- A single docx object

```javascript
.section('RENCANA PELAKSANAAN', 1,
  new SectionWrapper()
    .sp()
    .section('AWAL', 2,
      new SectionWrapper()
        .sp()
        .add(parseContentAsParagraphs('<ol><li>Step one</li></ol>')),
      { numbering: { level: 1 } }
    )
    .section('INTI', 2,
      new SectionWrapper()
        .sp()
        .para('Main content here.'),
      { numbering: { level: 1 } }
    ),
  { numbering: { level: 0 } }
)
```

**Options** (extends heading options):

| Key             | Type    | Default | Description                        |
| --------------- | ------- | ------- | ---------------------------------- |
| `indentSize`    | number  | `720`   | Per-child indent in twips          |
| `headingIndent` | number  | `0`     | Left indent on the heading itself  |
| `numbering`     | Object  | `null`  | `{ level, instance?, reference? }` |
| `center`        | boolean | `false` | Center the heading                 |

#### `.table(tableOrWrapper)` → `SectionWrapper`

Add a table. Accepts `TableWrapper` (auto-calls `.build()`) or a raw `Table`.

```javascript
.table(
  new TableWrapper()
    .setFitContent()
    .addLabelValuePairRow('<b>Label</b>', 'Value')
)
```

#### `.getChildren()` → `Array`

Return the accumulated children array. Used internally when passing a `SectionWrapper`
as the `children` argument to another `.section()` call.

#### `.build()` → `{ properties?, children }`

Produce the raw section descriptor. Passed directly to `DocWrapper.addSection()`.

---

## TableWrapper

Fluent table builder. All convenience methods return `this` for chaining.

```javascript
new TableWrapper()
  .setFitContent()
  .addTitleRow("TABLE HEADER")
  .addLabelValueRow("<b>Penulis</b>", name, "<b>Semester</b>", semester)
  .addLabelValuePairRow("<b>Capaian Pembelajaran</b>", "<ul><li>...</li></ul>")
  .addRowObject(
    new Row().addTextCell("<b>Topik</b>").addTextCell(topik, { columnSpan: 3 }),
  )
  .build();
```

### Constructor Options (via setters)

| Method                   | Description                             |
| ------------------------ | --------------------------------------- |
| `.setWidth(size, type)`  | Default: 100%                           |
| `.setIndent(size, type)` | Default: 0                              |
| `.setFitContent()`       | AUTOFIT layout (adapts to cell content) |
| `.setColumnWidths(widths)` | Set per-column widths (DXA twips)     |
| `.setBorders(borders)`   | Table-level border config               |
| `.setMargins(margins)`   | Table-level cell margin defaults        |

### Row convenience methods

| Method                              | Result                                               |
| ----------------------------------- | ---------------------------------------------------- |
| `.addTitleRow(text)`                | Shaded header row spanning 2 columns. Supports `\n`. |
| `.addFormFieldRow(label)`           | Label cell (fixed 3000 twip) + blank input cell      |
| `.addLabelValuePairRow(label, val)` | Bold label + value, 2 columns. Supports `\n` in both cells |
| `.addLabelValueRow(l1, v1, l2, v2)` | Two label/value pairs, 4 columns. Supports `\n` in all cells |
| `.addRow()`                         | Returns a new `Row` for manual building              |
| `.addRowObject(row)`                | Add a pre-built `Row` instance                       |

### `.build()` → `Table`

---

## Row

Fluent builder for a single `TableRow`.

```javascript
new Row()
  .addTitleCell("Header", 2) // shaded, colspan 2
  .addFormField("Field Label") // label + blank input
  .addTextCell("content", { columnSpan: 3, rowSpan: 2 })
  .addLabelValue("Key", "Value")
  .setHeight(400, "exact")
  .setCantSplit()
  .setAsHeader()
  .build();
```

### Cell methods

#### `.addTitleCell(text, columnSpan = 2)` → `Row`

Shaded (`#CCCCCC`) centered cell using `Heading3` style. Supports `\n` for multi-line.

#### `.addFormField(label)` → `Row`

Adds two cells: a fixed-width (3000 twips) label cell and a blank input cell.

#### `.addTextCell(text, options?)` → `Row`

Adds a content cell. `text` supports HTML tags, HTML/markdown lists, and explicit line breaks via `\n`.

**Options:**

| Key          | Type             | Default                                          |
| ------------ | ---------------- | ------------------------------------------------ |
| `columnSpan` | number           | `1`                                              |
| `rowSpan`    | number           | `1`                                              |
| `width`      | `{ size, type }` | `null` (auto)                                    |
| `margins`    | Object           | `{ top: 50, bottom: 50, left: 100, right: 100 }` |
| `borders`    | Object           | All sides `SINGLE, size 1, black`                |

#### `.addLabelValue(label, value, options?)` → `Row`

Adds bold label cell + value cell side by side.

### Row property methods

| Method                     | Description                                  |
| -------------------------- | -------------------------------------------- |
| `.setHeight(twips, rule?)` | `rule`: `'auto'` \| `'atLeast'` \| `'exact'` |
| `.setCantSplit(bool?)`     | Prevent row from splitting across pages      |
| `.setAsHeader(bool?)`      | Repeat row on each page                      |

---

## Paragraph & Heading Creators

These remain available as standalone functions for cases where the fluent API is not needed.

### `createParagraph(content, customSpacing?)` → `Paragraph`

| Argument        | Type               | Description                                                      |
| --------------- | ------------------ | ---------------------------------------------------------------- |
| `content`       | `string \| Object` | Text (supports HTML tags) or paragraph config object             |
| `customSpacing` | Object             | `{ before, after, line, lineRule }`. Omit to use style defaults. |

### `createTitle(text, center?, customSpacing?)` → `Paragraph`

`Title` style paragraph. Use for document-level titles.

### `createHeading(text, level?, center?, customSpacing?, indentSize?)` → `Paragraph`

`Heading1`–`Heading6` paragraph. Newlines (`\n`) become line breaks within the paragraph.

### `createNumberedHeading(text, level?, numberingLevel?, numberingInstance?, center?, customSpacing?, indentSize?, numberingReference?)` → `Paragraph`

Heading with `numPr` metadata. Requires `getNumberingConfig()` registered on the Document.
Use `SectionWrapper.heading(..., { numbering: { level } })` as a shorter alternative.

### `createHeadingWithChildren(headingText, level?, children?, indentSize?, headingIndent?, headingOptions?)` → `Array`

Returns `[headingParagraph, ...indentedChildren]`.
Prefer `SectionWrapper.section()` which eliminates the `...spread` requirement.

---

## List Helpers

### `bulletPoint(label, textOrChildren?, children?)` → `Paragraph[]`

Create a top-level bullet point with optional bold label and optional nested sub-bullets.

```javascript
// Simple
bulletPoint("", "Plain bullet");

// With label
bulletPoint("Note: ", "This is important.");

// With nested sub-bullets
bulletPoint("Learning needs:", "", [
  { label: "Visual:", text: "Prefers diagrams." },
  { label: "Auditory:", text: "Benefits from audio." },
]);
```

### `getNumberingConfig()` → `Array`

Returns the numbering config array for `Document → numbering → config`.
`DocWrapper` registers this automatically — you only need this when constructing `Document` manually.

**Registered references:**

| Reference                   | Levels                   |
| --------------------------- | ------------------------ |
| `html-ordered-list`         | `1.` / `a)` / `i)`       |
| `html-unordered-list`       | `•` / `◦` / `▪`          |
| `section-heading-numbering` | `A.` / `A.1.` / `A.1.1.` |

---

## HTML / Markdown Parsing

### `parseHtmlTags(text)` → `TextRun[]`

Parse inline `<b>`, `<i>`, `<u>`, `<s>` tags. Supports nesting.

```javascript
parseHtmlTags("Hello <b><i>world</i></b>!");
```

### `parseHtmlLists(text)` → `Paragraph[] | null`

Auto-detect HTML lists (`<ul>`, `<ol>`, `<li>`) or markdown (`- item`) and convert to paragraphs.

### `parseHtmlListTags(text)` → `Paragraph[] | null`

HTML list parser only. Supports nesting (`<ol>` inside `<li>`).

### `parseMarkdownLists(lines)` → `Paragraph[] | null`

Markdown `- item` list parser. Pass `text.split('\n')`.

### `parseContentAsParagraphs(content)` → `Paragraph[]`

Primary smart parser. Detects lists first; if no list is detected, `\n` is converted to line breaks in the same paragraph, then it falls back to a single formatted paragraph.
Used internally by `Row.addTextCell()` and `SectionWrapper.add()`.

---

## Configuration Constants

Exported from `docx-config.js`:

| Constant            | Value  | Description                                   |
| ------------------- | ------ | --------------------------------------------- |
| `CONTENT_WIDTH_DXA` | `7937` | Usable width for A4 with current margins      |
| `DEFAULT_INDENT`    | `720`  | Default indentation step (0.5 inch)           |
| `MARGIN_LEFT`       | `2268` | Left margin (4 cm)                            |
| `MARGIN_RIGHT`      | `1701` | Right margin (3 cm)                           |
| `MARGIN_TOP`        | `1701` | Top margin (3 cm)                             |
| `MARGIN_BOTTOM`     | `1701` | Bottom margin (3 cm)                          |
| `properties`        | Object | A4 page size + margin config for sections     |
| `spacing`           | Object | Default line spacing (360, AT_LEAST)          |
| `paragraphStyles`   | Array  | Heading1–3 + Title + Normal style definitions |

---

## Migration Guide

### Before (old pattern)

```javascript
// Entry file
const doc = new Document({
  numbering: { config: getNumberingConfig() },
  styles: {
    default: new DocumentDefaults({ paragraph: { spacing } }),
    paragraphStyles
  },
  sections: [
    coverPage,
    {
      properties,
      children: [
        createNumberedHeading('IDENTIFIKASI', 1),
        createParagraph(''),
        new TableWrapper().setFitContent()...build(),
        createParagraph(''),
        createParagraph(''),
        createParagraph(''),
        ...createHeadingWithChildren('RENCANA', 1, [
          createParagraph(''),
          ...createHeadingWithChildren('AWAL', 2, [
            createParagraph(''),
            ...parseContentAsParagraphs('<ol>...</ol>')
          ], 720, 0, { numbering: { level: 1 } }),
          createParagraph(''),
          ...createHeadingWithChildren('INTI', 2, [
            createParagraph(''),
            createParagraph('Some text.')
          ], 720, 0, { numbering: { level: 1 } })
        ], 720, 0, { numbering: { level: 0 } })
      ]
    }
  ]
})
const buffer = await Packer.toBuffer(doc)
fs.writeFileSync('out.docx', buffer)
```

### After (new pattern)

```javascript
// Entry file
await new DocWrapper()
  .withDefaultStyles()
  .addSection(coverPage)
  .addSection(
    new SectionWrapper(properties)
      .heading('IDENTIFIKASI', 1, { numbering: { level: 0 } })
      .sp()
      .table(new TableWrapper().setFitContent()...)
      .sp(3)
      .section('RENCANA', 1,
        new SectionWrapper()
          .sp()
          .section('AWAL', 2,
            new SectionWrapper()
              .sp()
              .add(parseContentAsParagraphs('<ol>...</ol>')),
            { numbering: { level: 1 } }
          )
          .sp()
          .section('INTI', 2,
            new SectionWrapper()
              .sp()
              .para('Some text.'),
            { numbering: { level: 1 } }
          ),
        { numbering: { level: 0 } }
      )
  )
  .save('out.docx')
```

**Key differences:**

- No `Document`, `Packer`, `DocumentDefaults` boilerplate in entry files
- `...spread` is gone — `.add()` flattens arrays automatically
- `.sp(n)` replaces repeated `createParagraph('')`
- `.section()` replaces `...createHeadingWithChildren()`
- Nested `SectionWrapper` makes nesting depth visually clear

---

## Full Example

```javascript
import {
  DocWrapper,
  SectionWrapper,
  TableWrapper,
  Row,
  parseContentAsParagraphs,
} from "./docx-api.js";
import { properties } from "./docx-config.js";
import { coverPage } from "./docx-cover-page.js";

await new DocWrapper()
  .withDefaultStyles()

  // Section 1: Cover page (built with SectionWrapper in docx-cover-page.js)
  .addSection(coverPage)

  // Section 2: Document content
  .addSection(
    new SectionWrapper(properties)

      // Info table
      .table(
        new TableWrapper()
          .addTitleRow("MODUL AJAR")
          .addLabelValueRow(
            "<b>Penulis</b>",
            "Nikola Tesla",
            "<b>Semester</b>",
            "I",
          ),
      )
      .sp(2)

      // Section A – numbered heading with table children
      .section(
        "IDENTIFIKASI",
        1,
        new SectionWrapper()
          .sp()
          .table(
            new TableWrapper()
              .setFitContent()
              .addRowObject(
                new Row()
                  .addTextCell("<b>Peserta Didik</b>", {
                    width: { size: 1800, type: WidthType.DXA },
                  })
                  .addTextCell("Deskripsi peserta didik.", { columnSpan: 4 }),
              ),
          ),
        { numbering: { level: 0 } },
      )
      .sp(2)

      // Section B – nested sub-sections
      .section(
        "RENCANA PELAKSANAAN PEMBELAJARAN",
        1,
        new SectionWrapper()
          .sp()
          .section(
            "AWAL",
            2,
            new SectionWrapper()
              .sp()
              .add(
                parseContentAsParagraphs(
                  "<ol><li>Salam pembuka</li><li>Doa bersama</li></ol>",
                ),
              ),
            { numbering: { level: 1 } },
          )
          .sp()
          .section(
            "INTI",
            2,
            new SectionWrapper()
              .sp()
              .para("Deskripsi kegiatan inti.")
              .sp()
              .table(
                new TableWrapper()
                  .setFitContent()
                  .addTitleRow("KEGIATAN INTI")
                  .addLabelValuePairRow("<b>Hari</b>", "<b>Uraian</b>")
                  .addLabelValuePairRow("<b>1</b>", "Aktivitas hari pertama."),
              ),
            { numbering: { level: 1 } },
          ),
        { numbering: { level: 0 } },
      ),
  )

  .save("Modul_Ajar.docx");
```
