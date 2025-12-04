import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventChangeTimeUpdatedTone } from '../events/changeTimeUpdatedTone.event';
import { HandlerChangeTimeUpdatedTone } from './handlers/changeTimeUpdatedTone.handler';

@Injectable()
export class ListenerTone {
	constructor(
		private readonly handlerChangeTimeUpdatedTone: HandlerChangeTimeUpdatedTone,
	) { }

	@OnEvent(EventChangeTimeUpdatedTone.eventName)
	async handleChangeTimeUpdatedTone(payload: EventChangeTimeUpdatedTone) {
		await this.handlerChangeTimeUpdatedTone.execute(payload);
	}
}
