import { type TaxReturnStatus, taxReturnStatuses } from '../types'

import { ApiProperty } from '@nestjs/swagger'

class IncomeOutput {
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

class AssetOutput {
  id!: number
  landNumber!: string
  description!: string
  amount!: number
  isForeign!: boolean
  createdAt!: Date
  updatedAt!: Date
  userId!: number

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<AssetOutput>) {
    Object.assign(this, partial)
  }
}

class MortgageOutput {
  id!: number
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
  createdAt!: Date
  updatedAt!: Date
  userId!: number

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<MortgageOutput>) {
    Object.assign(this, partial)
  }
}

class OtherDebtOutput {
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

export class TaxReturnOutput {
  id!: number
  year!: number
  @ApiProperty({ enum: taxReturnStatuses })
  status!: TaxReturnStatus
  createdAt!: Date
  updatedAt!: Date
  userId!: number

  incomes!: IncomeOutput[]
  assets!: AssetOutput[]
  mortgages!: MortgageOutput[]
  otherDebts!: OtherDebtOutput[]

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<TaxReturnOutput>) {
    Object.assign(this, partial)
  }
}
