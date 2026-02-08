import {Injectable} from '@nestjs/common';
import {FactoryGetMessage} from '../factory/get.factory';
import {FactoryRemoveMessage} from '../factory/remove.factory';
import {FactoryAddMessage} from '../factory/add.factory';
import {TypeMessage} from '@tb-core/prisma/repo/message/type/message.type';

@Injectable()
export class ServiceMessage {
  private readonly key = {
    cache: 'database.settings.full',
  };

  constructor(
    private readonly factoryAddMessage: FactoryAddMessage,
    private readonly factoryGetMessage: FactoryGetMessage,
    private readonly factoryRemoveMessage: FactoryRemoveMessage,
  ) {}

  async addMessage(message: TypeMessage) {
    const strategy = this.factoryAddMessage.getStrategy('addMessage');

    return await strategy.execute(message);
  }

  async getMessagesToday() {
    const strategy = this.factoryGetMessage.getStrategy('getMessagesByMethod');

    return await strategy.execute({
      method: 'today',
      type: 'string',
    });
  }

  async getSizeMemory() {
    const strategy = this.factoryGetMessage.getStrategy('getSizeMemory');

    return await strategy.execute();
  }
  async removeAllMessages() {
    const strategy = this.factoryRemoveMessage.getStrategy('removeAllMessage');

    return await strategy.execute();
  }
}
