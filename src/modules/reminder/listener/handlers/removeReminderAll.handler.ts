import {Injectable} from '@nestjs/common';
import {CronReminderExecute} from '@tb-modules/reminder/cron/reminderExecute.cron';
import {EventReminderRemoveAll} from '@tb-modules/reminder/events/removeAllReminder.event';

@Injectable()
export class HandlerRemoveReminderAll {
  constructor(private readonly cronReminderExecute: CronReminderExecute) {}

  private async activeHandlers(payload: EventReminderRemoveAll) {
    await this.cronReminderExecute.deleteAllScheduledReminders();
  }

  async execute(payload: EventReminderRemoveAll) {
    await this.activeHandlers(payload);
  }
}
