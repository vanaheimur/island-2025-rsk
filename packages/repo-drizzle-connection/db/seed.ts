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
    // incomeCategory: {
    //   columns: {
    //     name: f.string(),
    //     // order to start from 1 and increment by 1 for each category
    //     order: f.int({ minValue: 1, maxValue: 10 }).
    //   },
    // },
    // user: {
    //   columns: {
    //     name: f.fullName(),
    //     kennitala: f.valuesFromArray({
    //       values: [
    //         '1811921519',
    //         '1811931589',
    //         '1902961489',
    //         '1906621449',
    //         '1906651439',
    //         '1908811569',
    //         '1908821449',
    //         '1908821529',
    //         '1907611429',
    //         '1907561499',
    //         '1907801559',
    //         '1907941569',
    //       ],
    //     }),
    //     address: f.streetAddress(),
    //     email: f.email(),
    //     phone: f.phoneNumber(),
    //   },
    // },
    taxReturn: {
      columns: {
        year: f.year(),
      },
    },
  }))

  logger.info('New data created!')
}
main()
