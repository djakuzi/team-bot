import {Injectable} from '@nestjs/common';

@Injectable()
export class ServiceAiModelManager {
  private listNameModels: string[];
  private addedModels: Set<string> = new Set();
  private lastSuccessfulModel?: string;
  private lastSuccessfulModelTimestamp?: number;
  private readonly modelCacheTTL = 1000 * 60 * 100;

  constructor(listNameModels: string[]) {
    this.listNameModels = [...listNameModels];
  }

  getListModels(method?: 'firstLastSuccessfulModel'): string[] {
    const models = [...this.listNameModels];

    if (method === 'firstLastSuccessfulModel' && this.lastSuccessfulModel) {
      if (
        Date.now() - (this.lastSuccessfulModelTimestamp ?? 0) >
        this.modelCacheTTL
      ) {
        this.clearLastSuccessfulModel();
      }

      const index = models.indexOf(this.lastSuccessfulModel);
      if (index > -1) {
        models.splice(index, 1);
        models.unshift(this.lastSuccessfulModel);
      }
    }

    return models;
  }

  addModel(model: string, pos: 'start' | 'end') {
    if (this.listNameModels.includes(model)) {
      throw new Error('Эта модель есть в списке');
    }

    if (pos === 'start') this.listNameModels.unshift(model);
    else this.listNameModels.push(model);

    this.addedModels.add(model);
    this.clearLastSuccessfulModel();
  }

  removeAddedModels(model?: string) {
    if (model) {
      if (this.addedModels.has(model)) {
        this.listNameModels = this.listNameModels.filter(m => m !== model);
        this.addedModels.delete(model);
      }
    } else {
      this.listNameModels = this.listNameModels.filter(
        m => !this.addedModels.has(m),
      );
      this.addedModels.clear();
    }
    this.clearLastSuccessfulModel();
  }

  setLastSuccessfulModel(model: string) {
    this.lastSuccessfulModel = model;
    this.lastSuccessfulModelTimestamp = Date.now();
  }

  private clearLastSuccessfulModel() {
    this.lastSuccessfulModel = undefined;
    this.lastSuccessfulModelTimestamp = undefined;
  }

  getAddedModels(): string[] {
    return [...this.addedModels];
  }

  getAllModels(): string[] {
    return [...this.listNameModels];
  }

  getLastSuccessfulModel() {
    return this.lastSuccessfulModel;
  }
}
