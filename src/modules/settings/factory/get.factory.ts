import { Injectable } from "@nestjs/common";
import { StrategyGetSettings } from "./strategies/get/getSettings.strategy";

interface IStrategiesFabricGet {
	getSettings: StrategyGetSettings,
}

@Injectable()
export class FactoryGetSettings {
	private readonly strategies: IStrategiesFabricGet;

	constructor(
		private readonly getSettings: StrategyGetSettings,
	) {
		this.strategies = {
			getSettings: getSettings,
		};
	}

	getStrategy<K extends keyof IStrategiesFabricGet>(name: K): IStrategiesFabricGet[K] {
		return this.strategies[name];
	}
}
