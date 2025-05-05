import { integer, pgEnum, pgTable, timestamp } from 'drizzle-orm/pg-core'

export const statusEnum = pgEnum('status', [
  'submitted',
  'in_progress',
  'completed',
])

export const taxReturn = pgTable('tax_return', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  year: integer().notNull(),
  status: statusEnum().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
})
