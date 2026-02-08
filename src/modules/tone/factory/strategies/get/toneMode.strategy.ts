import {Injectable} from '@nestjs/common';
import {RepoTone} from '@tb-core/prisma/repo/tone/tone.repo';

@Injectable()
export class StrategyGetToneMode {
  constructor(readonly repoTone: RepoTone) {}

  async execute(name: string) {
    if (!name) {
      throw new Error('Не передано название тона');
    }

    return this.repoTone.findByName(name.toUpperCase());
  }
}
