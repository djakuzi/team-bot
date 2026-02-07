import { Reminder } from '@prisma/client';
import { EventBase } from '@tb-core/event/type/EventBase.type';

export class EventReminderExecute extends EventBase {
    static readonly eventName = 'reminder.execute';
    readonly nameEvent = EventReminderExecute.eventName;

    constructor(
        public readonly reminder: Reminder,
        infoEvent?: EventReminderExecute['infoEvent']
    ) {
        super(infoEvent);

        this.reminder = reminder;
    }
}
