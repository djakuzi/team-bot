import {Update, Ctx, Action} from 'nestjs-telegraf';
import {Context} from 'telegraf';
import {ACTIONS_BOT_VPN} from '../constants/actions.const';
import {ACTIONS_BOT_MENU} from '@tb-bot/modules/menu/constant/actions.const';
import {buildInlineKeyboard} from '@tb-bot/utils/keyboard/buildInlineKeyboard.util';

@Update()
export class ActionsBotVpn {
  constructor() {}

  @Action(ACTIONS_BOT_VPN.menu.action)
  async menuVpn(@Ctx() ctx: Context) {
    const inline_keyboard = buildInlineKeyboard({
      buttons: ACTIONS_BOT_VPN,
      layout: 1,
      fallbackRowSize: 2,
      excludeValues: [ACTIONS_BOT_VPN.menu],
      additionalButtons: [ACTIONS_BOT_MENU.back],
    });

    await ctx.editMessageText('Прокси-сервер', {
      reply_markup: {
        inline_keyboard: inline_keyboard,
      },
    });
  }

  @Action(ACTIONS_BOT_VPN.configConnected.action)
  async getConfigConnected(@Ctx() ctx: Context) {
    await ctx.editMessageText('Функция не реализована', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ACTIONS_BOT_VPN.menu.desc,
              callback_data: ACTIONS_BOT_VPN.menu.action,
            },
          ],
        ],
      },
    });
  }
}
