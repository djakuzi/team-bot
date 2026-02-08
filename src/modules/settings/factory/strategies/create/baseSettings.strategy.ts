import {Injectable} from '@nestjs/common';
import {Settings} from '@prisma/client';
import {ExceptionConflictResource} from '@tb-common/exception/conflictResource.exception';
import {RepoSettings} from '@tb-core/prisma/repo/settings/settings.repo';

export type TypeArgsCreateBaseSettings = Omit<Settings, 'id'>;

@Injectable()
export class StrategyCreateBaseSettings {
  constructor(readonly repoSettings: RepoSettings) {}

  async execute(args: TypeArgsCreateBaseSettings) {
    const isNoSettings = await this.repoSettings.findOne();

    if (isNoSettings !== null) {
      throw new ExceptionConflictResource('Настройки уже были созданы ранее.');
    }

    return await this.repoSettings.createSettings(args);
  }
}
