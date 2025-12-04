import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleCore } from '@tb-core/core.module';
import { ModuleBot } from '@tb-bot/bot.module';
import { ModuleCommon } from '@tb-modules/common.modules';

@Module({
	imports: [
		ModuleCommon,
		ModuleBot,
		ModuleCore
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
