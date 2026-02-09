import {Injectable} from '@nestjs/common';
import {RepoMessageSettings} from '@tb-core/prisma/repo/message/messageSettings.tepo';

@Injectable()
export class StrategyRemovePromt {
  constructor(private readonly repoMessageSettings: RepoMessageSettings) {}

  async execute() {
    const result = await this.repoMessageSettings.update({
      promt: null,
    });

    if (!result.promt) {
      throw new Error('Не удалось удалить промт для анализа сообщений');
    }

    return {
      promt: result.promt,
    };
  }
}
