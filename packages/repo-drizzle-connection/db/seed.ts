import 'dotenv/config'

import * as schema from './schema'

import { logger } from '@repo/logger'
import { drizzle } from 'drizzle-orm/node-postgres'
import { reset, seed } from 'drizzle-seed'

const db = drizzle(process.env.DATABASE_URL!)
async function main() {
  logger.info('Resetting the database!')
  await reset(db, schema)

  await seed(db, schema).refine((f) => ({
    taxReturn: {
      columns: {
        year: f.year(),
      },
    },
  }))

  logger.info('New data created!')
}
main()
