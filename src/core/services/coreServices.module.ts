import {Global, Module} from '@nestjs/common';
import {GServiceAwaitingUser} from './services/awaitingUser.service';
import {GServiceCache} from './services/cache.service';

@Global()
@Module({
  imports: [],
  providers: [GServiceAwaitingUser, GServiceCache],
  exports: [GServiceAwaitingUser, GServiceCache],
})
export class GModuleServices {}
