import { CreateMortgageInput } from './dto/createMortgage.input'
import { UpdateMortgageInput } from './dto/updateMortgage.input'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  DRIZZLE_CLIENT,
  type DrizzleClient,
  eq,
  mortgage,
} from '@repo/drizzle-connection'
import { type Logger, LOGGER_PROVIDER } from '@repo/logger'

@Injectable()
export class MortgagesService {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
    @Inject(DRIZZLE_CLIENT) private readonly db: DrizzleClient,
  ) {}
  public async getMultipleMortgages() {
    this.logger.debug('Fetching all tax returns')
    // TODO: Add pagination here
    return this.db.query.mortgage.findMany()
  }

  public async getSingleMortgageById(id: number) {
    this.logger.debug('Fetching a single tax return', { id })
    const data = await this.db.query.mortgage.findFirst({
      where(fields) {
        return eq(fields.id, id)
      },
    })

    if (!data) {
      throw new NotFoundException('Tax return not found')
    }

    return data
  }

  public async updateMortgage(id: number, input: UpdateMortgageInput) {
    this.logger.debug('Updating a new tax return', { id, input })

    const data = await this.db
      .update(mortgage)
      .set(input)
      .where(eq(mortgage.id, id))
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

  public async createMortgage(input: CreateMortgageInput) {
    this.logger.debug('Creating a new tax return', { input })

    const data = await this.db
      .insert(mortgage)
      .values(input)
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
