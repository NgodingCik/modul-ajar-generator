import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import consola from 'consola'
import { loadContexts, removeImportRequire, numTokensFromString } from '../utils/utils.js'

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

/**
 * Simple wrapper around OpenAI API to manage contexts and generate responses.
 * It loads contexts from files in the context directory and allows chatting with the model using those contexts.
 */
export default class OpenAIWrapper {
  /**
   * Constructor for OpenAIWrapper
   * @param {boolean} diableDefaultContext - Whether to disable loading default contexts from files. Default is false (load contexts).
   * @param {string} apiKey - OpenAI API key. Defaults to OPENAI_API_KEY environment variable.
   * @param {string} model - OpenAI model to use. Defaults to OPENAI_MODEL environment variable.
   */
  constructor (diableDefaultContext = false, apiKey = OPENAI_API_KEY, model = OPENAI_MODEL) {
    this.mClient = new OpenAI({
      apiKey,
      baseURL: OPENAI_API_BASE_URL
    })
    this.mModel = model
    this.mContexts = []

    if (!diableDefaultContext) {
      this.#loadContexts()
    }
  }

  // Setters and getters
  setModel (model) {
    this.mModel = model
  }

  setContext (context) {
    this.mContexts = context
  }

  get model () {
    return this.mModel
  }

  get client () {
    return this.mClient
  }

  // Private method
  #loadContexts () {
    let contextsCharCount = 0
    const contextsDir = path.join(__dirname, '../../context')
    const contexts = loadContexts(contextsDir)

    for (const [key, value] of Object.entries(contexts)) {
      contextsCharCount += value.length
      consola.debug(`Loaded context: ${key} (${value.length} characters)`)

      this.mContexts.push({
        role: 'system',
        content: `--- CONTEXT ${key} START ---\n${value}\n--- CONTEXT ${key} END ---`
      })
    }

    // Embed example output
    const exampleOutputPath = path.join(__dirname, '../scripts/docx-example-predefined-var.js')
    const exampleOutputContent = removeImportRequire(fs.readFileSync(exampleOutputPath, 'utf-8'))
    this.mContexts.push({
      role: 'system',
      content: `--- CONTEXT example-output START ---\n${exampleOutputContent}\n--- CONTEXT example-output END ---`
    })

    consola.debug(`Loaded example output context (${exampleOutputContent.length} characters)`)
    consola.debug(`Total characters in contexts: ${contextsCharCount + exampleOutputContent.length}`)

    // Estimate total tokens in contexts
    const totalTokens = numTokensFromString(this.mContexts.map(ctx => ctx.content).join('\n'))
    consola.debug(`Estimated total tokens in contexts: ${totalTokens}`)
  }

  // Public method

  /**
   * Chat with the model using the loaded contexts and provided prompt.
   * @param {string | Array<{role: string, content: string}> | Array<string>} prompt - The prompt to send to the model. Can be a string, an array of message objects, or an array of strings.
   * @returns {Promise<string>} - The response from the model.
   */
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

      // Count estimated tokens in the entire conversation (contexts + prompt)
      const totalTokens = numTokensFromString(allMessages.map(m => m.content).join('\n'))
      consola.debug(`Total tokens in conversation (contexts + prompt): ${totalTokens}`)

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
