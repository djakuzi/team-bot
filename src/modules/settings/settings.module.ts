import { Module } from '@nestjs/common';
import { parseObjectToFlatArray } from '@tb-common/utils/parse/parseObjectToFlatArray.util';
import { ModulePrisma } from '@tb-core/prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SCHEME_SETTIПNS } from './settings.scheme';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ModulePrisma,
	],
	providers: parseObjectToFlatArray(SCHEME_SETTIПNS),
	exports: [
		...SCHEME_SETTIПNS.services || [],
	]
})

export class ModuleSettings { }
