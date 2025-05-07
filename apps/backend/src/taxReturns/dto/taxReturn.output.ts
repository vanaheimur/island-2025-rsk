import { AssetOutput } from './asset.output'
import { IncomeOutput } from './income.output'
import { MortgageOutput } from './mortgage.output'
import { OtherDebtOutput } from './otherDebt.output'
import { type TaxReturnStatus, taxReturnStatuses } from '../types'

import { ApiProperty } from '@nestjs/swagger'

export class TaxReturnOutput {
  id!: number
  year!: number
  @ApiProperty({ enum: taxReturnStatuses })
  status!: TaxReturnStatus
  createdAt!: Date
  updatedAt!: Date

  incomes!: IncomeOutput[]
  assets!: AssetOutput[]
  mortgages!: MortgageOutput[]
  otherDebts!: OtherDebtOutput[]

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<TaxReturnOutput>) {
    Object.assign(this, partial)
  }
}
