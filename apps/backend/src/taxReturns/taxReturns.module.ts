import { TaxReturnsController } from './taxReturns.controller'
import { TaxReturnsService } from './taxReturns.service'

import { Module } from '@nestjs/common'
import { DrizzleConnectionModule } from '@repo/drizzle-connection'

@Module({
  imports: [DrizzleConnectionModule],
  controllers: [TaxReturnsController],
  providers: [TaxReturnsService],
})
export class TaxReturnsModule {}
