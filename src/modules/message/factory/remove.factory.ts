import {Injectable} from '@nestjs/common';
import {StrategyRemoveAllMessage} from './strategies/remove/removeAllMessages.strategy';
import {StrategyRemovePrompt} from './strategies/remove/removePromt.strategy';

interface IStrategiesFabricRemove {
  removeAllMessage: StrategyRemoveAllMessage;
  removePrompt: StrategyRemovePrompt;
}

@Injectable()
export class FactoryRemoveMessage {
  private readonly strategies: IStrategiesFabricRemove;

  constructor(
    private readonly removeAllMessage: StrategyRemoveAllMessage,
    private readonly removePrompt: StrategyRemovePrompt,
  ) {
    this.strategies = {
      removeAllMessage: removeAllMessage,
      removePrompt: removePrompt,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricRemove>(
    name: K,
  ): IStrategiesFabricRemove[K] {
    return this.strategies[name];
  }
}
