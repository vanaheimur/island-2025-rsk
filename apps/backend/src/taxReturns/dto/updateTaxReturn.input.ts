import { CreateTaxReturnInput } from './createTaxReturn.input'

import { PartialType } from '@nestjs/swagger'

export class UpdateTaxReturnInput extends PartialType(CreateTaxReturnInput) {}
