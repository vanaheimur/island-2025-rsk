import 'dotenv/config'

import * as schema from './schema'

import { logger } from '@repo/logger'
import { drizzle } from 'drizzle-orm/node-postgres'
import { reset, seed } from 'drizzle-seed'

const db = drizzle(process.env.DATABASE_URL!)
async function main() {
  logger.info('Resetting the database!')
  await reset(db, schema)

  // First insert the fixed incomeCategory entries
  const incomeCategoryPresets = await db
    .insert(schema.incomeCategory)
    .values([
      { name: 'Launatekjur og starfstengdar greiðslur', order: 1 },
      { name: 'Ökutækjastyrkur', order: 2 },
      { name: 'Dagpeningar', order: 3 },
      { name: 'Bifreiðahlunnindi', order: 4 },
      { name: 'Húsnæðishlunnindi', order: 5 },
      { name: 'Önnur hlunnindi, hvað', order: 6 },
    ])
    .returning()
    .execute()

  // Then continue with the other seed data
  await seed(db, schema).refine((f) => ({
    income: {
      columns: {
        incomeCategoryId: f.valuesFromArray({
          values: incomeCategoryPresets.map((preset) => preset.id),
        }),
      },
    },
    taxReturn: {
      columns: {
        year: f.year(),
      },
    },
  }))

  logger.info('New data created!')
}
main()
