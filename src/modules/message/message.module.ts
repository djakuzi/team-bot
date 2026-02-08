import {Module} from '@nestjs/common';
import {parseObjectToFlatArray} from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import {ModulePrisma} from '@tb-core/prisma/prisma.module';
import {ScheduleModule} from '@nestjs/schedule';
import {SCHEME_MESSAGE} from './message.scheme';
import {ModuleAi} from '@tb-core/external/ai/ai.module';

@Module({
  imports: [ScheduleModule.forRoot(), ModulePrisma, ModuleAi],
  providers: parseObjectToFlatArray(SCHEME_MESSAGE),
  exports: [...(SCHEME_MESSAGE.services || [])],
})
export class ModuleMessage {}
