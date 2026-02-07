import { Injectable } from "@nestjs/common";
import { FactoryGetTone } from "../factory/get.factory";
import { FactorySetTone } from "../factory/set.factory";

@Injectable()
export class ServiceToneSettings {
	constructor(
		private readonly factoryGetTone: FactoryGetTone,
		private readonly factorySetTone: FactorySetTone,
	) {
	}

	async setUpdatedToneTime(time: string) {
		const strategy = this.factorySetTone.getStrategy('updatedTimeMode');
		const result = await strategy.execute(time);
	
		return result;
	}

	async setRandomTone() {
		const strategy = this.factorySetTone.getStrategy('randomMode');
		const result = await strategy.execute();

		return result;
	}

	async setToneModeByName(name: string) {
		const strategy = this.factorySetTone.getStrategy('toneMode');
		return await strategy.execute(name)
	}

	async getToneTime() {
		const strategy = this.factoryGetTone.getStrategy('settingsTone');
		const res = await strategy.execute()

		return res?.updateTime;
	}

	async getCurrnetTone() {
		const strategy = this.factoryGetTone.getStrategy('getCurrentTone');
		const result = await strategy.execute();

		return result;
	}
}
