import 'dotenv/config'

import * as schema from './schema'

import { logger } from '@repo/logger'
import { sql } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { reset, seed } from 'drizzle-seed'

const db = drizzle(process.env.DATABASE_URL!)
async function main() {
  logger.info('Resetting the database!')
  await reset(db, schema)

  // Reset the sequence for the incomeCategory table
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('"income_category"', 'id'), coalesce(max(id)+1, 1), false) FROM "income_category";`,
  )

  // First insert the fixed incomeCategory entries
  const incomeCategories = await db
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

  const incomeCategoryIds = incomeCategories.map(({ id }) => id)

  const nationalIds = [
    '1811921519',
    '1811931589',
    '1902961489',
    '1906621449',
    '1906651439',
    '1908811569',
    '1908821449',
    '1908821529',
    '1907611429',
    ...(process.env.TEST_NATIONAL_IDS?.split(',') ?? []),
  ]

  const lendersNames = [
    'Almenni',
    'Arion banki',
    'Birta',
    'Brú',
    'Festa',
    'Frjálsi',
    'Gildi',
    'HMS',
    'Íslandsbanki',
    'Landsbankinn',
    'Lífsverk',
    'LV',
    'LSR',
    'Söfnunarsjóður',
    'Stapi',
  ]

  // TODO: Add company national ids array later, using nationalIds for now
  const lendersNationalIds = nationalIds

  const loanNumbers: string[] = []
  for (let i = 0; i < 100; i++) {
    const randomNumber = Math.floor(Math.random() * 90000000000) + 10000000000 // Generate a random 11-digit number
    loanNumbers.push(randomNumber.toString()) // Convert to string and add to the array
  }

  // Then continue with the other seed data
  await seed(db, schema).refine((f) => ({
    user: {
      columns: {
        name: f.fullName(), // TODO: Use icelandic name (nice to have)
        nationalId: f.valuesFromArray({ values: nationalIds, isUnique: true }),
        address: f.streetAddress(), // TODO: Use icelandic address (nice to have)
        email: f.email(),
        phone: f.phoneNumber({ template: '5##-####' }),
      },
    },
    taxReturn: {
      columns: {
        userId: f.valuesFromArray({
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }),
        year: f.valuesFromArray({
          values: [2022, 2023, 2024, 1999, 2000, 2001, 2002, 2003, 2004, 2004],
        }),
      },
    },
    incomeCategory: { count: 0 }, // We already inserted the fixed entries
    income: {
      columns: {
        description: f.loremIpsum(), // TODO: Use icelandic companies names (nice to have)
        amount: f.int({ minValue: 6_000_000, maxValue: 15_000_000 }),
        incomeCategoryId: f.valuesFromArray({ values: incomeCategoryIds }),
      },
    },
    asset: {
      columns: {
        landNumber: f.phoneNumber({ template: '###-####' }),
        description: f.streetAddress(), // TODO: Use icelandic address (nice to have)
        amount: f.int({ minValue: 40_000_000, maxValue: 95_000_000 }),
        isForeign: f.valuesFromArray({ values: [false] }), // Only false for now, future expansion
      },
    },
    mortgage: {
      columns: {
        yearOfPurchase: f.year(),
        residentialLocation: f.streetAddress(), // TODO: Use icelandic address (nice to have)
        lenderName: f.valuesFromArray({ values: lendersNames }),
        lenderNationalId: f.valuesFromArray({ values: lendersNationalIds }),
        loanNumber: f.valuesFromArray({ values: loanNumbers }),
        loanDate: f.date({
          minDate: new Date(2010, 0, 1),
          maxDate: new Date(2023, 10, 20),
        }),
        loanTermInYears: f.int({ minValue: 1, maxValue: 30 }),
        totalPaymentsForTheYear: f.int({
          minValue: 1_000_000,
          maxValue: 10_000_000,
        }),
        installmentOfNominalValue: f.int({
          minValue: 500_000,
          maxValue: 3_000_000,
        }),
        interestExpenses: f.int({ minValue: 0, maxValue: 100_000 }),
        remainingDebt: f.int({ minValue: 0, maxValue: 5_000_000 }),
      },
    },
    otherDebt: {
      columns: {
        interestExpenses: f.int({ minValue: 0, maxValue: 100000 }),
        remainingDebt: f.int({ minValue: 0, maxValue: 5000000 }),
      },
    },
  }))

  // Reset the sequence for all new tables table
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('"income"', 'id'), coalesce(max(id)+1, 1), false) FROM "income";`,
  )
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('"asset"', 'id'), coalesce(max(id)+1, 1), false) FROM "asset";`,
  )
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('"mortgage"', 'id'), coalesce(max(id)+1, 1), false) FROM "mortgage";`,
  )
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('"other_debt"', 'id'), coalesce(max(id)+1, 1), false) FROM "other_debt";`,
  )

  logger.info('New data created!')
}
main()
