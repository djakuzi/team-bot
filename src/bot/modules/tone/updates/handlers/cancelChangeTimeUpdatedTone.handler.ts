import { Scenes } from 'telegraf';

export async function cancelChangeTimeTone(ctx: Scenes.WizardContext) {
    await ctx.answerCbQuery();
    await ctx.reply('Изменение времени обновления тона отменено.');
    await ctx.scene.leave();
}
