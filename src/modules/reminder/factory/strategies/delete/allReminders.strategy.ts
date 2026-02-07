import { Injectable } from "@nestjs/common";
import { RepoReminder } from "@tb-core/prisma/repo/reminder/reminder.repo";

@Injectable()
export class StrategyDeleteAllReminders {
    constructor(
        private readonly repoReminder: RepoReminder,
    ) { }

    async execute() {
        return this.repoReminder.deleteAll();
    }
}
