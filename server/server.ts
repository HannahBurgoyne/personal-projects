import * as Path from 'node:path'
import * as URL from 'node:url'
import express from 'express'
import routes from './routes/routes'
import dotenv from 'dotenv'
import { rateLimit } from 'express-rate-limit'
const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

// middleware which limits IP requests to 50 per 15min window (security against DDoS attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

const server = express()
server.use(express.json())
server.use(express.static(Path.join(__dirname, 'public')))

server.use('/api/v1/flashcardsapp', routes)

if (process.env.NODE_ENV === 'production') {
  dotenv.config()
  server.use(limiter)
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
