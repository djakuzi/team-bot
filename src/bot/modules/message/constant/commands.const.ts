import {
  IDescCommandUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const COMMANDS_BOT_MESSAGE = {
  getMessageToday: {
    command: 'get_messages_today',
    desc: 'Получить сообщения за этот день',
  },
  getMemory: {
    command: 'get_memory_messages',
    desc: 'Размер сообщений',
  },
  getRetellingMessages: {
    command: 'get_retelling_messages',
    desc: 'Получить пересказ сообщений',
  },
  clear: {
    command: 'clear_messages',
    desc: 'Очистить сообщения',
  },
  setPromt: {
    command: 'set_retelling_promt',
    desc: 'Установить промт анализа',
  },
  getPromt: {
    command: 'get_retelling_promt',
    desc: 'Текущий промт анализа',
  },
  removePromt: {
    command: 'remove_retelling_promt',
    desc: 'Удалить промт анализа',
  },
  setRetellingTime: {
    command: 'set_retelling_time',
    desc: 'Изменить время генерации пересказа',
  },
} satisfies TListDescUpdate<IDescCommandUpdate>;
