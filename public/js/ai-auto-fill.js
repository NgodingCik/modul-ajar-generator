/**
 * This module is main logic for AI auto fill feature.
 */

/** @var {string[]} - Array of keys for indexing */
const INDEX_KEYS = [
  'temaSubtema',
  'modelPembelajaran',
  'elemenCp',
  'dimensiProfilLulusan',
  'topikPembelajaran',
  'materiPembelajaran',
  'identifikasiPesertaDidik',
  'tujuanPembelajaran'
]

/** @var {string} - The prompt for AI auto fill */
let autoFillPrompt = 'Isi kolom berdasarkan informasi dibawah ini:\n\n'

const EMPTY_DPL_VALUE = 'DPL1 Keimanan dan Ketakwaan: false,DPL2 Kewargaan: false,DPL3 Penalaran Kritis: false,DPL4 Kreativitas: false,DPL5 Kolaborasi: false,DPL6 Kemandirian: false,DPL7 Kesehatan: false,DPL8 Komunikasi: false'

const isFieldFilled = (value) => {
  if (!value || value.trim() === '') return false
  return value !== EMPTY_DPL_VALUE
}

const parseKegiatanFieldId = (id) => {
  const match = id.match(/^kegiatanHari(\d+)Jp(\d+)$/)
  if (!match) return null

  return {
    day: Number.parseInt(match[1], 10),
    jp: Number.parseInt(match[2], 10)
  }
}

