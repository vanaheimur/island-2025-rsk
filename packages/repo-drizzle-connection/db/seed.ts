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
    potatoes: {
      columns: {
        age: f.int({ minValue: 1, maxValue: 99 }),
        color: f.valuesFromArray({ values: ['red', 'yellow', 'purple'] }),
      },
    },
  }))

  logger.info('New potatoes created!')
}
main()
