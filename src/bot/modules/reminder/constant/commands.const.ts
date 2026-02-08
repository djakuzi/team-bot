import {
  IDescCommandUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const COMMANDS_BOT_REMINDER = {
  getReminders: {
    command: 'get_reminders',
    desc: 'Список напоминаний',
  },
  addReminders: {
    command: 'add_reminders',
    desc: 'Добавить напоминание',
  },
} satisfies TListDescUpdate<IDescCommandUpdate>;
