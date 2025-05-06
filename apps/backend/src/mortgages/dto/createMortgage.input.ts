export class CreateMortgageInput {
  yearOfPurchase!: number
  residentialLocation!: string
  lenderName!: string
  lenderNationalId!: string
  loanNumber!: string
  loanDate!: Date
  loanTermInYears!: number
  totalPaymentsForTheYear!: number
  installmentOfNominalValue!: number
  interestExpenses!: number
  remainingDebt!: number
  userId!: number
}
