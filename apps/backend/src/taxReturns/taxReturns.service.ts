import { incomeCategories, InsertTaxReturnData } from './types'

import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
  asset,
  DRIZZLE_CLIENT,
  type DrizzleClient,
  eq,
  income,
  mortgage,
  otherDebt,
  taxReturn,
  vehicle,
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

    const incomes = await this.db.query.income.findMany({
      where(fields) {
        return eq(fields.userId, user.id)
      },
    })

    const assets = await this.db.query.asset.findMany({
      where(fields) {
        return eq(fields.userId, user.id)
      },
    })

    const vehicles = await this.db.query.vehicle.findMany({
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

    return { ...taxReturn, incomes, assets, vehicles, mortgages, otherDebts }
  }

  public async upsertTaxReturn(nationalId: string, input: InsertTaxReturnData) {
    // In a real app this would log to a audit log
    this.logger.debug('Updating a new tax return', {
      nationalId,
    })

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

    let taxReturnResponse: (typeof taxReturn.$inferSelect)[] = []
    let incomeResponse: (typeof income.$inferSelect)[] = []
    let assetResponse: (typeof asset.$inferSelect)[] = []
    let vehicleResponse: (typeof vehicle.$inferSelect)[] = []
    let mortgageResponse: (typeof mortgage.$inferSelect)[] = []
    let otherDebtResponse: (typeof otherDebt.$inferSelect)[] = []

    await this.db.transaction(async (tx) => {
      // We make sure the tax return exists
      taxReturnResponse = await tx
        .insert(taxReturn)
        .values({
          year: new Date().getFullYear(),
          status: 'in_progress',
          userId: user.id,
        })
        .onConflictDoUpdate({
          target: [taxReturn.userId, taxReturn.year],
          set: {
            status: 'in_progress',
          },
        })
        .returning()

      if (input.incomes) {
        await tx.delete(income).where(eq(income.userId, user.id)) // TODO: Make this work with composite key
        incomeResponse = await tx
          .insert(income)
          .values(
            input.incomes.map(({ category, ...income }) => ({
              ...income,
              userId: user.id,
              incomeCategoryId: incomeCategories.indexOf(category) + 1, // In a real app we would use a lookup table
            })),
          )
          .returning()
      }

      if (input.assets) {
        await tx.delete(asset).where(eq(asset.userId, user.id))
        assetResponse = await tx
          .insert(asset)
          .values(input.assets.map((asset) => ({ ...asset, userId: user.id })))
          .returning()
      }

      if (input.vehicles) {
        await tx.delete(vehicle).where(eq(vehicle.userId, user.id))
        vehicleResponse = await tx
          .insert(vehicle)
          .values(
            input.vehicles.map((vehicle) => ({ ...vehicle, userId: user.id })),
          )
          .returning()
      }

      if (input.mortgages) {
        await tx.delete(mortgage).where(eq(mortgage.userId, user.id))
        mortgageResponse = await tx
          .insert(mortgage)
          .values(
            input.mortgages.map((mortgage) => ({
              ...mortgage,
              loanDate: new Date(mortgage.loanDate),
              userId: user.id,
            })),
          )
          .returning()
      }

      if (input.otherDebts) {
        await tx.delete(otherDebt).where(eq(otherDebt.userId, user.id))
        otherDebtResponse = await tx
          .insert(otherDebt)
          .values(
            input.otherDebts.map((otherDebt) => ({
              ...otherDebt,
              userId: user.id,
            })),
          )
          .returning()
      }
    })

    return {
      ...taxReturnResponse[0],
      incomes: incomeResponse,
      assets: assetResponse,
      vehicles: vehicleResponse,
      mortgages: mortgageResponse,
      otherDebts: otherDebtResponse,
    }
  }
}
