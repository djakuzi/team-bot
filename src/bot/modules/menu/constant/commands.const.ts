import {
  IDescCommandUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const COMMANDS_BOT_MENU = {
  menu: {
    command: 'menu',
    desc: 'Меню',
  },
} satisfies TListDescUpdate<IDescCommandUpdate>;
