import { IncomesController } from './incomes.controller'
import { IncomesService } from './incomes.service'

import { Module } from '@nestjs/common'
import { DrizzleConnectionModule } from '@repo/drizzle-connection'

@Module({
  imports: [DrizzleConnectionModule],
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
