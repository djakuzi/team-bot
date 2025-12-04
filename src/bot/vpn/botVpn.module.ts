import { Module, Provider } from '@nestjs/common';
import { parseObjectToFlatArray } from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import { ModuleTone } from '@tb-modules/tone/tone.module';
import { SCHEME_BOT_VPN } from './botVpn.scheme';

@Module({
	imports: [
		ModuleTone,
	],
	providers: parseObjectToFlatArray<Provider>(SCHEME_BOT_VPN),
})
export class ModuleBotVpn { }
