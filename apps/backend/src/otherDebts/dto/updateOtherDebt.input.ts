import { CreateOtherDebtInput } from './createOtherDebt.input'

import { PartialType } from '@nestjs/swagger'

export class UpdateOtherDebtInput extends PartialType(CreateOtherDebtInput) {}
