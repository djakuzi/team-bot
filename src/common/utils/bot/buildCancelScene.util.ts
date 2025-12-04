import { Markup, Scenes } from 'telegraf';

interface IDataEvent {
	name: string;
	desc: string;
}

export async function buildCancelScene(
	ctx: Scenes.WizardContext,
	message: string,
	dataHandler: IDataEvent,
) {
	await ctx.reply(
		message,
		Markup.inlineKeyboard([
			Markup.button.callback(
				dataHandler.desc,
				dataHandler.name,
			),
		]),
	);
}
