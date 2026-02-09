import {ISceneProvider} from '@tb-common/interfaces/scheme/schemeProvider.interface';
import {FactoryGetReminder} from './factory/get.factory';
import {FactoryAddReminder} from './factory/add.factory';
import {FactoryChangeReminder} from './factory/change.factory';
import {StrategyAddNewReminder} from './factory/strategies/add/newReminder.strategy';
import {StrategyGetOneReminder} from './factory/strategies/get/oneReminder.strategy';
import {StrategyGetListReminders} from './factory/strategies/get/listReminders.strategy';
import {HandlerReminderChanged} from './listener/handlers/reminderChanged.handler';
import {ListenerReminder} from './listener/reminder.listener';
import {StrategyChangeDataReminder} from './factory/strategies/change/changeReminder.strategy';
import {CronReminderExecute} from './cron/reminderExecute.cron';
import {ServiceReminder} from './services/reminder.service';
import {HandlerReminderAdded} from './listener/handlers/reminderAdded.handler';
import {StrategyDeleteAllReminders} from './factory/strategies/delete/allReminders.strategy';
import {FactoryDeleteReminder} from './factory/delete.factory';
import {HandlerRemoveReminderAll} from './listener/handlers/removeReminderAll.handler';

export const SCHEME_REMINDER: ISceneProvider = {
  services: [ServiceReminder],
  factory: [
    FactoryGetReminder,
    FactoryAddReminder,
    FactoryChangeReminder,
    FactoryDeleteReminder,
  ],
  strategies: [
    StrategyAddNewReminder,
    StrategyGetOneReminder,
    StrategyGetListReminders,
    StrategyChangeDataReminder,
    StrategyDeleteAllReminders,
  ],
  handler: [
    HandlerReminderChanged,
    HandlerReminderAdded,
    HandlerRemoveReminderAll,
  ],
  listener: [ListenerReminder],
  cron: [CronReminderExecute],
};
