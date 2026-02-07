import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { HandlerReminderChanged } from './handlers/reminderChanged.handler';
import { EventReminderChanged } from '../events/changeDataReminder.event';
import { EventReminderAdded } from '../events/reminderAdded.event';
import { HandlerReminderAdded } from './handlers/reminderAdded.handler';

@Injectable()
export class ListenerReminder {
    constructor(
        private readonly handlerReminderChanged: HandlerReminderChanged,
        private readonly handlerReminderAdded: HandlerReminderAdded,
    ) { }

    @OnEvent(EventReminderChanged.eventName)
    async onReminderChanged(payload: EventReminderChanged) {
        await this.handlerReminderChanged.execute(payload);
    }

    @OnEvent(EventReminderAdded.eventName)
    async onReminderAdded(payload: EventReminderAdded) {
        await this.handlerReminderAdded.execute(payload);
    }
}
