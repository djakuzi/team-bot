import {Global, Module} from '@nestjs/common';
import {ModuleConfig} from './config/config.module';
import {GModuleLogger} from './logger/logger.module';
import {GModuleServices} from './services/coreServices.module';
import {ModuleEvent} from './event/event.module';

@Global()
@Module({
  imports: [ModuleConfig, ModuleEvent, GModuleLogger, GModuleServices],
})
export class ModuleCore {}
