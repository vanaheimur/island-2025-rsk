import { AssetInput } from './asset.input'
import { IncomeInput } from './income.input'
import { MortgageInput } from './mortgage.input'
import { OtherDebtInput } from './otherDebt.input'
import { VehicleInput } from './vehicle.input'

import { IsOptional } from 'class-validator'

export class UpdateTaxReturnInput {
  @IsOptional()
  incomes?: IncomeInput[]
  @IsOptional()
  assets?: AssetInput[]
  @IsOptional()
  vehicle?: VehicleInput[]
  @IsOptional()
  mortgages?: MortgageInput[]
  @IsOptional()
  otherDebts?: OtherDebtInput[]
  @IsOptional()
  value?: number
}
