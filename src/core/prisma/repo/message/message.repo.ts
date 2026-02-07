import { Injectable } from '@nestjs/common';
import { ServicePrisma } from '@tb-core/prisma/prisma.service';
import { TypeMessage } from './type/message.type';
import { Memory } from '@tb-core/libs/memory/index.lib';
import { BaseService } from '@tb-common/interfaces/service/baseService.interface';
import { GServiceCache } from '@tb-core/services/services/cache.service';
import { TypeFilterMessage } from './type/messageFilter.type';

@Injectable()
export class RepoMessage implements BaseService {
	readonly key = {
		cache: 'database.message.size',
	}

	private storageMessages: TypeMessage[] = [];

	constructor(
		private readonly prisma: ServicePrisma,
		private readonly GServiceCache: GServiceCache
	) { }

	async addMessage(message: TypeMessage) {
		this.storageMessages.push(message);
		this.GServiceCache.delete(this.key.cache);
	}

	async getMessages(filter?: TypeFilterMessage) {
		if (!filter || Object.keys(filter).length === 0) {
			return this.storageMessages;
		}

		const filterKeyValue = Object.entries(filter);

		return this.storageMessages.filter((msg) => {
			for (const [key, value] of filterKeyValue) {
				if (['from', 'to'].includes(key)) continue;

				if (value !== undefined && msg[key as keyof TypeMessage] !== value) {
					return false;
				}
			}

			if (filter.from && msg.timestamp < filter.from || filter.to && msg.timestamp > filter.to) {
				return false;
			}

			return true;
		});
	}

	async clearMessage() {
		this.storageMessages = [];
		this.GServiceCache.delete(this.key.cache);
	}

	async getSizeMemory(useCache: boolean = true) {
        let size: string | null = useCache ? this.GServiceCache.get<string>(this.key.cache) : null;

		if (!size || !useCache) {
            size = Memory.calc(this.storageMessages).mb;
            this.GServiceCache.set(this.key.cache, size);
		}

        return size;
	}
}
