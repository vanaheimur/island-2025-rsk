import { AssetInput } from './asset.input'
import { IncomeInput } from './income.input'
import { MortgageInput } from './mortgage.input'
import { OtherDebtInput } from './otherDebt.input'

import { IsOptional } from 'class-validator'

export class UpdateTaxReturnInput {
  @IsOptional()
  incomes?: IncomeInput[]
  @IsOptional()
  assets?: AssetInput[]
  @IsOptional()
  mortgages?: MortgageInput[]
  @IsOptional()
  otherDebts?: OtherDebtInput[]
  @IsOptional()
  value?: number
}
