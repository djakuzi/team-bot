import {Injectable} from '@nestjs/common';
import {StrategySetRandomToneMode} from './strategies/set/randomTone.strategy';
import {StrategySetToneMode} from './strategies/set/toneMode.strategy';
import {StrategySetUpdatedTimeTone} from './strategies/set/updatedTimeTone.strategy';

interface IStrategiesFabricSet {
  randomMode: StrategySetRandomToneMode;
  toneMode: StrategySetToneMode;
  updatedTimeMode: StrategySetUpdatedTimeTone;
}

@Injectable()
export class FactorySetTone {
  private readonly strategies: IStrategiesFabricSet;

  constructor(
    private readonly randomMode: StrategySetRandomToneMode,
    private readonly toneMode: StrategySetToneMode,
    private readonly updatedTimeMode: StrategySetUpdatedTimeTone,
  ) {
    this.strategies = {
      randomMode: randomMode,
      toneMode: toneMode,
      updatedTimeMode: updatedTimeMode,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricSet>(
    name: K,
  ): IStrategiesFabricSet[K] {
    return this.strategies[name];
  }
}
