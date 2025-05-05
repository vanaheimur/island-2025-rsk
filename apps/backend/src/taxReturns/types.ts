export const taxReturnStatuses = ['submitted', 'draft', 'error'] as const
export type TaxReturnStatus = (typeof taxReturnStatuses)[number]
