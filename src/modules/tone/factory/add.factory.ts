import { Injectable } from "@nestjs/common";
import { StrategyAddNewToneMode } from "./strategies/add/newToneMode.strategy";

interface IStrategiesFabricAdd {
	newToneMode: StrategyAddNewToneMode
}

@Injectable()
export class FactoryAddTone {
	private readonly strategies: IStrategiesFabricAdd;

	constructor(
		private readonly addNewToneMode: StrategyAddNewToneMode
	) {
		this.strategies = {
			newToneMode: addNewToneMode
		};
	}

	getStrategy<K extends keyof IStrategiesFabricAdd>(name: K): IStrategiesFabricAdd[K] {
		return this.strategies[name];
	}
}
