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
  AlignmentType
} from 'docx'
import fs from 'fs'
import path from 'path'

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

const createParagraph = (content, customSpacing = {}) => {
  const baseConfig = {
    spacing
  }

  if (customSpacing) {
    baseConfig.spacing = customSpacing
  }

  if (typeof content === 'string') {
    return new Paragraph({
      ...baseConfig,
      text: content
    })
  }

  return new Paragraph({
    ...baseConfig,
    ...content
  })
}

const createTitle = (text, center = false, customSpacing = {}) => {
  return createParagraph(
    {
      text,
      alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
      style: 'Title'
    },
    customSpacing
  )
}

const createHeading = (text, level = 1, center = false, customSpacing = {}, indentSize = 0) => {
  const styleId = `Heading${level}`
  return createParagraph(
    {
      text,
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
    // If child is already a Paragraph object, return it as-is
    if (child instanceof Paragraph) {
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
            children: formField('Mata pelajaran')
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
      createHeading('BAB I: PENDAHULUAN', 1),
      ...createHeadingWithChildren(
        'A. IDENTITAS MODUL',
        2,
        [
          ...createHeadingWithChildren(
            '1. Judul Modul',
            3,
            [
              'Modul Ajar Deep Learning untuk Fase 4 (Kelas 10, Semester 2) - SMA/MA/SMK/MAK'
            ],
            1440,
            720 // headingIndent for level 3
          ),
          ...createHeadingWithChildren(
            '2. Deskripsi Singkat Modul',
            3,
            [
              'Modul ini dirancang untuk memberikan pemahaman dasar tentang konsep dan aplikasi deep learning dalam konteks kurikulum merdeka.'
            ],
            1440,
            720 // headingIndent for level 3
          )
        ],
        720 // indentSize for level 2 children
      ),
      ...createHeadingWithChildren(
        'B. TUJUAN PEMBELAJARAN',
        2,
        [
          ...createHeadingWithChildren(
            '1. Tujuan Umum',
            3,
            [
              'Siswa mampu memahami konsep dasar deep learning dan mengaplikasikannya dalam proyek sederhana.'
            ],
            1440,
            720 // headingIndent for level 3
          ),
          ...createHeadingWithChildren(
            '2. Tujuan Khusus',
            3,
            [
              'Siswa dapat menjelaskan apa itu deep learning dan bagaimana cara kerjanya.',
              'Siswa dapat membuat model deep learning sederhana menggunakan tools yang tersedia.'
            ],
            1440,
            720 // headingIndent for level 3
          )
        ],
        720 // indentSize for level 2 children
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
