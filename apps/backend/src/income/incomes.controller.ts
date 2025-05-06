import { CreateIncomeInput } from './dto/createIncome.input'
import { IncomeOutput } from './dto/income.output'
import { UpdateIncomeInput } from './dto/updateIncome.input'
import { IncomesService } from './incomes.service'

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}
  @Get()
  async getMultipleIncomes(): Promise<IncomeOutput[]> {
    const incomes = await this.incomesService.getMultipleIncomes()

    return incomes.map(
      (income) =>
        new IncomeOutput({
          ...income,
          createdAt: income.createdAt ?? undefined,
          updatedAt: income.updatedAt ?? undefined,
        }),
    )
  }

  @Get('/:id')
  async getSingleIncome(@Param('id') id: number): Promise<IncomeOutput> {
    const income = await this.incomesService.getSingleIncomeById(id)

    return new IncomeOutput({
      ...income,
      createdAt: income.createdAt ?? undefined,
      updatedAt: income.updatedAt ?? undefined,
    })
  }

  @Put('/:id')
  async updateIncome(
    @Param('id') id: number,
    @Body() body: UpdateIncomeInput,
  ): Promise<IncomeOutput> {
    const income = await this.incomesService.updateIncome(id, body)

    return new IncomeOutput({
      ...income,
      createdAt: income.createdAt ?? undefined,
      updatedAt: income.updatedAt ?? undefined,
    })
  }

  @Post()
  async createIncome(@Body() body: CreateIncomeInput): Promise<IncomeOutput> {
    const income = await this.incomesService.createIncome(body)

    return new IncomeOutput({
      ...income,
      createdAt: income.createdAt ?? undefined,
      updatedAt: income.updatedAt ?? undefined,
    })
  }
}

// TODO: Add support to get old tax returns
// TODO: Add integration tests for this controller
