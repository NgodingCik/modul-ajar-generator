import G4F from '../../src/lib/g4f.js'
import fs from 'fs'
import path from 'path'

async function main () {
  try {
    // Initialize G4F with API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY || 'default-key'
    const g4f = new G4F(apiKey, 'default')

    // Set the model
    g4f.setModel('LongCat-Flash-Lite')

    // Simple prompt
    const prompt = `
    
    `

    console.log('Sending request to AI...')
    console.log('Prompt:', prompt)
    console.log('---')

    // Make the request
    const response = await g4f.chat(prompt)

    // Save output to out.ai
    const outputPath = path.join(process.cwd(), 'out.ai')
    fs.writeFileSync(outputPath, response, 'utf-8')

    console.log('Response saved to:', outputPath)
    console.log('---')
    console.log('Output Preview:')
    console.log(response.substring(0, 500) + '...')
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
