import { AppModule } from './app.module';
import config from './config';

import { DocumentBuilder } from '@nestjs/swagger';
import { bootstrap } from '@repo/nest-infra-server';

const port = process.env.PORT ?? '5000';

const openApiSchema = new DocumentBuilder()
  .setTitle('RSK REST endpoints')
  .setDescription(
    'Collection of endpoints to handle communications with RSK systems',
  )
  .setVersion('1.0')
  .build();

void bootstrap({
  appModule: AppModule,
  port,
  skipInitializingRequestHandler: config().app.generateSchemaFiles,
  openApiSchema,
});
