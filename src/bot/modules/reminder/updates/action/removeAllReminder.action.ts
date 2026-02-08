import {Context} from 'telegraf';
import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {ACTIONS_BOT_REMINDER} from '../../constant/actions.const';
import {ServiceReminder} from '@tb-modules/reminder/services/reminder.service';

export async function removeAllReminders(
  ctx: Context,
  typeUpdate: TypeUpdateContext,
  serviceReminder: ServiceReminder,
) {
  const isAction = typeUpdate === 'action';
  const isCommand = typeUpdate === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  const result = await serviceReminder.removeAllReminders();

  const descMessage = result
    ? 'Напоминания удалены!'
    : 'Ошибка при удалении напоминаний.';

  if (isAction) {
    await ctx.editMessageText(descMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ACTIONS_BOT_REMINDER.menu.desc,
              callback_data: ACTIONS_BOT_REMINDER.menu.action,
            },
          ],
        ],
      },
    });
  }

  if (isCommand) {
    await ctx.reply(descMessage);
  }
}
