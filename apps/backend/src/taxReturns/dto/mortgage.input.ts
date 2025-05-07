export class MortgageInput {
  yearOfPurchase!: number
  residentialLocation!: string
  lenderName!: string
  lenderNationalId!: string
  loanNumber!: string
  loanDate!: string
  loanTermInYears!: number
  totalPaymentsForTheYear!: number
  installmentOfNominalValue!: number
  interestExpenses!: number
  remainingDebt!: number
}
