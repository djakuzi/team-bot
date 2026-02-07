import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { ModuleBotMenu } from './modules/menu/botMenu.module';
import { ModuleBotTone } from './modules/tone/botTone.module';
import { createBotConfig } from '@tb-core/config/configs/bot.config';
import { ModuleBotSettings } from './modules/settings/botSettings.module';
import { BotExceptions } from '@tb-bot/filter/exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { ModuleBotVpn } from './modules/vpn/botVpn.module';
import { UpdateBot } from './bot.update';
import { middlewareConnectedChat } from './middleware/connectedChat.middleware';
import { ModuleBotMessage } from './modules/message/botMessage.module';
import { ModuleBotReminder } from './modules/reminder/botReminder.module';
import { ServiceBotCalendar } from './services/calendar.service';

@Global()
@Module({
    imports: [
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const config = createBotConfig(configService);
                return {
                    ...config,
                    middlewares: [
                        session(),
                        middlewareConnectedChat
                    ],
                };
            },
        }),
        ModuleBotMenu,
        ModuleBotTone,
        ModuleBotSettings,
        ModuleBotVpn,
        ModuleBotMessage,
        ModuleBotReminder
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: BotExceptions,
        },
        UpdateBot,
        ServiceBotCalendar
    ],
    exports: [
        ServiceBotCalendar
    ]
})
export class ModuleBot { }
