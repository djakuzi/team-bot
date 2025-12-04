import { ACTIONS_BOT_SETTINGS } from "@tb-bot/settings/constant/actions.const";
import { TypeSource } from "@tb-common/types/bot/source.type";
import { ServiceSettings } from "@tb-modules/settings/services/settings.service";
import { Context } from "telegraf";

export async function disconnectThisChat(
	ctx: Context,
	serviceSettings: ServiceSettings,
	typeContext: TypeSource,
) {
	const isAction = typeContext === 'action';
	const isCommand = typeContext === 'command';

	const message = 'Синхронизация бота с чатом удалена';

	await serviceSettings.removeSettings();

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