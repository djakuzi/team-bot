import { Injectable } from "@nestjs/common";
import { FactoryGetTone } from "../factory/get.factory";
import { FactorySetTone } from "../factory/set.factory";
import { validateTimeFormat } from "@tb-common/utils/valid/validateTimeFormat.util";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EventChangeTimeUpdatedTone } from "../events/changeTimeUpdatedTone.event";

@Injectable()
export class ServiceToneSettings {
	constructor(
		private readonly factoryGetTone: FactoryGetTone,
		private readonly factorySetTone: FactorySetTone,
		private readonly eventEmitter: EventEmitter2,
	) {
	}

	async setUpdatedToneTime(time: string) {
		validateTimeFormat(time, 'hh:mm', true);

		const strategy = this.factorySetTone.getStrategy('updatedTimeMode');
		const result = await strategy.execute(time);
		
		this.eventEmitter.emit(
			EventChangeTimeUpdatedTone.eventName,
			new EventChangeTimeUpdatedTone(result.updateTime, { isCron: false })
		);

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
		const strategy = this.factoryGetTone.getStrategy('settingsTone');
		const res = await strategy.execute();

		return res;
	}
}
