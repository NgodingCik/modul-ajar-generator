import { AppRoute } from "../index.js";
import G4F from "../../lib/g4f.js";
import { parseMarkdownToObject, getKeysDescriptionFromMarkdown, removeCommentsFromMarkdown } from "../../utils/utils.js";
import format from "string-template";
import fs from "node:fs";
import path from "node:path";

const __dirname = import.meta.dirname;

const g4f = new G4F(process.env.G4F_API_KEY, "default");
const MAX_REGENERATION_ATTEMPTS = 3;

const templateMd = fs.readFileSync(path.join(__dirname, "../../template.md"), "utf-8");

export const route = new AppRoute("/generate-rpp", "post", async (req, res) => {
  try {
    const { data } = req.body;

    // Validation
    const requiredFields = [
      "RPP_TYPE",
      "INITIAL_TYPE",
      "SCHOOL_NAME",
      "THEME_SUBTHEME",
      "PHASE",
      "DAY_DATE",
      "SEMESTER_WEEK",
      "ACADEMIC_YEAR",
      "GROUP_AGE",
      "TIME_ALLOCATION",
      "LEARNING_MODEL",
    ];

    const keysWithDescriptions = getKeysDescriptionFromMarkdown(templateMd);
    const formattedTemplate = format(templateMd, data);
    console.log("Formatted template:", formattedTemplate);
    console.log("Keys description:", getKeysDescriptionFromMarkdown(templateMd));

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Format date to Indonesian format (e.g., Senin, 1 Januari 2011)
    if (data.DAY_DATE && data.DAY_DATE.includes("-")) {
      const [yyyy, mm, dd] = data.DAY_DATE.split("-");
      const dateObj = new Date(yyyy, mm - 1, dd);
      const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const namaBulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      data.DAY_DATE = `${namaHari[dateObj.getDay()]}, ${parseInt(dd, 10)} ${namaBulan[dateObj.getMonth()]} ${yyyy}`;
    }

    // Build prompt for AI
    const buildPromptFromTemplate = (data, keysDesc) => {
      const promptParts = [
        `Informasi:\nSemester/Minggu ke: ${data.SEMESTER_WEEK}\nTahun Ajaran: ${data.ACADEMIC_YEAR}\nKelompok Usia: ${data.GROUP_AGE}\nAlokasi Waktu: ${data.TIME_ALLOCATION}\nModel Pembelajaran: ${data.LEARNING_MODEL}\nTema/Subtema: ${data.THEME_SUBTHEME}\nFase: ${data.PHASE}`,
        `\n\nAnda adalah seorang AI yang ahli dalam membuat Rencana Pelaksanaan Pembelajaran (RPP). Anda akan mengisi template RPP dengan konten yang sesuai.`,
      ];

      // Add instructions for each key in template
      for (const [key, description] of Object.entries(keysDesc)) {
        // Skip keys yang sudah diisi dari form
        if (["RPP_TYPE", "INITIAL_TYPE", "SCHOOL_NAME", "THEME_SUBTHEME", "DAY_DATE", "SEMESTER_WEEK", "ACADEMIC_YEAR", "GROUP_AGE", "TIME_ALLOCATION", "LEARNING_MODEL", "PHASE"].includes(key)) {
          continue;
        }

        promptParts.push(`\nIsi key '${key}': ${description}`);
      }

      return promptParts.join("\n");
    };

    const prompt = buildPromptFromTemplate(data, keysWithDescriptions);

    let rpp = await g4f.chat(prompt);
    let rppObject = parseMarkdownToObject(rpp);

    // Validate and regenerate if missing required keys
    const requiredKeys = [...Object.keys(keysWithDescriptions)].filter((key) => !["RPP_TYPE", "INITIAL_TYPE", "SCHOOL_NAME", "THEME_SUBTHEME", "DAY_DATE", "SEMESTER_WEEK", "ACADEMIC_YEAR", "GROUP_AGE", "TIME_ALLOCATION", "LEARNING_MODEL", "PHASE"].includes(key));

    let missingKeys = requiredKeys.filter((key) => !rppObject[key]);
    let attemptCount = 0;

    while (missingKeys.length > 0) {
      attemptCount++;
      if (attemptCount > MAX_REGENERATION_ATTEMPTS) {
        console.warn("Maximum regeneration attempts reached. Proceeding with incomplete RPP.");
        break;
      }

      console.warn(`Missing keys: ${missingKeys.join(", ")}. Regenerating...`);
      rpp = await g4f.chat(prompt);
      rppObject = parseMarkdownToObject(rpp);
      missingKeys = requiredKeys.filter((key) => !rppObject[key]);
    }

    // Format final RPP output
    const result = format(removeCommentsFromMarkdown(templateMd), { ...data, ...rppObject });
    console.log("Final RPP output:", result);

    res.json({ rpp: result, obj: rppObject });
  } catch (error) {
    console.error("Error generating RPP:", error);
    res.status(500).json({ error: "Failed to generate RPP" });
  }
});
