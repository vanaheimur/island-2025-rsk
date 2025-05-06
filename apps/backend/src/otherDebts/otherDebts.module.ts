import { OtherDebtsController } from './otherDebts.controller'
import { OtherDebtsService } from './otherDebts.service'

import { Module } from '@nestjs/common'
import { DrizzleConnectionModule } from '@repo/drizzle-connection'

@Module({
  imports: [DrizzleConnectionModule],
  controllers: [OtherDebtsController],
  providers: [OtherDebtsService],
})
export class OtherDebtsModule {}
