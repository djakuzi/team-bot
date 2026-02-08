import {Ctx, On, Start, Update} from 'nestjs-telegraf';
import {Context} from 'telegraf';
import {COMMANDS_BOT} from './commands.const';
import {getUpdate} from '@tb-bot/utils/context/getUpdate.util';
import {COMMANDS_BOT_MENU} from './modules/menu/constant/commands.const';
import {Update as TgUpdate} from 'telegraf/typings/core/types/typegram';
import {ActionsBotSettings} from './modules/settings/updates/action.updates';

@Update()
export class UpdateBot {
  constructor(private readonly actionsBotSettings: ActionsBotSettings) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      `Чтобы автоматически настроить бота введите команду: /${COMMANDS_BOT.startAuto.command}`,
    );
  }

  @On('new_chat_members')
  async onBotAddedToChat(@Ctx() ctx: Context) {
    await ctx.reply(`
			Я успешно подключён к этому чату 🎉. \n
			Далее добавьте меня в администраторы.
			Далее введите /${COMMANDS_BOT.startAuto.command}
		`);
  }

  @On('my_chat_member')
  async onBotStatusChange(@Ctx() ctx: Context) {
    const update = getUpdate(ctx) as TgUpdate.MyChatMemberUpdate;

    if (!update) return;

    const oldStatus = update?.my_chat_member?.old_chat_member?.status;
    const newStatus = update?.my_chat_member?.new_chat_member?.status;

    if (newStatus === 'administrator' && oldStatus !== 'administrator') {
      await ctx.reply(
        `Теперь я администратор в этом чате 🔥.\n\n` +
          `Введите /${COMMANDS_BOT.startAuto.command} для синхронизации c чатом.\n` +
          `Для открытия меню введите /${COMMANDS_BOT_MENU.menu.command}.`,
      );
    }

    if (oldStatus === 'administrator' && newStatus !== 'administrator') {
      await ctx.reply(
        'Меня лишили прав администратора 😢. Я могу некорректно работать.',
      );
      return;
    }
  }
}
