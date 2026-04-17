import {
  Paragraph,
  Table,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  AlignmentType,
  TextRun
} from 'docx'

// API ----------------------------------------------------------

/**
 * Parse HTML-like tags and convert to TextRun array
 * Supports: <b>bold</b>, <i>italic</i>, <u>underline</u>, <s>strikethrough</s>
 * Can be nested: <b><i>text</i></b>
 */
const parseHtmlTags = (text) => {
  if (!text || typeof text !== 'string') {
    return [new TextRun({ text: '' })]
  }

  if (!text.includes('<')) {
    return [new TextRun({ text })]
  }

  // Parse HTML tags into plain objects first (handles nesting properly)
  const parseToObjects = (str) => {
    if (!str || !str.includes('<')) {
      return [{ text: str || '', bold: false, italic: false, underline: false, strike: false }]
    }

    const result = []
    let remaining = str

    while (remaining) {
      const nextTag = remaining.indexOf('<')

      if (nextTag === -1) {
        // No more tags
        if (remaining) {
          result.push({ text: remaining, bold: false, italic: false, underline: false, strike: false })
        }
        break
      }

      // Add plain text before tag
      if (nextTag > 0) {
        result.push({ text: remaining.slice(0, nextTag), bold: false, italic: false, underline: false, strike: false })
      }

      // Try to match a tag
      const tagMatch = remaining.slice(nextTag).match(/^<(b|i|u|s)>(.*?)<\/\1>/s)
      if (tagMatch) {
        const [fullMatch, tag, content] = tagMatch
        const formatKey = {
          b: 'bold',
          i: 'italic',
          u: 'underline',
          s: 'strike'
        }[tag]

        // Recursively parse content (handles nested tags)
        const innerSegments = parseToObjects(content)
        innerSegments.forEach((seg) => {
          result.push({
            text: seg.text,
            bold: seg.bold || (formatKey === 'bold'),
            italic: seg.italic || (formatKey === 'italic'),
            underline: seg.underline || (formatKey === 'underline'),
            strike: seg.strike || (formatKey === 'strike')
          })
        })

        remaining = remaining.slice(nextTag + fullMatch.length)
      } else {
        // Invalid tag, treat < as plain text
        result.push({ text: '<', bold: false, italic: false, underline: false, strike: false })
        remaining = remaining.slice(nextTag + 1)
      }
    }

    return result
  }

  const objects = parseToObjects(text)

  // Convert parsed objects to TextRun objects
  return objects.map((obj) => {
    const props = { text: obj.text }
    if (obj.bold) props.bold = true
    if (obj.italic) props.italics = true
    if (obj.underline) props.underline = {}
    if (obj.strike) props.strike = true
    return new TextRun(props)
  })
}

const createParagraph = (content, customSpacing = {}) => {
  const baseConfig = {
    spacing // eslint-disable-line no-undef
  }

  if (customSpacing) {
    baseConfig.spacing = customSpacing
  }

  if (typeof content === 'string') {
    // Check if string contains HTML tags
    if (content.includes('<')) {
      return new Paragraph({
        ...baseConfig,
        children: parseHtmlTags(content)
      })
    }
    return new Paragraph({
      ...baseConfig,
      text: content
    })
  }

  // Extract text and bold from content if present
  const { text, bold, ...restContent } = content

  if (text) {
    // Check if text contains HTML tags
    if (text.includes('<')) {
      return new Paragraph({
        ...baseConfig,
        ...restContent,
        children: parseHtmlTags(text)
      })
    }
    return new Paragraph({
      ...baseConfig,
      ...restContent,
      children: [new TextRun({ text, bold })]
    })
  }

  return new Paragraph({
    ...baseConfig,
    ...content
  })
}

const createTitle = (text, center = false, customSpacing = {}) => {
  const runs = text.includes('<') ? parseHtmlTags(text) : [new TextRun({ text })]
  return createParagraph(
    {
      children: runs,
      alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
      style: 'Title'
    },
    customSpacing
  )
}

