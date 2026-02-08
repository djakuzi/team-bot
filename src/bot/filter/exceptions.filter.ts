import {ExceptionFilter, Catch, ArgumentsHost, Logger} from '@nestjs/common';
import {parseException} from '@tb-common/utils/parse/parseException.util';
import {Context} from 'telegraf';
import {ACTIONS_BOT_MENU} from '../modules/menu/constant/actions.const';

@Catch()
export class BotExceptions implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp().getRequest<Context>();

    if (!ctx) return;

    const canEdit = ctx.callbackQuery?.message?.message_id;

    if (canEdit) {
      await this.handleCallbackError(ctx, exception);
    } else {
      await this.handleNewMessageError(ctx, exception);
    }
  }

  private async handleCallbackError(ctx: Context, exception: any) {
    try {
      const resException = parseException(exception);
      const res = ctx.callbackQuery;

      if (!res) return;

      const currentText = res.message?.message_id;

      if (currentText) {
        await ctx.editMessageText(resException.message, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: ACTIONS_BOT_MENU.back.desc,
                  callback_data: ACTIONS_BOT_MENU.back.action,
                },
              ],
            ],
          },
        });
      }
    } catch (editError) {
      await this.handleNewMessageError(ctx, exception);
    }
  }

  private async handleNewMessageError(ctx: Context, exception: any) {
    try {
      const resException = parseException(exception);
      await ctx.reply(resException.message);
    } catch (replyError) {
      console.error('Не удалось отправить сообщение об ошибке:', replyError);
    }
  }
}
