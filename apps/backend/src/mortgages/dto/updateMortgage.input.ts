import { CreateMortgageInput } from './createMortgage.input'

import { PartialType } from '@nestjs/swagger'

export class UpdateMortgageInput extends PartialType(CreateMortgageInput) {}
