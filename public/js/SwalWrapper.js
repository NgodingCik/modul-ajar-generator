/**
 * Wrapper for SweetAlert2 specifically for form completion validation.
 * Handles showing the toast, monitoring field completion, and auto-focusing elements.
 */
const SwalValidationWrapper = { // eslint-disable-line no-unused-vars
  activeInterval: null,
  focusedAreaId: null,
  autoNextFocusEnabled: false,

  isAvailable: function () {
    return typeof Swal !== 'undefined' // eslint-disable-line no-undef
  },

  fire: function (...args) {
    if (!this.isAvailable()) {
      return Promise.resolve({ isDismissed: true, dismiss: 'swal-unavailable' })
    }

    return Swal.fire(...args) // eslint-disable-line no-undef
  },

  isVisible: function () {
    return this.isAvailable() && Swal.isVisible() // eslint-disable-line no-undef
  },

  closeSwal: function () {
    if (this.isVisible()) {
      Swal.close() // eslint-disable-line no-undef
    }
  },

  showValidationMessage: function (message) {
    if (this.isAvailable()) {
      Swal.showValidationMessage(message) // eslint-disable-line no-undef
    }
  },

  autoNextFocus: function (enabled = true) {
    this.autoNextFocusEnabled = enabled
    return this
  },

  getFieldWrapper: (id) => {
    const wrapperById = document.getElementById(`${id}Wrapper`)
    if (wrapperById) return wrapperById

    const fieldEl = document.getElementById(id)
    if (!fieldEl) return null

    return fieldEl.closest('.relative') || fieldEl.parentElement
  },

  /**
   * Shows a persistent toast to prompt user to fill specific fields.
   *
   * @param {Object} config
   * @param {string} config.title - Swal title HTML
   * @param {string} config.html - Swal body HTML
   * @param {string[]} config.unfilledFields - Array of field IDs that are currently unfilled
   * @param {Function} config.isFieldFilled - Function(fieldId) => boolean returning true if a field is considered filled
   * @param {Function} config.getLinkElement - Function(fieldId) => HTMLElement returning the anchor tag inside the Swal
   * @param {Function} [config.onAllFilled] - Callback to run when all monitored fields are filled
   * @param {number} [config.checkDelay=1000] - Delay for the monitoring interval
   */
  showValidationToast: function ({ title, html, unfilledFields, isFieldFilled, getLinkElement, onAllFilled, checkDelay = 1000 }) {
    this.close()

    this.fire({
      title,
      html,
      position: 'bottom-end',
      backdrop: false,
      showConfirmButton: false,
      heightAuto: false,
      scrollbarPadding: false,
      focusConfirm: false,
      returnFocus: false
    })

    let currentUnfilled = [...unfilledFields]
    this.focusedAreaId = null

    // Register click handlers. Using timeout ensures the Swal DOM is ready.
    setTimeout(() => {
      currentUnfilled.forEach((fieldId, index) => {
        const link = getLinkElement(fieldId)
        if (link) {
          link.addEventListener('click', (event) => {
            event.preventDefault()
            this.focusField(fieldId)
          })
        }
      })

      // Automatically focus first field
      if (currentUnfilled.length > 0) {
        this.focusField(currentUnfilled[0])
      }
    }, 300)

    // Set up monitoring interval
    this.activeInterval = setInterval(() => {
      currentUnfilled.forEach((fieldId) => {
        if (isFieldFilled(fieldId)) {
          currentUnfilled = currentUnfilled.filter(id => id !== fieldId)

          const link = getLinkElement(fieldId)
          if (link) link.remove()

          setTimeout(() => {
            const wrapper = this.getFieldWrapper(fieldId)
            if (wrapper) wrapper.classList.remove('focused-area')
          }, 1000)

          // Auto-advance to the next field if the one we just filled was focused
          if (this.autoNextFocusEnabled && this.focusedAreaId === fieldId && currentUnfilled.length > 0) {
            this.focusField(currentUnfilled[0])
          }
        }
      })

      if (currentUnfilled.length === 0) {
        this.close()
        if (onAllFilled) onAllFilled()
      }
    }, checkDelay)
  },

  focusField: function (fieldId) {
    if (this.focusedAreaId) {
      const prevWrapper = this.getFieldWrapper(this.focusedAreaId)
      if (prevWrapper) prevWrapper.classList.remove('focused-area')
    }

    this.focusedAreaId = fieldId
    const newWrapper = this.getFieldWrapper(fieldId)
    if (newWrapper) {
      newWrapper.classList.add('focused-area')
      newWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const targetElement = document.getElementById(fieldId)
    if (targetElement) {
      targetElement.focus()
    }
  },

  close: function () {
    if (this.activeInterval) {
      clearInterval(this.activeInterval)
      this.activeInterval = null
    }

    if (this.focusedAreaId) {
      const wrapper = this.getFieldWrapper(this.focusedAreaId)
      if (wrapper) wrapper.classList.remove('focused-area')
      this.focusedAreaId = null
    }

    this.closeSwal()
  }
}
