import { Injectable } from '@nestjs/common';
import type { Prisma, ToneSettings } from '@prisma/client';
import { ServicePrisma } from '@tb-core/prisma/prisma.service';

@Injectable()
export class RepoToneSettings {
	constructor(private prisma: ServicePrisma) {}
	
	async findOne(): Promise<ToneSettings | null> {
		return this.prisma.toneSettings.findFirst({
			include: {
				tone: true,
			},
		});
	}

	async update(data: Prisma.ToneSettingsUpdateInput): Promise<ToneSettings> {
		const existing = await this.prisma.toneSettings.findFirst();

		if (!existing) {
			return this.prisma.toneSettings.create({
				data: data as Prisma.ToneSettingsCreateInput,
			});
		}

		return this.prisma.toneSettings.update({
			where: { id: existing.id },
			data,
		});
	}
}
