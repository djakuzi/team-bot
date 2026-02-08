import {Reminder} from '@prisma/client';
import {EventBase} from '@tb-core/event/type/EventBase.type';

export class EventReminderChanged extends EventBase {
  static readonly eventName = 'reminder.changed';
  readonly nameEvent = EventReminderChanged.eventName;

  constructor(
    public readonly reminder: Reminder,
    infoEvent?: EventReminderChanged['infoEvent'],
  ) {
    super(infoEvent);

    this.reminder = reminder;
  }
}
