import { Injectable } from "@nestjs/common";
import { StrategyDeleteAllReminders } from "./strategies/delete/allReminders.strategy";

interface IStrategiesFabricAdd {
    deleteAllReminders: StrategyDeleteAllReminders
}

@Injectable()
export class FactoryDeleteReminder {
	private readonly strategies: IStrategiesFabricAdd;

	constructor(
        private readonly deleteAllReminders: StrategyDeleteAllReminders
	) {
		this.strategies = {
            deleteAllReminders: deleteAllReminders
		};
	}

	getStrategy<K extends keyof IStrategiesFabricAdd>(name: K): IStrategiesFabricAdd[K] {
		return this.strategies[name];
	}
}