const getKegiatanInputIdsInOrder = () => {
  return Array.from(document.querySelectorAll('input[id^="kegiatanHari"][id*="Jp"]'))
    .map((el) => {
      const parsed = parseKegiatanFieldId(el.id)
      if (!parsed) return null

      return {
        id: el.id,
        day: parsed.day,
        jp: parsed.jp
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day
      return a.jp - b.jp
    })
    .map((item) => item.id)
}

const getFieldWrapper = (id) => {
  const wrapperById = document.getElementById(`${id}Wrapper`)
  if (wrapperById) return wrapperById

  const fieldEl = document.getElementById(id)
  if (!fieldEl) return null

  return fieldEl.closest('.relative') || fieldEl.parentElement
}

const getFieldLabel = (id) => {
  const label = document.querySelector(`label[for="${id}"]`)
  if (label) return label.textContent.trim()

  const parsedKegiatan = parseKegiatanFieldId(id)
  if (!parsedKegiatan) return id

  return `Kegiatan hari ${parsedKegiatan.day} JP ${parsedKegiatan.jp}`
}

/**
 * Get values of elements by keys and return as an object.
 * @param  {...any} keys - Array of keys corresponding to element IDs
 * @returns {Object|null} - Object with key-value pairs of element values or null if any element is not found
 */
const getElementsValues = (...keys) => {
  const res = {}
  const els = keys.map((key) => document.getElementById(key))

  if (els.some(el => !el)) {
    console.error('One or more elements not found for keys:', keys)
    return null
  }

  els.forEach((el, index) => {
    if (keys[index] === 'dimensiProfilLulusan') {
      res[keys[index]] = el.value === 'DPL1 Keimanan dan Ketakwaan: false,DPL2 Kewargaan: false,DPL3 Penalaran Kritis: false,DPL4 Kreativitas: false,DPL5 Kolaborasi: false,DPL6 Kemandirian: false,DPL7 Kesehatan: false,DPL8 Komunikasi: false' ? '' : el.value
    } else {
      res[keys[index]] = el.value
    }
  })

  return res
}

document.addEventListener('click', async (e) => {
  // Handle AI buttons with either id format: "ai.<fieldId>" or "<fieldId>Ai"
  const target = e.target.closest('button[id^="ai."], button[id$="Ai"]')
  if (!target || !target.id) return

  let fieldId = ''
  if (target.id.startsWith('ai.')) {
    fieldId = target.id.slice(3)
  } else if (target.id.endsWith('Ai')) {
    fieldId = target.id.slice(0, -2)
  }

  if (!fieldId) {
    console.error('Failed to resolve field id from AI button id:', target.id)
    return
  }

  const prompt = target.dataset.aiPrompt
  if (!prompt) {
    console.error('AI prompt not found in button dataset for button:', target)
    return
  }

  console.debug('Clicked button:', target)
  console.debug('Id element:', target?.id)

  const inputEl = document.getElementById(fieldId)
  if (!inputEl) {
    console.error('Input element not found for id:', fieldId)
    return
  }

  console.debug('Input element found:', inputEl)

  // If empty, user want an idea of what to fill, so we check if prerequisites are filled
  if (!inputEl.value || inputEl.value.trim() === '') {
    const indexVals = getElementsValues(...INDEX_KEYS)
    if (!indexVals) {
      console.error('Failed to read index values for auto fill prompt.')
      return
    }

    const currentIndex = INDEX_KEYS.indexOf(fieldId)
    const isIndexedField = currentIndex > -1
    const kegiatanIds = getKegiatanInputIdsInOrder()
    const currentKegiatanIndex = kegiatanIds.indexOf(fieldId)
    const isKegiatanField = currentKegiatanIndex > -1

    let previousKeys = []
    if (isIndexedField) {
      previousKeys = INDEX_KEYS.slice(0, currentIndex)
    } else if (isKegiatanField) {
      previousKeys = [...INDEX_KEYS, ...kegiatanIds.slice(0, currentKegiatanIndex)]
    }

    const listUnfilled = previousKeys.filter((key) => {
      const value = document.getElementById(key)?.value ?? indexVals[key] ?? ''
      return !isFieldFilled(value)
    })
    let isPrerequisiteFilled = true
    let focusedAreaId = null

    const generateLinks = (keys) => {
      if (keys.length === 0) return '<p class="text-green-500">Semua form sebelumnya sudah terisi. Silakan klik tombol lagi untuk mendapatkan ide.</p>'

      return `
        <p class="mb-2">Form sebelumnya yang belum terisi:</p>
        <ul class="list-disc list-inside text-left">
          ${keys.map(key => {
            const labelText = getFieldLabel(key)
            return `<li><a href="#${key}" class="text-blue-500 underline">${labelText}</a></li>`
          }).join('')}
        </ul>
      `
    }

    previousKeys.forEach((key) => {
      const value = document.getElementById(key)?.value ?? indexVals[key] ?? ''
      if (!isFieldFilled(value)) {
        isPrerequisiteFilled = false
        console.warn(`Prerequisite field "${key}" is not filled.`)
      }
    })

    console.debug('Current index value:', currentIndex)
    console.debug('Index values:', indexVals)
    console.debug('Previous keys:', previousKeys)
    console.debug('Is prerequisite filled:', isPrerequisiteFilled)
    console.debug('List of unfilled prerequisites:', listUnfilled)

    if ((isIndexedField || isKegiatanField) && !isPrerequisiteFilled) {
      Swal.fire({ // eslint-disable-line no-undef
        title: "<span class='text-red-500'>Lengkapi form sebelumnya untuk memberi AI sebuah gambaran</span>",
        html: generateLinks(listUnfilled),
        position: 'bottom-end',
        backdrop: false,
        showConfirmButton: false,
        heightAuto: false,
        scrollbarPadding: false,
        focusConfirm: false,
        returnFocus: false
      })

      if (listUnfilled.length > 0) {
        focusedAreaId = listUnfilled[0]
        const initialFocusedWrapper = getFieldWrapper(focusedAreaId)
        if (initialFocusedWrapper) {
          initialFocusedWrapper.classList.add('focused-area')
          console.debug(`Initially focusing on first unfilled field: ${focusedAreaId}, wrapper:`, initialFocusedWrapper)
          initialFocusedWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }

      // Add click event listeners to the generated links
      document.querySelectorAll('.swal2-container a').forEach((link, index) => {
        link.addEventListener('click', (event) => {
          event.preventDefault()
          const targetId = link.getAttribute('href').substring(1)
          const targetElement = document.getElementById(targetId)
          const fieldWrapper = getFieldWrapper(targetId)

          if (targetElement && fieldWrapper) {
            if (focusedAreaId) {
              const previousFocusedWrapper = getFieldWrapper(focusedAreaId)
              if (previousFocusedWrapper) {
                previousFocusedWrapper.classList.remove('focused-area')
              }
            }
            focusedAreaId = targetId
            console.debug(`Focusing on clicked unfilled field: ${targetId}, wrapper:`, fieldWrapper)
            fieldWrapper.classList.add('focused-area')

            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            targetElement.focus()
          }
        })
      })

      // Remove focus highlight and move to next field when the empty field is filled with 10 sec delay to give user time to read the alert and find the field
      const checkInterval = setInterval(() => {
        if (!focusedAreaId) {
          clearInterval(checkInterval)
          return
        }

        const currentValue = document.getElementById(focusedAreaId)?.value
        const currentWrapper = getFieldWrapper(focusedAreaId)

        if (isFieldFilled(currentValue)) {
          if (listUnfilled.indexOf(focusedAreaId) === listUnfilled.length - 1) {
            focusedAreaId = null
            Swal.close() // eslint-disable-line no-undef
            currentWrapper?.classList.remove('focused-area')
          }
          const swalUrl = document.querySelector('.swal2-container a[href="#' + focusedAreaId + '"]')
          if (swalUrl) {
            swalUrl.remove()
          }
        }

        if (focusedAreaId === null) {
          clearInterval(checkInterval)
        }
      }, 2000)

      return
    }

    try {
      Object.keys(indexVals).forEach(key => {
        if (isFieldFilled(indexVals[key])) {
          autoFillPrompt += `${key}: ${indexVals[key]}\n`
        }
      })

      autoFillPrompt += `\nBerdasarkan informasi diatas, isi kolom "${fieldId}". Jangan berikan penjelasan, cukup isi kolom tersebut, jangan menjawah seperti "Tema dan subtema disusun berdasarkan elemen Capaian Pembelajaran (CP) meliputi Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni." tapi misalnya seperti ini "Diriku/Tubuhku" seperti contoh yang sudah ada sebelumnya`

      autoFillPrompt += '\nPilih salahsatu jawaban, jangan seperti ini "Diriku/Tubuhku, Keluargaku/Anggota Keluargaku, Lingkunganku/Rumahku, Binatang/Binatang di Darat, Tanaman/Tanaman Buah, Kendaraan/Kendaraan di Darat, Alam Semesta/Benda-benda Langit, Negaraku/Tanah Air"'

      const response = await fetch('/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: autoFillPrompt,
          field: fieldId
        })
      })

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`)
      }

      const data = await response.json()

      // Update the input element with the AI-generated recommendation
      inputEl.value = data.result
    } catch (error) {
      console.error('Error fetching AI recommendation:', error)
    }
  }

  // Otherwise, user want to regenerate the content, so we just trigger the input event to regenerate
  const response = await fetch('/api/recommendation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: prompt + '\n' + inputEl.value,
      field: fieldId
    })
  })

  if (!response.ok) {
    console.error(`Server responded with status ${response.status} for regeneration request`)
    return
  }

  const data = await response.json()
  inputEl.value = data.result
})
