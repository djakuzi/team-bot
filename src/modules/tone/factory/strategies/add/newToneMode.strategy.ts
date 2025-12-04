import { Injectable } from "@nestjs/common";
import { Tone } from "@prisma/client";
import { RepoTone } from "@tb-core/prisma/repo/tone/tone.repo";

export type TypeArgsStrategyAddTone = Omit<Tone, 'id'>;

@Injectable()
export class StrategyAddNewToneMode {
	constructor(
		readonly repoTone: RepoTone,
	) {}
	
	async execute(args: TypeArgsStrategyAddTone) {
		args.name.toUpperCase();
		const tone = await this.repoTone.create(args);
		return tone;
	}
}
