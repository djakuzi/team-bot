import {Injectable} from '@nestjs/common';
import {ExceptionResourceNotFound} from '@tb-common/exception/resourceNotFound.exception';
import {RepoToneSettings} from '@tb-core/prisma/repo/tone/toneSettings.repo';

@Injectable()
export class StrategyGetCurrentTone {
  constructor(private readonly repoToneSettings: RepoToneSettings) {}

  async execute() {
    const res = await this.repoToneSettings.findOne({
      include: {
        tone: true,
      },
    });

    if (!res?.tone) {
      throw new ExceptionResourceNotFound('Текущий режим тона не найден');
    }

    return {
      desc: res.tone.desc,
      name: res.tone.name,
    };
  }
}
