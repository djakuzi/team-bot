import {Context} from 'telegraf';
import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {ACTIONS_BOT_AI} from '../../constant/actions.const';
import {ServiceAi} from '@tb-core/external/ai/services/ai.service';

export async function clearAddedModels(
  ctx: Context,
  serviceAi: ServiceAi,
  source: TypeUpdateContext,
) {
  const isAction = source === 'action';
  const isCommand = source === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  serviceAi.removeAddedModels();

  const message = 'Добавленные модели удалены';

  if (isAction) {
    await ctx.editMessageText(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ACTIONS_BOT_AI.menu.desc,
              callback_data: ACTIONS_BOT_AI.menu.action,
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
