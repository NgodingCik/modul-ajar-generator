import {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
  BorderStyle,
  ShadingType,
  AlignmentType,
  TableLayoutType,
  TextRun,
  LevelFormat,
  LevelSuffix,
  createIndent,
  createTableWidthElement
} from 'docx'

/**
 * Row class for table rows with styling capabilities
 */
class Row {
  constructor () {
    this.cells = []
    this.height = null
    this.cantSplit = false
    this.tableHeader = false
  }

  /**
   * Add a cell to the row
   * @param {TableCell|Array<TableCell>} cell - Cell or array of cells
   * @returns {Row} - For chaining
   */
  addCell (cell) {
    if (Array.isArray(cell)) {
      this.cells.push(...cell)
    } else {
      this.cells.push(cell)
    }
    return this
  }

  /**
   * Add a title cell that spans multiple columns
   * @param {string} text - The title text
   * @param {number} columnSpan - Number of columns to span (default: 2)
   * @returns {Row} - For chaining
   */
  addTitleCell (text, columnSpan = 2) {
    const cell = new TableCell({
      children: text.split('\n').map((line) =>
        createParagraph({
          text: line,
          alignment: AlignmentType.CENTER,
          style: 'Heading3'
        })
      ),
      shading: {
        type: ShadingType.CLEAR,
        fill: 'CCCCCC'
      },
      columnSpan,
      margins: { top: 80, bottom: 80, left: 100, right: 100 }
    })
    this.cells.push(cell)
    return this
  }

