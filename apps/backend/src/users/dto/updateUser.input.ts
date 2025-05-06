import { CreateUserInput } from './createUser.input'

import { PartialType } from '@nestjs/swagger'

export class UpdateUserInput extends PartialType(CreateUserInput) {}
