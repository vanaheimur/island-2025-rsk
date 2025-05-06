import { CreateMortgageInput } from './dto/createMortgage.input'
import { MortgageOutput } from './dto/mortgage.output'
import { UpdateMortgageInput } from './dto/updateMortgage.input'
import { MortgagesService } from './mortgages.service'

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

@Controller('mortgages')
export class MortgagesController {
  constructor(private readonly mortgagesService: MortgagesService) {}
  @Get()
  async getMultipleMortgages(): Promise<MortgageOutput[]> {
    const mortgages = await this.mortgagesService.getMultipleMortgages()

    return mortgages.map(
      (mortgage) =>
        new MortgageOutput({
          ...mortgage,
          createdAt: mortgage.createdAt ?? undefined,
          updatedAt: mortgage.updatedAt ?? undefined,
        }),
    )
  }

  @Get('/:id')
  async getSingleMortgage(@Param('id') id: number): Promise<MortgageOutput> {
    const mortgage = await this.mortgagesService.getSingleMortgageById(id)

    return new MortgageOutput({
      ...mortgage,
      createdAt: mortgage.createdAt ?? undefined,
      updatedAt: mortgage.updatedAt ?? undefined,
    })
  }

  @Put('/:id')
  async updateMortgage(
    @Param('id') id: number,
    @Body() body: UpdateMortgageInput,
  ): Promise<MortgageOutput> {
    const mortgage = await this.mortgagesService.updateMortgage(id, body)

    return new MortgageOutput({
      ...mortgage,
      createdAt: mortgage.createdAt ?? undefined,
      updatedAt: mortgage.updatedAt ?? undefined,
    })
  }

  @Post()
  async createMortgage(
    @Body() body: CreateMortgageInput,
  ): Promise<MortgageOutput> {
    const mortgage = await this.mortgagesService.createMortgage(body)

    return new MortgageOutput({
      ...mortgage,
      createdAt: mortgage.createdAt ?? undefined,
      updatedAt: mortgage.updatedAt ?? undefined,
    })
  }
}

// TODO: Add support to get old tax returns
// TODO: Add integration tests for this controller
