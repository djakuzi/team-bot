import {Context} from 'telegraf';
import {CallbackQuery} from 'telegraf/typings/core/types/typegram';

export function getCallbackQuery<R>(
  ctx: Context,
  key: string,
  isIgnoreError: boolean = false,
): R | null {
  const isIn = !ctx.callbackQuery || !(key in ctx.callbackQuery);

  if (isIn && !isIgnoreError) {
    throw new Error('CallbackQuery don`t have: ' + key);
  } else if (isIn && isIgnoreError) {
    return null;
  }

  return (ctx.callbackQuery as CallbackQuery)[key] as R;
}
