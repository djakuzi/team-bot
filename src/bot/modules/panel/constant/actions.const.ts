import {
  IDescActionUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const ACTIONS_BOT_PANEL = {
  menu: {
    action: 'menu_panel',
    desc: 'Админ панель',
  },
  getLinkPanel: {
    action: 'link_panel',
    desc: 'Переход в админ панель',
  },
  getDataPanel: {
    action: 'get_data_panel',
    desc: 'Данные для входа',
  },
  commands: {
    action: 'get_message_panel',
    desc: 'Список команд',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
