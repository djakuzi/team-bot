import {Injectable} from '@nestjs/common';
import {StrategyRemoveAllMessage} from './strategies/remove/removeAllMessages.strategy';

interface IStrategiesFabricRemove {
  removeAllMessage: StrategyRemoveAllMessage;
}

@Injectable()
export class FactoryRemoveMessage {
  private readonly strategies: IStrategiesFabricRemove;

  constructor(private readonly removeAllMessage: StrategyRemoveAllMessage) {
    this.strategies = {
      removeAllMessage: removeAllMessage,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricRemove>(
    name: K,
  ): IStrategiesFabricRemove[K] {
    return this.strategies[name];
  }
}
