import {Injectable} from '@nestjs/common';
import {RepoMessageSettings} from '@tb-core/prisma/repo/message/messageSettings.tepo';

@Injectable()
export class StrategySetPromtRetelling {
  constructor(private readonly repoMessageSettings: RepoMessageSettings) {}

  async execute(promt: string) {
    if (promt.length === 0) {
      throw new Error('Промт не может быть пустым');
    }

    const result = await this.repoMessageSettings.update({
      promt: promt,
    });

    if (!result.promt) {
      throw new Error(
        'Не удалось обновить промт для анализа сообщений. Промт: ' + promt,
      );
    }

    return {
      promt: result.promt,
    };
  }
}
