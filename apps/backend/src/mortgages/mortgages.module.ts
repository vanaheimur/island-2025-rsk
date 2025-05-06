import { MortgagesController } from './mortgages.controller'
import { MortgagesService } from './mortgages.service'

import { Module } from '@nestjs/common'
import { DrizzleConnectionModule } from '@repo/drizzle-connection'

@Module({
  imports: [DrizzleConnectionModule],
  controllers: [MortgagesController],
  providers: [MortgagesService],
})
export class MortgagesModule {}
