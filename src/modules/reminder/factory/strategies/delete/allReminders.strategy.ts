import {Injectable} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';
import {RepoReminder} from '@tb-core/prisma/repo/reminder/reminder.repo';
import {EventReminderRemoveAll} from '@tb-modules/reminder/events/removeAllReminder.event';

@Injectable()
export class StrategyDeleteAllReminders {
  constructor(
    private readonly repoReminder: RepoReminder,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute() {
    const result = await this.repoReminder.deleteAll();

    if (result) {
      this.eventEmitter.emit(
        EventReminderRemoveAll.eventName,
        new EventReminderRemoveAll(),
      );
    }

    return result;
  }
}
