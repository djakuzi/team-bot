import {Module, Provider} from '@nestjs/common';
import {parseObjectToFlatArray} from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import {SCHEME_REMINDER} from './botReminder.scheme';
import {ModuleSettings} from '@tb-modules/settings/settings.module';
import {ModuleReminder} from '@tb-modules/reminder/reminder.module';

@Module({
  imports: [ModuleSettings, ModuleReminder],
  providers: parseObjectToFlatArray<Provider>(SCHEME_REMINDER),
  exports: parseObjectToFlatArray<Provider>(SCHEME_REMINDER),
})
export class ModuleBotReminder {}
