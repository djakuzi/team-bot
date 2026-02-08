import {Module} from '@nestjs/common';
import {ModuleTone} from './tone/tone.module';
import {ModuleSettings} from './settings/settings.module';
import {ModuleVpn} from './vpn/vpn.module';

@Module({
  imports: [ModuleTone, ModuleVpn, ModuleSettings],
})
export class ModuleCommon {}
