import { Injectable } from "@nestjs/common";
import { StrategyGetListReminders } from "./strategies/get/listReminders.strategy";
import { StrategyGetOneReminder } from "./strategies/get/oneReminder.strategy";

interface IStrategiesFabricGet {
    listReminders: StrategyGetListReminders;
    oneReminder: StrategyGetOneReminder;
}

@Injectable()
export class FactoryGetReminder {
	private readonly strategies: IStrategiesFabricGet;

	constructor(
        private readonly getlistReminders: StrategyGetListReminders,
        private readonly getoneReminder: StrategyGetOneReminder,
	) {
		this.strategies = {
			listReminders: getlistReminders,
			oneReminder: getoneReminder,
		};
	}

	getStrategy<K extends keyof IStrategiesFabricGet>(name: K): IStrategiesFabricGet[K] {
		return this.strategies[name];
	}
}
