import { asset, income, mortgage, otherDebt } from '@repo/drizzle-connection'

export const taxReturnStatuses = [
  'submitted',
  'in_progress',
  'completed',
] as const

export const incomeCategories = [
  'salary', // Launatekjur og starfstengdar greiðslur
  'vehicle_grant', // Ökutækjastyrkur
  'allowance', // Dagpeningar
  'vehicle_benefit', // Bifreiðahlunnindi
  'housing_benefit', // Húsnæðishlunnindi
  'other_benefit', // Önnur hlunnindi, hvað
] as const

export type TaxReturnStatus = (typeof taxReturnStatuses)[number]
export type IncomeCategory = (typeof incomeCategories)[number]

export type WithIdField<T> = T & {
  id: number
}

export interface InsertTaxReturnData {
  incomes?: (Omit<typeof income.$inferInsert, 'userId' | 'incomeCategoryId'> & {
    category: IncomeCategory
  })[]
  assets?: Omit<typeof asset.$inferInsert, 'userId'>[]
  mortgages?: (Omit<typeof mortgage.$inferInsert, 'userId' | 'loanDate'> & {
    loanDate: string
  })[]
  otherDebts?: Omit<typeof otherDebt.$inferInsert, 'userId'>[]
}
