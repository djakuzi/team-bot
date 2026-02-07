import { Injectable } from "@nestjs/common";
import { RepoMessageSettings } from "@tb-core/prisma/repo/message/messageSettings.tepo";

@Injectable()
export class StrategyGetSettingsMessages {
	constructor(
		private readonly repoMessageSettings: RepoMessageSettings,
	) {}
	
	async execute() {
		return this.repoMessageSettings.findOne();
	}
}
