import {Injectable} from '@nestjs/common';
import {FactoryAddTone} from '../factory/add.factory';
import {FactoryGetTone} from '../factory/get.factory';
import {Prisma} from '@prisma/client';

@Injectable()
export class ServiceTone {
  constructor(
    private readonly factoryAddTone: FactoryAddTone,
    private readonly factoryGetTone: FactoryGetTone,
  ) {}

  async addToneMode(tone: Prisma.ToneCreateInput) {
    const strategy = this.factoryAddTone.getStrategy('newToneMode');
    return await strategy.execute(tone);
  }

  async getToneMode(name: string) {
    const strategy = this.factoryGetTone.getStrategy('toneMode');
    return await strategy.execute(name);
  }

  async getListToneMode() {
    const strategy = this.factoryGetTone.getStrategy('listTone');
    return await strategy.execute();
  }
}
