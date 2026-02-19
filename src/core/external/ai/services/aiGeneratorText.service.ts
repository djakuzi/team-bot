import {Injectable, Logger} from '@nestjs/common';
import {OpenRouter} from '@openrouter/sdk';
import {ServiceAiModelManager} from './aiManager.service';
import {IAiGenerationParams} from '../types/generationOptions.type';

@Injectable()
export class SerivceAiTextGenerator {
  private readonly logger = new Logger(SerivceAiTextGenerator.name);

  constructor(
    private readonly openRouter: OpenRouter,
    private readonly modelManager: ServiceAiModelManager,
  ) {}

  private async generateWithModel(
    model: string,
    options: IAiGenerationParams,
  ): Promise<string> {
    const stream = await this.openRouter.chat.send({
      model,
      temperature: options.temperature,
      maxTokens: options.maxTokens,
      messages: [
        {role: 'system', content: options.systemPrompt ?? ''},
        {role: 'user', content: options.prompt},
      ],
      stream: true,
    });

    let response = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) response += content;
    }

    if (!response) throw new Error(`Empty response from model ${model}`);
    return response;
  }

  async generateText(options: IAiGenerationParams) {
    if (!options.prompt?.trim()) throw new Error('Prompt is empty');

    let lastError: unknown;
    const models = this.modelManager.getListModels('firstLastSuccessfulModel');

    for (const model of models) {
      try {
        const response = await this.generateWithModel(model, options);
        this.modelManager.setLastSuccessfulModel(model);

        return {
          text: response,
          usedModel: model,
        };
      } catch (err) {
        lastError = err;
        this.logger.warn(`Model ${model} failed: ${(err as Error).message}`);
      }
    }

    throw new Error(
      `All AI models failed. Last error: ${
        lastError instanceof Error ? lastError.message : 'unknown'
      }`,
    );
  }
}
