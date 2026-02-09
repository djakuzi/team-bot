import {EventBase} from '@tb-core/event/type/EventBase.type';

export class EventReminderRemoveAll extends EventBase {
  static readonly eventName = 'reminder.remove.all';
  readonly nameEvent = EventReminderRemoveAll.eventName;

  constructor(infoEvent?: EventReminderRemoveAll['infoEvent']) {
    super(infoEvent);
  }
}
