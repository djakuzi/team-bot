import { ACTIONS_BOT_SETTINGS } from "@tb-bot/settings/constant/actions.const";
import { ACTIONS_BOT_TONE } from "@tb-bot/tone/constant/actions.const";
import { ACTIONS_BOT_VPN } from "@tb-bot/vpn/constants/actions.const";

export const ACTIONS_BOT_MENU = {
	menuTone: {
		action: ACTIONS_BOT_TONE.menu.action,
		desc: ACTIONS_BOT_TONE.menu.desc,
	},
	menuSettings: {
		action: ACTIONS_BOT_SETTINGS.menu.action,
		desc: ACTIONS_BOT_SETTINGS.menu.desc
	},
	menuVpn: {
		action: ACTIONS_BOT_VPN.menu.action,
		desc: ACTIONS_BOT_VPN.menu.desc
	},
	back: {
		action: 'menu_back',
		desc: 'Выйти в меню',
	},
	exit: {
		action: 'menu_close',
		desc: 'Закрыть меню',
	},
};
