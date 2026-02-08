import {Scenes} from 'telegraf';

export async function cancelChangeTimeRetelling(ctx: Scenes.WizardContext) {
  await ctx.answerCbQuery();
  await ctx.reply('Изменение времени генерации пересказа сообщений отменено.');
  await ctx.scene.leave();
}
