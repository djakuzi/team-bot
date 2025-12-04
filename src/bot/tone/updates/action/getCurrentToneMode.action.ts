import { ServiceToneSettings } from "@tb-modules/tone/services/toneSettings.service";
import { Context } from "telegraf";
import { ACTIONS_BOT_TONE } from "../../constant/actions.const";
import { TypeSource } from "@tb-common/types/bot/source.type";

export async function getCurrentToneMode(
	ctx: Context,
	serviceToneSettings: ServiceToneSettings,
	typeContext: TypeSource,
) {
	const isAction = typeContext === 'action';
	const isCommand = typeContext === 'command';

	if (isAction) {
		await ctx.answerCbQuery();
	}

	const tone = await serviceToneSettings.getCurrnetTone();
	const message = `Текущий режим тона: ${tone?.toneId}`;

	if (isAction) {
		await ctx.editMessageText(message, {
			reply_markup: {
				inline_keyboard: [
					[{ text: ACTIONS_BOT_TONE.menu.desc, callback_data: ACTIONS_BOT_TONE.menu.action }],
				],
			},
		});
	}

	if (isCommand) {
		await ctx.reply(message)
	}
}