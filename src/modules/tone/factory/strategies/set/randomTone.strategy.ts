import {Injectable} from '@nestjs/common';
import {getRandomIndexByList} from '@tb-common/utils/сalc/randomIndexByList.util';
import {RepoTone} from '@tb-core/prisma/repo/tone/tone.repo';
import {RepoToneSettings} from '@tb-core/prisma/repo/tone/toneSettings.repo';

@Injectable()
export class StrategySetRandomToneMode {
  constructor(
    readonly repoTone: RepoTone,
    readonly repoToneSettings: RepoToneSettings,
  ) {}

  async execute() {
    const listTone = await this.repoTone.findAll();
    const randomTone = listTone[getRandomIndexByList(listTone)];

    if (!randomTone) {
      throw new Error('No tones found');
    }

    await this.repoToneSettings.update({
      tone: {
        connect: {id: randomTone.id},
      },
    });

    return randomTone;
  }
}
