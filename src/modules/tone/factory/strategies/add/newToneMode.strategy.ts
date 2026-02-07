import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { RepoTone } from "@tb-core/prisma/repo/tone/tone.repo";

@Injectable()
export class StrategyAddNewToneMode {
	constructor(
		readonly repoTone: RepoTone,
	) {}
	
    async execute(args: Prisma.ToneCreateInput) {
		args.name.toUpperCase();
		const tone = await this.repoTone.create(args);
		return tone;
	}
}
