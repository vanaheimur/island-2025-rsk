import { incomeCategories, type IncomeCategory } from '../types'

import { ApiProperty } from '@nestjs/swagger'

export class IncomeInput {
  description!: string
  amount!: number
  @ApiProperty({ enum: incomeCategories })
  category!: IncomeCategory
}
