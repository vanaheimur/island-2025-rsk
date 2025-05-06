export class IncomeOutput {
  id!: number
  description!: string
  amount!: number
  createdAt!: Date
  updatedAt!: Date
  userId!: number
  incomeCategoryId!: number

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<IncomeOutput>) {
    Object.assign(this, partial)
  }
}
