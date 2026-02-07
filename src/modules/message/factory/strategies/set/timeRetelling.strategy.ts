import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { LibTime } from "@tb-core/libs/time/index.lib";
import { RepoMessageSettings } from "@tb-core/prisma/repo/message/messageSettings.tepo";
import { EventMessageTimeRetellingChanged } from "@tb-modules/message/events/timeRetellingChanged.event";

@Injectable()
export class StrategySetTimeRetelling {
    constructor(
        private readonly repoMessageSettings: RepoMessageSettings,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async execute(time: string) {
        LibTime.validate(time, 'hh:mm', true);

        const result = await this.repoMessageSettings.update({
            updateTime: time,
        });

        if (!result.updateTime) {
            throw new Error('Не удалось задать время пересказа сообщений. Заданное время: ' + time);
        }

        this.eventEmitter.emit(
            EventMessageTimeRetellingChanged.eventName,
            new EventMessageTimeRetellingChanged(result.updateTime, { isCron: false })
        );

        return {
            updateTime: result.updateTime,
        }
    }
}
