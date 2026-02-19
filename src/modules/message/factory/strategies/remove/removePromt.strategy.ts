import {Injectable} from '@nestjs/common';
import {RepoMessageSettings} from '@tb-core/prisma/repo/message/messageSettings.tepo';

@Injectable()
export class StrategyRemovePrompt {
  constructor(private readonly repoMessageSettings: RepoMessageSettings) {}

  async execute() {
    const result = await this.repoMessageSettings.update({
      prompt: null,
    });

    if (!result.prompt) {
      throw new Error('Не удалось удалить промт для анализа сообщений');
    }

    return {
      prompt: result.prompt,
    };
  }
}
