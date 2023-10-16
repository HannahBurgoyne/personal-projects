import * as Path from 'node:path'
import * as URL from 'node:url'

import server from './server'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
