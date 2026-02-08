import {ACTIONS_BOT_SETTINGS} from '@tb-bot/modules/settings/constant/actions.const';
import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {ServiceSettings} from '@tb-modules/settings/services/settings.service';
import {Context} from 'telegraf';

export async function getСonnectedChat(
  ctx: Context,
  serviceSettings: ServiceSettings,
  typeUpdate: TypeUpdateContext,
) {
  const isAction = typeUpdate === 'action';
  const isCommand = typeUpdate === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  const res = await serviceSettings.getSettings();

  const message = 'Текущее соединение с чатом: ' + res.connectedIdChat;

  if (isAction) {
    await ctx.editMessageText(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ACTIONS_BOT_SETTINGS.menu.desc,
              callback_data: ACTIONS_BOT_SETTINGS.menu.action,
            },
          ],
        ],
      },
    });
  }

  if (isCommand) {
    await ctx.reply(message);
  }
}
