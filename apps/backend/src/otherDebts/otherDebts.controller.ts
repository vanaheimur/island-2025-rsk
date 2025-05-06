import { CreateOtherDebtInput } from './dto/createOtherDebt.input'
import { OtherDebtOutput } from './dto/otherDebt.output'
import { UpdateOtherDebtInput } from './dto/updateOtherDebt.input'
import { OtherDebtsService } from './otherDebts.service'

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

@Controller('otherDebts')
export class OtherDebtsController {
  constructor(private readonly otherDebtsService: OtherDebtsService) {}
  @Get()
  async getMultipleOtherDebts(): Promise<OtherDebtOutput[]> {
    const otherDebts = await this.otherDebtsService.getMultipleOtherDebts()

    return otherDebts.map(
      (otherDebt) =>
        new OtherDebtOutput({
          ...otherDebt,
          createdAt: otherDebt.createdAt ?? undefined,
          updatedAt: otherDebt.updatedAt ?? undefined,
        }),
    )
  }

  @Get('/:id')
  async getSingleOtherDebt(@Param('id') id: number): Promise<OtherDebtOutput> {
    const otherDebt = await this.otherDebtsService.getSingleOtherDebtById(id)

    return new OtherDebtOutput({
      ...otherDebt,
      createdAt: otherDebt.createdAt ?? undefined,
      updatedAt: otherDebt.updatedAt ?? undefined,
    })
  }

  @Put('/:id')
  async updateOtherDebt(
    @Param('id') id: number,
    @Body() body: UpdateOtherDebtInput,
  ): Promise<OtherDebtOutput> {
    const otherDebt = await this.otherDebtsService.updateOtherDebt(id, body)

    return new OtherDebtOutput({
      ...otherDebt,
      createdAt: otherDebt.createdAt ?? undefined,
      updatedAt: otherDebt.updatedAt ?? undefined,
    })
  }

  @Post()
  async createOtherDebt(
    @Body() body: CreateOtherDebtInput,
  ): Promise<OtherDebtOutput> {
    const otherDebt = await this.otherDebtsService.createOtherDebt(body)

    return new OtherDebtOutput({
      ...otherDebt,
      createdAt: otherDebt.createdAt ?? undefined,
      updatedAt: otherDebt.updatedAt ?? undefined,
    })
  }
}

// TODO: Add support to get old tax returns
// TODO: Add integration tests for this controller
