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
    desc: 'Сообщения за этот день',
  },
  getRetellingMessages: {
    action: 'get_retelling_messages',
    desc: 'Анализ сообщений',
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
    desc: 'Время авто-анализа',
  },
  setRetellingTime: {
    action: 'set_retelling_time',
    desc: 'Изменить время анализа',
  },
  setPrompt: {
    action: 'set_retelling_prompt',
    desc: 'Установить промт анализа',
  },
  getPrompt: {
    action: 'get_retelling_prompt',
    desc: 'Текущий промт анализа',
  },
  removePrompt: {
    action: 'remove_retelling_prompt',
    desc: 'Удалить промт анализа',
  },
  commands: {
    action: 'get_message_commands',
    desc: '📝 Команды',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
