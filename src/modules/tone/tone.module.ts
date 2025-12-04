import { Module } from '@nestjs/common';
import { parseObjectToFlatArray } from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import { ModulePrisma } from '@tb-core/prisma/prisma.module';
import { SCHEME_TONE } from './tone.scheme';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ModulePrisma,
	],
	providers: parseObjectToFlatArray(SCHEME_TONE),
	exports: [
		...SCHEME_TONE.services || [],
		...SCHEME_TONE.cron || [],
	]
})
export class ModuleTone { }
