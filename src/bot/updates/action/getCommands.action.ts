import {Context} from 'telegraf';
import {TransformMarkdown} from '@tb-core/libs/transformToMarkdown/index.lib';
import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {
  IDescActionUpdate,
  IDescCommandUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export async function getCommands(
  ctx: Context,
  typeUpdate: TypeUpdateContext,
  listCommands: TListDescUpdate<IDescCommandUpdate>,
  listActions: TListDescUpdate<IDescActionUpdate>,
) {
  const isAction = typeUpdate === 'action';
  const isCommand = typeUpdate === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  const transformedCommands = Object.values(listCommands);
  const descMessage = TransformMarkdown.fromArray<IDescCommandUpdate>(
    transformedCommands,
    ['title', 'description'],
    {
      title: 'command',
      description: 'desc',
    },
  );

  if (isAction) {
    const inlineKeyboard = listActions?.menu
      ? [{text: listActions.menu.desc, callback_data: listActions.menu.action}]
      : [];

    await ctx.editMessageText(descMessage, {
      parse_mode: 'MarkdownV2',
      reply_markup: {
        inline_keyboard: [inlineKeyboard],
      },
    });
  }

  if (isCommand) {
    await ctx.reply(descMessage);
  }
}
