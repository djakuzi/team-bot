import {Injectable} from '@nestjs/common';
import {RepoMessageSettings} from '@tb-core/prisma/repo/message/messageSettings.tepo';

@Injectable()
export class StrategySetPromptRetelling {
  constructor(private readonly repoMessageSettings: RepoMessageSettings) {}

  async execute(prompt: string) {
    if (prompt.length === 0) {
      throw new Error('Промт не может быть пустым');
    }

    const result = await this.repoMessageSettings.update({
      prompt: prompt,
    });

    if (!result.prompt) {
      throw new Error(
        'Не удалось обновить промт для анализа сообщений. Промт: ' + prompt,
      );
    }

    return {
      prompt: result.prompt,
    };
  }
}
