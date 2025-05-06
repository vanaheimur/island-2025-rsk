import { CreateTaxReturnInput } from './dto/createTaxReturn.input'
import { TaxReturnOutput } from './dto/taxReturn.output'
import { UpdateTaxReturnInput } from './dto/updateTaxReturn.input'
import { TaxReturnsService } from './taxReturns.service'
import { AssetOutput } from '../assets/dto/asset.output'
import { IncomeOutput } from '../income/dto/income.output'
import { MortgageOutput } from '../mortgages/dto/mortgage.output'
import { OtherDebtOutput } from '../otherDebts/dto/otherDebt.output'

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

@Controller('tax-returns')
export class TaxReturnsController {
  constructor(private readonly taxReturnsService: TaxReturnsService) {}
  @Get('/:nationalId')
  async getSingleTaxReturn(
    @Param('nationalId') nationalId: string,
  ): Promise<TaxReturnOutput> {
    const taxReturn =
      await this.taxReturnsService.getSingleTaxReturnByNationalId(nationalId)

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

  @Put('/:id')
  async updateTaxReturn(
    @Param('id') id: number,
    @Body() body: UpdateTaxReturnInput,
  ): Promise<TaxReturnOutput> {
    const taxReturn = await this.taxReturnsService.updateTaxReturn(id, body)

    return new TaxReturnOutput({
      ...taxReturn,
      createdAt: taxReturn.createdAt ?? undefined,
      updatedAt: taxReturn.updatedAt ?? undefined,
    })
  }

  @Post()
  async createTaxReturn(
    @Body() body: CreateTaxReturnInput,
  ): Promise<TaxReturnOutput> {
    const taxReturn = await this.taxReturnsService.createTaxReturn(body)

    return new TaxReturnOutput({
      ...taxReturn,
      createdAt: taxReturn.createdAt ?? undefined,
      updatedAt: taxReturn.updatedAt ?? undefined,
    })
  }
}

// TODO: Add support to get old tax returns
// TODO: Add integration tests for this controller
