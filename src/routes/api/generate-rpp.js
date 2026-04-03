import { AppRoute } from "../index.js";
import G4F from "../../lib/g4f.js";
import { parseMarkdownToObject } from "../../utils/utils.js";

const g4f = new G4F(process.env.G4F_API_KEY, "default");

export const route = new AppRoute("/generate-rpp", "post", async (req, res) => {
  try {
    const { data } = req.body;
    console.log("Received data for RPP generation:", data);

    // Validation
    const requiredFields = [
      "semester",
      "tahun_ajaran",
      "kelas",
      "alokasi_waktu",
      "model_pembelajaran",
      "tema_subtema",
      "tujuan_pembelajaran",
      "hari_tanggal",
      "tipe_rpp",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return res
        .status(400)
        .json({
          error: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    // Format Hari/Tanggal ke format Indonesia (contoh: Senin, 1 Januari 2011)
    if (data.hari_tanggal && data.hari_tanggal.includes("-")) {
      const [yyyy, mm, dd] = data.hari_tanggal.split("-");
      const dateObj = new Date(yyyy, mm - 1, dd);
      const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const namaBulan = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      data.hari_tanggal = `${namaHari[dateObj.getDay()]}, ${parseInt(dd, 10)} ${namaBulan[dateObj.getMonth()]} ${yyyy}`;
    }

    let prompt = `Informasi\n Semester/Minggu ke: ${data.semester}\ntahun Ajaran: ${data.tahun_ajaran}\nKelas: ${data.kelas}\nAlokasi Waktu: ${data.alokasi_waktu}\nModel Pembelajaran: ${data.model_pembelajaran}\nTema/Subtema: ${data.tema_subtema}\nTujuan Pembelajaran: ${data.tujuan_pembelajaran}`;

    prompt += `Isi key 'materi' dengan materi pembelajaran yang sesuai dengan tema/subtema di atas. Jangan berisi daftar item, cukup buat dalam bentuk paragraf saja.`;
    prompt += `Isi key 'KD' yang sesuai dengan tujuan pembelajaran contoh '1.1, 1.2, 3.1, 4.1, 3.2 4.2, 3.4, 4.4, 2.1, 2.4 3.3, 4.3, 2.5 2.9, 2.2, 3.6, 
4.6, 3.10 4.10, 3.11, 4.11, 3.12 4.12.'`;
    prompt += `Isi key 'indikator_capaian_pembelajaran' dengan beberapa indikator capaian pembelajaran pada kegiatan pembelajaran.`;
    prompt += `Isi key 'media_belajar' dengan media pembelajaran yang akan digunakan.`;
    prompt += `Isi key 'kegiatan' dengan kegiatan pembelajaran yang sesuai dengan model pembelajaran yang dipilih. Terdapat juga waktu untuk setiap kegiatan, dibuat dalam bentuk table dengan 3 kolom yaitu Kegiatan, Deskripsi Kegiatan, dan Waktu. KEgiatan harus diawali dengan kegiata pendahuluan seperti doa, absensi, apersepsi, kesepakatan, kemudian diikuti dengan kegiatan inti dan diakhiri dengan kegiatan penutup. Isi kolom Deskripsi Kegiatan dapat berupa list item yang menjelaskan langkah-langkah kegiatan.`;
    prompt += `Isi key 'indikator_penilaian' dengan penilaian yang sesuai dengan kegiatan pembelajaran. Harus dalam bentuk table dengan 3 kolom yaitu Program Pengembangan, KD, dan Indikator.`;
    prompt += `Isi key 'teknik_penilaian' dengan teknik penilaian yang sesuai dengan kegiatan pembelajaran. Harus dalam bentuk table dengan 2 kolom yaitu Teknik dan Deskripsi. Teknik penilaian bisa berupa catatan hasil karya, anekdot, dan lain sebagainya.`;
    prompt += `Opsional (jika benar-benar dibutuhkan): Isi key 'konten_tambahan' dengan konten tambahan yang sesuai dengan tema/subtema di atas (wajib memiliki title markdown contoh: #konten_tambahan\n## Kisah\ncontent).`;

    let rpp = await g4f.chat(prompt);
    let rppObject = parseMarkdownToObject(rpp);

    // Validate that all required keys are present in the generated RPP object
    const requiredKeys = [
      "materi",
      "KD",
      "indikator_capaian_pembelajaran",
      "media_belajar",
      "kegiatan",
      "indikator_penilaian",
      "teknik_penilaian",
    ];
    let missingKeys = requiredKeys.filter((key) => !rppObject[key]);
    let attemptCount = 0;
    while (missingKeys.length > 0 || rpp.match(":konten_tambahan\n")) {
      attemptCount++;
      if (attemptCount > 3) {
        console.warn(
          "Maximum regeneration attempts reached. Proceeding with incomplete RPP.",
        );
        break;
      }

      console.warn(
        `Generated RPP is missing required keys: ${missingKeys.join(", ")}. Regenerating...`,
      );
      rpp = await g4f.chat(prompt);
      rppObject = parseMarkdownToObject(rpp);
      missingKeys = requiredKeys.filter((key) => !rppObject[key]);
    }

    const result = `# RENCANA PEMBELAJARAN ${data.tipe_rpp === "rpph" ? "HARIAN" : "MINGGUAN"} (${data.tipe_rpp.toUpperCase()})<br>TAHUN AJARAN ${data.tahun_ajaran}

**Kelompok/Usia**\t: ${data.kelas}<br>
**Semester/Minggu ke**\t: ${data.semester}<br>
**Alokasi Waktu**\t: ${data.alokasi_waktu}<br>
**Hari/Tanggal**\t\t: ${data.hari_tanggal}<br>
**Tema/Subtema**\t: ${data.tema_subtema}<br>
**Model Pembelajaran**\t: ${data.model_pembelajaran}<br>

## A. Materi dan Kopetensi Dasar

Materi: ${rppObject.materi}

KD: ${rppObject.KD}

## B. Indikator Capaian Pembelajaran

Beberapa indikator capaian pembelajaran pada kegiatan ini antara lain :

${rppObject.indikator_capaian_pembelajaran}

## C. Media / Sumber Belajar

Beberapa media pembelajaran yang akan digunakan antara lain:

${rppObject.media_belajar}

## D. Kegiatan

${rppObject.kegiatan}

## E. Penilaian

### 1. Indikator Penilaian

${rppObject.indikator_penilaian}

### 2. Teknik Penilaian

${rppObject.teknik_penilaian}

${rppObject.konten_tambahan ? "<breakPage/>\n" + rppObject.konten_tambahan : ""}
`;

    console.log("Generated RPP raw markdown:", rpp);
    console.log("Generated RPP:", JSON.stringify(rppObject, null, 2));
    console.log("Generated RPP (formatted):", result);

    res.json({ rpp: result, obj: rppObject });
  } catch (error) {
    console.error("Error generating RPP:", error);
    res.status(500).json({ error: "Failed to generate RPP" });
  }
});
