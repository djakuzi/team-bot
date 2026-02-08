import {Injectable} from '@nestjs/common';
import {CronReminderExecute} from '@tb-modules/reminder/cron/reminderExecute.cron';
import {EventReminderAdded} from '@tb-modules/reminder/events/reminderAdded.event';

@Injectable()
export class HandlerReminderAdded {
  constructor(private readonly cronReminderExecute: CronReminderExecute) {}

  private async activeHandlers(payload: EventReminderAdded) {
    this.cronReminderExecute.addedScheduledReminder(payload.reminder);
  }

  async execute(payload: EventReminderAdded) {
    await this.activeHandlers(payload);
  }
}
