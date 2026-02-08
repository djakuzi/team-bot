import {ServiceTone} from '@tb-modules/tone/services/tone.service';
import {ServiceToneSettings} from '@tb-modules/tone/services/toneSettings.service';
import {Context} from 'telegraf';
import {ACTIONS_BOT_TONE} from '../../constant/actions.const';
import {TypeUpdateContext} from '@tb-bot/types/update.type';

export async function setToneRandom(
  ctx: Context,
  serviceTone: ServiceTone,
  serviceToneSettings: ServiceToneSettings,
  source: TypeUpdateContext,
) {
  const isAction = source === 'action';
  const isCommand = source === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  const tones = await serviceTone.getListToneMode();
  const randomTone = tones[Math.floor(Math.random() * tones.length)];
  const message = `Режим тона установлен случайно: ${randomTone.name}`;

  await serviceToneSettings.setToneModeByName(randomTone.name);

  if (isAction) {
    await ctx.editMessageText(message, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ACTIONS_BOT_TONE.menu.desc,
              callback_data: ACTIONS_BOT_TONE.menu.action,
            },
          ],
          [{text: 'Повторить', callback_data: 'set_tone_random'}],
        ],
      },
    });
  }

  if (isCommand) {
    await ctx.reply(message);
  }
}
