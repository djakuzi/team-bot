import {Module} from '@nestjs/common';
import {parseObjectToFlatArray} from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import {ModulePrisma} from '@tb-core/prisma/prisma.module';
import {ScheduleModule} from '@nestjs/schedule';
import {SCHEME_SETTINGS} from './settings.scheme';

@Module({
  imports: [ScheduleModule.forRoot(), ModulePrisma],
  providers: parseObjectToFlatArray(SCHEME_SETTINGS),
  exports: [...(SCHEME_SETTINGS.services || [])],
})
export class ModuleSettings {}
