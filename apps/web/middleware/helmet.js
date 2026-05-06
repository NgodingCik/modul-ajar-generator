import helmet from 'helmet'

const CORS_TRUSTED_HOSTS = process.env.CORS_TRUSTED_HOSTS ? process.env.CORS_TRUSTED_HOSTS.split(',').map(host => host.trim()) : []
const CORS_TRUSTED_CDN_HOSTS = process.env.CORS_TRUSTED_CDN_HOSTS
  ? process.env.CORS_TRUSTED_CDN_HOSTS.split(',').map(host => host.trim())
  : []
const APP_API_BASE_URL = process.env.APP_API_BASE_URL || null
const isDevelopment = process.env.NODE_ENV !== 'production'

/**
 * Helper function to remove path from a URL, leaving only the origin (scheme + host + port).
 * @param {string} url
 * @returns {string}
 */
const removePathFromUrl = (url) => {
  try {
    const parsedUrl = new URL(url)
    parsedUrl.pathname = ''
    return parsedUrl.toString().replace(/\/+$/, '') // Remove trailing slash if any
  } catch (error) {
    console.warn(`Invalid URL provided: ${url}`)
    return url
  }
}

const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),

      'upgrade-insecure-requests': isDevelopment ? null : [],
      'frame-ancestors': ["'self'", ...CORS_TRUSTED_HOSTS],
      'frame-src': ["'self'", 'https://newassets.hcaptcha.com', 'https://js.hcaptcha.com', ...CORS_TRUSTED_HOSTS],
      'script-src': ["'self'", "'unsafe-inline'", 'https://static.cloudflareinsights.com', 'https://js.hcaptcha.com', 'https://newassets.hcaptcha.com', ...CORS_TRUSTED_CDN_HOSTS],
      'style-src': ["'self'", "'unsafe-inline'", 'https://newassets.hcaptcha.com', ...CORS_TRUSTED_CDN_HOSTS],
      'img-src': ["'self'", 'data:', 'https://contrib.rocks', ...CORS_TRUSTED_CDN_HOSTS],
      'font-src': ["'self'", ...CORS_TRUSTED_CDN_HOSTS],
      'connect-src': ["'self'", 'https://hcaptcha.com', 'https://*.hcaptcha.com', ...(APP_API_BASE_URL ? [removePathFromUrl(APP_API_BASE_URL)] : [])]
    }
  },
  frameguard: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xPoweredBy: false
})

export default helmetMiddleware
