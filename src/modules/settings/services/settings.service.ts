import { Injectable } from "@nestjs/common";
import { FactoryCreateSettings } from "../factory/create.factory";
import { TypeArgsCreateBaseSettings } from "../factory/strategies/create/baseSettings.strategy";
import { FactoryGetSettings } from "../factory/get.factory";
import { ServiceCache } from "@tb-core/services/services/cache.service";
import { Settings } from "@prisma/client";
import { ExceptionResourceNotFound } from "@tb-common/exception/resourceNotFound.exception";
import { FactoryRemoveSettings } from "../factory/remove.factory copy";

@Injectable()
export class ServiceSettings {
	private readonly key = {
		cache: 'database.settings.full',
	}

	constructor(
		private readonly serviceCache: ServiceCache,
		private readonly factoryCreateSettings: FactoryCreateSettings,
		private readonly factoryGetSettings: FactoryGetSettings,
		private readonly factoryRemoveSettings: FactoryRemoveSettings,
	) {}

	async createSettings(settings: TypeArgsCreateBaseSettings) {
		const strategy = this.factoryCreateSettings['сreateBaseSettings'];
		console.log('Настроки бота созданы');
		return await strategy.execute(settings);
	}

	async getSettings(useCache: boolean = true) {
		let settings: Settings | null = useCache ? this.serviceCache.get<Settings>(this.key.cache) : null;
		
		if (!settings || !useCache) {
			const strategy = this.factoryGetSettings.getStrategy('getSettings');
			const res = await strategy.execute();

			if (!res) throw new ExceptionResourceNotFound('Настройки не найдены.');

			this.serviceCache.set(this.key.cache, res);
			settings = res;
		}
				
		return settings;
	}

	async removeSettings() {
		const strategy = this.factoryRemoveSettings.getStrategy('removeSettings');
		await strategy.execute();
		this.serviceCache.delete(this.key.cache);
	}
}
