(async () => {
  const doc = new Document({
    // Set document-wide defaults for font and paragraph spacing
    styles: {
      default: new DocumentDefaults({
        run: {
          font: "Times New Roman",
          size: 24, // 12pt (docx uses half-points)
        },
        paragraph: {
          spacing: {
            line: 360, // 1.5 * 240 (single)
            before: 0,
            after: 0,
          },
        },
      }),
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: "portrait",
              width: 11906, // A4 width in twip (21 cm)
              height: 16838, // A4 height in twip (29.7 cm)
            },
            margin: {
              top: 1701, // 3 cm
              right: 1701, // 3 cm
              bottom: 1701, // 3 cm
              left: 2268, // 4 cm
            },
          },
        },
        children: [
          new Paragraph({
            children: [
              new TextRun("Ini gambar tut wuri handayani"),
            ]
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync(
                  path.join(__dirname, "../assets/tut-wuri-handayani.png"),
                ),
                transformation: {
                  width: 200,
                  height: 200,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
  });
})();
