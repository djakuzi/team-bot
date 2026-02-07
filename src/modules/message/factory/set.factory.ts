import { Injectable } from "@nestjs/common";
import { StrategySetTimeRetelling } from "./strategies/set/timeRetelling.strategy";

interface IStrategiesFabricSet {
	setTimeRetelling: StrategySetTimeRetelling,
}

@Injectable()
export class FactorySetMessage {
	private readonly strategies: IStrategiesFabricSet;

	constructor(
		private readonly setTimeRetelling: StrategySetTimeRetelling,
	) {
		this.strategies = {
			setTimeRetelling: setTimeRetelling,
		};
	}

	getStrategy<K extends keyof IStrategiesFabricSet>(name: K): IStrategiesFabricSet[K] {
		return this.strategies[name];
	}
}
