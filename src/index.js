import { configDotenv } from 'dotenv'

import path from 'node:path'
import Express from 'express'
import ejs from 'ejs' // eslint-disable-line no-unused-vars

import { loadRoutes } from './routes/index.js'
configDotenv();

(async () => {
  const app = Express()

  // Set EJS as the template engine
  app.set('view engine', 'ejs')

  // Explicitly set the views directory
  const dirname = import.meta.dirname
  app.set('views', path.join(dirname, 'views'))

  app.use(Express.urlencoded({ extended: true }))
  app.use(Express.json())

  // Load and register routes
  const router = await loadRoutes()
  app.use(router)

  // Serving static files
  app.use(Express.static('public'))
  app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on http://localhost:3000')
  })
})()
