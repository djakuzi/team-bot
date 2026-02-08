import {Injectable} from '@nestjs/common';
import {ExceptionConflictResource} from '@tb-common/exception/conflictResource.exception';
import {RepoSettings} from '@tb-core/prisma/repo/settings/settings.repo';

@Injectable()
export class StrategyRemoveSettings {
  constructor(readonly repoSettings: RepoSettings) {}

  async execute() {
    const res = await this.repoSettings.findOne();

    if (!res) {
      throw new ExceptionConflictResource(
        'Синхронизация между ботом и чатом отсутсвует',
      );
    }

    return await this.repoSettings.removeSettings();
  }
}
