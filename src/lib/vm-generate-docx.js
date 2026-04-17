import fs from 'fs'
import path from 'path'
import vm from 'vm'
import * as docx from 'docx'
import { removeImportRequire } from '../utils/utils.js'

const __dirname = import.meta.dirname
const __filename = import.meta.filename

export default function generateDocxInVM (templateCode) {
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
  ${removeImportRequire(coverPageCode)}
  ${cleanedCode}
  `

  const context = {
    console,
    fs,
    path,
    __dirname,
    __filename,
    shared,
    ...docx
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
