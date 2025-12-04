import { FactoryAddTone } from "../../modules/tone/factory/add.factory";
import { FactoryGetTone } from "../../modules/tone/factory/get.factory";
import { FactorySetTone } from "../../modules/tone/factory/set.factory";
import { ServiceTone } from "../../modules/tone/services/tone.service";
import { ServiceToneSettings } from "../../modules/tone/services/toneSettings.service";
import { StrategyAddNewToneMode } from "./factory/strategies/add/newToneMode.strategy";
import { StrategyGetListTone } from "./factory/strategies/get/listTone.strategy";
import { StrategyGetToneMode } from "./factory/strategies/get/toneMode.strategy";
import { StrategyGetSettingsTone } from "./factory/strategies/get/toneSettings.strategy";
import { StrategySetRandomToneMode } from "./factory/strategies/set/randomTone.strategy";
import { StrategySetToneMode } from "./factory/strategies/set/toneMode.strategy";
import { StrategySetUpdatedTimeTone } from "./factory/strategies/set/updatedTimeTone.strategy";
import { CronToneUpdateByTime } from "./cron/CronToneUpdateTime.service";
import { HandlerChangeTimeUpdatedTone } from "./listener/handlers/changeTimeUpdatedTone.handler";
import { ListenerTone } from "./listener/tone.listener";
import { ISceneProvider } from "@tb-common/interfaces/scheme/schemeProvider.interface";

export const SCHEME_TONE: ISceneProvider = {
	services: [
		ServiceTone,
		ServiceToneSettings
	],
	factory: [
		FactoryAddTone,
		FactoryGetTone,
		FactorySetTone
	],
	strategies: [
		StrategyAddNewToneMode,
		StrategySetUpdatedTimeTone,
		StrategySetRandomToneMode,
		StrategySetToneMode,
		StrategyGetSettingsTone,
		StrategyGetListTone,
		StrategyGetToneMode
	],
	cron: [
		CronToneUpdateByTime
	],
	handler: [
		HandlerChangeTimeUpdatedTone,
	],
	listener: [
		ListenerTone,
	]
}