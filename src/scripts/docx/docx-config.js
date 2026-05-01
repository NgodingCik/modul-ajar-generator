/**
 * @fileoverview
 * This module defines the default configuration for generating DOCX documents using the `docx` library. It includes settings for page size, margins, default styles, and other options that control the appearance and formatting of the generated documents. These configurations can be imported and used in the VM context when executing template code to ensure consistent styling and layout across all generated DOCX files.
 *
 * The configuration following from kominfo (Current name is Komdigi)
 */

/* eslint-disable no-unused-vars */

/** @type {number} - Left margin in twips */
const MARGIN_LEFT = 2268 // 4 cm
/** @type {number} - Right margin in twips */
const MARGIN_RIGHT = 1701 // 3 cm
/** @type {number} - Top margin in twips */
const MARGIN_TOP = 1701 // 3 cm
/** @type {number} - Bottom margin in twips */
const MARGIN_BOTTOM = 1701 // 3 cm

/** @type {number} - Usable content width for A4 with these margins (in twips) */
const CONTENT_WIDTH_DXA = 11906 - MARGIN_LEFT - MARGIN_RIGHT // 7937 twips

/** @type {number} - Default indentation step used by createHeadingWithChildren() and similar functions */
const DEFAULT_INDENT = 720 // 0.5 inch in twips

/** Default section properties for page size and margins */
const properties = {
  page: {
    size: {
      orientation: 'portrait',
      width: 11906, // A4 width in twips (21 cm)
      height: 16838 // A4 height in twips (29.7 cm)
    },
    margin: {
      top: MARGIN_TOP,
      right: MARGIN_RIGHT,
      bottom: MARGIN_BOTTOM,
      left: MARGIN_LEFT
    }
  }
}

/** Default paragraph spacing */
const spacing = {
  line: 360, // Line spacing in twips
  lineRule: 'AT_LEAST',
  before: 0,
  after: 0
}

/** Default paragraph styles */
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

  // Default DOCX configuration
  properties,
  spacing,
  paragraphStyles
}
