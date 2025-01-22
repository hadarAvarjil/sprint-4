import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { loggerService } from './services/logger.service.js'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()
const app = express()

app.use(cookieParser()) // for res.cookies
app.use(express.json()) // for req.body
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:3030',
      'http://localhost:3030',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

import { gigRoutes } from './api/gig/gig.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { authRoutes } from './api/auth/auth.routes.js'
import { reviewRoutes } from './api/review/review.routes.js'

app.use('/api/gig', gigRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/review', reviewRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public'))
})

const port = process.env.PORT || 3030

app.listen(port, () => {
    loggerService.info('Server is running on port: ' + port)
})