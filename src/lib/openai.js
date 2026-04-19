import config from 'dotenv'
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import consola from 'consola'
import { loadContexts, removeImportRequire } from '../utils/utils.js'

config.config({ override: true }) // Load environment variables from .env file

const __dirname = import.meta.dirname

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = process.env.OPENAI_MODEL
const OPENAI_API_BASE_URL = process.env.OPENAI_API_BASE_URL

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables')
}

if (!OPENAI_MODEL) {
  throw new Error('OPENAI_MODEL is not set in environment variables')
}

export default class OpenAIWrapper {
  constructor (apiKey = OPENAI_API_KEY, model = OPENAI_MODEL) {
    this.mClient = new OpenAI({
      apiKey,
      baseURL: OPENAI_API_BASE_URL
    })
    this.mModel = model
    this.mContexts = []
    this.#loadContexts()
  }

  // Setters and getters
  setModel (model) {
    this.mModel = model
  }

  get model () {
    return this.mModel
  }

  get client () {
    return this.mClient
  }

  // Private method
  #loadContexts () {
    const contextsDir = path.join(__dirname, '../../context')
    const contexts = loadContexts(contextsDir)

    for (const [key, value] of Object.entries(contexts)) {
      consola.debug(`Loaded context: ${key} (${value.length} characters)`)

      this.mContexts.push({
        role: 'system',
        content: `--- CONTEXT ${key} START ---\n${value}\n--- CONTEXT ${key} END ---`
      })
    }

    // Embed exaple output IIFE
    const exampleIIFEPath = path.join(__dirname, '../scripts/docx-example-iife.js')
    const exampleIIFEContent = removeImportRequire(fs.readFileSync(exampleIIFEPath, 'utf-8'))
    this.mContexts.push({
      role: 'system',
      content: `--- CONTEXT docx-example-iife START ---\n${exampleIIFEContent}\n--- CONTEXT docx-example-iife END ---`
    })
  }

  // Public method

  async chat (prompt) {
    try {
      const messages = []
      if (typeof prompt === 'string') {
        messages.push({
          role: 'user',
          content: prompt
        })
      } else if (Array.isArray(prompt)) {
        for (const msg of prompt) {
          if (typeof msg === 'string') {
            messages.push({
              role: 'user',
              content: msg
            })
          } else if (msg.role && msg.content) {
            messages.push({
              role: msg.role,
              content: msg.content
            })
          }
        }
      } else {
        throw new Error('Invalid prompt format. Must be string or array of messages.')
      }

      const allMessages = [...this.mContexts, ...messages]

      const response = await this.mClient.chat.completions.create({
        model: this.mModel,
        messages: allMessages
      })
      return response.choices[0].message.content
    } catch (e) {
      consola.error('Error generating response:', e)
      return `Error generating response: ${e.message}`
    }
  }
}
