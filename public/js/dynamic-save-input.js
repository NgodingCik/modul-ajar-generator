const preInjectKey = ['alokasiWaktu', 'alokasiWaktu1', 'alokasiWaktu2']

// State vars
let isRestored = false

/**
 * Dynamic Save to LocalStorage System (Single JSON Key)
 * - Auto restore values from localStorage JSON on page load
 * - Auto save all input changes every 5 seconds as single JSON object
 * - Supports: text, number, textarea, select, checkbox, radio
 */
const initDynamicSaveInput = () => {
  const STORAGE_KEY = 'formData'

  // Get all form inputs with IDs
  const getFormInputs = () => {
    return document.querySelectorAll('input[id], textarea[id], select[id]')
  }

  /**
     * Restore all values from localStorage JSON
     */
  const restoreValuesFromStorage = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY) // eslint-disable-line no-undef
      if (!savedData) return

      const formData = JSON.parse(savedData)
      let inputs = getFormInputs()

      if (!inputs.length) {
        isRestored = true
        return
      }

      // Pre-inject value
      preInjectKey.forEach((key) => {
        if (key in formData) {
          const input = document.getElementById(key)
          if (!input) return

          const value = formData[key] || ''

          // Handle different input types
          if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = value === true || value === 'true'
            // Trigger change event to update dependent fields
            input.dispatchEvent(new Event('change', { bubbles: true }))
          } else {
            input.value = value !== null ? value : ''
            // Trigger input event for text fields
            input.dispatchEvent(new Event('input', { bubbles: true }))
          }
        }
      })

      setTimeout(() => {
        inputs = getFormInputs()
        console.debug(`Restoring form data for ${inputs.length} inputs...`)
        console.debug(inputs)

        if (!inputs.length) {
          isRestored = true
          return
        }

        inputs.forEach((input) => {
          // Skip if already pre-injected
          if (preInjectKey.includes(input.id)) return

          const key = input.id
          console.debug(`Restoring input with id: ${key}`)
          if (!key || !(key in formData)) return
          console.debug(`Found saved value for key "${key}":`, formData[key])

          const value = formData[key]
          console.debug(`Restoring value for key "${key}":`, value)

          // Handle different input types
          if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = value === true || value === 'true'
            // Trigger change event to update dependent fields
            input.dispatchEvent(new Event('change', { bubbles: true }))
          } else {
            input.value = value !== null ? value : ''
            console.debug(`Set value for input "${key}":`, input.value)
            // Trigger input event for text fields
            input.dispatchEvent(new Event('input', { bubbles: true }))
          }
        })

        // Update state
        isRestored = true
      }, 500)
    } catch (error) {
      console.warn('Failed to restore form data from localStorage:', error.message)
    }
  }

  /**
     * Save all input values to localStorage as single JSON object
     */
  const saveValuesToStorage = () => {
    if (!isRestored) return

    try {
      const inputs = getFormInputs()
      const formData = {}

      inputs.forEach((input) => {
        const key = input.id
        if (!key) return

        if (input.type === 'checkbox' || input.type === 'radio') {
          formData[key] = input.checked
        } else {
          formData[key] = input.value || ''
        }
      })

      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)) // eslint-disable-line no-undef
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error.message)
    }
  }

  /**
     * Clear all saved form data from localStorage
     */
  const clearStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY) // eslint-disable-line no-undef
    } catch (error) {
      console.warn('Failed to clear localStorage:', error.message)
    }
  }

  // Restore values on initialization
  restoreValuesFromStorage()

  // Auto-save every 5 seconds (5000 ms)
  const saveInterval = setInterval(saveValuesToStorage, 5000)

  // Expose methods globally for debugging/manual control
  window.dynamicSaveControl = {
    save: saveValuesToStorage,
    restore: restoreValuesFromStorage,
    clear: clearStorage,
    getStorageKey: () => STORAGE_KEY,
    getStorageData: () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') // eslint-disable-line no-undef
      } catch (error) {
        return {}
      }
    },
    stopAutoSave: () => clearInterval(saveInterval),
    startAutoSave: () => {
      window.dynamicSaveControl.stopAutoSave()
      const newInterval = setInterval(saveValuesToStorage, 5000)
      window.dynamicSaveControl.stopAutoSave = () => clearInterval(newInterval)
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDynamicSaveInput)
} else {
  initDynamicSaveInput()
}
