import {Injectable} from '@nestjs/common';
import {StrategyRemoveAllMessage} from './strategies/remove/removeAllMessages.strategy';
import {StrategyRemovePromt} from './strategies/remove/removePromt.strategy';

interface IStrategiesFabricRemove {
  removeAllMessage: StrategyRemoveAllMessage;
  removePromt: StrategyRemovePromt;
}

@Injectable()
export class FactoryRemoveMessage {
  private readonly strategies: IStrategiesFabricRemove;

  constructor(
    private readonly removeAllMessage: StrategyRemoveAllMessage,
    private readonly removePromt: StrategyRemovePromt,
  ) {
    this.strategies = {
      removeAllMessage: removeAllMessage,
      removePromt: removePromt,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricRemove>(
    name: K,
  ): IStrategiesFabricRemove[K] {
    return this.strategies[name];
  }
}
