import {Action, Ctx, Update} from 'nestjs-telegraf';
import {ACTIONS_BOT_REMINDER} from '../constant/actions.const';
import {Context, Scenes} from 'telegraf';
import {ACTIONS_BOT_MENU} from '@tb-bot/modules/menu/constant/actions.const';
import {buildInlineKeyboard} from '@tb-bot/utils/keyboard/buildInlineKeyboard.util';
import {removeAllReminders} from './action/removeAllReminder.action';
import {ServiceReminder} from '@tb-modules/reminder/services/reminder.service';
import {getReminders} from './action/getReminders.action';
import {getCommands} from '@tb-bot/updates/action/getCommands.action';
import {COMMANDS_BOT_REMINDER} from '../constant/commands.const';

@Update()
export class ActionsBotReminder {
  constructor(private readonly serviceReminder: ServiceReminder) {}

  @Action(ACTIONS_BOT_REMINDER.menu.action)
  async menuSettings(@Ctx() ctx: Context) {
    const inline_keyboard = buildInlineKeyboard({
      buttons: ACTIONS_BOT_REMINDER,
      layout: 1,
      fallbackRowSize: 2,
      excludeValues: [ACTIONS_BOT_REMINDER.menu],
      additionalButtons: [ACTIONS_BOT_MENU.back],
    });

    await ctx.editMessageText('Настройки', {
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    });
  }

  @Action(ACTIONS_BOT_REMINDER.addReminders.action)
  async addReminders(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.scene.enter('add_new_reminder');
  }

  @Action(ACTIONS_BOT_REMINDER.getReminders.action)
  async addNewTgetRemindersoneTime(@Ctx() ctx: Context) {
    await getReminders(ctx, 'action', this.serviceReminder);
  }

  @Action(ACTIONS_BOT_REMINDER.removeAllReminders.action)
  async removeAllReminders(@Ctx() ctx: Context) {
    await removeAllReminders(ctx, 'action', this.serviceReminder);
  }

  @Action(ACTIONS_BOT_REMINDER.commands.action)
  async getMessageCommands(@Ctx() ctx: Context) {
    await getCommands(
      ctx,
      'action',
      COMMANDS_BOT_REMINDER,
      ACTIONS_BOT_REMINDER,
    );
  }
}
