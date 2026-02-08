import {EventBase} from '@tb-core/event/type/EventBase.type';

export class EventToneTimeChanged extends EventBase {
  static readonly eventName = 'tone.change.time';
  readonly nameEvent = EventToneTimeChanged.eventName;

  constructor(
    public readonly newTime: string,
    infoEvent?: EventToneTimeChanged['infoEvent'],
  ) {
    super(infoEvent);

    this.newTime = newTime;
  }
}
