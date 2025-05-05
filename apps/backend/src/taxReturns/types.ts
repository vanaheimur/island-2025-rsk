export const taxReturnStatuses = [
  'submitted',
  'in_progress',
  'completed',
] as const

export type TaxReturnStatus = (typeof taxReturnStatuses)[number]

export type WithIdField<T> = T & {
  id: number
}
