import {Injectable} from '@nestjs/common';
import {RepoReminder} from '@tb-core/prisma/repo/reminder/reminder.repo';

@Injectable()
export class StrategyGetListReminders {
  constructor(readonly repoReminder: RepoReminder) {}

  async execute() {
    return this.repoReminder.findAll();
  }
}
