import { EventToneUpdatedByTime } from "@tb-modules/tone/events/updateToneByTime.event";
import { Telegraf } from "telegraf";
import { Injectable } from '@nestjs/common';
import { InjectBot } from "nestjs-telegraf";
import { ServiceSettings } from "@tb-modules/settings/services/settings.service";

@Injectable()
export class HandlerToneUpdatedByTime {
	constructor(
		@InjectBot() private readonly bot: Telegraf,
		private readonly serviceSettings: ServiceSettings,
	) {}

	private async updatedToneByTime(payload: EventToneUpdatedByTime) {
		const id = await this.serviceSettings.getSettings(true);

		await this.bot.telegram.sendMessage(
			id.connectedIdChat + '',
			`Тон был обновлён на ${payload.newTone} по расписанию.`
		);
	}

	async execute(payload: EventToneUpdatedByTime) {
		await this.updatedToneByTime(payload);
	}
}
