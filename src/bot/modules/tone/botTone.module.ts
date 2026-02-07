import { Module, Provider } from '@nestjs/common';
import { parseObjectToFlatArray } from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import { SCHEME_TONE_BOT } from './botTone.scheme';
import { ModuleTone } from '@tb-modules/tone/tone.module';
import { ModuleSettings } from '@tb-modules/settings/settings.module';

@Module({
	imports: [
		ModuleTone,
		ModuleSettings
	],
	providers: parseObjectToFlatArray<Provider>(SCHEME_TONE_BOT),
})
export class ModuleBotTone { }
