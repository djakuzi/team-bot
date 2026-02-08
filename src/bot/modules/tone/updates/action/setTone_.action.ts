import {getCallbackQuery} from '@tb-bot/utils/context/getCallbackQuery.util';
import {ServiceTone} from '@tb-modules/tone/services/tone.service';
import {ServiceToneSettings} from '@tb-modules/tone/services/toneSettings.service';
import {Context} from 'telegraf';
import {ACTIONS_BOT_TONE} from '../../constant/actions.const';

export async function setTone_(
  ctx: Context,
  serviceTone: ServiceTone,
  serviceToneSettings: ServiceToneSettings,
) {
  const data = getCallbackQuery<string>(ctx, 'data');

  if (data?.startsWith('set_tone_')) {
    const toneName = decodeURIComponent(data.replace('set_tone_', ''));

    await serviceToneSettings.setToneModeByName(toneName);

    await ctx.editMessageText(`Режим тона установлен: ${toneName}`, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ACTIONS_BOT_TONE.menu.desc,
              callback_data: ACTIONS_BOT_TONE.menu.action,
            },
          ],
        ],
      },
    });
  }
}
