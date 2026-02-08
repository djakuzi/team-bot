import {
  IDescActionUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const ACTIONS_BOT_MESSAGE = {
  menu: {
    action: 'menu_message',
    desc: 'Настройки сообщений',
  },
  getMessageToday: {
    action: 'get_messages_today',
    desc: 'Получить сообщения за этот день',
  },
  getRetellingMessages: {
    action: 'get_retelling_messages',
    desc: 'Получить пересказ сообщений',
  },
  getMemoryStorage: {
    action: 'get_memory_messages',
    desc: 'Размер сообщений',
  },
  clearMessage: {
    action: 'clear_messages',
    desc: 'Очистить сообщения',
  },
  getTimeRetellingMessage: {
    action: 'get_time_retelling_message',
    desc: 'Время пересказа',
  },
  setRetellingTime: {
    action: 'set_retelling_time',
    desc: 'Изменить время генерации пересказа',
  },
  commands: {
    action: 'get_message_commands',
    desc: 'Список команд',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
