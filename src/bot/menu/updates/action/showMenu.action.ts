import { getCallbackQuery } from "@tb-common/utils/bot/getCallbackQuery.util";
import { Context } from "telegraf";
import { ACTIONS_BOT_MENU } from "../../constant/actions.const";
import { buildInlineKeyboard } from "@tb-common/utils/bot/buildInlineKeyboard.util";

export async function showMenu(ctx: Context) {
	const data = getCallbackQuery<string>(ctx, 'data', true);
	const inline_keyboard = buildInlineKeyboard({
		buttons: ACTIONS_BOT_MENU,
		layout: [1, 2, 1, 1, 1, 1],
		excludeValues: [ACTIONS_BOT_MENU.back],
	})

	const extra = {
		reply_markup: {
			inline_keyboard: inline_keyboard,
		},
	};

	if (data === ACTIONS_BOT_MENU.back.action) {
		await ctx.editMessageText('Выберите раздел:', extra);
		return;
	}

	await ctx.reply('Выберите раздел:', extra);
}