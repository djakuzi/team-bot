import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {OpenRouter} from '@openrouter/sdk';
import {IConfigAi} from '@tb-core/config/configs/app.config';

@Injectable()
export class ServiceAi {
  private readonly openRouter: OpenRouter;
  private readonly config = {
    model: 'qwen/qwen3-coder:free',
    stream: true,
  };

  constructor(private configService: ConfigService) {
    const aiConfig = this.configService.get<IConfigAi>('ai');
    const apiKey = aiConfig?.token;

    if (!apiKey) {
      throw new Error('AI API token is missing in config');
    }

    this.openRouter = new OpenRouter({
      apiKey,
    });
  }

  async generateText(promt: string) {
    if (!promt) return;

    const stream = await this.openRouter.chat.send({
      model: 'nvidia/nemotron-nano-9b-v2:free',
      messages: [
        {
          role: 'user',
          content: promt,
        },
      ],
      stream: true,
    });

    let response = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        response += content;
      }
    }

    return response;
  }
}
