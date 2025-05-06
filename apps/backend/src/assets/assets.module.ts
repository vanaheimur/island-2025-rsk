import { AssetsController } from './assets.controller'
import { AssetsService } from './assets.service'

import { Module } from '@nestjs/common'
import { DrizzleConnectionModule } from '@repo/drizzle-connection'

@Module({
  imports: [DrizzleConnectionModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
