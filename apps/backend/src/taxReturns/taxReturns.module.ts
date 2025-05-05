import { TaxReturnsController } from './taxReturns.controller'
import { TaxReturnsService } from './taxReturns.service'

import { Module } from '@nestjs/common'

@Module({
  controllers: [TaxReturnsController],
  providers: [TaxReturnsService],
})
export class TaxReturnsModule {}
