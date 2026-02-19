import {Module, Provider} from '@nestjs/common';
import {parseObjectToFlatArray} from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import {SCHEME_AI} from './botAi.scheme';
import {ModuleAi} from '@tb-core/external/ai/ai.module';

@Module({
  imports: [ModuleAi],
  providers: parseObjectToFlatArray<Provider>(SCHEME_AI),
  exports: parseObjectToFlatArray<Provider>(SCHEME_AI),
})
export class ModuleBotAi {}
