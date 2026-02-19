import {Context} from 'telegraf';
import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {ACTIONS_BOT_MESSAGE} from '../../constant/actions.const';
import {ServiceMessageSettings} from '@tb-modules/message/services/messageSettings.service';

export async function removePrompt(
  ctx: Context,
  serviceMessageSettings: ServiceMessageSettings,
  source: TypeUpdateContext,
) {
  const isAction = source === 'action';
  const isCommand = source === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  await serviceMessageSettings.removePrompt();
  const message = 'Промт для анализа удален';

  if (isAction) {
    await ctx.editMessageText(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ACTIONS_BOT_MESSAGE.menu.desc,
              callback_data: ACTIONS_BOT_MESSAGE.menu.action,
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
