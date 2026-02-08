import {Injectable} from '@nestjs/common';
import {StrategyAddNewReminder} from './strategies/add/newReminder.strategy';

interface IStrategiesFabricAdd {
  newReminder: StrategyAddNewReminder;
}

@Injectable()
export class FactoryAddReminder {
  private readonly strategies: IStrategiesFabricAdd;

  constructor(private readonly addNewReminder: StrategyAddNewReminder) {
    this.strategies = {
      newReminder: addNewReminder,
    };
  }

  getStrategy<K extends keyof IStrategiesFabricAdd>(
    name: K,
  ): IStrategiesFabricAdd[K] {
    return this.strategies[name];
  }
}
