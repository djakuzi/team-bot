import { Update, Ctx, Action } from 'nestjs-telegraf';
import { Context, Scenes } from 'telegraf';
import { ServiceTone } from '../../../../modules/tone/services/tone.service';
import { ServiceToneSettings } from '../../../../modules/tone/services/toneSettings.service';
import { getToneCommands } from './action/getToneCommands.action';
import { getToneTime } from './action/getToneTime.action';
import { getCurrentToneMode } from './action/getCurrentToneMode.action';
import { setToneMode } from './action/setToneMode.action';
import { buildInlineKeyboard } from '@tb-common/utils/bot/buildInlineKeyboard.util';
import { ACTIONS_BOT_TONE } from '../constant/actions.const';
import { ACTIONS_BOT_MENU } from '@tb-bot/modules/menu/constant/actions.const';

@Update()
export class ActionsBotTone {
	keyWaitUpdatedTime = 'waitUpdateToneByTime';

	constructor(
		private readonly serviceTone: ServiceTone,
		private readonly serviceToneSettings: ServiceToneSettings
	) { }

	@Action(ACTIONS_BOT_TONE.menu.action)
	async menuTone(@Ctx() ctx: Context) {
		const inline_keyboard = buildInlineKeyboard({
			buttons: ACTIONS_BOT_TONE,
			layout: 1,
			fallbackRowSize: 2,
			excludeValues: [ACTIONS_BOT_TONE.menu],
			additionalButtons: [ACTIONS_BOT_MENU.back]
		})


		await ctx.editMessageText('🎛 Раздел: Тон', {
			reply_markup: {
				inline_keyboard: inline_keyboard,
			},
		});
	}

	@Action(ACTIONS_BOT_TONE.add_new_tone_mode.action)
	async addNewToneTime(@Ctx() ctx: Scenes.WizardContext) {
		await ctx.scene.enter('add_new_tone_mode');
	}

	@Action(ACTIONS_BOT_TONE.set_tone_time.action)
	async setToneTime(@Ctx() ctx: Scenes.WizardContext) {
		await ctx.scene.enter('set_updated_tone_time');
	}

	@Action(/set_tone_.+/)
	async handleSetTone(@Ctx() ctx: Context) {
		await setToneMode(ctx, this.serviceTone, this.serviceToneSettings);
	}

	@Action(ACTIONS_BOT_TONE.get_current_tone_mode.action)
	async getToneMode(@Ctx() ctx: Context) {
		await getCurrentToneMode(ctx, this.serviceToneSettings, 'action');
	}

	@Action(ACTIONS_BOT_TONE.get_tone_time.action)
	async getToneTime(@Ctx() ctx: Context) {
		await getToneTime(ctx, this.serviceToneSettings, 'action');
	}

	@Action(ACTIONS_BOT_TONE.tone_commands.action)
	async getToneCommands(@Ctx() ctx: Context) {
		await getToneCommands(ctx, 'action');
	}
}
