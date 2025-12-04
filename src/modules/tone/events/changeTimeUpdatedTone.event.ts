import { EventBase } from '@tb-core/event/type/EventBase.type';

export class EventChangeTimeUpdatedTone extends EventBase {
	static readonly eventName = 'tone.change.time';
	readonly nameEvent = EventChangeTimeUpdatedTone.eventName;

	constructor(
		public readonly newTime: string,
		infoEvent?: EventChangeTimeUpdatedTone['infoEvent']
	) {
		super(infoEvent);

		this.newTime = newTime;
	}
}
