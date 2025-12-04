import { EventBase } from '@tb-core/event/type/EventBase.type';

export class EventToneUpdatedByTime extends EventBase  {
	static readonly eventName = 'tone.update.by.time';
	readonly nameEvent = EventToneUpdatedByTime.eventName;

	constructor(
		public readonly newTone: string,
		public readonly descTone: string,
		infoEvent?: EventToneUpdatedByTime['infoEvent']
	) {
		super(infoEvent);

		this.descTone = descTone;
		this.newTone = newTone;
	}
}
