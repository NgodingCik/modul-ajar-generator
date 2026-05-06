/**
 * This module handles the loading indicator functionality, providing visual feedback during asynchronous operations.
 * Currently, it offers a dummy implementation that can be expanded in the future to include actual loading animations or progress bars.
 */

// Template element
const templateLoadingIndicatorWrapper = document.getElementById('loadingGenerateWrapper')

// Dummy loading message
const loadingMessage = [
  {
    message: 'Menganalisis kurikulum dan tujuan pembelajaran...',
    class: 'text-gray-500',
    delay: 10000 // 10s
  },
  {
    message: 'Mengidentifikasi kebutuhan dan karakteristik siswa...',
    class: 'text-gray-500',
    delay: 10000 // 10s
  },
  {
    message: 'Merancang strategi pembelajaran aktif...',
    class: 'text-blue-500',
    delay: 15000 // 15s
  },
  {
    message: 'Menyusun materi inti dan referensi konten...',
    class: 'text-blue-500',
    delay: 20000 // 20s
  },
  {
    message: 'Menyiapkan asesmen formatif dan sumatif...',
    class: 'text-indigo-500',
    delay: 15000 // 15s
  },
  {
    message: 'Mengintegrasikan profil pelajar Pancasila...',
    class: 'text-indigo-500',
    delay: 15000 // 15s
  },
  {
    message: 'Membangun struktur dokumen dan media pendukung...',
    class: 'text-cyan-600',
    delay: 15000 // 15s
  },
  {
    message: 'Melakukan validasi AI terhadap standar modul ajar...',
    class: 'text-amber-600',
    delay: 10000 // 10s
  },
  {
    message: 'Finalisasi format dokumen (DOCX/PDF)...',
    class: 'text-emerald-600',
    delay: 10000 // 10s
  },
  {
    message: 'Mengirim dokumen, mohon bersabar!',
    class: 'text-green-600',
    delay: 2000 // 2s
  }
]

/**
 * Helper function to check if the loading indicator wrapper element exists in the DOM.
 * If the element is not found, it logs a warning and returns false. Otherwise, it returns true.
 * @returns {boolean} - True if the loading indicator wrapper exists, false otherwise.
 */
const isTemplateLoadingIndicatorWrapperExist = () => {
  if (!templateLoadingIndicatorWrapper) {
    console.warn('Loading indicator wrapper element not found!')
    return false
  }
  return true
}

/**
 * Initializes the loading indicator.
 * @param {Function} callback - The callback function to be executed when the loading message changes.
 * @returns {Object} - The loading indicator instance.
 */
function loadingIndicatorInit (callback) { // eslint-disable-line no-unused-vars
  let isShowing = false // eslint-disable-line no-unused-vars
  let isStarted = false
  let isStoped = false

  if (!isTemplateLoadingIndicatorWrapperExist()) {
    return false
  }

  return {
    /**
     * Displays the loading indicator by returning the template element. It also sets the isShowing flag to true to indicate that the loading indicator is currently being displayed.
     * @returns {HTMLElement} - The loading indicator wrapper element to be displayed in the UI.
     */
    show () {
      isShowing = true
      return templateLoadingIndicatorWrapper
    },

    /**
     * Changes the loading message displayed by the indicator.
     * @param {{ message: string, class: string, delay: number }} messageObj - The object containing the new loading message and its properties.
     * @returns {boolean} - True if the message was changed successfully, false otherwise.
     */
    changeLoadingMessage (messageObj) {
      if (!isShowing) {
        console.warn('Loading indicator is not currently showing. Please call show() before changing the loading message.')
        return false
      }

      isStarted = true
      const templateLoadingIndicatorMessage = document.getElementById('loading-generate-text')

      if (!templateLoadingIndicatorMessage) {
        console.warn('Loading indicator message element not found!')
        return false
      }

      templateLoadingIndicatorMessage.textContent = messageObj.message
      templateLoadingIndicatorMessage.className = messageObj.class

      setTimeout(() => {
        templateLoadingIndicatorMessage.textContent = ''
        templateLoadingIndicatorMessage.className = ''

        if (typeof callback === 'function') {
          callback()
        }
      }, messageObj.delay)

      return true
    },

    /**
     * Starts the loading animation. It iterates through the predefined loading messages and updates the displayed message at specified intervals. If the loading indicator is stopped during the animation, it will cease updating the messages.
     * @returns {boolean} - True if the animation was started successfully, false otherwise.
     */
    startAnimation () {
      if (!isShowing) {
        console.warn('Loading indicator is not currently showing. Please call show() before starting the animation.')
        return false
      }

      const templateLoadingIndicatorMessage = document.getElementById('loading-generate-text')

      if (!templateLoadingIndicatorMessage) {
        console.warn('Loading indicator message element not found!')
        return false
      }

      let actualDelay = 0

      loadingMessage.forEach(({ message, class: messageClass, delay }, index) => {
        setTimeout(() => {
          if (isStoped) return

          templateLoadingIndicatorMessage.textContent =
              message + ` (${index + 1}/${loadingMessage.length})`
          templateLoadingIndicatorMessage.className = messageClass
        }, actualDelay)
        actualDelay += delay
      })

      return true
    },

    /**
     * Stops the loading animation by setting the isStoped flag to true. This will prevent any further updates to the loading message if the animation is currently running.
     * @returns {boolean} - True if the animation was stopped successfully, false otherwise.
     */
    stopAnimation () {
      if (!isStarted) {
        console.warn('Loading animation has not been started yet!')
        return false
      }

      isStoped = true
      return true
    }
  }
}
