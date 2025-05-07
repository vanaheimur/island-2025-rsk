import { IncomeInput } from './income.input'

import { IsOptional } from 'class-validator'

export class UpdateTaxReturnInput {
  @IsOptional()
  incomes?: IncomeInput[]
  @IsOptional()
  value?: number
}

// TODO: Add validation
