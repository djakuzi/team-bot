import { EventBase } from '@tb-core/event/type/EventBase.type';

export class EventMessageTimeRetellingChanged extends EventBase {
    static readonly eventName = 'message.change.time-retelling';
    readonly nameEvent = EventMessageTimeRetellingChanged.eventName;

    constructor(
        public readonly newTime: string,
        infoEvent?: EventMessageTimeRetellingChanged['infoEvent']
    ) {
        super(infoEvent);

        this.newTime = newTime;
    }
}
