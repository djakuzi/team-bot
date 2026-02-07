import { Injectable } from "@nestjs/common";
import { FactoryCreateSettings } from "../factory/create.factory";
import { TypeArgsCreateBaseSettings } from "../factory/strategies/create/baseSettings.strategy";
import { FactoryGetSettings } from "../factory/get.factory";
import { GServiceCache } from "@tb-core/services/services/cache.service";
import { Settings } from "@prisma/client";
import { ExceptionResourceNotFound } from "@tb-common/exception/resourceNotFound.exception";
import { FactoryRemoveSettings } from "../factory/remove.factory copy";
import { BaseService } from "@tb-common/interfaces/service/baseService.interface";

@Injectable()
export class ServiceSettings implements BaseService {
	readonly key = {
		cache: 'database.settings.full',
	}

	constructor(
		private readonly GServiceCache: GServiceCache,
		private readonly factoryCreateSettings: FactoryCreateSettings,
		private readonly factoryGetSettings: FactoryGetSettings,
		private readonly factoryRemoveSettings: FactoryRemoveSettings,
	) { }

	async createSettings(settings: TypeArgsCreateBaseSettings) {
		const strategy = this.factoryCreateSettings['сreateBaseSettings'];
		console.log('Настроки бота созданы');
		return await strategy.execute(settings);
	}

	async getSettings(useCache: boolean = true) {
		let settings: Settings | null = useCache ? this.GServiceCache.get<Settings>(this.key.cache) : null;

		if (!settings || !useCache) {
			const strategy = this.factoryGetSettings.getStrategy('getSettings');
			const res = await strategy.execute();

			if (!res) throw new ExceptionResourceNotFound('Настройки не найдены.');

			this.GServiceCache.set(this.key.cache, res);
			settings = res;
		}

		return settings;
	}

	async removeSettings() {
		const strategy = this.factoryRemoveSettings.getStrategy('removeSettings');
		await strategy.execute();
		this.GServiceCache.delete(this.key.cache);
	}
}
