import {Injectable} from '@nestjs/common';
import {FactoryGetMessage} from '../factory/get.factory';
import {ServiceAi} from '@tb-core/external/ai/services/ai.service';

@Injectable()
export class ServiceMessageAi {
  constructor(
    private readonly factoryGetMessage: FactoryGetMessage,
    private readonly serviceAi: ServiceAi,
  ) {}

  async getRetellingMessages() {
    const strategy = this.factoryGetMessage.getStrategy('getMessagesByMethod');
    const messages = await strategy.execute({
      method: 'today',
      type: 'string',
    });

    const prompt = `
            Ты — помощник, который делает краткий, структурированный и читабельный пересказ переписки рабочего чата для Telegram.

            Требования к пересказу:
            1. Каждая главная тема выделяется жирным шрифтом через одинарные звёздочки, например, *Тема 1: ...*.
            2. Содержание под темой идёт с новой строки.
            3. Под каждой темой используй маркированный список (-) для ключевых пунктов.
            4. Важные решения, договорённости и задачи выделяй курсивом (одинарные подчёркивания).
            5. Отдельным пунктом выделяй серьёзные моменты.
            6. Кратко упоминай шутки, мемы, забавные моменты.
            7. Не добавляй ничего от себя, не придумывай факты.
            8. Максимальная длина ответа — 4096 символов.

            Пример:

            *Тема 1: Организация рабочего процесса*
            - Обсудили план на неделю.
            - _Назначили ответственных за задачу X._
            - Обсуждение задержки с релизом.

            *Тема 2: Технические вопросы*
            - Проанализировали баг в модуле Y.
            - _Решили временно откатить изменения._

            *Серьёзные моменты*
            - Обнаружена критическая уязвимость, требующая немедленного исправления.

            *Шутки и забавные моменты*
            - Коллега Иван рассказывал забавный анекдот про баги.

            ---

            Теперь переписка чата:

            ---
            ${messages}
            ---

            Сделай пересказ в указанном формате с Markdown-разметкой для Telegram.
        `;

    const retelling = await this.serviceAi.generateText(prompt);
    return retelling ?? 'Не удалсь получить пересказ';
  }
}
