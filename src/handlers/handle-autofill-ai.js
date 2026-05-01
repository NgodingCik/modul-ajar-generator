import fs from 'fs'
import path from 'path'
import consola from 'consola'
import { validateBodyParams } from '../utils/utils.js'
import OpenAIWrapper from '../core/ai/openai-wrapper.js'

const __dirname = import.meta.dirname

const openai = new OpenAIWrapper(process.env.OPENAI_API_KEY, process.env.OPENAI_MODEL || 'gpt-4.1-2025-04-14', process.env.OPENAI_BASE_URL || null)

openai.context = [
  {
    role: 'system',
    content: 'You are an expert educational assistant designed to directly generate and perfect lesson plan (RPP) content. You must provide the final text that will be inserted directly into the form field, NOT instructions on what to write.'
  },
  {
    role: 'system',
    content: 'NEVER output directives, prompts, or instructions to the user (e.g., do not write "Deskripsikan...", "Buatlah...", "Tuliskan..."). Output ONLY the actual completed text based on the user\'s context. Act as the teacher writing the document.'
  },
  {
    role: 'system',
    content: 'Your answer must ONLY contain the final smoothed/perfected text without any conversational filler, explanations, or quotes.'
  },
  {
    role: 'system',
    content: 'You should answer in Indonesian language. Make the language professional, concise, clearly understandable, and appropriate for formal educational documents.'
  },
  {
    role: 'system',
    content: 'Your task is to improve the provided text or generate missing text based on context, preserving the main structure and intent while making it pedagogically sound.'
  },
  {
    role: 'system',
    content: 'Fix typo words, and make the sentence more concise and clear, but dont change the main context of the sentence. For example "Barani" should be "Berani" and so on.'
  },
  {
    role: 'system',
    content: 'Dont embed field like "Tujuan pembelajaran: ", just give the direct content. For example "Anak mampu menyebutkan anggota keluarganya dengan benar dan percaya diri."'
  },
  {
    role: 'system',
    content: fs.readFileSync(path.join(__dirname, '../../context/10-contoh-tema-dan-subtema.md'), 'utf-8')
  }
]

/**
 * Handles auto-filling AI functionality.
 * @param {Object} body - The request body containing text and field.
 *
 * @returns {Promise<{status: number, data?: string, message?: string}>} - The auto-filled text.
 */
const handleAutoFillAI = async (body) => {
  const { text, field } = body

  consola.debug('[handleAutoFillAI] Body received:', body)
  consola.debug(`[handleAutoFillAI] Received request for field "${field}" with text:`, text)

  const validate = validateBodyParams({ text, field }, 'text', 'field')
  consola.debug('[handleAutoFillAI] Validation result:', validate)

  if (!validate) {
    return { status: 400, message: 'Missing required parameters' }
  }
  if (validate.status === false) {
    return { status: 400, message: validate.message }
  }

  try {
    const prompt = `Berikut adalah konteks dan instruksi untuk field "${field}":
${text}

TUGAS ANDA: Tuliskan hasil akhir teks yang akan langsung dipakai/dimasukkan ke dalam form rpp atau bahan ajar. JANGAN memberikan instruksi, kalimat perintah (seperti "Deskripsikan..."), atau saran penjelasan kepada user. Hasilkan teks kontennya secara langsung, profesional, dan sesuai konteks pendidikan.`

    consola.debug('[handleAutoFillAI] Context:', openai.context)
    consola.debug('[handleAutoFillAI] Sending prompt to OpenAI:', prompt)

    const response = await openai.chat(prompt)

    if (!response) {
      throw new Error('No response from OpenAI')
    }

    consola.debug('[handleAutoFillAI] Raw response from OpenAI:', response)

    return { status: 200, data: response }
  } catch (err) {
    consola.error('Error in handleAutoFillAI:', err)
    return { status: 500, message: 'Internal server error' }
  }
}

export default handleAutoFillAI
