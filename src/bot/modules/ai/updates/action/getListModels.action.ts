import {Context} from 'telegraf';
import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {ACTIONS_BOT_AI} from '../../constant/actions.const';
import {ServiceAi} from '@tb-core/external/ai/services/ai.service';

export async function getListModels(
  ctx: Context,
  serviceAi: ServiceAi,
  source: TypeUpdateContext,
) {
  const isAction = source === 'action';
  const isCommand = source === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  let message = 'Нет моделей';
  const list = serviceAi.getAllModels();

  if (list.length > 0) {
    message = '';
    list.forEach(el => (message += `*Модель*: ${el} \n`));
  }

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
      parse_mode: 'Markdown',
    });
  }

  if (isCommand) {
    await ctx.reply(message, {
      parse_mode: 'Markdown',
    });
  }
}
