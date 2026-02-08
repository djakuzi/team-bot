import {
  IDescCommandUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const COMMANDS_BOT_PANEL = {
  getLinkPanel: {
    command: 'link_panel',
    desc: 'Переход в админ панель',
  },
  getDataPanel: {
    command: 'get_data_panel',
    desc: 'Данные для входа',
  },
} satisfies TListDescUpdate<IDescCommandUpdate>;
