import {Injectable} from '@nestjs/common';
import {StrategyGetSettingsTone} from './strategies/get/toneSettings.strategy';
import {StrategyGetListTone} from './strategies/get/listTone.strategy';
import {StrategyGetToneMode} from './strategies/get/toneMode.strategy';
import {StrategyGetCurrentTone} from './strategies/get/currnetTone';

interface IStrategiesFabricGet {
  settingsTone: StrategyGetSettingsTone;
  listTone: StrategyGetListTone;
  toneMode: StrategyGetToneMode;
  getCurrentTone: StrategyGetCurrentTone;
}

@Injectable()
export class FactoryGetTone {
  private readonly strategies: IStrategiesFabricGet;

  constructor(
    private readonly getSettingsTone: StrategyGetSettingsTone,
    private readonly getListTone: StrategyGetListTone,
    private readonly getToneMode: StrategyGetToneMode,
    private readonly getCurrentTone: StrategyGetCurrentTone,
  ) {
    this.strategies = {
      settingsTone: getSettingsTone,
      listTone: getListTone,
      toneMode: getToneMode,
      getCurrentTone: getCurrentTone,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricGet>(
    name: K,
  ): IStrategiesFabricGet[K] {
    return this.strategies[name];
  }
}
