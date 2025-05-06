export class OtherDebtOutput {
  id!: number
  interestExpenses!: number
  remainingDebt!: number
  createdAt!: Date
  updatedAt!: Date
  userId!: number

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<OtherDebtOutput>) {
    Object.assign(this, partial)
  }
}
