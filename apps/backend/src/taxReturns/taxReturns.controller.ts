import { CreateTaxReturnInput } from './dto/createTaxReturn.input'
import { TaxReturnOutput } from './dto/taxReturn.output'
import { UpdateTaxReturnInput } from './dto/updateTaxReturn.input'
import { TaxReturnsService } from './taxReturns.service'

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

@Controller('tax-returns')
export class TaxReturnsController {
  constructor(private readonly taxReturnsService: TaxReturnsService) {}
  @Get()
  async getMultipleTaxReturns(): Promise<TaxReturnOutput[]> {
    const taxReturns = await this.taxReturnsService.getMultipleTaxReturns()

    return taxReturns.map(
      (taxReturn) =>
        new TaxReturnOutput({
          ...taxReturn,
          createdAt: taxReturn.createdAt ?? undefined,
          updatedAt: taxReturn.updatedAt ?? undefined,
        }),
    )
  }

  @Get('/:id')
  async getSingleTaxReturn(@Param('id') id: number): Promise<TaxReturnOutput> {
    const taxReturn = await this.taxReturnsService.getSingleTaxReturnById(id)

    return new TaxReturnOutput({
      ...taxReturn,
      createdAt: taxReturn.createdAt ?? undefined,
      updatedAt: taxReturn.updatedAt ?? undefined,
    })
  }

  @Put('/:id')
  async updateTaxReturn(
    @Param('id') id: number,
    @Body() body: UpdateTaxReturnInput,
  ): Promise<TaxReturnOutput> {
    const taxReturn = await this.taxReturnsService.updateTaxReturn({
      ...body,
      id,
    })

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
