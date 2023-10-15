import config from './knexfile.js'
import knex from 'knex'

type Environment = 'production' | 'staging' | 'development'
const environment = (process.env.NODE_ENV as Environment) || 'development'
const connection = knex(config[environment])

export default connection

