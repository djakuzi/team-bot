import { Injectable } from "@nestjs/common";
import { StrategyGetSettingsTone } from "./strategies/get/toneSettings.strategy";
import { StrategyGetListTone } from "./strategies/get/listTone.strategy";
import { StrategyGetToneMode } from "./strategies/get/toneMode.strategy";

interface IStrategiesFabricGet {
	settingsTone: StrategyGetSettingsTone;
	listTone: StrategyGetListTone;
	toneMode: StrategyGetToneMode;
}

@Injectable()
export class FactoryGetTone {
	private readonly strategies: IStrategiesFabricGet;

	constructor(
		private readonly getSettingsTone: StrategyGetSettingsTone,
		private readonly getListTone: StrategyGetListTone,
		private readonly getToneMode: StrategyGetToneMode,
	) {
		this.strategies = {
			settingsTone: getSettingsTone,
			listTone: getListTone,
			toneMode: getToneMode,
		};
	}

	getStrategy<K extends keyof IStrategiesFabricGet>(name: K): IStrategiesFabricGet[K] {
		return this.strategies[name];
	}
}
