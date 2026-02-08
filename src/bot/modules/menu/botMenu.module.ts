import {Module} from '@nestjs/common';
import {SCHEME_BOT_MENU} from './botMenu.scheme';

@Module({
  providers: [...SCHEME_BOT_MENU.updates],
})
export class ModuleBotMenu {}
