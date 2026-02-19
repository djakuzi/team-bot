import {Injectable} from '@nestjs/common';
import {FactoryGetMessage} from '../factory/get.factory';
import {ServiceAi} from '@tb-core/external/ai/services/ai.service';
import {ServiceMessageSettings} from './messageSettings.service';

@Injectable()
export class ServiceMessageAi {
  prompt = `
        Ты — помощник, который делает краткий, структурированный и читабельный пересказ переписки рабочего чата.

        Требования к пересказу:
        1. Каждая главная тема выделяется жирным шрифтом через одинарные звёздочки, например, *Тема 1: ...*.
        2. Содержание под темой идёт с новой строки.
        5. Отдельным пунктом выделяй серьёзные моменты.
        6. Упоминай шутки, мемы, забавные моменты.
        7. Не добавляй ничего от себя, не придумывай факты.
        8. Максимальная длина ответа — 4096 символов.
    `;

  constructor(
    private readonly serviceMessageSettings: ServiceMessageSettings,
    private readonly factoryGetMessage: FactoryGetMessage,
    private readonly serviceAi: ServiceAi,
  ) {}

  async getRetellingMessages() {
    const strategy = this.factoryGetMessage.getStrategy('getMessagesByMethod');
    const prompt =
      (await this.serviceMessageSettings.getPrompt()) ?? this.prompt;

    const messages = await strategy.execute({
      method: 'today',
      type: 'string',
    });

    const resPrompt = `
            ${prompt}
            ---

            Теперь переписка чата:

            ---
            ${messages}
            ---

            Максимальная длина анализа — 4096 символов.
        `;

    const retelling = await this.serviceAi.generateText({
      prompt: resPrompt,
      maxTokens: 4096,
      systemPrompt:
        'Ты — помощник, который делает краткий, структурированный и читабельный пересказ cообщений в чате.',
      temperature: 0.8,
    });

    return retelling ?? 'Не удалось получить пересказ';
  }
}
