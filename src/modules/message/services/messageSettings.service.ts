import {Injectable} from '@nestjs/common';
import {FactorySetMessage} from '../factory/set.factory';
import {FactoryGetMessage} from '../factory/get.factory';
import {FactoryRemoveMessage} from '../factory/remove.factory';

@Injectable()
export class ServiceMessageSettings {
  private readonly key = {
    cache: 'database.settings.full',
  };

  constructor(
    private readonly factorySetMessage: FactorySetMessage,
    private readonly factoryGetMessage: FactoryGetMessage,
    private readonly factoryRemoveMessage: FactoryRemoveMessage,
  ) {}

  async setPromt(promt: string) {
    const strategy = this.factorySetMessage.getStrategy('setPromtRetelling');
    const result = await strategy.execute(promt);

    return result;
  }

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

  async getPromt() {
    const strategy = this.factoryGetMessage.getStrategy('getSettingsMessages');
    const res = await strategy.execute();

    return res?.promt;
  }

  async removePromt() {
    const strategy = this.factoryRemoveMessage.getStrategy('removePromt');
    const res = await strategy.execute();

    return res?.promt;
  }
}
