import {Injectable} from '@nestjs/common';
import {StrategySetTimeRetelling} from './strategies/set/timeRetelling.strategy';
import {StrategySetPromtRetelling} from './strategies/set/timeRetelling.strategy copy';

interface IStrategiesFabricSet {
  setTimeRetelling: StrategySetTimeRetelling;
  setPromtRetelling: StrategySetPromtRetelling;
}

@Injectable()
export class FactorySetMessage {
  private readonly strategies: IStrategiesFabricSet;

  constructor(
    private readonly setTimeRetelling: StrategySetTimeRetelling,
    private readonly setPromtRetelling: StrategySetPromtRetelling,
  ) {
    this.strategies = {
      setTimeRetelling: setTimeRetelling,
      setPromtRetelling: setPromtRetelling,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricSet>(
    name: K,
  ): IStrategiesFabricSet[K] {
    return this.strategies[name];
  }
}
