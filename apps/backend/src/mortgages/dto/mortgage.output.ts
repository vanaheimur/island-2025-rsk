export class MortgageOutput {
  id!: number
  yearOfPurchase!: number
  residentialLocation!: string
  lenderName!: string
  lenderKennitala!: string
  loanNumber!: string
  loanDate!: Date
  loanTermInYears!: number
  totalPaymentsForTheYear!: number
  installmentOfNominalValue!: number
  interestExpenses!: number
  remainingDebt!: number
  createdAt!: Date
  updatedAt!: Date
  userId!: number

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<MortgageOutput>) {
    Object.assign(this, partial)
  }
}
