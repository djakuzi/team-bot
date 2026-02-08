import {ACTIONS_BOT_MESSAGE} from '@tb-bot/modules/message/constant/actions.const';
import {ACTIONS_BOT_PANEL} from '@tb-bot/modules/panel/constant/actions.const';
import {ACTIONS_BOT_REMINDER} from '@tb-bot/modules/reminder/constant/actions.const';
import {ACTIONS_BOT_SETTINGS} from '@tb-bot/modules/settings/constant/actions.const';
import {ACTIONS_BOT_TONE} from '@tb-bot/modules/tone/constant/actions.const';
import {ACTIONS_BOT_VPN} from '@tb-bot/modules/vpn/constants/actions.const';
import {
  IDescActionUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const ACTIONS_BOT_MENU = {
  menuTone: {
    action: ACTIONS_BOT_TONE.menu.action,
    desc: ACTIONS_BOT_TONE.menu.desc,
  },
  menuMessage: {
    action: ACTIONS_BOT_MESSAGE.menu.action,
    desc: ACTIONS_BOT_MESSAGE.menu.desc,
  },
  menuReminder: {
    action: ACTIONS_BOT_REMINDER.menu.action,
    desc: ACTIONS_BOT_REMINDER.menu.desc,
  },
  menuSettings: {
    action: ACTIONS_BOT_SETTINGS.menu.action,
    desc: ACTIONS_BOT_SETTINGS.menu.desc,
  },
  menuVpn: {
    action: ACTIONS_BOT_VPN.menu.action,
    desc: ACTIONS_BOT_VPN.menu.desc,
  },
  menuPanel: {
    action: ACTIONS_BOT_PANEL.menu.action,
    desc: ACTIONS_BOT_PANEL.menu.desc,
  },
  back: {
    action: 'menu_back',
    desc: 'Выйти в меню',
  },
  exit: {
    action: 'menu_close',
    desc: 'Закрыть меню',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
