import fs from 'fs'
import path from 'path'
import { removeImportRequire, extractCodeFromMarkdownFence } from '../src/utils/utils.js'
import generateDocxInVM from '../src/lib/vm-generate-docx.js'

const __dirname = import.meta.dirname

const predefinedVar = fs.readFileSync(path.join(__dirname, '../src/scripts/docx-predefined-var.js'), 'utf-8')
const tempCode = fs.readFileSync(path.join(__dirname, '../src/scripts/docx-example-iife.js'), 'utf-8')
const cleanedCode = removeImportRequire(extractCodeFromMarkdownFence(tempCode))

try {
  const result = generateDocxInVM(cleanedCode, predefinedVar)
  if (result && typeof result.then === 'function') {
    result
      .then(() => {
        console.log('VM code executed successfully.')
      })
      .catch((err) => {
        console.error('Error in async code within VM:', err)
      })
  } else {
    console.log('VM code executed synchronously.')
  }
} catch (err) {
  console.error('Error executing VM code:', err)
} finally {
  console.log('Finished executing VM code.')
}
