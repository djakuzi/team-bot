export interface IEventBaseInfo {
  isCron: boolean;
}

export abstract class EventBase<INFO extends IEventBaseInfo = IEventBaseInfo> {
  abstract readonly nameEvent: string;

  readonly infoEvent = {
    isCron: false,
  };

  constructor(infoEvent?: Partial<INFO>) {
    this.infoEvent = {
      isCron: false,
      ...infoEvent,
    } as INFO;
  }
}
