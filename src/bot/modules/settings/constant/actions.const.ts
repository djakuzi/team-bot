import {
  IDescActionUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const ACTIONS_BOT_SETTINGS = {
  menu: {
    action: 'menu_settings',
    desc: 'Настройки бота',
  },
  connectThisChat: {
    action: 'connect_this_chat',
    desc: 'Подключить этот чат',
  },
  getСonnectedChat: {
    action: 'get_connected_chat',
    desc: 'Подключенный ID чат',
  },
  disconnectThisChat: {
    action: 'disconnect_this_chat',
    desc: 'Отключить чат',
  },
  getSizeCache: {
    action: 'get_size_cache',
    desc: 'Размер кеша',
  },
  сlearCache: {
    action: 'clear_settings',
    desc: 'Очистить кеш',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
