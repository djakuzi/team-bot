import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventToneUpdatedByTime } from '@tb-modules/tone/events/updateToneByTime.event';
import { HandlerToneUpdatedByTime } from './handlers/toneUpdatedByTime.handler';

@Injectable()
export class ListenerBotTone {
	constructor(
		private readonly handlerToneUpdatedByTime: HandlerToneUpdatedByTime,
	) { }

	@OnEvent(EventToneUpdatedByTime.eventName)
	async handleToneUpdatedByTime(payload: EventToneUpdatedByTime) {
		await this.handlerToneUpdatedByTime.execute(payload);
	}
}
