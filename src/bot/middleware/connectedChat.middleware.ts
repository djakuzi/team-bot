import {Context, MiddlewareFn} from 'telegraf';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const middlewareConnectedChat: MiddlewareFn<Context> = async (
  ctx,
  next,
) => {
  const userIdNum = ctx.from?.id;

  if (!userIdNum) {
    await ctx.reply('Вы не можете взаимодействовать со мной.');
    return;
  }

  const findSettings = await prisma.settings.findFirst();

  if (!findSettings) {
    await next();
    return;
  }

  try {
    const member = await ctx.telegram.getChatMember(
      findSettings.connectedIdChat + '',
      userIdNum,
    );

    if (!member || ['left', 'kicked'].includes(member.status)) {
      await ctx.reply(
        'Вы должны быть участником группы, чтобы использовать бота.',
      );
      return;
    }
  } catch (error) {
    await ctx.reply('Не удалось проверить ваше членство в группе.');
    return;
  }

  await next();
};
