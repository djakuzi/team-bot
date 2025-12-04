import { Injectable } from "@nestjs/common";
import { RepoToneSettings } from "@tb-core/prisma/repo/tone/toneSettings.repo";

@Injectable()
export class StrategyGetSettingsTone {
	constructor(
		private readonly repoToneSettings: RepoToneSettings,
	) {}
	
	async execute() {
		return this.repoToneSettings.findOne();
	}
}
