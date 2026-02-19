import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {Context} from 'telegraf';
import {ACTIONS_BOT_MESSAGE} from '../../constant/actions.const';
import {ServiceMessageAi} from '@tb-modules/message/services/messageAi.service';

export async function getRetellingMessages(
  ctx: Context,
  serviceMessageAi: ServiceMessageAi,
  typeUpdate: TypeUpdateContext,
) {
  const isAction = typeUpdate === 'action';
  const isCommand = typeUpdate === 'command';

  if (isAction) {
    await ctx.editMessageText('Генерируем...');
  }

  const message = await serviceMessageAi.getRetellingMessages();

  if (isAction) {
    await ctx.editMessageText(message.text, {
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
    await ctx.reply(message.text);
  }
}
