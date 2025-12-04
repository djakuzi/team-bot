import { Injectable } from "@nestjs/common";
import { validateTimeFormat } from "@tb-common/utils/valid/validateTimeFormat.util";
import { RepoToneSettings } from "@tb-core/prisma/repo/tone/toneSettings.repo";

@Injectable()
export class StrategySetUpdatedTimeTone {
	constructor(
		private readonly repoToneSettings: RepoToneSettings,
	) { }

	async execute(time: string) {
		if (!validateTimeFormat(time)) {
			throw new Error('Неверный формат времени. Используйте hh:mm')
		}

		const result = await this.repoToneSettings.update({
			updateTime: time,
		});

		if (!result.updateTime) {
			throw new Error('Не удалось задать время изменение тона. Заданное время: ' + time);
		}

		return {
			updateTime: result.updateTime,
		}
	}
}
