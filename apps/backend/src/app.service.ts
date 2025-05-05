import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_CLIENT, potatoes } from '@vanir/drizzle-connection';
import { type DrizzleClient, type Potatoes } from '@vanir/drizzle-connection';

@Injectable()
export class AppService {
  constructor(@Inject(DRIZZLE_CLIENT) private drizzleClient: DrizzleClient) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getPotatoes(): Promise<Potatoes[]> {
    const allPotatoes = await this.drizzleClient
      .select({
        id: potatoes.id,
        name: potatoes.name,
        age: potatoes.age,
        color: potatoes.color,
      })
      .from(potatoes);

    return allPotatoes;
  }
}
