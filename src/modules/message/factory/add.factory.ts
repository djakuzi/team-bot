import { Injectable } from "@nestjs/common";
import { StrategyAddMessage } from "./strategies/add/addMessag.strategy";

interface IStrategiesFabricAdd {
	addMessage: StrategyAddMessage,
}

@Injectable()
export class FactoryAddMessage {
	private readonly strategies: IStrategiesFabricAdd;

	constructor(
		private readonly addMessage: StrategyAddMessage,
	) {
		this.strategies = {
			addMessage: addMessage,
		};
	}

	getStrategy<K extends keyof IStrategiesFabricAdd>(name: K): IStrategiesFabricAdd[K] {
		return this.strategies[name];
	}
}
