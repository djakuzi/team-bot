import {Injectable} from '@nestjs/common';
import {StrategySetTimeRetelling} from './strategies/set/timeRetelling.strategy';
import {StrategySetPromptRetelling} from './strategies/set/promptRetelling.strategy';

interface IStrategiesFabricSet {
  setTimeRetelling: StrategySetTimeRetelling;
  setPromptRetelling: StrategySetPromptRetelling;
}

@Injectable()
export class FactorySetMessage {
  private readonly strategies: IStrategiesFabricSet;

  constructor(
    private readonly setTimeRetelling: StrategySetTimeRetelling,
    private readonly setPromptRetelling: StrategySetPromptRetelling,
  ) {
    this.strategies = {
      setTimeRetelling: setTimeRetelling,
      setPromptRetelling: setPromptRetelling,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricSet>(
    name: K,
  ): IStrategiesFabricSet[K] {
    return this.strategies[name];
  }
}
