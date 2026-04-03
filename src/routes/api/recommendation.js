import { AppRoute } from "../index.js";
import G4F from "../../lib/g4f.js";

const g4f = new G4F(process.env.G4F_API_KEY, 'recommendation');

export const route = new AppRoute("/recommendation", "post", async (req, res) => {
  try {
    const { prompt, data } = req.body;

    // Validation
    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
    }
    if (!data) {
      return res.status(400).json({ error: "data is required" });
    }

    console.log("Received body:", req.body);

    let recommendationPrompt = `Kelas: ${data.kelas}, Tema/Subtema: ${data.tema_subtema}, Alokasi Waktu: ${data.alokasi_waktu}, Model Pembelajaran: ${data.model_pembelajaran}. ${prompt}`;

    const recommendation = await g4f.chat(recommendationPrompt);
    res.json({ recommendation });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
});