import { Injectable } from "@nestjs/common";
import { FactoryGetMessage } from "../factory/get.factory";
import { ServiceAi } from "@tb-core/external/ai/services/ai.service";


@Injectable()
export class ServiceMessageAi {
	constructor(
		private readonly factoryGetMessage: FactoryGetMessage,
		private readonly serviceAi: ServiceAi,
	) { }

	async getRetellingMessages() {
		const strategy = this.factoryGetMessage.getStrategy('getMessagesByMethod');
		const messages = await strategy.execute(
            { 
                method: 'today',
                type: 'string'
            }
        );

		const prompt = `
			Ты — помощник, который делает краткий пересказ переписки рабочего чата.

			Вот требования:
			1. Выдели главные темы обсуждений.
			2. Отметь важные решения, договорённости и задачи.
			3. Покажи серьёзные моменты (отдельным пунктом).
			4. Найди и упомяни шутки, забавные моменты, мемы — но коротко.
			5. Не добавляй ничего от себя, не придумывай факты.
			6. Пересказ должен быть кратким, структурированным и понятным.
			7. Максимальное количетво символов для пересказа 4096.

			Теперь переписка чата:
			---
			${messages}
			---
			Сделай пересказ.
		`;

		const retelling = await this.serviceAi.generateText(prompt);
		return retelling ?? 'Не удалсь получить пересказ';
	}

}
