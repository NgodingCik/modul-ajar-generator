import { AppRoute } from '../index.js'
import OpenAIWrapper from '../../lib/openai.js'
import consola from 'consola'
import { validateBodyParams } from '../../utils/utils.js'

const openai = new OpenAIWrapper(true)

const convesation = [
  {
    role: 'system',
    content: 'You are an assistant that provides recommendations for improving lesson plans based on the provided class information and a specific prompt. Your responses should be concise, actionable, and focused on enhancing the quality of the lesson plan.'
  },
  {
    role: 'system',
    content: 'Your answer only contains the recommendation without any additional explanations or comments. The recommendation should be directly related to the provided class information and the prompt, and should aim to improve the lesson plan effectively.'
  },
  {
    role: 'system',
    content: 'You should answer in Indonesian language, and your recommendation should be clear and easy to understand for educators. Focus on providing practical suggestions that can be implemented to enhance the lesson plan.'
  },
  {
    role: 'system',
    content: 'Your task is to improve and perfect, but that doesnt mean you have to change the main structure and context of the requested sentence, especially for teachers who teach their students.'
  },
  {
    role: 'system',
    content: 'Dont go too far out of context, just improve the language structure, so that it is more professional and easy to understand.'
  },
  {
    role: 'system',
    content: 'Fix typo words, and make the sentence more concise and clear, but dont change the main context of the sentence. For example "Barani" should be "Berani" and so on.'
  },
  {
    role: 'system',
    content: 'Dont embed field like "Tujuan pembelajaran: ", just give the recommendation to improve the sentence, for example "Anak mampu menyebutkan anggota keluarganya dengan benar dan percaya diri."'
  }
]
openai.setContext(convesation)

export const route = new AppRoute('/recommendation', 'post', async (req, res) => {
  try {
    const { text, field } = req.body

    const validate = validateBodyParams(req.body, 'text', 'field')
    if (!validate) {
      return res.status(400).json({ status: false, message: 'Missing required parameters' })
    }
    if (validate.status === false) {
      return res.status(400).json({ status: false, message: validate.message })
    }

    // Validation
    if (!text) {
      return res.status(400).json({ status: false, message: 'text is required' })
    }
    if (!field) {
      return res.status(400).json({ status: false, message: 'field is required' })
    }

    const response = await openai.chat(`Text ini untuk mengisi field ${field} dengan kalimat: ${text}. Berikan rekomendasi untuk menyempurnakan kalimat tersebut agar lebih baik dan profesional, tetapi jangan mengubah konteks utama dari kalimat tersebut.`)

    res.json({ result: response })
  } catch (error) {
    consola.error('Error generating recommendation:', error)
    res.status(500).json({ status: false, message: 'Failed to generate recommendation' })
  }
})
