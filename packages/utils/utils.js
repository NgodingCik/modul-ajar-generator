/**
 * This module contains utility functions for handling some common operations in the application.
 */

import fs from 'fs'
import path from 'path'
import { encoding_for_model } from '@dqbd/tiktoken' // eslint-disable-line camelcase
import consola from 'consola'

/**
 * Removes import require, and export statements from a string.
 *
 * @param {string} content - The string to parse
 * @returns {string} - The string with import, require, and export statements removed
 */
export function removeImportRequire (content) {
  return content
  // Multi-line static import ... from '...' (PREVENT crossing into next import)
    .replace(/^\s*import\s+(?:(?!^\s*import\b)[\s\S])*?\bfrom\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
  // Multi-line dynamic import(...) or require(...)
    .replace(/^\s*(?:const|let|var\s+)?\w+\s*=\s*(import|require)\s*\([\s\S]*?\)\s*;?\s*$/gm, '')
  // Single-line: import ... ; or require(...);
    .replace(/^\s*(import|require)(\s+|\s*\()([^\n]*?);?\s*$/gm, '')
  // export { ... }
    .replace(/^\s*export\s*\{[^}]*\}\s*;?\s*$/gm, '')
  // Remove excess blank lines
    .replace(/\n\s*\n+/g, '\n')
    .trim()
}

/**
 * This function loads all Markdown files from a specified directory, reads their content, and constructs an object where each key is derived from the filename (converted to uppercase and underscores) and the value is the file's content. This allows for easy access to the content of multiple Markdown files in a structured format.
 *
 * @param {string} dir - Content directory path
 * @returns {{ [key: string]: string }} - An object where keys are derived from filenames and values are file contents
 */
export function loadContexts (dir) {
  /** @type {{[key: string]: string}} */
  const context = {}
  const files = fs.readdirSync(dir)

  files.sort() // Ensure consistent order

  for (const file of files) {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8')
      const key = path.basename(file, '.md').toUpperCase().replace(/-/g, '_')
      context[key] = content
    }
  }

  return context
}

/**
 * Removes markdown code blocks and inline code from a markdown string.
 * Note: This removes MARKDOWN code blocks (e.g., from markdown with embedded code),
 * NOT pure code files. If the entire content is a code block, will return empty string.
 *
 * @param {string} markdown - Markdown content with embedded code blocks
 * @returns {string} - Markdown with code blocks removed
 */
export function removeCodeBlocksFromMarkdown (markdown) {
  return markdown
    .replace(/^```[\s\S]*?^```/gm, '') // fenced blocks (``` on own line)
    .replace(/`[^`\n]+`/g, '') // inline code only (no newlines inside)
    .replace(/\n{3,}/g, '\n\n') // collapse excess blank lines
    .trim()
}

/**
 * Cleans code extracted from markdown code blocks.
 * Removes the enclosing backticks while preserving inner content.
 * Use this when the entire input is a markdown code block.
 *
 * @param {string} code - Code wrapped in markdown fences (```...```)
 * @returns {string} - Code content without fence markers
 */
export function extractCodeFromMarkdownFence (code) {
  return code
    .replace(/^```.*?\n/, '') // Remove opening fence with language identifier
    .replace(/\n```$/, '') // Remove closing fence
    .trim()
}

/**
 * Converts a number to its Roman numeral representation.
 *
 * @param {number} num - The number to convert
 * @returns {string} - The Roman numeral representation of the number
 */
export function convertNumToRoman (num) {
  if (num < 1) { return '' }
  if (num >= 40) { return 'XL' + convertNumToRoman(num - 40) }
  if (num >= 10) { return 'X' + convertNumToRoman(num - 10) }
  if (num >= 9) { return 'IX' + convertNumToRoman(num - 9) }
  if (num >= 5) { return 'V' + convertNumToRoman(num - 5) }
  if (num >= 4) { return 'IV' + convertNumToRoman(num - 4) }
  if (num >= 1) { return 'I' + convertNumToRoman(num - 1) }
  return ''
}

/**
 * Counts the number of tokens in a string using the specified model's tokenizer.
 *
 * @param {string} message - The string to count tokens for
 * @param {import('@dqbd/tiktoken').TiktokenModel} model - The OpenAI model to use for tokenization (e.g., "gpt-3.5-turbo")
 * @returns {number} - The number of tokens in the string
 */
export function numTokensFromString (message, model = 'gpt-5') {
  const encoder = encoding_for_model(model)

  const tokens = encoder.encode(message)
  encoder.free()
  return tokens.length
}

/**
 * Validates that all required parameters are present in the request body.
 *
 * @param {Record<string, any>} body - The request body
 * @param  {...string} requiredParams - The required parameter names
 * @returns {{ status: boolean, message: string | null }} - An object containing a boolean indicating validity and an error message (if applicable)
 */
export function validateBodyParams (body, ...requiredParams) {
  consola.debug('Validating request body parameters:', { body, requiredParams })

  if (!body || typeof body !== 'object') {
    return { status: false, message: 'Request body must be a valid JSON object' }
  }

  /** @param {string} param */
  const isMissing = (param) => {
    const value = body[param]
    return !(param in body) || value === null || value === undefined || value === ''
  }

  const missingParams = []

  for (const param of requiredParams) {
    if (Array.isArray(param)) {
      // Validate each param inside the nested array individually
      for (const p of param) {
        if (isMissing(p)) missingParams.push(p)
      }
    } else {
      if (isMissing(param)) missingParams.push(param)
    }
  }

  if (missingParams.length > 0) {
    return {
      status: false,
      message: `Missing or empty required parameters: ${missingParams.join(', ')}`
    }
  }

  return { status: true, message: null }
}

/**
 * Gets the path to the .env file, checking both the current working directory and the project root. This allows for flexibility in where the .env file can be located, accommodating different deployment and development setups.
 *
 * @param {string} [filename='.env'] - The name of the .env file to look for (default is '.env')
 * @returns {string | null} - The path to the .env file, or null if not found
 */
export function getEnvPath (filename = '.env') {
  // Check for .env in the current working directory first, then fallback to the project root
  const cwdEnvPath = path.join(process.cwd(), filename)
  const rootEnvPath = path.join(import.meta.dirname, `../../${filename}`)

  if (fs.existsSync(cwdEnvPath)) {
    return cwdEnvPath
  }
  if (fs.existsSync(rootEnvPath)) {
    return rootEnvPath
  }

  consola.warn('No .env file found in either the current working directory or the project root.')
  return null
}
