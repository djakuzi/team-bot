import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { ModuleBotMenu } from './menu/botMenu.module';
import { ModuleBotTone } from './tone/botTone.module';
import { createBotConfig } from '@tb-core/config/configs/bot.config';
import { ModuleBotSettings } from './settings/botSettings.module';
import { BotExceptions } from '@tb-bot/bot.filter';
import { APP_FILTER } from '@nestjs/core';
import { ModuleBotVpn } from './vpn/botVpn.module';
import { UdpateBot } from './bot.update';

@Module({
	imports: [
		TelegrafModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const config = createBotConfig(configService);
				return {
					...config,
					middlewares: [session()],
				};
			},
		}),
		ModuleBotMenu,
		ModuleBotTone,
		ModuleBotSettings,
		ModuleBotVpn,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: BotExceptions,
		},
		UdpateBot,
	]
})
export class ModuleBot { }
