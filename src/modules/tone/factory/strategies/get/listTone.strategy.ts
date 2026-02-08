import {Injectable} from '@nestjs/common';
import {RepoTone} from '@tb-core/prisma/repo/tone/tone.repo';

@Injectable()
export class StrategyGetListTone {
  constructor(readonly repoTone: RepoTone) {}

  async execute() {
    return this.repoTone.findAll();
  }
}
