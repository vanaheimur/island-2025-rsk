import 'dotenv/config'

import * as schema from './schema'
import {
  getLicensePlates,
  getNationalIds,
  incomeDescriptions,
  otherDebtDescriptions,
} from './utilitiesAndData'

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
      { name: 'Íþróttastyrkur', order: 6 },
      { name: 'Starfsmennastyrkur', order: 7 },
      { name: 'Önnur hlunnindi, hvað', order: 8 },
    ])
    .returning()
    .execute()

  const incomeCategoryIds = incomeCategories.map(({ id }) => id)

  const nationalIds = getNationalIds()
  const licensePlates = getLicensePlates(100)

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
  const lendersNationalIds = nationalIds;

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
      count: 5,
      columns: {
        year: f.valuesFromArray({
          values: [2022, 2023, 2024, 1999, 2000, 2001, 2002, 2003, 2004, 2004],
        }),
      },
    },
    incomeCategory: { count: 0 }, // We already inserted the fixed entries
    income: {
      count: 20,
      columns: {
        description: f.valuesFromArray({ values: incomeDescriptions }),
        amount: f.int({ minValue: 6_000_000, maxValue: 15_000_000 }),
        incomeCategoryId: f.valuesFromArray({ values: incomeCategoryIds }),
      },
    },
    asset: {
      count: 20,
      columns: {
        landNumber: f.phoneNumber({ template: '6##-####' }),
        yearOfPurchase: f.int({ minValue: 1995, maxValue: 2025 }),
        amount: f.int({ minValue: 40_000_000, maxValue: 95_000_000 }),
      },
    },
    vehicle: {
      count: 20,
      columns: {
        licensePlate: f.valuesFromArray({ values: licensePlates }),
        yearOfPurchase: f.int({ minValue: 1995, maxValue: 2025 }),
        value: f.int({ minValue: 100_000, maxValue: 8_000_000 }),
      },
    },
    mortgage: {
      count: 20,
      columns: {
        yearOfPurchase: f.int({ minValue: 1995, maxValue: 2025 }),
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
      count: 30,
      columns: {
        description: f.valuesFromArray({ values: otherDebtDescriptions }),
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
    sql`SELECT setval(pg_get_serial_sequence('"vehicle"', 'id'), coalesce(max(id)+1, 1), false) FROM "vehicle";`,
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
