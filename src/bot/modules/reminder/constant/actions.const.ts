import {
  IDescActionUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const ACTIONS_BOT_REMINDER = {
  menu: {
    action: 'menu_reminder',
    desc: 'Напоминания',
  },
  getReminders: {
    action: 'get_reminders',
    desc: 'Список напоминаний',
  },
  addReminders: {
    action: 'add_reminders',
    desc: 'Добавить напоминание',
  },
  removeAllReminders: {
    action: 'remove_all_reminders',
    desc: 'Удалить все напоминания',
  },
  commands: {
    action: 'get_message_reminder',
    desc: 'Список команд',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