  /**
   * Add a form field cell pair (label + empty input)
   * @param {string} label - The label text
   * @returns {Row} - For chaining
   */
  addFormField (label) {
    const labelCell = new TableCell({
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
    })

    const inputCell = new TableCell({
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

    this.cells.push(labelCell, inputCell)
    return this
  }

  /**
   * Add a regular cell with text content
   * Supports: regular text, HTML formatting (<b>, <i>, <u>, <s>),
   * lists (<ul>, <ol>, <li>) and markdown-style lists (- item)
   * @param {string} text - The cell text
   * @param {Object} options - Cell options (alignment, style, etc.)
   * @returns {Row} - For chaining
   */
  addTextCell (text, options = {}) {
    const {
      alignment = AlignmentType.LEFT, // eslint-disable-line no-unused-vars
      style = null, // eslint-disable-line no-unused-vars
      bold = false, // eslint-disable-line no-unused-vars
      italic = false, // eslint-disable-line no-unused-vars
      columnSpan = 1,
      rowSpan = 1,
      width = null,
      margins = { top: 50, bottom: 50, left: 100, right: 100 },
      borders = {
        top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        right: { style: BorderStyle.SINGLE, size: 1, color: '000000' }
      }
    } = options

    // Parse content - handles lists and formatting
    const paragraphs = parseContentAsParagraphs(text)

    const cell = new TableCell({
      children: paragraphs,
      columnSpan,
      ...(rowSpan > 1 && { rowSpan }),
      ...(width && { width }),
      margins,
      borders
    })

    this.cells.push(cell)
    return this
  }

  /**
   * Add a label/value pair inside the same row
   * @param {string} label - The label text
   * @param {string} value - The value text
   * @param {Object} options - Optional styling for the value cell
   * @returns {Row} - For chaining
   */
  addLabelValue (label, value, options = {}) {
    this.addTextCell(label, {
      bold: true,
      alignment: AlignmentType.LEFT,
      ...options.labelOptions
    })
    this.addTextCell(value, {
      alignment: AlignmentType.LEFT,
      ...options.valueOptions
    })
    return this
  }

  /**
   * Set row height
   * @param {number} height - Height in twips
   * @param {string} rule - Height rule ('auto', 'atLeast', 'exact')
   * @returns {Row} - For chaining
   */
  setHeight (height, rule = 'atLeast') {
    this.height = { value: height, rule }
    return this
  }

  /**
   * Set row to not split across pages
   * @param {boolean} cantSplit - Whether row can split
   * @returns {Row} - For chaining
   */
  setCantSplit (cantSplit = true) {
    this.cantSplit = cantSplit
    return this
  }

  /**
   * Set row as table header (repeats on each page)
   * @param {boolean} isHeader - Whether this is a header row
   * @returns {Row} - For chaining
   */
  setAsHeader (isHeader = true) {
    this.tableHeader = isHeader
    return this
  }

  /**
   * Build the TableRow object
   * @returns {TableRow} - The constructed docx TableRow
   */
  build () {
    const rowOptions = {}

    if (this.height) {
      rowOptions.height = this.height
    }

    if (this.cantSplit) {
      rowOptions.cantSplit = true
    }

    if (this.tableHeader) {
      rowOptions.tableHeader = true
    }

    return new TableRow({
      ...rowOptions,
      children: this.cells
    })
  }
}

/**
 * Enhanced TableWrapper class for building tables with rich features
 * Supports Row objects with styling capabilities
 */
class TableWrapper {
  constructor () {
    this.rows = []
    this.width = { size: 100, type: WidthType.PERCENTAGE }
    this.indent = { size: 0, type: WidthType.AUTO }
    this.borders = null
    this.margins = null
    this.autoWidth = false
    this.layout = null
  }

  /**
   * Create and add a new row
   * @returns {Row} - The new Row instance for chaining
   */
  addRow () {
    const row = new Row()
    this.rows.push(row)
    return row
  }

  /**
   * Add a title row that spans 2 columns (convenience method)
   * @param {string} text - The title text (supports \n for multiple lines)
   * @returns {TableWrapper} - For chaining
   */
  addTitleRow (text) {
    const row = new Row()
    row.addTitleCell(text)
    this.rows.push(row)
    return this
  }

  /**
   * Add a form field row with label and empty input cell (convenience method)
   * @param {string} label - The label for the form field
   * @returns {TableWrapper} - For chaining
   */
  addFormFieldRow (label) {
    const row = new Row()
    row.addFormField(label)
    this.rows.push(row)
    return this
  }

  /**
   * Add a simple 2-column row with label and value
   * @param {string} label - The label (bold)
   * @param {string} value - The value
   * @returns {TableWrapper} - For chaining
   */
  addLabelValuePairRow (label, value) {
    const row = new Row()
    row.addTextCell(label, { bold: true })
      .addTextCell(value)
    this.rows.push(row)
    return this
  }

  /**
   * Add a label/value row with two label/value pairs (4 columns)
   * @param {string} label1 - First label
   * @param {string} value1 - First value
   * @param {string} label2 - Second label
   * @param {string} value2 - Second value
   * @returns {TableWrapper} - For chaining
   */
  addLabelValueRow (label1, value1, label2, value2) {
    const row = new Row()
    row.addLabelValue(label1, value1)
      .addLabelValue(label2, value2)
    this.rows.push(row)
    return this
  }

  /**
   * Add a pre-built Row object
   * @param {Row} row - The Row instance to add
   * @returns {TableWrapper} - For chaining
   */
  addRowObject (row) {
    if (row instanceof Row) {
      this.rows.push(row)
    }
    return this
  }

  /**
   * Set table width
   * @param {number} size - Width size
   * @param {WidthType} type - Width type (PERCENTAGE, DXA, etc.)
   * @returns {TableWrapper} - For chaining
   */
  setWidth (size, type = WidthType.PERCENTAGE) {
    this.width = { size, type }
    return this
  }

  /**
   * Set table indent
   * @param {number} size - Indent size
   * @param {WidthType} type - Indent type
   * @returns {TableWrapper} - For chaining
   */
  setIndent (size, type = WidthType.AUTO) {
    this.indent = { size, type }
    return this
  }

  /**
   * Set table to fit its content automatically
   * @param {boolean} auto - Enable or disable auto width
   * @returns {TableWrapper} - For chaining
   */
  setAutoWidth (auto = true) {
    this.autoWidth = auto
    if (auto) {
      this.width = { size: 100, type: WidthType.PERCENTAGE }
      this.layout = TableLayoutType.AUTOFIT
    }
    return this
  }

  /**
   * Alias for setAutoWidth(true)
   * @returns {TableWrapper} - For chaining
   */
  setFitContent () {
    return this.setAutoWidth(true)
  }

  /**
   * Set table borders
   * @param {Object} borders - Border configuration
   * @returns {TableWrapper} - For chaining
   */
  setBorders (borders) {
    this.borders = borders
    return this
  }

  /**
   * Set table margins
   * @param {Object} margins - Margin configuration
   * @returns {TableWrapper} - For chaining
   */
  setMargins (margins) {
    this.margins = margins
    return this
  }

  /**
   * Build and return the Table object
   * @returns {Table} - The constructed docx Table
   */
  build () {
    const tableRows = this.rows.map(row => {
      if (row instanceof Row) {
        return row.build()
      }
      // Legacy support for old format
      if (row.type === 'title') {
        return new TableRow({
          children: [titleCell(row.text)]
        })
      } else if (row.type === 'formField') {
        return new TableRow({
          children: formField(row.label)
        })
      }
      return new TableRow({ children: [] })
    })

    const tableOptions = {
      rows: tableRows,
      indent: this.indent
    }

    if (this.width) {
      tableOptions.width = this.width
    }

    if (this.layout) {
      tableOptions.layout = this.layout
    }

    if (this.borders) {
      tableOptions.borders = this.borders
    }

    if (this.margins) {
      tableOptions.margins = this.margins
    }

    return new Table(tableOptions)
  }
}

/**
 * Parse HTML lists and markdown-style lists
 * Supports: <ul><li>item</li></ul>, <ol><li>item</li></ol>, and markdown "- item" style
 * Returns array of Paragraph objects with bullets/numbering, or null if no lists found
 */
const parseHtmlLists = (text) => {
  if (!text || typeof text !== 'string') {
    return null
  }

  // Check for HTML list tags
  if (/<\/?(ul|ol|li)\b/i.test(text)) {
    return parseHtmlListTags(text)
  }

  // Check for markdown-style lists (lines starting with -)
  const lines = text.split('\n')
  const hasMarkdownLists = lines.some(line => /^\s*-\s+/.test(line))
  if (hasMarkdownLists) {
    return parseMarkdownLists(lines)
  }

  return null
}

/**
 * Parse HTML <ul>, <ol>, <li> tags into Paragraph array
 */
const parseHtmlListTags = (text) => {
  const paragraphs = []
  const rootNode = { type: 'root', children: [] }
  const nodeStack = [rootNode]
  const tagRegex = /<\/?(ul|ol|li)\b[^>]*>/gi
  let orderedListInstance = 1
  let lastIndex = 0

  const currentNode = () => nodeStack[nodeStack.length - 1]

  const attachNode = (node) => {
    const activeNode = currentNode()

    if (!activeNode) {
      return
    }

    if (activeNode.type === 'item') {
      activeNode.parts.push(node)
      return
    }

    if (activeNode.type === 'root') {
      activeNode.children.push(node)
      return
    }

    // If stray nested list/text appears directly under a list, keep order at root level.
    if (activeNode.type === 'list') {
      rootNode.children.push(node)
    }
  }

  const appendText = (rawText) => {
    if (!rawText || !rawText.trim()) {
      return
    }

    attachNode({
      type: 'text',
      text: rawText.trim()
    })
  }

  const closeNode = (type, listType = null) => {
    while (nodeStack.length > 1) {
      const popped = nodeStack.pop()
      if (popped.type !== type) {
        continue
      }

      if (type !== 'list' || popped.listType === listType) {
        break
      }
    }
  }

  let tagMatch

  while ((tagMatch = tagRegex.exec(text)) !== null) {
    appendText(text.slice(lastIndex, tagMatch.index))

    const token = tagMatch[0]
    const tag = tagMatch[1].toLowerCase()
    const isClosingTag = token.startsWith('</')

    if (!isClosingTag && (tag === 'ul' || tag === 'ol')) {
      const listNode = {
        type: 'list',
        listType: tag,
        items: []
      }
      attachNode(listNode)
      nodeStack.push(listNode)
    } else if (isClosingTag && (tag === 'ul' || tag === 'ol')) {
      closeNode('list', tag)
    } else if (!isClosingTag && tag === 'li') {
      let activeList = null

      for (let i = nodeStack.length - 1; i >= 0; i--) {
        if (nodeStack[i].type === 'list') {
          activeList = nodeStack[i]
          break
        }
      }

      if (!activeList) {
        activeList = {
          type: 'list',
          listType: 'ul',
          items: []
        }
        attachNode(activeList)
        nodeStack.push(activeList)
      }

      const itemNode = {
        type: 'item',
        parts: []
      }

      activeList.items.push(itemNode)
      nodeStack.push(itemNode)
    } else if (isClosingTag && tag === 'li') {
      closeNode('item')
    }

    lastIndex = tagRegex.lastIndex
  }

  appendText(text.slice(lastIndex))

  const pushTextParagraph = (value) => {
    if (!value || !value.trim()) {
      return
    }

    paragraphs.push(new Paragraph({
      children: parseHtmlTags(value.trim())
    }))
  }

  const pushListParagraph = (listType, level, instance, value) => {
    if (!value || !value.trim()) {
      return
    }

    const children = parseHtmlTags(value.trim())

    if (listType === 'ul') {
      paragraphs.push(new Paragraph({
        bullet: { level },
        children
      }))
      return
    }

    paragraphs.push(new Paragraph({
      numbering: {
        reference: 'html-ordered-list',
        level,
        instance
      },
      children
    }))
  }

  const renderListNode = (listNode, level = 0, inheritedOrderedInstance = null) => {
    if (!listNode || !Array.isArray(listNode.items) || listNode.items.length === 0) {
      return
    }

    const currentOrderedInstance = listNode.listType === 'ol'
      ? (typeof inheritedOrderedInstance === 'number' ? inheritedOrderedInstance : orderedListInstance++)
      : inheritedOrderedInstance

    listNode.items.forEach((itemNode) => {
      if (!itemNode || !Array.isArray(itemNode.parts)) {
        return
      }

      itemNode.parts.forEach((partNode) => {
        if (!partNode) {
          return
        }

        if (partNode.type === 'text') {
          pushListParagraph(listNode.listType, level, currentOrderedInstance, partNode.text)
          return
        }

        if (partNode.type === 'list') {
          renderListNode(partNode, level + 1, currentOrderedInstance)
        }
      })
    })
  }

  rootNode.children.forEach((childNode) => {
    if (!childNode) {
      return
    }

    if (childNode.type === 'text') {
      pushTextParagraph(childNode.text)
      return
    }

    if (childNode.type === 'list') {
      renderListNode(childNode)
    }
  })

  return paragraphs.length > 0 ? paragraphs : null
}

/**
 * Parse markdown-style lists (lines starting with "-")
 */
const parseMarkdownLists = (lines) => {
  const paragraphs = []

  lines.forEach(line => {
    const match = line.match(/^\s*-\s+(.*)$/)
    if (match) {
      // Line is a list item
      paragraphs.push(new Paragraph({
        bullet: { level: 0 },
        spacing: { line: 240, lineRule: 'AUTO' },
        children: parseHtmlTags(match[1])
      }))
    } else if (line.trim()) {
      // Regular text line
      paragraphs.push(new Paragraph({
        spacing: { line: 240, lineRule: 'AUTO' },
        children: parseHtmlTags(line)
      }))
    }
  })

  return paragraphs.length > 0 ? paragraphs : null
}

/**
 * Parse content that may contain lists, returns Paragraph[]
 * If content contains lists, returns proper bullet/numbered paragraphs
 * If no lists, returns single paragraph
 */
const parseContentAsParagraphs = (content) => {
  if (typeof content === 'string') {
    // Check for lists first
    const listParagraphs = parseHtmlLists(content)
    if (listParagraphs) {
      return listParagraphs
    }

    // No lists, return as single paragraph
    if (content.includes('<')) {
      return [new Paragraph({
        children: parseHtmlTags(content)
      })]
    }

    return [new Paragraph({ text: content })]
  }

  // Already an object
  return [createParagraph(content)]
}

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

const createTitle = (text, center = false, customSpacing = {}) => { // eslint-disable-line no-unused-vars
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

const createNumberedHeading = (
  text,
  level = 1,
  numberingLevel = level > 0 ? level - 1 : 0,
  numberingInstance = 1,
  center = false,
  customSpacing = {},
  indentSize = 0,
  numberingReference = 'section-heading-numbering'
) => {
  const styleId = `Heading${level}`
  const lines = text.split('\n')

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
      numbering: {
        reference: numberingReference,
        level: numberingLevel,
        instance: numberingInstance
      },
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

const hasXmlChild = (xmlComponent, rootKey) =>
  Boolean(
    xmlComponent &&
    Array.isArray(xmlComponent.root) &&
    xmlComponent.root.some((item) => item && item.rootKey === rootKey)
  )

const getXmlChildIndex = (xmlComponent, rootKey) => {
  if (!xmlComponent || !Array.isArray(xmlComponent.root)) {
    return -1
  }

  return xmlComponent.root.findIndex((item) => item && item.rootKey === rootKey)
}

const CHILD_PARAGRAPH_INDENT_KEY = '__headingChildrenParagraphIndent'
const CHILD_TABLE_INDENT_KEY = '__headingChildrenTableIndent'

const setParagraphIndent = (paragraphProperties, indentSize) => {
  const indentElement = createIndent({ left: indentSize, hanging: 0 })
  const indentIndex = getXmlChildIndex(paragraphProperties, 'w:ind')

  if (indentIndex >= 0) {
    paragraphProperties.root[indentIndex] = indentElement
    return
  }

  paragraphProperties.push(indentElement)
}

const setTableIndent = (tableProperties, indentSize) => {
  const indentElement = createTableWidthElement('w:tblInd', {
    size: indentSize,
    type: WidthType.DXA
  })
  const indentIndex = getXmlChildIndex(tableProperties, 'w:tblInd')

  if (indentIndex >= 0) {
    tableProperties.root[indentIndex] = indentElement
    return
  }

  tableProperties.root.push(indentElement)
}

const getXmlAttributeValue = (xmlComponent, attributeName = 'val') => {
  if (!xmlComponent || !Array.isArray(xmlComponent.root)) {
    return null
  }

  const attrNode = xmlComponent.root.find((item) => item && item.rootKey === '_attr')

  if (!attrNode || !attrNode.root) {
    return null
  }

  const rawValue = attrNode.root[attributeName]

  if (rawValue === null || rawValue === undefined) {
    return null
  }

  if (typeof rawValue === 'string' || typeof rawValue === 'number') {
    return rawValue
  }

  if (typeof rawValue === 'object' && rawValue !== null && Object.prototype.hasOwnProperty.call(rawValue, 'value')) {
    return rawValue.value
  }

  return null
}

const getParagraphStyleId = (paragraphProperties) => {
  const styleIndex = getXmlChildIndex(paragraphProperties, 'w:pStyle')
  if (styleIndex < 0) {
    return null
  }

  return getXmlAttributeValue(paragraphProperties.root[styleIndex], 'val')
}

const getParagraphNumberingLevel = (paragraphProperties) => {
  const numberingIndex = getXmlChildIndex(paragraphProperties, 'w:numPr')
  if (numberingIndex < 0) {
    return null
  }

  const numberingNode = paragraphProperties.root[numberingIndex]
  if (!numberingNode || !Array.isArray(numberingNode.root)) {
    return 0
  }

  const levelNode = numberingNode.root.find((item) => item && item.rootKey === 'w:ilvl')
  if (!levelNode) {
    return 0
  }

  const levelValue = getXmlAttributeValue(levelNode, 'val')
  const parsedLevel = Number.parseInt(String(levelValue), 10)

  if (Number.isNaN(parsedLevel)) {
    return 0
  }

  return parsedLevel
}

const getInitialParagraphIndent = (paragraphProperties, indentSize) => {
  const paragraphStyle = getParagraphStyleId(paragraphProperties)
  const numberingLevel = getParagraphNumberingLevel(paragraphProperties)

  // Preserve nested list hierarchy when heading-child indent is injected.
  if (paragraphStyle === 'ListParagraph' && typeof numberingLevel === 'number' && numberingLevel > 0) {
    return indentSize + (indentSize * numberingLevel)
  }

  return indentSize
}

const applyIndentToParagraph = (paragraph, indentSize) => {
  const paragraphProperties = paragraph && paragraph.properties
  const trackedIndent = paragraph && paragraph[CHILD_PARAGRAPH_INDENT_KEY]

  if (
    !paragraphProperties ||
    typeof paragraphProperties.push !== 'function' ||
    !Array.isArray(paragraphProperties.root)
  ) {
    return paragraph
  }

  const initialIndent = getInitialParagraphIndent(paragraphProperties, indentSize)

  if (typeof trackedIndent === 'number' && Number.isFinite(trackedIndent)) {
    const nextIndent = trackedIndent + indentSize
    setParagraphIndent(paragraphProperties, nextIndent)
    paragraph[CHILD_PARAGRAPH_INDENT_KEY] = nextIndent
    return paragraph
  }

  if (hasXmlChild(paragraphProperties, 'w:ind')) {
    return paragraph
  }

  setParagraphIndent(paragraphProperties, initialIndent)
  paragraph[CHILD_PARAGRAPH_INDENT_KEY] = initialIndent

  return paragraph
}

const applyIndentToTable = (table, indentSize) => {
  const trackedIndent = table && table[CHILD_TABLE_INDENT_KEY]

  if (!table || !Array.isArray(table.root) || table.root.length === 0) {
    return table
  }

  const tableProperties = table.root[0]
  if (!tableProperties || !Array.isArray(tableProperties.root)) {
    return table
  }

  if (typeof trackedIndent === 'number' && Number.isFinite(trackedIndent)) {
    const nextIndent = trackedIndent + indentSize
    setTableIndent(tableProperties, nextIndent)
    table[CHILD_TABLE_INDENT_KEY] = nextIndent
    return table
  }

  if (hasXmlChild(tableProperties, 'w:tblInd')) {
    return table
  }

  setTableIndent(tableProperties, indentSize)
  table[CHILD_TABLE_INDENT_KEY] = indentSize

  return table
}

const createHeadingWithChildren = (headingText, level = 1, children = [], indentSize = 720, headingIndent = 0, headingOptions = {}) => { // eslint-disable-line no-unused-vars
  const {
    center = false,
    customSpacing = {},
    numbering = null
  } = headingOptions || {}

  const headingParagraph = numbering
    ? createNumberedHeading(
      headingText,
      level,
      typeof numbering.level === 'number' ? numbering.level : (level > 0 ? level - 1 : 0),
      typeof numbering.instance === 'number' ? numbering.instance : 1,
      center,
      customSpacing,
      headingIndent,
      numbering.reference || 'section-heading-numbering'
    )
    : createHeading(headingText, level, center, customSpacing, headingIndent)

  // Flatten children to handle nested arrays from nested createHeadingWithChildren calls
  const flatChildren = (Array.isArray(children) ? children.flat(Infinity) : [children])
    .filter((child) => child !== undefined && child !== null)

  const childParagraphs = flatChildren.map((child) => {
    const constructorName = child && child.constructor && child.constructor.name

    const isParagraphObject =
      child instanceof Paragraph ||
      constructorName === 'Paragraph'

    const isTableObject =
      child instanceof Table ||
      constructorName === 'Table'

    // If child is already a Paragraph or Table object, return it as-is
    // Use duck-typing because instanceof may fail in VM environments
    if (isParagraphObject) {
      return applyIndentToParagraph(child, indentSize)
    }

    if (isTableObject) {
      return applyIndentToTable(child, indentSize)
    }

    if (child && typeof child === 'object' && child.root) {
      return child
    }

    const isString = typeof child === 'string'
    const paragraph = createParagraph(
      {
        text: isString ? child : child.text,
        indent: {
          left: indentSize,
          hanging: 0
        }
      },
      child.customSpacing || {}
    )

    paragraph[CHILD_PARAGRAPH_INDENT_KEY] = indentSize
    return paragraph
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

  let finalLabel = label
  if (textOrChildren && typeof label === 'string' && !label.endsWith(' ')) {
    finalLabel += ' '
  }

  // Parse label for HTML tags
  const labelRuns = finalLabel.includes('<') ? parseHtmlTags(finalLabel) : [new TextRun({ text: finalLabel, bold: true })]

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
        const textRuns = text.includes('<') ? parseHtmlTags(text) : [new TextRun({ text })]

        let finalChildLabel = childLabel
        if (text && typeof childLabel === 'string' && !childLabel.endsWith(' ')) {
          finalChildLabel += ' '
        }
        const childLabelRuns = finalChildLabel.includes('<') ? parseHtmlTags(finalChildLabel) : [new TextRun({ text: finalChildLabel, bold: true })]

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
      createParagraph({
        text: line,
        alignment: AlignmentType.CENTER,
        style: 'Heading3'
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

/**
 * Create numbering configuration for Document
 * Returns config for both unordered lists (bullets) and ordered lists (decimals)
 */
const getNumberingConfig = () => [
  {
    reference: 'html-ordered-list',
    levels: [
      {
        level: 0,
        format: LevelFormat.DECIMAL,
        text: '%1. ',
        suffix: LevelSuffix.SPACE,
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 720, hanging: 360 } // Number hangs left, text wraps properly
          }
        }
      },
      {
        level: 1,
        format: LevelFormat.LOWER_LETTER,
        text: '%2) ',
        suffix: LevelSuffix.SPACE,
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 1440, hanging: 360 }
          }
        }
      },
      {
        level: 2,
        format: LevelFormat.LOWER_ROMAN,
        text: '%3) ',
        suffix: LevelSuffix.SPACE,
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 2160, hanging: 360 }
          }
        }
      }
    ]
  },
  {
    reference: 'html-unordered-list',
    levels: [
      {
        level: 0,
        format: LevelFormat.BULLET,
        text: '•',
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 720, hanging: 360 } // Bullet hangs left, text wraps properly
          }
        }
      },
      {
        level: 1,
        format: LevelFormat.BULLET,
        text: '◦',
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 1440, hanging: 360 }
          }
        }
      },
      {
        level: 2,
        format: LevelFormat.BULLET,
        text: '▪',
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 2160, hanging: 360 }
          }
        }
      }
    ]
  },
  {
    reference: 'section-heading-numbering',
    levels: [
      {
        level: 0,
        format: LevelFormat.UPPER_LETTER,
        text: '%1.',
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 0, hanging: 0 }
          }
        }
      },
      {
        level: 1,
        format: LevelFormat.DECIMAL,
        text: '%1.%2.',
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 720, hanging: 0 }
          }
        }
      },
      {
        level: 2,
        format: LevelFormat.DECIMAL,
        text: '%1.%2.%3.',
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: {
            indent: { left: 1440, hanging: 0 }
          }
        }
      }
    ]
  }
]

export {
  Row,
  TableWrapper,
  parseHtmlTags,
  parseHtmlLists,
  parseHtmlListTags,
  parseMarkdownLists,
  parseContentAsParagraphs,
  getNumberingConfig,
  createParagraph,
  createTitle,
  createHeading,
  createNumberedHeading,
  createHeadingWithChildren,
  bulletPoint,
  titleCell,
  formField
}
