import { Injectable } from "@nestjs/common";
import { StrategyGetlMemoryStorage } from "./strategies/get/memoryStorage.strategy";
import { StrategyGetMessagesByMethod } from "./strategies/get/messagesByMethod.strategy";
import { StrategyGetSettingsMessages } from "./strategies/get/messageSettings.strategy";

interface IStrategiesFabricGet {
	getSizeMemory: StrategyGetlMemoryStorage;
	getMessagesByMethod: StrategyGetMessagesByMethod;
	getSettingsMessages: StrategyGetSettingsMessages;
}

@Injectable()
export class FactoryGetMessage {
	private readonly strategies: IStrategiesFabricGet;

	constructor(
		private readonly getSizeMemory: StrategyGetlMemoryStorage,
		private readonly getMessagesByMethod: StrategyGetMessagesByMethod,
		private readonly getSettingsMessages: StrategyGetSettingsMessages
	) {
		this.strategies = {
			getSizeMemory: getSizeMemory,
			getMessagesByMethod: getMessagesByMethod,
			getSettingsMessages: getSettingsMessages
		};
	}

	getStrategy<K extends keyof IStrategiesFabricGet>(name: K): IStrategiesFabricGet[K] {
		return this.strategies[name];
	}
}
