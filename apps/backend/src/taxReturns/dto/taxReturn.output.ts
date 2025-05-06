import { type TaxReturnStatus, taxReturnStatuses } from '../types'

import { ApiProperty } from '@nestjs/swagger'

export class TaxReturnOutput {
  id!: number
  year!: number
  @ApiProperty({ enum: taxReturnStatuses })
  status!: TaxReturnStatus
  createdAt!: Date
  updatedAt!: Date
  userId!: number

  // this allows us to cast data to an instance of this class
  constructor(partial: Partial<TaxReturnOutput>) {
    Object.assign(this, partial)
  }
}
