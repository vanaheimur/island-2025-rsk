import { AssetInput } from './asset.input'
import { IncomeInput } from './income.input'

import { IsOptional } from 'class-validator'

export class UpdateTaxReturnInput {
  @IsOptional()
  incomes?: IncomeInput[]
  @IsOptional()
  assets?: AssetInput[]
}