const createHeading = (text, level = 1, center = false, customSpacing = {}, indentSize = 0) => {
  const styleId = `Heading${level}`
  const lines = text.split('\n')

  // Parse each line for HTML tags
  const children = lines.flatMap((line, index) => {
    const runs = line.includes('<') ? parseHtmlTags(line) : [new TextRun({ text: line })]
    if (index < lines.length - 1) {
      runs.push(new TextRun({ break: 1 }))
    }
    return runs
  })

  return createParagraph(
    {
      children,
      alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
      style: styleId,
      ...(indentSize > 0 && {
        indent: {
          left: indentSize,
          hanging: 0
        }
      })
    },
    customSpacing
  )
}

const createHeadingWithChildren = (headingText, level = 1, children = [], indentSize = 720, headingIndent = 0) => { // eslint-disable-line no-unused-vars
  const headingParagraph = createHeading(headingText, level, false, {}, headingIndent)

  const childParagraphs = children.map((child) => {
    // If child is already a Paragraph or Table object, return it as-is
    if (child instanceof Paragraph || child instanceof Table) {
      return child
    }

    const isString = typeof child === 'string'
    return createParagraph(
      {
        text: isString ? child : child.text,
        indent: {
          left: indentSize,
          hanging: 0
        }
      },
      child.customSpacing || {}
    )
  })

  return [headingParagraph, ...childParagraphs]
}

// Create a bullet point paragraph with bold label and regular text
// Supports optional children array for nested sub-bullets
// Text can include HTML tags: <b>bold</b>, <i>italic</i>, <u>underline</u>, <s>strikethrough</s>
const bulletPoint = (label, textOrChildren = '', children = []) => { // eslint-disable-line no-unused-vars
  // If textOrChildren is an array, treat it as children
  if (Array.isArray(textOrChildren)) {
    children = textOrChildren
    textOrChildren = ''
  }

  // Parse label for HTML tags
  const labelRuns = label.includes('<') ? parseHtmlTags(label) : [new TextRun({ text: label, bold: true })]

  const paragraphs = [
    new Paragraph({
      bullet: {
        level: 0
      },
      children: [
        ...labelRuns,
        ...(textOrChildren ? parseHtmlTags(textOrChildren) : [])
      ]
    })
  ]

  // Add nested sub-bullets
  if (children && children.length > 0) {
    const subBullets = children.map((child) => {
      const isString = typeof child === 'string'
      const text = isString ? child : child.text
      const childLabel = isString ? null : child.label

      if (childLabel) {
        // Parse label and text for HTML tags
        const childLabelRuns = childLabel.includes('<') ? parseHtmlTags(childLabel) : [new TextRun({ text: childLabel, bold: true })]
        const textRuns = text.includes('<') ? parseHtmlTags(text) : [new TextRun({ text })]

        return new Paragraph({
          bullet: {
            level: 1
          },
          children: [
            ...childLabelRuns,
            ...textRuns
          ]
        })
      }

      // Parse text for HTML tags
      const textRuns = text.includes('<') ? parseHtmlTags(text) : [new TextRun({ text })]

      return new Paragraph({
        bullet: {
          level: 1
        },
        children: textRuns
      })
    })
    paragraphs.push(...subBullets)
  }

  return paragraphs
}

// Create a title cell spanning 2 columns (supports \n for multiple lines)
const titleCell = (text) => // eslint-disable-line no-unused-vars
  new TableCell({
    children: text.split('\n').map((line) =>
      createTitle(line, true, {
        ...spacing, // eslint-disable-line no-undef
        line: 240,
        before: 200,
        after: 200
      })
    ),
    shading: {
      type: ShadingType.CLEAR,
      fill: 'CCCCCC'
    },
    columnSpan: 2,
    margins: { top: 80, bottom: 80, left: 100, right: 100 }
  })

// Create a form field cell (label on left, empty on right)
const formField = (label) => [ // eslint-disable-line no-unused-vars
  new TableCell({
    children: [
      new Paragraph({
        text: label,
        spacing: { line: 240, lineRule: 'AUTO' }
      })
    ],
    width: { size: 3000, type: WidthType.DXA },
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
      left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
      right: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
    }
  }),
  new TableCell({
    children: [
      new Paragraph({ text: '', spacing: { line: 240, lineRule: 'AUTO' } })
    ],
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
      left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
      right: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
    }
  })
]

// --------------------------------------------------------------
