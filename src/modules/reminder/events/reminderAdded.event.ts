import { Reminder } from '@prisma/client';
import { EventBase } from '@tb-core/event/type/EventBase.type';

export class EventReminderAdded extends EventBase {
	static readonly eventName = 'reminder.added';
    readonly nameEvent = EventReminderAdded.eventName;

	constructor(
        public readonly reminder: Reminder,
        infoEvent?: EventReminderAdded['infoEvent']
	) {
		super(infoEvent);

        this.reminder = reminder;
	}
}
