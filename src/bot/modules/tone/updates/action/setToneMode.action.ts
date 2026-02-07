import { getCallbackQuery } from "@tb-common/utils/bot/getCallbackQuery.util";
import { ServiceTone } from "@tb-modules/tone/services/tone.service";
import { ServiceToneSettings } from "@tb-modules/tone/services/toneSettings.service";
import { Context } from "telegraf";
import { ACTIONS_BOT_TONE } from "../../constant/actions.const";
import { setToneRandom } from "./setToneRandom.action";
import { setTone_ } from "./setTone_.action";

export async function setToneMode(
	ctx: Context, 
	serviceTone: ServiceTone, 
	serviceToneSettings: ServiceToneSettings,
) {
	const data = getCallbackQuery<string>(ctx, 'data');

	if (data === ACTIONS_BOT_TONE.set_tone_mode.action) {
		const tones = await serviceTone.getListToneMode();

		await ctx.editMessageText('Выберите тон для установки: ', {
			reply_markup: {
				inline_keyboard: [
					[{ text: ACTIONS_BOT_TONE.menu.desc, callback_data: ACTIONS_BOT_TONE.menu.action }],
					[{ text: 'Случайный вариант', callback_data: 'set_tone_random' }],
					...tones.map(t => [{ text: t.name, callback_data: `set_tone_${encodeURIComponent(t.name)}` }]),
				],
			},
		});
		return;
	}

	if (data === 'set_tone_random') {
		await setToneRandom(ctx, serviceTone, serviceToneSettings, 'action');
		return;
	}

	await setTone_(ctx, serviceTone, serviceToneSettings);
}