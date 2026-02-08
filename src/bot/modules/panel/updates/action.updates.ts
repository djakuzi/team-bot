import {ACTIONS_BOT_MENU} from '@tb-bot/modules/menu/constant/actions.const';
import {getCommands} from '@tb-bot/updates/action/getCommands.action';
import {buildInlineKeyboard} from '@tb-bot/utils/keyboard/buildInlineKeyboard.util';
import {Update, Action, Ctx} from 'nestjs-telegraf';
import {ACTIONS_BOT_PANEL} from '../constant/actions.const';
import {COMMANDS_BOT_PANEL} from '../constant/commands.const';
import {getDataPanel} from './action/getDataPanel.action';
import {getLinkPanel} from './action/getLinkPanel.action';
import {Context} from 'telegraf';

@Update()
export class ActionsBotPanel {
  constructor() {}

  @Action(ACTIONS_BOT_PANEL.menu.action)
  async menuPanel(@Ctx() ctx: Context) {
    const inline_keyboard = buildInlineKeyboard({
      buttons: ACTIONS_BOT_PANEL,
      layout: 1,
      fallbackRowSize: 2,
      excludeValues: [ACTIONS_BOT_PANEL.menu],
      additionalButtons: [ACTIONS_BOT_MENU.back],
    });
    await ctx.editMessageText('Админ панель', {
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    });
  }

  @Action(ACTIONS_BOT_PANEL.getLinkPanel.action)
  async getDataPanel(@Ctx() ctx: Context) {
    await getDataPanel(ctx, 'command');
  }

  @Action(ACTIONS_BOT_PANEL.getLinkPanel.action)
  async getLinkPanel(@Ctx() ctx: Context) {
    await getLinkPanel(ctx, 'command');
  }

  @Action(ACTIONS_BOT_PANEL.commands.action)
  async getCommands(@Ctx() ctx: Context) {
    await getCommands(ctx, 'action', COMMANDS_BOT_PANEL, ACTIONS_BOT_PANEL);
  }
}
