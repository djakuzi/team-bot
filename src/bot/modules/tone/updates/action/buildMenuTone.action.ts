import { buildInlineKeyboard } from "@tb-common/utils/bot/buildInlineKeyboard.util";
import { Context } from "telegraf";
import { ACTIONS_BOT_TONE } from "../../constant/actions.const";

export async function menuTone(
	ctx: Context,
) {
	const inline_keyboard = buildInlineKeyboard({
		buttons: ACTIONS_BOT_TONE,
		layout: [1, 2, 1, 1, 1, 1],
		excludeValues: [ACTIONS_BOT_TONE.menu]
	})

	await ctx.editMessageText('🎛 Раздел: Тон', {
		reply_markup: {
			inline_keyboard: inline_keyboard,
		},
	});
}