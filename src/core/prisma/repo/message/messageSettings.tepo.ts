import {Injectable} from '@nestjs/common';
import {ServicePrisma} from '@tb-core/prisma/prisma.service';
import {TypeMessage} from './type/message.type';
import {BaseService} from '@tb-common/interfaces/service/baseService.interface';
import {Prisma} from '@prisma/client';

@Injectable()
export class RepoMessageSettings implements BaseService {
  readonly key = {
    cache: 'database.message.size',
  };

  private storageMessages: TypeMessage[] = [];

  constructor(private readonly prisma: ServicePrisma) {}

  async create(data: Prisma.MessageSettingsUpdateInput) {
    return await this.prisma.messageSettings.create({
      data: data as Prisma.MessageSettingsCreateInput,
    });
  }

  async findOne<T extends Prisma.MessageSettingsFindFirstArgs>(
    args?: T,
  ): Promise<Prisma.MessageSettingsGetPayload<T> | null> {
    return (await this.prisma.messageSettings.findFirst(
      args ? args : {},
    )) as any;
  }

  async update(data: Prisma.MessageSettingsUpdateInput) {
    const existing = await this.prisma.messageSettings.findFirst();

    if (!existing) {
      return await this.create(data);
    }

    return await this.prisma.messageSettings.update({
      where: {id: existing.id},
      data,
    });
  }
}
