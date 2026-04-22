import helmet from 'helmet'

const isDevelopment = process.env.NODE_ENV !== 'production'

const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      // Disable upgrade-insecure-requests in development.
      'upgrade-insecure-requests': isDevelopment ? null : [],
      // Allow framing from any origin.
      'frame-ancestors': ['*']
    }
  },
  frameguard: false,
  referrerPolicy: false,
  xPoweredBy: false
})

export default helmetMiddleware
