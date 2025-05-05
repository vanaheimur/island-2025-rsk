import { AppService } from './app.service';

import { Controller, Get } from '@nestjs/common';
import type { Potatoes } from '@vanir/drizzle-connection';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/potatoes')
  async getPotatoes(): Promise<Potatoes[]> {
    const potatoes = await this.appService.getPotatoes();

    return potatoes;
  }
}
