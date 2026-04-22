import { configDotenv } from 'dotenv'

import path from 'node:path'
import Express from 'express'
import ejs from 'ejs' // eslint-disable-line no-unused-vars
import { loadRoutes } from './routes/index.js'
import limiter from './middleware/ratelimit.js'
import cors from './middleware/cors.js'
import helmetMiddleware from './middleware/helmet.js'
configDotenv({ override: true })

const app = Express()
app.disable('x-powered-by')
app.set('trust proxy', 1)

// Set EJS as the template engine
app.set('view engine', 'ejs')

// Explicitly set the views directory
const dirname = import.meta.dirname
app.set('views', path.join(dirname, 'views'))

app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())

// Register middlewares
app.use(limiter)
app.use(helmetMiddleware)
app.use(cors)

// Load and register routes
const router = await loadRoutes()
app.use(router)

// Serving static files
app.use(Express.static('public'))

export default app
