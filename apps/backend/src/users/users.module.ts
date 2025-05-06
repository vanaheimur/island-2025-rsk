import { UsersController } from './users.controller'
import { UsersService } from './users.service'

import { Module } from '@nestjs/common'
import { DrizzleConnectionModule } from '@repo/drizzle-connection'

@Module({
  imports: [DrizzleConnectionModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
