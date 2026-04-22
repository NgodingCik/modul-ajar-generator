import fs from 'fs'
import path from 'path'
import vm from 'vm'
import consola from 'consola'
import * as docx from 'docx'
import { removeImportRequire, convertNumToRoman, extractCodeFromMarkdownFence } from '../utils/utils.js'
import * as docxConfig from '../scripts/docx-config.js'
import * as docxApi from '../scripts/docx-api.js'
import * as docxCoverPage from '../scripts/docx-cover-page.js'

const __dirname = import.meta.dirname
const __filename = import.meta.filename
const mainCode = fs.readFileSync(path.join(__dirname, '../scripts/docx-main.js'), 'utf-8')

/**
 * Generates a DOCX document by executing the provided template code in a VM context.
 * The template code can utilize the `docx` library and any additional predefined variables passed in.
 * The generated document buffer is returned by main() from the VM context.
 * @param {Object} credentialVars - The credentials variable of the document.
 * @param {String | Object} predefinedVars - An optional object containing predefined variables that will be available in the VM context when executing the template code.
 * @returns {Promise<Buffer>} A promise resolving to the generated DOCX document buffer.
 */
export default function generateDocxInVM (credentialVars = {}, predefinedVars) {
  const predefinedCode = typeof predefinedVars === 'string'
    ? removeImportRequire(extractCodeFromMarkdownFence(predefinedVars))
    : ''

  const code = `${predefinedCode};\n${removeImportRequire(mainCode)};\nmain(credentialVars)`

  consola.debug('Executing VM code:\n', code)

  const context = {
    console,
    fs,
    path,
    __dirname,
    __filename,
    convertNumToRoman,
    credentialVars,
    ...docx,
    ...docxConfig,
    ...docxApi,
    ...credentialVars,
    ...docxCoverPage
  }

  try {
    const result = vm.runInNewContext(code, context)
    if (result && typeof result.then === 'function') {
      return result
        .catch((err) => {
          consola.error('Error in async code within VM:', err)
          throw err
        })
    } else {
      return result
    }
  } catch (err) {
    consola.error('Error executing VM code:', err)
    throw err
  } finally {
    consola.log('Finished executing VM code.')
  }
}
