import {Injectable} from '@nestjs/common';
import {StrategyRemoveSettings} from './strategies/remove/removeSettings.strategy';

interface IStrategiesFabricRemove {
  removeSettings: StrategyRemoveSettings;
}

@Injectable()
export class FactoryRemoveSettings {
  private readonly strategies: IStrategiesFabricRemove;

  constructor(private readonly removeSettings: StrategyRemoveSettings) {
    this.strategies = {
      removeSettings: removeSettings,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricRemove>(
    name: K,
  ): IStrategiesFabricRemove[K] {
    return this.strategies[name];
  }
}
