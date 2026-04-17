# Default DOCX Configuration

This document outlines how to apply default document configurations. Using these predefined variables ensures that all generated `.docx` files maintain consistent styling, page sizing, and typography.

## Predefined Configuration Variables

The following three core configuration objects standardize the document creation process:

### 1. `properties`
Defines the default page layout and margins. 
- **Page Size**: A4 dimensions ($11906 \times 16838$ twips / 21cm x 29.7cm).
- **Orientation**: Portrait.
- **Margins**: Top, Right, and Bottom margins are set to 3cm (**1701** twips). The Left margin is set to 4cm (**2268** twips) to accommodate binding.
- **Usage**: Apply this object to the `properties` field of every section (e.g., cover pages, content pages) within the document.

### 2. `spacing`
Defines standard paragraph spacing.
- **Line Spacing**: Set to **360** twips (1.5 line spacing) with the `AT_LEAST` rule.
- **Before/After**: Spacing set to **0**.
- **Usage**: Use this object as a base for paragraph configurations. You may override specific properties—such as changing line spacing to **240** for single spacing—within custom table cells or specific sections.

### 3. `paragraphStyles`
Defines the standard typographic hierarchy.
- **Font**: Uses **Times New Roman** as the standard typeface.
- **Font Sizes** (defined in half-points):
  - **Normal**: 12pt (**24**)
  - **Title**: 20pt (**40**), Bold
  - **Heading 1**: 16pt (**32**), Bold
  - **Heading 2**: 14pt (**28**), Bold
  - **Heading 3**: 13pt (**26**), Bold
- **Usage**: Inject this into the `Document` initialization under `styles.paragraphStyles`.

---

## Example Usage

When scaffolding a new document using the `docx` library, import and inject these default configurations. The following reference implementation demonstrates how these variables format the root `Document` and its sections.

```javascript
import { Document, DocumentDefaults, Packer } from 'docx';
// Assume properties, spacing, and paragraphStyles are imported from docx-config.js

// 1. Defining Sections using `properties`
const coverPage = {
  properties: properties, // Injects A4 size and default margins
  children: [
    // ... cover page elements ...
  ]
};

const contentPage = {
  properties: properties, // Injects A4 size and default margins
  children: [
    // ... content page elements ...
  ]
};

// 2. Initializing the Document with `paragraphStyles` and default `spacing`
const doc = new Document({
  styles: {
    default: new DocumentDefaults({
      paragraph: {
        spacing: {
          line: spacing.line,         // 360 (1.5 spacing)
          lineRule: spacing.lineRule, // 'AT_LEAST'
          before: spacing.before,     // 0
          after: spacing.after        // 0
        }
      }
    }),
    // Inject the predefined Title, Normal, and Heading styles
    paragraphStyles: paragraphStyles
  },
  sections: [
    coverPage,
    contentPage
  ]
});

// 3. Export the document
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('My_Standardized_Document.docx', buffer);
});
```

By strictly adhering to these variables, you ensure that all API helpers (such as `createHeading` and `createTitle`) utilize the consistent style identifiers and dimensions provided by the framework.