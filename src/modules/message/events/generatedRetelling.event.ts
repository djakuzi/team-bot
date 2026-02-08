import {EventBase} from '@tb-core/event/type/EventBase.type';

export class EventMessageRetellingGenerated extends EventBase {
  static readonly eventName = 'message.generate.retelling-message';
  readonly nameEvent = EventMessageRetellingGenerated.eventName;

  constructor(
    public readonly retelling: string,
    infoEvent?: EventMessageRetellingGenerated['infoEvent'],
  ) {
    super(infoEvent);

    this.retelling = retelling;
  }
}
