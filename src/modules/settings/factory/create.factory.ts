import { Injectable } from "@nestjs/common";
import { StrategyCreateBaseSettings } from "./strategies/create/baseSettings.strategy";

interface IStrategiesFabricCreate {
	сreateBaseSettings: StrategyCreateBaseSettings,
}

@Injectable()
export class FactoryCreateSettings {
	private readonly strategies: IStrategiesFabricCreate;

	constructor(
		private readonly сreateBaseSettings: StrategyCreateBaseSettings,
	) {
		this.strategies = {
			сreateBaseSettings: сreateBaseSettings,
		};
	}

	getStrategy<K extends keyof IStrategiesFabricCreate>(name: K): IStrategiesFabricCreate[K] {
		return this.strategies[name];
	}
}
