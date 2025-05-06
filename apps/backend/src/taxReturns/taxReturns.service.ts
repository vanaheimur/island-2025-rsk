import { CreateTaxReturnInput } from './dto/createTaxReturn.input'
import { UpdateTaxReturnInput } from './dto/updateTaxReturn.input'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  DRIZZLE_CLIENT,
  type DrizzleClient,
  eq,
  taxReturn,
} from '@repo/drizzle-connection'
import { type Logger, LOGGER_PROVIDER } from '@repo/logger'

@Injectable()
export class TaxReturnsService {
  constructor(
    @Inject(LOGGER_PROVIDER) private readonly logger: Logger,
    @Inject(DRIZZLE_CLIENT) private readonly db: DrizzleClient,
  ) {}

  public async getSingleTaxReturnByNationalId(nationalId: string) {
    this.logger.debug('Fetching a single tax return', { nationalId })

    // Later we can try add with to select all with the user in one query
    const user = await this.db.query.user.findFirst({
      where(fields) {
        return eq(fields.nationalId, nationalId)
      },
    })

    if (!user) {
      throw new NotFoundException('National ID not found')
    }

    const taxReturn = await this.db.query.taxReturn.findFirst({
      where(fields) {
        return eq(fields.userId, user.id)
      },
    })

    if (!taxReturn) {
      throw new NotFoundException('Tax return not found')
    }

    // TODO: Sort by incomeCategoryId or group by it
    const incomes = await this.db.query.income.findMany({
      where(fields) {
        return eq(fields.userId, user.id)
      },
    })

    // TODO: Filter by isForeign === false
    const assets = await this.db.query.asset.findMany({
      where(fields) {
        return eq(fields.userId, user.id)
      },
    })

    const mortgages = await this.db.query.mortgage.findMany({
      where(fields) {
        return eq(fields.userId, user.id)
      },
    })

    const otherDebts = await this.db.query.otherDebt.findMany({
      where(fields) {
        return eq(fields.userId, user.id)
      },
    })

    return { ...taxReturn, incomes, assets, mortgages, otherDebts }
  }

  public async updateTaxReturn(id: number, input: UpdateTaxReturnInput) {
    this.logger.debug('Updating a new tax return', { id, input })

    const data = await this.db
      .update(taxReturn)
      .set(input)
      .where(eq(taxReturn.id, id))
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

  public async createTaxReturn(input: CreateTaxReturnInput) {
    this.logger.debug('Creating a new tax return', { input })

    const data = await this.db
      .insert(taxReturn)
      .values({ ...input, year: new Date().getFullYear() })
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
