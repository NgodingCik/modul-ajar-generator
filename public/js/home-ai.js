/** This script is for handling AI enhancement buttons in the form.
 * It listens for clicks on buttons with IDs corresponding to AI enhancement types,
 * sends the current content of the associated textarea to the server for enhancement,
 * and updates the textarea with the enhanced content received from the server.
 */

document.addEventListener('click', async (event) => {
  const button = event.target.closest('button[id^="ai."]')
  if (!button) return

  event.preventDefault()

  const buttonId = button.id
  const key = buttonId.slice(3) // Remove "ai." prefix to get the key
  console.debug(`AI Enhancement button clicked: ${buttonId}, corresponding key: ${key}`)

  const inputElement = document.getElementById(key)
  if (!inputElement) {
    console.error(`No associated input/textarea found for key: ${key}`)
    return
  }

  const originalContent = inputElement.value
  console.debug(`Original content for key "${key}":`, originalContent)

  try {
    const response = await fetch('/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: originalContent, field: key })
    })

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`)
    }

    const data = await response.json()
    console.debug(`Enhanced content received for key "${key}":`, data.result)
    inputElement.value = data.result // Update the textarea with the enhanced content
  } catch (error) {
    console.error('Error during AI enhancement:', error)
    document.alert('Failed to enhance the content. Please try again later.')
  }
})
