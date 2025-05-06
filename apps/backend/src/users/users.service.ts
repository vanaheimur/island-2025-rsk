import { CreateUserInput } from './dto/createUser.input'
import { UpdateUserInput } from './dto/updateUser.input'
import { WithIdField } from './types'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  DRIZZLE_CLIENT,
  type DrizzleClient,
  eq,
  user,
} from '@repo/drizzle-connection'
import { type Logger, LOGGER_PROVIDER } from '@repo/logger'

@Injectable()
export class UsersService {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
    @Inject(DRIZZLE_CLIENT) private readonly db: DrizzleClient,
  ) {}
  public async getMultipleUsers() {
    this.logger.debug('Fetching all tax returns')
    // TODO: Add pagination here
    return this.db.query.user.findMany()
  }

  public async getSingleUserById(id: number) {
    this.logger.debug('Fetching a single tax return', { id })
    const data = await this.db.query.user.findFirst({
      where(fields) {
        return eq(fields.id, id)
      },
    })

    if (!data) {
      throw new NotFoundException('Tax return not found')
    }

    return data
  }

  public async updateUser(input: WithIdField<UpdateUserInput>) {
    this.logger.debug('Updating a new tax return', { input })

    const data = await this.db
      .update(user)
      .set(input)
      .where(eq(user.id, input.id))
      .returning()

    if (!data || !data[0]) {
      throw new NotFoundException('Tax return not found')
    }

    if (data.length !== 1) {
      this.logger.error(
        'Multiple tax returns updated when one should be updated',
        { input },
      )
    }

    // We return the first updated element because we can't use limit in postgres
    return data[0]
  }

  public async createUser(input: CreateUserInput) {
    this.logger.debug('Creating a new tax return', { input })

    const data = await this.db
      .insert(user)
      .values({ ...input })
      .returning()

    if (!data || !data[0]) {
      throw new NotFoundException('Tax return not found')
    }

    if (data.length !== 1) {
      this.logger.error(
        'Multiple tax returns created when one should be created',
        { input },
      )
    }

    // We return the first updated element because we can't use limit in postgres
    return data[0]
  }
}
