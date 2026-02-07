import { Injectable } from '@nestjs/common';
import { CronRetellingMessages } from "@tb-modules/message/cron/retellingMessages.cron";
import { EventMessageTimeRetellingChanged } from '@tb-modules/message/events/timeRetellingChanged.event';

@Injectable()
export class HandlerMessageTimeRetellingChanged {
    constructor(
        private readonly cronRetellingMessages: CronRetellingMessages,
    ) { }

    private async activeHandlers(payload: EventMessageTimeRetellingChanged) {
        this.cronRetellingMessages.updateScheduledRetellingMessage(payload.newTime);
    }

    async execute(payload: EventMessageTimeRetellingChanged) {
        await this.activeHandlers(payload);
    }
}
