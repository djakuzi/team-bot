import {Injectable} from '@nestjs/common';
import {ServiceAiModelManager} from './aiManager.service';
import {SerivceAiTextGenerator} from './aiGeneratorText.service';
import {ConfigService} from '@nestjs/config';
import {IConfigAi} from '@tb-core/config/configs/app.config';
import {OpenRouter} from '@openrouter/sdk';
import {IAiGenerationParams} from '../types/generationOptions.type';

@Injectable()
export class ServiceAi {
  private readonly modelManager: ServiceAiModelManager;
  private readonly textGenerator: SerivceAiTextGenerator;

  constructor(private configService: ConfigService) {
    const aiConfig = this.configService.get<IConfigAi>('ai');
    const apiKey = aiConfig?.token;
    const listNameModels = aiConfig?.models?.split(',').map(m => m.trim());

    if (!apiKey || !listNameModels) {
      throw new Error('AI API token is missing in config');
    }

    this.modelManager = new ServiceAiModelManager(listNameModels);
    this.textGenerator = new SerivceAiTextGenerator(
      new OpenRouter({apiKey}),
      this.modelManager,
    );
  }

  generateText(options: IAiGenerationParams) {
    return this.textGenerator.generateText(options);
  }

  addModel(model: string, pos: 'start' | 'end') {
    this.modelManager.addModel(model, pos);
  }

  removeAddedModels(model?: string) {
    this.modelManager.removeAddedModels(model);
  }

  getAddedModels(): string[] {
    return this.modelManager.getAddedModels();
  }

  getAllModels(): string[] {
    return this.modelManager.getAllModels();
  }

  getLastSuccessfulModel() {
    return this.modelManager.getLastSuccessfulModel();
  }
}
