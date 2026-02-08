import {
  IDescActionUpdate,
  TListDescUpdate,
} from '@tb-bot/types/descUpdates.types';

export const ACTIONS_BOT_VPN = {
  menu: {
    action: 'menu_vpn',
    desc: 'Прокси сервер',
  },
  configConnected: {
    action: 'config_vpn_connected',
    desc: 'Конфиги для подключения',
  },
} satisfies TListDescUpdate<IDescActionUpdate>;
