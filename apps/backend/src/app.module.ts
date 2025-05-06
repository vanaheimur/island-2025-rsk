import { AssetsModule } from './assets/assets.module'
import { IncomesModule } from './income/incomes.module'
import { MortgagesModule } from './mortgages/mortgages.module'
import { OtherDebtsModule } from './otherDebts/otherDebts.module'
import { TaxReturnsModule } from './taxReturns/taxReturns.module'
import { UsersModule } from './users/users.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [
    AssetsModule,
    TaxReturnsModule,
    UsersModule,
    IncomesModule,
    MortgagesModule,
    OtherDebtsModule,
  ],
})
export class AppModule {}
