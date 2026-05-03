import fs from 'fs'
import path from 'path'
import consola from 'consola'
import OpenAI from 'openai'
import { loadContexts, numTokensFromString } from '@repo/utils/utils.js'

/**
 * @typedef {Object} Message
 * @property {'system' | 'user' | 'assistant' | 'tool'} role - The role of the message sender (excluding 'function' to avoid name requirement)
 * @property {string} content - The content of the message
 * @property {string} [name] - Optional name for tool/function messages
 * @property {string} [tool_call_id] - Optional tool_call_id for tool messages
 */

/**
 * OpenAIWrapper is a simple wrapper around the OpenAI API to manage contexts and generate responses.
 *
 * @example
 *  const wrapper = new OpenAIWrapper('your-api-key')
 *  wrapper.loadContextsFromDir('./contexts')
 *  const response = await wrapper.chat('Hello, model!')
 *  console.log(response)
 *
 * @note Make sure to set the OPENAI_API_KEY and OPENAI_MODEL environment variables before using this class.
 */
class OpenAIWrapper {
  /** @type {OpenAI} */
  #mClient
  /** @type {string} */
  #mModel
  /** @type {string | null} */
  #mBaseURL
  /** @type {Message[]} */
  #mDefaultContext = []

  /**
   * Creates an instance of OpenAIWrapper.
   *
   * @param {string} apiKey - Your OpenAI API key
   * @param {string} [model='gpt-4.1-2025-04-14'] - The model to use
   * @param {string | null} [baseURL=null] - The base URL for the OpenAI API
   */
  constructor (apiKey, model = 'gpt-4.1-2025-04-14', baseURL = null) {
    consola.debug('[OpenAIWrapper] Initializing OpenAI client')
    consola.debug('[OpenAIWrapper] Model set to:', model)
    consola.debug('[OpenAIWrapper] Base URL set to:', baseURL || 'default OpenAI API URL')

    this.#mModel = model
    this.#mBaseURL = baseURL

    this.#mClient = new OpenAI({
      apiKey,
      baseURL: baseURL ?? undefined // Convert null to undefined for OpenAI SDK
    })
  }

  // Getters and setters

  /**
   * Gets the base URL for the OpenAI API.
   * @returns {string | null}
   */
  get baseURL () {
    return this.#mBaseURL
  }

  /**
   * Gets the model.
   * @returns {string}
   */
  get model () {
    return this.#mModel
  }

  /**
   * Sets the model.
   * @param {string} model
   */
  set model (model) {
    consola.debug('[OpenAIWrapper] Setting model to:', model)
    this.#mModel = model
  }

  /**
   * Gets the OpenAI client instance.
   * @returns {OpenAI}
   */
  get client () {
    return this.#mClient
  }

  /**
   * Gets the default context.
   * @returns {Message[]}
   */
  get context () {
    return this.#mDefaultContext
  }

  /**
   * Sets the default context.
   * @param {Message[]} context
   */
  set context (context) {
    this.#mDefaultContext = context
  }

  // Public methods

  /**
   * Adds one or more context objects to the existing default context.
   *
   * @param  {...Message} contexts
   */
  addContext (...contexts) {
    consola.debug('[OpenAIWrapper] addContext() called with', contexts.map(c => Object.keys(c)))
    this.#mDefaultContext.push(...contexts)
    consola.debug('[OpenAIWrapper] Context updated, now has length:', this.#mDefaultContext.length)
  }

  /**
   * Load context(s) from a directory.
   *
   * @param {string} pathDir
   */
  loadContextsFromDir (pathDir) {
    consola.debug('[OpenAIWrapper] Loading contexts from directory:', pathDir)

    let contextxCharCount = 0
    const contexts = loadContexts(pathDir)

    for (const [key, value] of Object.entries(contexts)) {
      contextxCharCount += value.length
      consola.debug('[OpenAIWrapper] Loaded context:', key, `(${value.length} characters)`)

      this.#mDefaultContext.push({
        role: 'system',
        content: `--- CONTEXT ${key} START ---\n${value}\n--- CONTEXT ${key} END ---`
      })
    }

    consola.debug('[OpenAIWrapper] Finished loading contexts from directory:', pathDir, `Total contexts: ${Object.keys(contexts).length}, Total characters: ${contextxCharCount}`)
    consola.debug('[OpenAIWrapper] Total tokens in loaded contexts:', numTokensFromString(this.#mDefaultContext.map(c => c.content).join('\n')))
  }

  /**
   * Loads a context from a file and adds it to the default context as a system message.
   *
   * @param {string} filePath
   */
  loadContext (filePath) {
    consola.debug('[OpenAIWrapper] Loading context from file:', filePath)

    const content = fs.readFileSync(filePath, 'utf-8')
    const fileName = path.basename(filePath)

    this.#mDefaultContext.push({
      role: 'system',
      content: `--- CONTEXT ${fileName} START ---\n${content}\n--- CONTEXT ${fileName} END ---`
    })

    consola.debug('[OpenAIWrapper] Loaded context from file:', filePath, `(${content.length} characters)`)
    consola.debug('[OpenAIWrapper] Total tokens in loaded contexts:', numTokensFromString(this.#mDefaultContext.map(c => c.content).join('\n')))
  }

  /**
   * Send a chat message to the OpenAI model with the loaded contexts.
   *
   * @param {string | Message[] | string[]} messages
   * @returns {Promise<string>}
   * @throws {Error}
   */
  async chat (messages) {
    try {
      /** @type {Message[]} */
      const formattedMessages = []

      if (typeof messages === 'string') {
        formattedMessages.push({
          role: 'user',
          content: messages
        })
      } else if (Array.isArray(messages)) {
        for (const msg of messages) {
          if (typeof msg === 'string') {
            formattedMessages.push({ role: 'user', content: msg })
          } else if (msg.role && msg.content) {
            formattedMessages.push({
              role: msg.role,
              content: msg.content,
              // Include optional fields if present
              ...(msg.name && { name: msg.name }),
              ...(msg.tool_call_id && { tool_call_id: msg.tool_call_id })
            })
          }
        }
      }

      const allMessages = [...this.#mDefaultContext, ...formattedMessages]

      consola.debug('[OpenAIWrapper] Sending chat request with messages:', allMessages)

      const response = await this.#mClient.chat.completions.create({
        model: this.#mModel,
        /** @type {any} */
        messages: allMessages
      })

      consola.debug('[OpenAIWrapper] Received response from OpenAI:', response)

      return response.choices[0]?.message?.content ?? ''
    } catch (err) {
      consola.error('[OpenAIWrapper] Error during chat:', err)
      throw err
    }
  }
}

export default OpenAIWrapper
