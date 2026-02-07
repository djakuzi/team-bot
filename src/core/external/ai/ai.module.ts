import { Module } from "@nestjs/common";
import { ServiceAi } from "./services/ai.service";

@Module({
	imports: [],
	providers: [
		ServiceAi,
	],
	exports: [
		ServiceAi
	]
})
export class ModuleAi {};