import {
  IDescActionUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const ACTIONS_BOT_TONE = {
  menu: {
    action: 'menu_tone',
    desc: 'Управления тоном',
  },
  set_tone_mode: {
    action: 'set_tone_mode',
    desc: 'Установить режим тона',
  },
  get_current_tone_mode: {
    action: 'get_tone_mode',
    desc: 'Режим тона',
  },
  set_tone_time: {
    action: 'set_tone_time',
    desc: 'Изменить время обновления',
  },
  get_tone_time: {
    action: 'get_tone_time',
    desc: 'Время обновления',
  },
  add_new_tone_mode: {
    action: 'add_new_tone_mode',
    desc: 'Добавить новый тон',
  },
  tone_commands: {
    action: 'tone_commands',
    desc: '📝 Команды',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
