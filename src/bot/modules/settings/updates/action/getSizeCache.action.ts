import {ACTIONS_BOT_SETTINGS} from '@tb-bot/modules/settings/constant/actions.const';
import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {GServiceCache} from '@tb-core/services/services/cache.service';
import {Context} from 'telegraf';

export async function getSizeCache(
  ctx: Context,
  GServiceCache: GServiceCache,
  typeUpdate: TypeUpdateContext,
) {
  const isAction = typeUpdate === 'action';
  const isCommand = typeUpdate === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  const message = `Размер кеша: ${GServiceCache.getCacheSizeMbValuesOnly()}`;

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
