import fs from 'fs'
import path from 'path'
import vm from 'vm'
import * as docx from 'docx'
import { removeImportRequire, convertNumToRoman } from '../utils/utils.js'

const __dirname = import.meta.dirname
const __filename = import.meta.filename

/**
 * Generates a DOCX document by executing the provided template code in a VM context.
 * The template code can utilize the `docx` library and any additional predefined variables passed in.
 * The generated document buffer is captured in a shared object for retrieval after execution.
 * @param {String} templateCode - The JavaScript code that generates the DOCX document, expected to set `shared.buffer` with the resulting document buffer.
 * @param {String | Object} predefinedVars - An optional object containing predefined variables that will be available in the VM context when executing the template code.
 * @returns
 */
export default function generateDocxInVM (templateCode, predefinedVars = '') {
  const cleanedCode = removeImportRequire(templateCode)

  // Shared object to capture output from VM
  const shared = {
    buffer: null
  }

  // Load additional code snippets
  const configCode = fs.readFileSync(path.join(__dirname, '../scripts/docx-config.js'), 'utf-8')
  const apiCode = fs.readFileSync(path.join(__dirname, '../scripts/docx-api.js'), 'utf-8')
  const coverPageCode = fs.readFileSync(path.join(__dirname, '../scripts/docx-cover-page.js'), 'utf-8')

  const code = `
  ${removeImportRequire(configCode)}
  ${removeImportRequire(apiCode)}
  ${typeof predefinedVars === 'string' ? removeImportRequire(predefinedVars) : ''}
  ${removeImportRequire(coverPageCode)}
  ${cleanedCode}
  `

  console.debug('Executing VM code:\n', code)

  const context = {
    console,
    fs,
    path,
    __dirname,
    __filename,
    convertNumToRoman,
    shared,
    ...docx
  }

  if (predefinedVars && typeof predefinedVars === 'object') {
    Object.assign(context, predefinedVars)
  }

  try {
    const result = vm.runInNewContext(code, context)
    if (result && typeof result.then === 'function') {
      return result
        .then(() => {
          return shared.buffer
        })
        .catch((err) => {
          console.error('Error in async code within VM:', err)
          throw err
        })
    } else {
      return shared.buffer
    }
  } catch (err) {
    console.error('Error executing VM code:', err)
    throw err
  } finally {
    console.log('Finished executing VM code.')
  }
}
