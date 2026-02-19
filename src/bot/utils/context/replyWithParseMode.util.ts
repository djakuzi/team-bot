import {Context} from 'telegraf';
import {ParseMode} from 'telegraf/typings/core/types/typegram';

export async function replyWithParseMode(
  ctx: Context,
  message: string,
  parseMode: ParseMode = 'Markdown',
) {
  await ctx.reply(message, {
    parse_mode: parseMode,
  });
}
