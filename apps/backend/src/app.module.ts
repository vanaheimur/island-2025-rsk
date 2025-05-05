import { TaxReturnsModule } from './taxReturns/taxReturns.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [TaxReturnsModule],
})
export class AppModule {}
