import { CreateIncomeInput } from './createIncome.input'

import { PartialType } from '@nestjs/swagger'

export class UpdateIncomeInput extends PartialType(CreateIncomeInput) {}
