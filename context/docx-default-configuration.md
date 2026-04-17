# Default DOCX Configuration

> **CRITICAL INSTRUCTION FOR AI:** 
> You **MUST NOT** create or reinvent your own configuration objects for page sizes, margins, typography, or spacing. You **MUST** directly use the predefined variable names (`properties`, `spacing`, and `paragraphStyles`) from `docx-config.js`. Do not inline or hardcode these values anywhere else.

This document instructs developers and AI agents on how to apply the default document configurations defined in `docx-config.js`. Using these predefined variables ensures that all generated `.docx` files share a consistent styling, page sizing, and typography.

## Predefined Configuration Variables

The `docx-config.js` file exports three fundamental configuration objects:

### 1. `properties`
Defines the default page layout and margins. 
- **Page Size**: A4 dimensions (`11906` x `16838` twips / 21cm x 29.7cm).
- **Orientation**: Portrait.
- **Margins**: Top, Right, and Bottom margins are set to 3cm (`1701` twips), while the Left margin is set to 4cm (`2268` twips) to accommodate binding.
- **Usage**: Apply this object to the `properties` field of every section (e.g., cover pages, content pages) within the document.

### 2. `spacing`
Defines standard paragraph spacing.
- **Line Spacing**: Set to `360` twips (1.5 lines spacing) with the rule `AT_LEAST`.
- **Before/After**: Spacing set to `0`.
- **Usage**: Use this object as a base when creating paragraph configurations or override specific properties (like line spacing to `240` for single spacing) inside custom table cells.

### 3. `paragraphStyles`
Defines standard typographic hierarchies.
- Uses **Times New Roman** as the standard font.
- Predefines font sizes (in half-points):
  - **Normal**: 12pt (`24`)
  - **Title**: 20pt (`40`), Bold
  - **Heading 1**: 16pt (`32`), Bold
  - **Heading 2**: 14pt (`28`), Bold
  - **Heading 3**: 13pt (`26`), Bold
- **Usage**: Inject into the `Document` initialization under `styles.paragraphStyles`.

---

## Example Usage

When scaffolding a new document using the `docx` library, import and inject these default configurations. Below is a reference implementation showing exactly how these variables format the root `Document` and its sections.

```javascript
import { Document, DocumentDefaults, Packer } from 'docx';
// Assume properties, spacing, and paragraphStyles are imported from docx-config.js

// 1. Defining Sections with `properties`
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
  fs.writeFileSync('My Standardized Document.docx', buffer);
});
```

By strictly adhering to these variables, you ensure all API helpers (such as `createHeading` and `createTitle`) will utilize the consistent style identifiers and dimensions provided by the framework.