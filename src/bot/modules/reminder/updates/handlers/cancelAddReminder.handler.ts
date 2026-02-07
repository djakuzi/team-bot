import { Scenes } from 'telegraf';

export async function cancelAddReminder(ctx: Scenes.WizardContext) {
	await ctx.answerCbQuery();
	await ctx.reply('Добавление напоминания отменено.');
	await ctx.scene.leave();
}
