import {Injectable} from '@nestjs/common';
import {RepoMessage} from '@tb-core/prisma/repo/message/message.repo';
import {TypeMessage} from '@tb-core/prisma/repo/message/type/message.type';

@Injectable()
export class StrategyAddMessage {
  constructor(readonly repoMessage: RepoMessage) {}

  async execute(message: TypeMessage) {
    if (!message) return null;
    await this.repoMessage.addMessage(message);

    return message;
  }
}
