// ─────────────────────────────────────────────────────────────────────────────
// Page layout
// All measurements are in twips (DXA). 1 inch = 1440 twips.
// A4: 11906 × 16838 twips  |  Letter: 12240 × 15840 twips
// ─────────────────────────────────────────────────────────────────────────────

/** Left margin in twips (4 cm) */
const MARGIN_LEFT = 2268

/** Right / top / bottom margins in twips (3 cm) */
const MARGIN_RIGHT = 1701
const MARGIN_TOP = 1701
const MARGIN_BOTTOM = 1701

/**
 * Usable content width for A4 with these margins (in twips).
 * = 11906 − MARGIN_LEFT − MARGIN_RIGHT = 7937
 */
const CONTENT_WIDTH_DXA = 11906 - MARGIN_LEFT - MARGIN_RIGHT // 7937

/**
 * Default indentation step used by SectionWrapper.section() and
 * createHeadingWithChildren(). One tab stop = 720 twips (0.5 inch).
 */
const DEFAULT_INDENT = 720

// ─────────────────────────────────────────────────────────────────────────────
// Section properties (page size + margins) — used as section.properties
// ─────────────────────────────────────────────────────────────────────────────

const properties = {
  page: {
    size: {
      orientation: 'portrait',
      width: 11906, // A4 width  (21 cm)
      height: 16838 // A4 height (29.7 cm)
    },
    margin: {
      top: MARGIN_TOP,
      right: MARGIN_RIGHT,
      bottom: MARGIN_BOTTOM,
      left: MARGIN_LEFT
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Default paragraph spacing
// Used by DocumentDefaults and createParagraph fallback.
// ─────────────────────────────────────────────────────────────────────────────

const spacing = {
  line: 360,
  lineRule: 'AT_LEAST',
  before: 0,
  after: 0
}

// ─────────────────────────────────────────────────────────────────────────────
// Paragraph styles — passed to Document `styles.paragraphStyles`
// IDs must exactly match docx built-in names to override them.
// font sizes are in half-points (24 = 12 pt, 32 = 16 pt, etc.)
// ─────────────────────────────────────────────────────────────────────────────

const paragraphStyles = [
  {
    id: 'Normal',
    name: 'Normal',
    basedOn: 'Normal',
    next: 'Normal',
    run: {
      font: 'Times New Roman',
      size: 24 // 12 pt
    }
  },
  {
    id: 'Title',
    name: 'Title',
    basedOn: 'Normal',
    next: 'Normal',
    run: {
      font: 'Times New Roman',
      size: 40, // 20 pt
      bold: true
    }
  },
  {
    id: 'Heading1',
    name: 'Heading 1',
    basedOn: 'Normal',
    next: 'Normal',
    run: {
      font: 'Times New Roman',
      size: 32, // 16 pt
      bold: true
    }
  },
  {
    id: 'Heading2',
    name: 'Heading 2',
    basedOn: 'Normal',
    next: 'Normal',
    run: {
      font: 'Times New Roman',
      size: 28, // 14 pt
      bold: true
    }
  },
  {
    id: 'Heading3',
    name: 'Heading 3',
    basedOn: 'Normal',
    next: 'Normal',
    run: {
      font: 'Times New Roman',
      size: 26, // 13 pt
      bold: true
    }
  }
]

export {
  // Layout constants
  MARGIN_LEFT,
  MARGIN_RIGHT,
  MARGIN_TOP,
  MARGIN_BOTTOM,
  CONTENT_WIDTH_DXA,
  DEFAULT_INDENT,

  // Section / document config
  properties,
  spacing,
  paragraphStyles
}
