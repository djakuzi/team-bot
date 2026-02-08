import {Context} from 'telegraf';
import {TypeUpdateContext} from '@tb-bot/types/update.type';
import {ACTIONS_BOT_REMINDER} from '../../constant/actions.const';
import {ServiceReminder} from '@tb-modules/reminder/services/reminder.service';
import {LibDate} from '@tb-core/libs/date/index.lib';
import {noun as pluralRu} from 'plural-ru';
import {capitalizeFirstLetter} from '@tb-common/utils/string/upperCaseFirstSymbol.util';

export async function getReminders(
  ctx: Context,
  typeUpdate: TypeUpdateContext,
  serviceReminder: ServiceReminder,
) {
  const isAction = typeUpdate === 'action';
  const isCommand = typeUpdate === 'command';

  if (isAction) {
    await ctx.answerCbQuery();
  }

  const reminders = await serviceReminder.getListReminder();

  let descMessage = 'Список напоминаний пуст.';

  if (reminders?.length > 0) {
    descMessage = '';

    reminders.forEach(el => {
      const {repeatRangeDays} = el;

      descMessage += `*Напоминание:* ${el.name}.\n*Дата и время:* ${LibDate.toLocaleDate(el.executedAt, 'ru-Ru')}.\n*Повторять:* ${el.repeat ? 'Да' : 'Нет'}.${repeatRangeDays ? `\n*Повторение*: каждые ${repeatRangeDays} ${pluralRu(repeatRangeDays, 'день', 'дня', 'дней')}` : ''}
      \n${capitalizeFirstLetter(el.desc)}.\n\n`;
    });
  }

  if (isAction) {
    await ctx.editMessageText(descMessage, {
      parse_mode: 'Markdown',
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
