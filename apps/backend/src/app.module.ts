import { AuthModule } from './auth/auth.module'
import { TaxReturnsModule } from './taxReturns/taxReturns.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [AuthModule, TaxReturnsModule],
})
export class AppModule {}
