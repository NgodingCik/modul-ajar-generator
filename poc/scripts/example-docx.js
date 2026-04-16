import {
  Document,
  DocumentDefaults,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ImageRun,
  ShadingType,
  AlignmentType,
  TextRun
} from 'docx'
import fs from 'fs'
import path from 'path'

// Config -------------------------------------------------------

const properties = {
  page: {
    size: {
      orientation: 'portrait',
      width: 11906, // A4 width in twip (21 cm)
      height: 16838 // A4 height in twip (29.7 cm)
    },
    margin: {
      top: 1701, // 3 cm
      right: 1701, // 3 cm
      bottom: 1701, // 3 cm
      left: 2268 // 4 cm
    }
  }
}

const spacing = {
  line: 360,
  lineRule: 'AT_LEAST',
  before: 0,
  after: 0
}

const paragraphStyles = [
  {
    id: 'Normal',
    name: 'Normal',
    basedOn: 'Normal',
    next: 'Normal',
    run: {
      font: 'Times New Roman',
      size: 24 // 12pt (docx uses half-points)
    }
  },
  {
    id: 'Title',
    name: 'Title',
    basedOn: 'Normal',
    next: 'Normal',
    run: {
      font: 'Times New Roman',
      size: 40, // 20pt
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
      size: 32, // 16pt
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
      size: 28, // 14pt
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
      size: 26, // 13pt
      bold: true
    }
  }
]

// --------------------------------------------------------------

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
    spacing
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

const createHeadingWithChildren = (headingText, level = 1, children = [], indentSize = 720, headingIndent = 0) => {
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
const bulletPoint = (label, textOrChildren = '', children = []) => {
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
const titleCell = (text) =>
  new TableCell({
    children: text.split('\n').map((line) =>
      createTitle(line, true, {
        ...spacing,
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
const formField = (label) => [
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
];

// --------------------------------------------------------------

// Main ---------------------------------------------------------

(async () => {
  const coverPage = {
    properties,
    children: [
      // Blank space
      createParagraph('', {
        before: 3000,
        line: 240,
        lineRule: 'AUTO'
      }),
      // Image tut wuri handayani
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
          // Form fields
          new TableRow({
            children: formField('Nama Sekolah')
          }),
          new TableRow({
            children: formField('Nama Penyusun')
          }),
          new TableRow({
            children: formField('NIP')
          }),
          new TableRow({
            children: formField('Tema / Subtema')
          }),
          new TableRow({
            children: formField('Fase / Kelas / Semester')
          })
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
    properties,
    children: [
      createHeading('MODUL AJAR DEEP LEARNING\nTEMA/SUBTEMA: Diriku/Tubuhku\nBAB I: MENGENAL BAGIAN TUBUH', 1, true),
      createParagraph(''),
      ...createHeadingWithChildren(
        'A. IDENTITAS MODUL',
        2,
        [
          new Table({
            rows: [
              new TableRow({
                children: formField('Nama Sekolah')
              }),
              new TableRow({
                children: formField('Nama Penyusun')
              }),
              new TableRow({
                children: formField('NIP')
              }),
              new TableRow({
                children: formField('Tema / Subtema')
              }),
              new TableRow({
                children: formField('Fase / Kelas / Semester')
              }),
              new TableRow({
                children: formField('Alokasi Waktu')
              }),
              new TableRow({
                children: formField('Tahun Ajaran')
              })
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
        ],
        720 // indentSize for level 2 children
      ),
      createParagraph(''),
      ...createHeadingWithChildren(
        'B. IDENTIFIKASI KESIAPAN PESERTA DIDIK',
        2,
        [
          bulletPoint('Pengetahuan Awal: ', 'Peserta didik telah memiliki pengetahuan dasar tentang nama-nama hewan dalam bahasa Inggris dan dapat membuat kalimat sederhana untuk mendeskripsikan sesuatu.'),
          bulletPoint('Minat: ', 'Sebagian besar peserta didik memiliki minat terhadap fauna dan kehidupan alam, serta tertarik belajar melalui media visual seperti gambar dan video.'),
          bulletPoint('Latar Belakang: ', 'Peserta didik berasal dari latar belakang yang beragam, dengan tingkat paparan bahasa Inggris yang bervariasi di lingkungan rumah.')
        ],
        720
      ),
      ...createHeadingWithChildren(
        'C. KEBUTUHAN BELAJAR',
        2,
        [
          ...bulletPoint('Kebutuhan Belajar: ', 'Belajar lebih baik dengan bantuan gambar, video, komik, dan infografis tentang hewan.', [
            { label: 'Visual: ', text: 'Peserta didik belajar lebih baik dengan bantuan <b>gambar, video, komik</b>, dan <u>infografis</u> tentang hewan.' },
            { label: 'Auditori: ', text: 'Peserta didik perlu mendengarkan <i>audio dialog, monolog</i>, dan penjelasan guru untuk memahami <b><u>pengucapan dan intonasi</u></b>.' },
            { label: 'Kinestetik: ', text: 'Peserta didik memerlukan aktivitas bergerak seperti <b>permainan, presentasi</b>, dan pembuatan proyek <i>(misalnya poster atau <s>mading</s>)</i> untuk menjaga fokus dan motivasi.' }
          ])
        ],
        720
      )
    ]
  }

  const doc = new Document({
    // Define styles that will be inherited by all content
    styles: {
      default: new DocumentDefaults({
        paragraph: {
          spacing: {
            line: 360, // 1.5 * 240 (single)
            lineRule: 'AT_LEAST',
            before: 0,
            after: 0
          }
        }
      }),
      paragraphStyles
    },
    sections: [
      coverPage,
      contentPage
    ]
  })

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync('My Document.docx', buffer)
  })
})()

// --------------------------------------------------------------
