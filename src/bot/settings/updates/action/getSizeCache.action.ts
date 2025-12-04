import { ACTIONS_BOT_SETTINGS } from "@tb-bot/settings/constant/actions.const";
import { TypeSource } from "@tb-common/types/bot/source.type";
import { ServiceCache } from "@tb-core/services/services/cache.service";
import { Context } from "telegraf";

export async function getSizeCache(
	ctx: Context,
	serviceCache: ServiceCache,
	typeContext: TypeSource,
) {
	const isAction = typeContext === 'action';
	const isCommand = typeContext === 'command';

	const message = `Размер кеша: ${serviceCache.getCacheSizeMbValuesOnly()}мб`;


	if (isAction) {
		await ctx.editMessageText(message, {
			reply_markup: {
				inline_keyboard: [
					[{ text: ACTIONS_BOT_SETTINGS.menu.desc, callback_data: ACTIONS_BOT_SETTINGS.menu.action }],
				],
			},
		});
	}

	if (isCommand) {
		await ctx.reply(message);
	}
}