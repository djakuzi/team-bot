import { Injectable } from '@nestjs/common';
import { CronReminderExecute } from "@tb-modules/reminder/cron/reminderExecute.cron";
import { EventReminderChanged } from "@tb-modules/reminder/events/changeDataReminder.event";

@Injectable()
export class HandlerReminderChanged {
    constructor(
        private readonly cronReminderExecute: CronReminderExecute,
    ) { }

    private async activeHandlers(payload: EventReminderChanged) {
        this.cronReminderExecute.restartScheduledReminder(payload.reminder);
    }

    async execute(payload: EventReminderChanged) {
        await this.activeHandlers(payload);
    }
}
