import fs from 'fs'
import path from 'path'
import vm from 'vm'
import consola from 'consola'

const __dirname = import.meta.dirname
const __filename = import.meta.filename

/**
 * @typedef {(err: Error | null, result?: any) => void} VMCallback
 * @typedef {Record<string, any>} ContextObject
 */

/**
 * Runs JavaScript code safely inside a sandboxed VM context.
 *
 * @example
 *   const runner = new VMRunner(
 *     'return 1 + 1',
 *     {},
 *     (err, result) => {
 *       if (err) return console.error(err)
 *       console.log(result) // 2
 *     }
 *   )
 *   runner.run()
 */
class VMRunner {
  /** @type {string | null} */
  code = null
  /** @type {ContextObject | null} */
  shared = null
  /** @type {VMCallback | null} */
  callback = null
  /** @type {ContextObject | null} */
  context = null

  /**
   * Creates a new VMRunner instance.
   *
   * @param {string} code - The JavaScript code to run (async function body style)
   * @param {ContextObject} [shared={}] - Variables/functions to inject into the VM
   * @param {VMCallback | null} [callback=null] - Error-first callback for results
   */
  constructor (code, shared = {}, callback = null) {
    consola.debug('[VMRunner] Constructor called', {
      code: code?.substring(0, 100),
      sharedKeys: Object.keys(shared ?? {})
    })

    this.code = code
    this.shared = shared
    this.callback = callback

    this.context = {
      __dirname,
      __filename,
      consola,
      fs,
      path,
      console,
      setTimeout,
      setInterval,
      clearTimeout,
      clearInterval,
      crypto: typeof crypto !== 'undefined' ? crypto : null,
      Error
    }

    consola.debug('[VMRunner] Context initialized with keys:', Object.keys(this.context ?? {}))
  }

  /**
   * Runs the code inside the VM and calls the callback with the result.
   */
  run () {
    consola.debug('[VMRunner] run() called')

    try {
      // Merge shared variables into the context
      const fullContext = {
        ...(this.context ?? {}),
        ...(this.shared ?? {})
      }
      consola.debug('[VMRunner] Merged context keys:', Object.keys(fullContext))

      // Create and freeze the VM context
      const vmContext = vm.createContext(fullContext)
      consola.debug('[VMRunner] VM context created')

      // Wrap the code to capture the return value or last expression
      const wrappedCode = `
        (async () => {
          ${this.code ?? ''}
        })()
      `
      consola.debug('[VMRunner] Wrapped code:', wrappedCode.trim())

      // Compile and run the script
      const script = new vm.Script(wrappedCode)
      consola.debug('[VMRunner] Script compiled')

      const result = script.runInContext(vmContext)
      consola.debug('[VMRunner] Script executed, result type:', typeof result)

      // Handle async execution
      Promise.resolve(result)
        .then((value) => {
          consola.debug('[VMRunner] Async execution resolved', { value })
          if (typeof this.callback === 'function') {
            consola.debug('[VMRunner] Calling callback with success')
            this.callback(null, value)
          }
        })
        .catch((/** @type {Error | unknown} */ err) => {
          if (err instanceof Error) {
            consola.debug('[VMRunner] Async execution promise rejected', { error: err?.message })
            consola.error('[VMRunner] Async execution error:', err)
            if (typeof this.callback === 'function') {
              this.callback(err, null)
            }
          } else {
            consola.debug('[VMRunner] Async execution rejected with non-Error', { error: String(err) })
          }
        })
    } catch (/** @type {Error | unknown} */ err) {
      if (err instanceof Error) {
        consola.debug('[VMRunner] Synchronous execution error caught', { error: err?.message })
        consola.error('[VMRunner] Execution error:', err)
        if (typeof this.callback === 'function') {
          this.callback(err, null)
        }
      } else {
        consola.debug('[VMRunner] Synchronous execution rejected with non-Error', { error: String(err) })
      }
    }
  }

  /**
   * Adds extra variables into the VM context before running.
   *
   * @param {...ContextObject} contexts - Objects to merge into the VM context
   */
  addContext (...contexts) {
    consola.debug('[VMRunner] addContext() called with',
      contexts.map(c => Object.keys(c ?? {})))

    // Initialize context if null, then merge
    this.context = this.context ?? {}
    Object.assign(this.context, ...contexts)

    consola.debug('[VMRunner] Context updated, now has keys:',
      Object.keys(this.context ?? {}))
  }
}

export default VMRunner
