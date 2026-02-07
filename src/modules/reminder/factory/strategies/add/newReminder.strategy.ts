import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Prisma } from "@prisma/client";
import { RepoReminder } from "@tb-core/prisma/repo/reminder/reminder.repo";
import { EventReminderAdded } from "@tb-modules/reminder/events/reminderAdded.event";

@Injectable()
export class StrategyAddNewReminder {
    constructor(
        private readonly repoReminder: RepoReminder,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(args: Prisma.ReminderCreateInput) {
        const reminder = await this.repoReminder.create(args);

        if (reminder) {
            this.eventEmitter.emit(
                EventReminderAdded.eventName,
                new EventReminderAdded(reminder)
            );
        }

        return reminder;
    }
}
