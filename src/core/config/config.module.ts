import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import createAppConfig from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [createAppConfig],
    }),
  ],
})
export class ModuleConfig {}
