import {Injectable} from '@nestjs/common';
import {FactorySetMessage} from '../factory/set.factory';
import {FactoryGetMessage} from '../factory/get.factory';

@Injectable()
export class ServiceMessageSettings {
  private readonly key = {
    cache: 'database.settings.full',
  };

  constructor(
    private readonly factorySetMessage: FactorySetMessage,
    private readonly factoryGetMessage: FactoryGetMessage,
  ) {}

  async setTimeRetelling(time: string) {
    const strategy = this.factorySetMessage.getStrategy('setTimeRetelling');
    const result = await strategy.execute(time);

    return result;
  }

  async getTimeRetellingMessage() {
    const strategy = this.factoryGetMessage.getStrategy('getSettingsMessages');
    const res = await strategy.execute();

    return res?.updateTime;
  }
}
