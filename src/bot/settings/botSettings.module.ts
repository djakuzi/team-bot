import { Module, Provider } from '@nestjs/common';
import { parseObjectToFlatArray } from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import { SCHEME_TONE_SETTINGS } from './botSettings.scheme';
import { ModuleSettings } from '@tb-modules/settings/settings.module';

@Module({
	imports: [
		ModuleSettings,
	],
	providers: parseObjectToFlatArray<Provider>(SCHEME_TONE_SETTINGS),
	exports: parseObjectToFlatArray<Provider>(SCHEME_TONE_SETTINGS),
})
export class ModuleBotSettings {}
