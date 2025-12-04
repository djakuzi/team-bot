import { Injectable } from "@nestjs/common";
import { RepoTone } from "@tb-core/prisma/repo/tone/tone.repo";
import { RepoToneSettings } from "@tb-core/prisma/repo/tone/toneSettings.repo";


@Injectable()
export class StrategySetToneMode {
	constructor(
		readonly repoTone: RepoTone,
		readonly repoToneSettings: RepoToneSettings,
	) {}
	
	async execute(name: string) {
		if (!name) {
			throw new Error('Не передано название тона');
		}

		const listTone = await this.repoTone.findByName(name);

		if (!listTone) {
			throw new Error('Данный тон не найден: ' + name);
		}

		return await this.repoToneSettings.update({
			tone: {
				connect: { id: listTone.id },
			},
		});
	}
}
