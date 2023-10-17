import * as Path from 'node:path'
import * as URL from 'node:url'
import dotenv from 'dotenv'
import knex from 'knex'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

dotenv.config({ path: Path.join(__dirname, '../../.env') })

const connection = {
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    directory: Path.join(__dirname, 'migrations'),
  },
  seeds: {
    directory: Path.join(__dirname, 'seeds'),
  },
}

const db = knex(connection)

async function reset() {
  try {
    // await db.raw('DROP TABLE IF EXISTS knex_migrations;')
    // await db.raw('DROP TABLE IF EXISTS knex_migrations_lock;')
    // await db.raw('DROP TABLE IF EXISTS sqlite_sequence;')
    await db.migrate.latest()
    await db.seed.run()
  } catch (err) {
    if (err instanceof Error) {
      console.error(err)
    }
  } finally {
    db.destroy()
  }
  console.log('reset is done')
}

reset()
