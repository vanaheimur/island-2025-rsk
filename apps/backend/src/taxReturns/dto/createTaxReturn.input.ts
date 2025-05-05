import { type TaxReturnStatus, taxReturnStatuses } from '../types'

import { ApiProperty } from '@nestjs/swagger'

export class TaxReturnInput {
  @ApiProperty({ enum: taxReturnStatuses })
  status!: TaxReturnStatus
  createdAt!: Date
  updatedAt!: Date
}
