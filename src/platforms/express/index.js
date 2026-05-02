import { configDotenv } from 'dotenv'

import path from 'path'
import Express from 'express'
import ejs from 'ejs' // eslint-disable-line no-unused-vars

import { loadRoutes } from './routes/index.js'

import limiter from './middleware/ratelimit.js'
import cors from './middleware/cors.js'
import helmetMiddleware from './middleware/helmet.js'
import stripConsoleMiddleware from './middleware/stripconsole.js'
configDotenv({ override: true })

const APP_HOST = process.env.APP_HOST || 'localhost'
const APP_PORT = process.env.APP_PORT || 3000

const app = Express()
app.disable('x-powered-by')
app.set('trust proxy', 1)

// Set EJS as the template engine
app.set('view engine', 'ejs')

// Explicitly set the views directory
const dirname = import.meta.dirname
app.set('views', path.join(dirname, '../../views'))

app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())

// Register middlewares
app.use(limiter)
app.use(helmetMiddleware)
app.use(cors)
app.use(stripConsoleMiddleware)

// Load and register routes
const router = await loadRoutes()
app.use(router)

// Serving static files
app.use(Express.static('public'))
app.use(Express.static('node_modules/sweetalert2/dist'))

// Start the server
app.listen(APP_PORT, APP_HOST, () => {
  console.log(`Server is running at http://${APP_HOST}:${APP_PORT}`)
})

export default app
