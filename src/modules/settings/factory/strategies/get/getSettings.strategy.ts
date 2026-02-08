import {Injectable} from '@nestjs/common';
import {RepoSettings} from '@tb-core/prisma/repo/settings/settings.repo';

@Injectable()
export class StrategyGetSettings {
  constructor(readonly repoSettings: RepoSettings) {}

  async execute() {
    return await this.repoSettings.findOne();
  }
}
