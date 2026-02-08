import {ISceneProvider} from '@tb-common/interfaces/scheme/schemeProvider.interface';
import {ServiceMessage} from './services/message.service';
import {FactoryRemoveMessage} from './factory/remove.factory';
import {StrategyAddMessage} from './factory/strategies/add/addMessag.strategy';
import {StrategyRemoveAllMessage} from './factory/strategies/remove/removeAllMessages.strategy';
import {StrategyGetlMemoryStorage} from './factory/strategies/get/memoryStorage.strategy';
import {FactoryGetMessage} from './factory/get.factory';
import {RepoMessage} from '@tb-core/prisma/repo/message/message.repo';
import {ServiceMessageAi} from './services/messageAi.service';
import {StrategyGetMessagesByMethod} from './factory/strategies/get/messagesByMethod.strategy';
import {CronRetellingMessages} from './cron/retellingMessages.cron';
import {ServiceMessageSettings} from './services/messageSettings.service';
import {RepoMessageSettings} from '@tb-core/prisma/repo/message/messageSettings.tepo';
import {FactoryAddMessage} from './factory/add.factory';
import {FactorySetMessage} from './factory/set.factory';
import {StrategySetTimeRetelling} from './factory/strategies/set/timeRetelling.strategy';
import {StrategyGetSettingsMessages} from './factory/strategies/get/messageSettings.strategy';
import {ListenerMessages} from './listener/messages.listener';
import {HandlerMessageTimeRetellingChanged} from './listener/handlers/changeTimeRetelling.handler';

export const SCHEME_MESSAGE: ISceneProvider = {
  services: [ServiceMessage, ServiceMessageAi, ServiceMessageSettings],
  factory: [
    FactoryAddMessage,
    FactoryRemoveMessage,
    FactoryGetMessage,
    FactorySetMessage,
  ],
  strategies: [
    StrategyAddMessage,
    StrategyRemoveAllMessage,
    StrategyGetlMemoryStorage,
    StrategyGetMessagesByMethod,
    StrategyGetSettingsMessages,
    StrategySetTimeRetelling,
  ],
  handler: [HandlerMessageTimeRetellingChanged],
  listener: [ListenerMessages],
  repo: [RepoMessage, RepoMessageSettings],
  cron: [CronRetellingMessages],
};
