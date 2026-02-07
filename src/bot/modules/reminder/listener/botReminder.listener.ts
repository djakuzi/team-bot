import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { HandlerReminderExecuted } from './handlers/reminderExecuted.handle';
import { EventReminderExecute } from '@tb-modules/reminder/events/executeReminder.event';

@Injectable()
export class ListenerBotReminder {
    constructor(
        private readonly handlerReminderExecuted: HandlerReminderExecuted
    ) { }

    @OnEvent(EventReminderExecute.eventName)
    async onReminderExecute(payload: EventReminderExecute) {
        await this.handlerReminderExecuted.execute(payload);
    }
}
