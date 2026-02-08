import {Scenes} from 'telegraf';

export async function cancelAddTone(ctx: Scenes.WizardContext) {
  await ctx.answerCbQuery();
  await ctx.reply('Добавление отменено.');
  await ctx.scene.leave();
}
