import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {Context} from 'telegraf';
import {ACTIONS_BOT_PANEL} from '../../constant/actions.const';

export async function getLinkPanel(
  ctx: Context,
  typeUpdate: TypeUpdateContext,
) {
  const isAction = typeUpdate === 'action';
  const isCommand = typeUpdate === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  const message = '';

  if (isAction) {
    await ctx.editMessageText(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ACTIONS_BOT_PANEL.menu.desc,
              callback_data: ACTIONS_BOT_PANEL.menu.action,
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
