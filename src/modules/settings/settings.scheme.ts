import { ISceneProvider } from "@tb-common/interfaces/scheme/schemeProvider.interface";
import { FactoryCreateSettings } from "./factory/create.factory";
import { StrategyCreateBaseSettings } from "./factory/strategies/create/baseSettings.strategy";
import { ServiceSettings } from "./services/settings.service";
import { FactoryGetSettings } from "./factory/get.factory";
import { StrategyGetSettings } from "./factory/strategies/get/getSettings.strategy";
import { FactoryRemoveSettings } from "./factory/remove.factory copy";
import { StrategyRemoveSettings } from "./factory/strategies/remove/removeSettings.strategy";


export const SCHEME_SETTINGS: ISceneProvider = {
    services: [
        ServiceSettings,
    ],
    factory: [
        FactoryCreateSettings,
        FactoryGetSettings,
        FactoryRemoveSettings
    ],
    strategies: [
        StrategyCreateBaseSettings,
        StrategyGetSettings,
        StrategyRemoveSettings
    ],
    handler: [

    ],
    listener: [

    ]
}