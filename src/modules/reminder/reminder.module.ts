import {Module} from '@nestjs/common';
import {parseObjectToFlatArray} from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import {ModulePrisma} from '@tb-core/prisma/prisma.module';
import {ScheduleModule} from '@nestjs/schedule';
import {SCHEME_REMINDER} from './reminder.scheme';

@Module({
  imports: [ScheduleModule.forRoot(), ModulePrisma],
  providers: parseObjectToFlatArray(SCHEME_REMINDER),
  exports: [...(SCHEME_REMINDER.services || [])],
})
export class ModuleReminder {}
