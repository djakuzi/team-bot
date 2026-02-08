import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectBot} from 'nestjs-telegraf';
import {Telegraf} from 'telegraf';
import {COMMANDS_BOT} from './commands.const';
import {COMMANDS_BOT_MENU} from './modules/menu/constant/commands.const';

@Injectable()
export class BotCommandsService implements OnModuleInit {
  constructor(@InjectBot() private readonly bot: Telegraf<any>) {}

  async onModuleInit() {
    const {start, startAuto} = COMMANDS_BOT;

    await this.bot.telegram.setMyCommands([
      {command: start.command, description: start.desc},
      {command: startAuto.command, description: startAuto.desc},
      {
        command: COMMANDS_BOT_MENU.menu.command,
        description: COMMANDS_BOT_MENU.menu.desc,
      },
    ]);
  }
}
