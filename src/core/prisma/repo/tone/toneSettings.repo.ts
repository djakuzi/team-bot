import {Injectable} from '@nestjs/common';
import type {Prisma} from '@prisma/client';
import {ServicePrisma} from '@tb-core/prisma/prisma.service';

@Injectable()
export class RepoToneSettings {
  constructor(private readonly prisma: ServicePrisma) {}

  async create(data: Prisma.ToneSettingsUpdateInput) {
    return await this.prisma.toneSettings.create({
      data: data as Prisma.ToneSettingsCreateInput,
    });
  }

  async findOne<T extends Prisma.ToneSettingsFindFirstArgs>(
    args?: T,
  ): Promise<Prisma.ToneSettingsGetPayload<T> | null> {
    return (await this.prisma.toneSettings.findFirst(args ? args : {})) as any;
  }

  async update(data: Prisma.ToneSettingsUpdateInput) {
    const existing = await this.prisma.toneSettings.findFirst();

    if (!existing) {
      return await this.create(data);
    }

    return await this.prisma.toneSettings.update({
      where: {id: existing.id},
      data,
    });
  }
}
