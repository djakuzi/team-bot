import { Injectable } from '@nestjs/common';
import type { Settings } from '@prisma/client';
import { ServicePrisma } from '@tb-core/prisma/prisma.service';

@Injectable()
export class RepoSettings {
	constructor(private prisma: ServicePrisma) { }

	async createSettings(settigns: Omit<Settings, 'id'>) {

		return await this.prisma.settings.create(
			{ 
				data: settigns 
			}
		)
	}

	async findOne() {
		return this.prisma.settings.findFirst();
	}
	
	async removeSettings() {
		return this.prisma.settings.deleteMany();
	}
}
