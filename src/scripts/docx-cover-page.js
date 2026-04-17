const coverPage = {
  properties,
  children: [
    // Blank space
    createParagraph("", {
      before: 3000,
      line: 240,
      lineRule: "AUTO",
    }),
    // Image tut wuri handayani
    createParagraph(
      {
        children: [
          new ImageRun({
            data: fs.readFileSync(
              path.join(__dirname, "../../assets/tut-wuri-handayani.png"),
            ),
            transformation: {
              width: 200,
              height: 200,
            },
          }),
        ],
        alignment: AlignmentType.CENTER,
      },
      {
        after: 400,
        lineRule: "AUTO",
      },
    ),
    new Table({
      rows: [
        // Title row (supports \n for multiple lines)
        new TableRow({
          children: [
            titleCell("MODUL AJAR\nKURIKULUM MERDEKA (Deep Learning)"),
          ],
        }),
        // Form fields
        new TableRow({
          children: formField("Nama Sekolah"),
        }),
        new TableRow({
          children: formField("Nama Penyusun"),
        }),
        new TableRow({
          children: formField("NIP"),
        }),
        new TableRow({
          children: formField("Tema / Subtema"),
        }),
        new TableRow({
          children: formField("Fase / Kelas / Semester"),
        }),
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      indent: {
        size: 0,
        type: WidthType.AUTO,
      },
    }),
  ],
};
