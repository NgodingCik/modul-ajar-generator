const APP_ORIGIN_URL = process.env.APP_ORIGIN_URL || 'http://localhost:3000'

if (!APP_ORIGIN_URL) {
  throw new Error('APP_ORIGIN_URL environment variable is required')
}

const isOriginAllowed = (origin, req) => {
  if (!origin) {
    return process.env.NODE_ENV !== 'production'
  }

  if (!origin) return false

  try {
    const requestHost = new URL(req.query.url).host
    const requestOrigin = new URL(origin).origin
    const allowedOrigin = new URL(APP_ORIGIN_URL).origin

    if (requestHost && requestHost !== APP_ORIGIN_URL) {
      return false
    }

    return requestOrigin === allowedOrigin
  } catch {
    return false
  }
}

const cors = (req, res, next) => {
  const origin = req.headers.origin || ''

  res.header('Vary', 'Origin')

  if (isOriginAllowed(origin, req)) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  if (req.url.startsWith('/api/')) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  } else {
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Max-Age', '86400')
    return res.sendStatus(204)
  }

  if (!isOriginAllowed(origin, req)) {
    console.warn(`CORS blocked - origin not allowed: ${origin}`)
    return res.status(403).json({ status: false, message: '403 Forbidden', error: null })
  }

  next()
}

export default cors
