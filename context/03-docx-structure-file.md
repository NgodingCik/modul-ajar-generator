# DOCX Structure

> **CRITICAL INSTRUCTION FOR AI:**
> You **MUST** follow the structure of `example-modul-ajar.docx` and preserve its main keys and order. You **MUST NOT** remove, rename, or reorder the core keys below.
> If `example-modul-ajar.docx` is not provided, you **MUST** use this file as the canonical fallback template.
> This structure is intended for **Modul Ajar PAUD/TK** and must keep PAUD/TK context in the content values.

This document defines the required structure reference extracted from `example-modul-ajar.docx` using `npm run cli:docx -- example-modul-ajar.docx --structure` plus content extraction from `word/document.xml`.

## 1) DOCX Package Keys (Must Be Preserved)

Use this OOXML package skeleton as the baseline:

```text
[Content_Types].xml
_rels/
	.rels
docProps/
	app.xml
	core.xml
	custom.xml
word/
	_rels/
		document.xml.rels
	document.xml
	fontTable.xml
	numbering.xml
	settings.xml
	styles.xml
	theme/
		theme1.xml
```

Rules:
- Keep all top-level keys: `[Content_Types].xml`, `_rels`, `docProps`, and `word`.
- Keep required document files in `word/`: `document.xml`, `styles.xml`, `numbering.xml`, and `settings.xml`.
- Keep `word/_rels/document.xml.rels` and `word/theme/theme1.xml`.

## 2) Main Content Keys in `word/document.xml` (Must Be Preserved)

The AI output should keep this core heading flow and key labels:

1. `MODUL AJAR DEEP LEARNING`
2. `MATA PELAJARAN : ...` (for PAUD/TK value, use `Mata Kegiatan / Bidang Perkembangan`)
3. `BAB 1 : ...` (for PAUD/TK value, use `Tema / Subtema`)
4. `A. IDENTITAS MODUL`
5. `B. IDENTIFIKASI KESIAPAN PESERTA DIDIK`
6. `C. KARAKTERISTIK MATERI PELAJARAN`
7. `D. DIMENSI PROFIL LULUSAN`
8. `DESAIN PEMBELAJARAN`
9. `A. CAPAIAN PEMBELAJARAN (CP)`
10. `B. LINTAS DISIPLIN ILMU`
11. `C. TUJUAN PEMBELAJARAN`
12. `D. TOPIK PEMBELAJARAN KONTEKSTUAL`
13. `E. KERANGKA PEMBELAJARAN`
14. `F. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI`
15. `G. ASESMEN PEMBELAJARAN`

PAUD/TK adaptation note:
- Keep the same heading keys and order, but use PAUD/TK-specific values in each section.
- Use `Fase Fondasi` and age-group context where relevant.

## 3) Required Sub-Keys

### A. IDENTITAS MODUL
- `Jenjang : PAUD/TK`
- `Nama Sekolah`
- `Nama Penyusun`
- `Tema/Sub Tema`
- `Kel. / Fase / Semester` (PAUD/TK format example: `Kelompok A/B / Fase Fondasi / Semester ...`)
- `Alokasi Waktu`
- `Tahun Pelajaran`

### E. KERANGKA PEMBELAJARAN
- `PRAKTIK PEDAGOGIK`
- `KEMITRAAN PEMBELAJARAN`
- `LINGKUNGAN BELAJAR`
- `PEMANFAATAN DIGITAL`

### F. LANGKAH-LANGKAH PEMBELAJARAN BERDIFERENSIASI
- `PERTEMUAN 1` to `PERTEMUAN 6`
- Each meeting should keep three blocks:
	- `KEGIATAN PENDAHULUAN`
	- `KEGIATAN INTI`
	- `KEGIATAN PENUTUP`

### G. ASESMEN PEMBELAJARAN
- `ASESMEN DIAGNOSTIK`
- `ASESMEN FORMATIF`
- `ASESMEN SUMATIF`
- `Contoh Tes Tertulis`
	- `A. Pilihan Ganda`
	- `B. Esai`

## 4) AI Generation Rules

- Preserve section sequence exactly.
- Preserve lettered section keys (`A.`, `B.`, `C.`, etc.) in each major block.
- Preserve mandatory sub-keys even when content is brief.
- Content can be adapted, but key headings and structural anchors must remain.
- If uncertain, prefer keeping the original key labels from the template.
- Keep content tone and examples appropriate for PAUD/TK learners (play-based, concrete, age-appropriate).
- Avoid high-school-style subject framing in values unless explicitly requested by the user.

## 5) Fallback Rules If Template DOCX Is Not Provided

- Do not block generation when `example-modul-ajar.docx` is missing.
- Use this file as the primary structure source.
- Keep all main keys, section order, and required sub-keys exactly as defined above.
- Fill unknown values with placeholders (for example: `................................................`) instead of changing structure.
- If user only provides topic/title, update content values only and keep the full structure intact.

