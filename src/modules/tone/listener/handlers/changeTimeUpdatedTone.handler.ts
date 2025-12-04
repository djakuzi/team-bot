import { CronToneUpdateByTime } from "@tb-modules/tone/cron/CronToneUpdateTime.service";
import { EventChangeTimeUpdatedTone } from "@tb-modules/tone/events/changeTimeUpdatedTone.event";
import { Injectable } from '@nestjs/common';

@Injectable()
export class HandlerChangeTimeUpdatedTone {
	constructor(
		private readonly cronToneUpdateByTime: CronToneUpdateByTime,
	) { }

	private async changeTimeUpdatedTone(payload: EventChangeTimeUpdatedTone) {
		this.cronToneUpdateByTime.updateScheduledTime(payload.newTime);
	}

	async execute(payload: EventChangeTimeUpdatedTone) {
		await this.changeTimeUpdatedTone(payload);
	}
}
