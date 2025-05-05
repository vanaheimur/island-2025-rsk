import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';
import { DrizzleConnectionModule } from '@vanir/drizzle-connection';

@Module({
  imports: [DrizzleConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
