import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const potatoes = pgTable('potatoes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  color: varchar({ length: 255 }).notNull(),
})
