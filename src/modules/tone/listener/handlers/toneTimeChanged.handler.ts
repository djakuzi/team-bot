import {CronToneUpdateByTime} from '@tb-modules/tone/cron/toneUpdateTime.cron';
import {Injectable} from '@nestjs/common';
import {EventToneTimeChanged} from '@tb-modules/tone/events/toneTimeChanged.event';

@Injectable()
export class HandlerToneTimeChanged {
  constructor(private readonly cronToneUpdateByTime: CronToneUpdateByTime) {}

  private async activeHandlers(payload: EventToneTimeChanged) {
    this.cronToneUpdateByTime.updateScheduledTime(payload.newTime);
  }

  async execute(payload: EventToneTimeChanged) {
    await this.activeHandlers(payload);
  }
}
