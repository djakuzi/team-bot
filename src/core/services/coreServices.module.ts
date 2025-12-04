import { Global, Module } from '@nestjs/common';
import { ServiceAwaitingUser } from './services/awaitingUser.service';
import { ServiceCache } from './services/cache.service';

@Global()
@Module({
	imports: [],
	providers: [
		ServiceAwaitingUser,
		ServiceCache,
	],
	exports: [
		ServiceAwaitingUser,
		ServiceCache,
	]
})
export class ModuleCoreServices {}
