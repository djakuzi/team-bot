import {Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {HandlerReminderChanged} from './handlers/reminderChanged.handler';
import {EventReminderChanged} from '../events/changeDataReminder.event';
import {EventReminderAdded} from '../events/reminderAdded.event';
import {HandlerReminderAdded} from './handlers/reminderAdded.handler';
import {EventReminderRemoveAll} from '../events/removeAllReminder.event';
import {HandlerRemoveReminderAll} from './handlers/removeReminderAll.handler';

@Injectable()
export class ListenerReminder {
  constructor(
    private readonly handlerReminderChanged: HandlerReminderChanged,
    private readonly handlerReminderAdded: HandlerReminderAdded,
    private readonly handlerRemoveReminderAll: HandlerRemoveReminderAll,
  ) {}

  @OnEvent(EventReminderChanged.eventName)
  async onReminderChanged(payload: EventReminderChanged) {
    await this.handlerReminderChanged.execute(payload);
  }

  @OnEvent(EventReminderAdded.eventName)
  async onReminderAdded(payload: EventReminderAdded) {
    await this.handlerReminderAdded.execute(payload);
  }

  @OnEvent(EventReminderRemoveAll.eventName)
  async onReminderRemoveAll(payload: EventReminderRemoveAll) {
    await this.handlerRemoveReminderAll.execute(payload);
  }
}
