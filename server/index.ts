import * as Path from 'node:path'
import * as URL from 'node:url'
import dotenv from 'dotenv'

import server from './server'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)
dotenv.config({ path: Path.join(__dirname, '../.env') })

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
