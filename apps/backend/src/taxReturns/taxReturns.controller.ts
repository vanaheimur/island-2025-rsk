import { AssetOutput } from './dto/asset.output'
import { IncomeOutput } from './dto/income.output'
import { MortgageOutput } from './dto/mortgage.output'
import { OtherDebtOutput } from './dto/otherDebt.output'
import { TaxReturnOutput } from './dto/taxReturn.output'
import { UpdateTaxReturnInput } from './dto/updateTaxReturn.input'
import { TaxReturnsService } from './taxReturns.service'
import { CurrentUser } from '../auth/decorators/currentUser.decorator'
import type { User } from '../auth/types'

import { Body, Controller, Get, Put } from '@nestjs/common'

@Controller('tax-returns')
export class TaxReturnsController {
  constructor(private readonly taxReturnsService: TaxReturnsService) {}
  @Get()
  async getSingleTaxReturn(
    @CurrentUser() user: User,
  ): Promise<TaxReturnOutput> {
    const taxReturn =
      await this.taxReturnsService.getSingleTaxReturnByNationalId(
        user.nationalId,
      )

    return new TaxReturnOutput({
      ...taxReturn,
      createdAt: taxReturn.createdAt ?? undefined,
      updatedAt: taxReturn.updatedAt ?? undefined,

      incomes: taxReturn.incomes.map(
        (income) =>
          new IncomeOutput({
            ...income,
            createdAt: income.createdAt ?? undefined,
            updatedAt: income.updatedAt ?? undefined,
          }),
      ),
      assets: taxReturn.assets.map(
        (asset) =>
          new AssetOutput({
            ...asset,
            createdAt: asset.createdAt ?? undefined,
            updatedAt: asset.updatedAt ?? undefined,
          }),
      ),
      mortgages: taxReturn.mortgages.map(
        (mortgage) =>
          new MortgageOutput({
            ...mortgage,
            createdAt: mortgage.createdAt ?? undefined,
            updatedAt: mortgage.updatedAt ?? undefined,
          }),
      ),
      otherDebts: taxReturn.otherDebts.map(
        (otherDebt) =>
          new OtherDebtOutput({
            ...otherDebt,
            createdAt: otherDebt.createdAt ?? undefined,
            updatedAt: otherDebt.updatedAt ?? undefined,
          }),
      ),
    })
  }

  @Put()
  async upsertTaxReturn(
    @CurrentUser() user: User,
    @Body() body: UpdateTaxReturnInput,
  ): Promise<string> {
    const taxReturn = await this.taxReturnsService.upsertTaxReturn(
      user.nationalId,
      body,
    )
    return 'taxReturn'
  }
}
