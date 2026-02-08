import {Module, Provider} from '@nestjs/common';
import {parseObjectToFlatArray} from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import {SCHEME_MESSAGE} from './botMessage.scheme';
import {ModuleMessage} from '@tb-modules/message/message.module';
import {ModuleAi} from '@tb-core/external/ai/ai.module';
import {ModuleSettings} from '@tb-modules/settings/settings.module';

@Module({
  imports: [ModuleSettings, ModuleMessage, ModuleAi],
  providers: parseObjectToFlatArray<Provider>(SCHEME_MESSAGE),
  exports: parseObjectToFlatArray<Provider>(SCHEME_MESSAGE),
})
export class ModuleBotMessage {}
