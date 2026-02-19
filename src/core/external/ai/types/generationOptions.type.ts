import {ChatGenerationParams} from '@openrouter/sdk/esm/models';

export interface IAiGenerationParams {
  prompt: string;
  temperature?: ChatGenerationParams['temperature'];
  systemPrompt?: string;
  maxTokens?: ChatGenerationParams['maxTokens'];
}
