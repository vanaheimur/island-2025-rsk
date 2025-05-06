export class CreateMortgageInput {
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
  userId!: number
}
