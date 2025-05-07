import { incomeCategories, InsertTaxReturnData } from './types'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  and,
  DRIZZLE_CLIENT,
  type DrizzleClient,
  eq,
  income,
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

    /**
     * We fetch the user first since it has data needed to act correctly
     * such as access control, type or multiple national ids
     * We would handle things like access control in a guard or some other central manner
     */
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

  public async upsertTaxReturn(nationalId: string, input: InsertTaxReturnData) {
    this.logger.debug('Updating a new tax return', { nationalId, input })

    /**
     * We fetch the user first since it has data needed to act correctly
     * such as access control, type or multiple national ids
     * We would handle things like access control in a guard or some other central manner
     */
    const user = await this.db.query.user.findFirst({
      where(fields) {
        return eq(fields.nationalId, nationalId)
      },
    })

    if (!user) {
      throw new NotFoundException('National ID not found')
    }

    await this.db.transaction(async (tx) => {
      console.log('Running')

      // We make sure the tax return exists
      await tx
        .insert(taxReturn)
        .values({
          year: new Date().getFullYear(),
          status: 'in_progress',
          userId: user.id,
        })
        .onConflictDoNothing()

      if (input.incomes) {
        await tx.delete(income).where(and(eq(income.userId, user.id))) // TODO: Make this work with composite key
        await tx.insert(income).values(
          input.incomes.map(({ category, ...income }) => ({
            ...income,
            userId: user.id,
            incomeCategoryId: incomeCategories.indexOf(category), // In a real app we would use a lookup table
          })),
        )
      }

      // if (input.asset) {
      //   await tx.delete(asset).where(eq(asset.userId, user.id))
      //   await tx.insert(asset).values(input.asset)
      // }

      // if (input.mortgage) {
      //   await tx.delete(mortgage).where(eq(mortgage.userId, user.id))
      //   await tx.insert(mortgage).values(input.mortgage)
      // }

      // if (input.otherDebt) {
      //   await tx.delete(otherDebt).where(eq(otherDebt.userId, user.id))
      //   await tx.insert(otherDebt).values(input.otherDebt)
      // }
    })

    console.log('Updated tax return', { nationalId, input })

    // We return the first updated element because we can't use limit in postgres
    return 'data[0]'
  }
}
