import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Prisma } from "@prisma/client";
import { RepoReminder } from "@tb-core/prisma/repo/reminder/reminder.repo";
import { EventReminderChanged } from "@tb-modules/reminder/events/changeDataReminder.event";

@Injectable()
export class StrategyChangeDataReminder {
    constructor(
        private readonly repoReminder: RepoReminder,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(id: number, data: Prisma.ReminderUpdateInput) {
        const resultUpdate = await this.repoReminder.update(id, data);

        if (resultUpdate) {
            this.eventEmitter.emit(
                EventReminderChanged.eventName,
                new EventReminderChanged(resultUpdate)
            );
        }

        return resultUpdate;
    }
}
