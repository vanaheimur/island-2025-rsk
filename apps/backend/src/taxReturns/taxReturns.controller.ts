import { TaxReturnInput } from './dto/createTaxReturn.input'
import { TaxReturnOutput } from './dto/taxReturn.output'

import { Body, Controller, Get, Post, Put } from '@nestjs/common'

@Controller('tax-returns')
export class TaxReturnsController {
  @Get()
  getMultipleTaxReturns(): TaxReturnOutput[] {
    return [
      new TaxReturnOutput({
        id: 1,
        year: 2022,
        status: 'submitted',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ]
  }

  @Get('/:id')
  getSingleTaxReturn(): TaxReturnOutput {
    return new TaxReturnOutput({
      id: 1,
      year: 2022,
      status: 'submitted',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  @Put('/:id')
  updateTaxReturn(): TaxReturnOutput {
    return new TaxReturnOutput({
      id: 1,
      year: 2022,
      status: 'submitted',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  @Post()
  createTaxReturn(@Body() body: TaxReturnInput): TaxReturnOutput {
    return new TaxReturnOutput(body)
  }
}

// TODO: Add support to get old tax returns
// TODO: Connect this to the database
// TODO: Add integration tests for this controller
