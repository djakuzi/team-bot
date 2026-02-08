import {Injectable} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';
import {LibTime} from '@tb-core/libs/time/index.lib';
import {RepoToneSettings} from '@tb-core/prisma/repo/tone/toneSettings.repo';
import {EventToneTimeChanged} from '@tb-modules/tone/events/toneTimeChanged.event';

@Injectable()
export class StrategySetUpdatedTimeTone {
  constructor(
    private readonly repoToneSettings: RepoToneSettings,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(time: string) {
    LibTime.validate(time, 'hh:mm', true);

    const result = await this.repoToneSettings.update({
      updateTime: time,
    });

    if (!result.updateTime) {
      throw new Error(
        'Не удалось задать время изменение тона. Заданное время: ' + time,
      );
    }

    this.eventEmitter.emit(
      EventToneTimeChanged.eventName,
      new EventToneTimeChanged(result.updateTime, {isCron: false}),
    );

    return {
      updateTime: result.updateTime,
    };
  }
}
