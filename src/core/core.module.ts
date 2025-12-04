import { Global, Module } from '@nestjs/common';
import { ModuleConfig } from './config/config.module';
import { ModuleLogger } from './logger/logger.module';
import { ModulePrisma } from './prisma/prisma.module';
import { ModuleCoreServices } from './services/coreServices.module';
import { ModuleEvent } from './event/event.module';

@Global()
@Module({
	imports: [
		ModuleConfig,
		ModuleEvent,
		ModuleLogger,
		ModulePrisma,
		ModuleCoreServices
	],
})
export class ModuleCore {};