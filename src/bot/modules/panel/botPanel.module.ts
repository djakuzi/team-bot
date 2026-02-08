import {Module, Provider} from '@nestjs/common';
import {parseObjectToFlatArray} from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import {SCHEME_PANEL_BOT} from './botPanel.scheme';

@Module({
  imports: [],
  providers: parseObjectToFlatArray<Provider>(SCHEME_PANEL_BOT),
  exports: parseObjectToFlatArray<Provider>(SCHEME_PANEL_BOT),
})
export class ModuleBotPanel {}
