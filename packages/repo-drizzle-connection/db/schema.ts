import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

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
  userId: integer()
    .notNull()
    .references(() => user.id),
})

export const user = pgTable('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  nationalId: varchar({ length: 10 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const incomeCategory = pgTable('income_category', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  order: integer().default(0).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp(),
})

export const income = pgTable('income', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: varchar({ length: 255 }).notNull(),
  amount: decimal({ scale: 30, mode: 'number' }).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: integer()
    .notNull()
    .references(() => user.id),
  incomeCategoryId: integer()
    .notNull()
    .references(() => incomeCategory.id),
})

export const asset = pgTable('asset', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  landNumber: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  amount: decimal({ scale: 30, mode: 'number' }).notNull(),
  isForeign: boolean().default(false).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: integer()
    .notNull()
    .references(() => user.id),
})

export const mortgage = pgTable('mortgage', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  yearOfPurchase: integer().notNull(),
  residentialLocation: varchar({ length: 255 }).notNull(),
  lenderName: varchar({ length: 255 }).notNull(),
  lenderNationalId: varchar({ length: 10 }).notNull(),
  loanNumber: varchar({ length: 255 }).notNull(),
  loanDate: timestamp().notNull(),
  loanTermInYears: integer().notNull(),
  totalPaymentsForTheYear: decimal({ scale: 30, mode: 'number' }).notNull(),
  installmentOfNominalValue: decimal({ scale: 30, mode: 'number' }).notNull(), // Afborgun á nafnverði
  interestExpenses: decimal({ scale: 30, mode: 'number' }).notNull(),
  remainingDebt: decimal({ scale: 30, mode: 'number' }).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: integer()
    .notNull()
    .references(() => user.id),
})

export const otherDebt = pgTable('other_debt', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  interestExpenses: decimal({ scale: 30, mode: 'number' }).notNull(),
  remainingDebt: decimal({ scale: 30, mode: 'number' }).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: integer()
    .notNull()
    .references(() => user.id),
})
