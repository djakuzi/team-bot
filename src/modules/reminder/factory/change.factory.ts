import { Injectable } from "@nestjs/common";
import { StrategyChangeDataReminder } from "./strategies/change/changeReminder.strategy";

interface IStrategiesFabricSet {
    changeDataReminder: StrategyChangeDataReminder;
}

@Injectable()
export class FactoryChangeReminder {
	private readonly strategies: IStrategiesFabricSet;

	constructor(
		private readonly changeDataReminder: StrategyChangeDataReminder,

	) {
		this.strategies = {
            changeDataReminder: changeDataReminder,
		};
	}

	getStrategy<K extends keyof IStrategiesFabricSet>(name: K): IStrategiesFabricSet[K] {
		return this.strategies[name];
	}
}
