import { type TaxReturnStatus, taxReturnStatuses } from '../types'

import { ApiProperty } from '@nestjs/swagger'

export class CreateTaxReturnInput {
  @ApiProperty({ enum: taxReturnStatuses })
  status!: TaxReturnStatus
}
